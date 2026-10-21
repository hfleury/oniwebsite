import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import posthog from 'posthog-js';
import type { CaptureResult } from 'posthog-js';
import { writeCookieConsent } from './consent';

vi.mock('posthog-js', () => ({
  default: {
    init: vi.fn(),
    capture: vi.fn(),
    opt_in_capturing: vi.fn(),
    opt_out_capturing: vi.fn(),
    get_explicit_consent_status: vi.fn(() => 'pending'),
  },
}));

// analytics.ts keeps an "initialized" flag and a window listener, so each test
// loads a fresh copy of the module and removes the listeners it added.
const addedListeners: Array<[string, EventListenerOrEventListenerObject]> = [];
const addEventListener = window.addEventListener.bind(window);

async function loadAnalytics() {
  vi.resetModules();
  return import('./analytics');
}

function clearConsentCookie() {
  document.cookie = 'cookie_consent=; Path=/; Max-Age=0';
}

function setConsentCookie(value: 'accepted' | 'rejected') {
  document.cookie = `cookie_consent=${value}; Path=/`;
}

beforeEach(() => {
  vi.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
    addedListeners.push([type, listener]);
    addEventListener(type, listener, options);
  });
  clearConsentCookie();
  vi.stubEnv('VITE_POSTHOG_KEY', 'phc_test');
});

afterEach(() => {
  addedListeners.splice(0).forEach(([type, listener]) => window.removeEventListener(type, listener));
  vi.restoreAllMocks();
  clearConsentCookie();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('initAnalytics', () => {
  it('does nothing without a project key', async () => {
    vi.stubEnv('VITE_POSTHOG_KEY', '');
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(posthog.init).not.toHaveBeenCalled();
  });

  it('initializes PostHog for the EU, opted out until consent, with replay, surveys, heatmaps and web vitals off', async () => {
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(posthog.init).toHaveBeenCalledWith(
      'phc_test',
      expect.objectContaining({
        api_host: 'https://eu.i.posthog.com',
        opt_out_capturing_by_default: true,
        opt_out_persistence_by_default: true,
        autocapture: true,
        disable_session_recording: true,
        disable_surveys: true,
        capture_heatmaps: false,
        capture_performance: false,
        advanced_disable_flags: true,
      })
    );
  });

  it('leaves consent pending when no choice is stored', async () => {
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(posthog.opt_in_capturing).not.toHaveBeenCalled();
    expect(posthog.opt_out_capturing).not.toHaveBeenCalled();
  });

  it('opts in silently when consent was already accepted', async () => {
    setConsentCookie('accepted');
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(posthog.opt_in_capturing).toHaveBeenCalledWith({ captureEventName: false });
  });

  it('does not opt in again when PostHog already has consent granted', async () => {
    setConsentCookie('accepted');
    vi.mocked(posthog.get_explicit_consent_status).mockReturnValueOnce('granted');
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(posthog.opt_in_capturing).not.toHaveBeenCalled();
  });

  it('never enables cookieless capture, so a reject sends nothing', async () => {
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(vi.mocked(posthog.init).mock.calls[0][1]).not.toHaveProperty('cookieless_mode');
  });

  it('opts out when consent was already rejected', async () => {
    setConsentCookie('rejected');
    const { initAnalytics } = await loadAnalytics();

    await initAnalytics();

    expect(posthog.opt_out_capturing).toHaveBeenCalledTimes(1);
  });

  it('follows a banner choice made after load, announcing an opt-in', async () => {
    const { initAnalytics } = await loadAnalytics();
    await initAnalytics();

    writeCookieConsent('accepted');
    expect(posthog.opt_in_capturing).toHaveBeenCalledWith(undefined);

    writeCookieConsent('rejected');
    expect(posthog.opt_out_capturing).toHaveBeenCalledTimes(1);
  });

  it('tags every event with the locale from the URL', async () => {
    vi.stubGlobal('location', { pathname: '/pt/services/cloud-devops', protocol: 'http:' });
    const { initAnalytics } = await loadAnalytics();
    await initAnalytics();

    const { before_send } = vi.mocked(posthog.init).mock.calls[0][1]!;
    const event = { event: '$pageview', properties: {} } as CaptureResult;

    expect((before_send as (e: CaptureResult) => CaptureResult)(event).properties.locale).toBe('pt');
  });
});

describe('trackCtaClick', () => {
  it('is a no-op before initAnalytics', async () => {
    const { trackCtaClick } = await loadAnalytics();

    trackCtaClick('hero_email');

    expect(posthog.capture).not.toHaveBeenCalled();
  });

  it('sends cta_click with the CTA id and extra properties', async () => {
    const { initAnalytics, trackCtaClick } = await loadAnalytics();
    await initAnalytics();

    trackCtaClick('growth_mailto', { service_id: 'cloud-devops' });

    expect(posthog.capture).toHaveBeenCalledWith('cta_click', {
      cta_id: 'growth_mailto',
      service_id: 'cloud-devops',
    });
  });
});
