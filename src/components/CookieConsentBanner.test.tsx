import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import CookieConsentBanner, { hasOptionalConsent } from './CookieConsentBanner';

function clearConsentCookie() {
  document.cookie = 'cookie_consent=; Path=/; Max-Age=0';
}

function renderBanner(path = '/') {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter initialEntries={[path]}>
      <I18nProvider>
        <CookieConsentBanner />
      </I18nProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  clearConsentCookie();
  vi.stubGlobal('location', { href: '/', protocol: 'http:' });
});

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
  clearConsentCookie();
  vi.unstubAllGlobals();
});

describe('CookieConsentBanner', () => {
  it('renders the message and CTAs when no cookie is set on /', () => {
    renderBanner('/');

    expect(screen.getByText('cookie_banner_message')).toBeInTheDocument();
    expect(screen.getByText('cookie_banner_accept')).toBeInTheDocument();
    expect(screen.getByText('cookie_banner_reject')).toBeInTheDocument();
  });

  it('does not render when cookie_consent is already set', () => {
    document.cookie = 'cookie_consent=accepted; Path=/; Max-Age=31536000';

    renderBanner('/');

    expect(screen.queryByText('cookie_banner_accept')).not.toBeInTheDocument();
  });

  it.each(['/privacy', '/pt/privacy', '/sv/privacy'])('does not render on %s', (path) => {
    renderBanner(path);

    expect(screen.queryByText('cookie_banner_accept')).not.toBeInTheDocument();
  });

  it('clicking Accept writes cookie_consent=accepted, hides the banner, and grants optional consent', () => {
    renderBanner('/');

    fireEvent.click(screen.getByText('cookie_banner_accept'));

    expect(document.cookie).toContain('cookie_consent=accepted');
    expect(screen.queryByText('cookie_banner_accept')).not.toBeInTheDocument();
    expect(hasOptionalConsent()).toBe(true);
  });

  it('clicking Reject writes cookie_consent=rejected, hides the banner, and withholds optional consent', () => {
    renderBanner('/');

    fireEvent.click(screen.getByText('cookie_banner_reject'));

    expect(document.cookie).toContain('cookie_consent=rejected');
    expect(screen.queryByText('cookie_banner_reject')).not.toBeInTheDocument();
    expect(hasOptionalConsent()).toBe(false);
  });
});
