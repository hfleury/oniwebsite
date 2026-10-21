import type { CaptureResult, PostHog } from "posthog-js";
import { getLocaleFromPath } from "./i18n";
import { CONSENT_CHANGE_EVENT, readCookieConsent } from "./consent";
import type { ConsentValue } from "./consent";

export type CtaId = "hero_email" | "growth_mailto" | "services_learn_more";

let started = false;
let client: PostHog | null = null;

// Every event carries the locale the visitor is browsing in. Super properties
// (posthog.register) would be wiped on each consent change, this hook is not.
function addLocale(event: CaptureResult): CaptureResult {
  event.properties.locale = getLocaleFromPath(window.location.pathname);
  return event;
}

// On page load we only sync PostHog with the stored choice (no $opt_in event);
// a fresh banner click announces it.
function applyConsent(posthog: PostHog, value: ConsentValue, { announce }: { announce: boolean }) {
  const status = posthog.get_explicit_consent_status();
  if (value === "accepted" && status !== "granted") {
    posthog.opt_in_capturing(announce ? undefined : { captureEventName: false });
  } else if (value === "rejected" && status !== "denied") {
    posthog.opt_out_capturing();
  }
}

// No key (local dev, or the repo var not set yet) means no PostHog at all, and
// the SDK chunk is never downloaded. With a key it loads after first paint.
export async function initAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key || started) return;
  started = true;

  const { default: posthog } = await import("posthog-js");
  posthog.init(key, {
    api_host: "https://eu.i.posthog.com",
    defaults: "2026-08-30",
    // Nothing is sent and no ph_* identity is stored until the visitor accepts;
    // a reject keeps it that way (only PostHog's opt-out flag is written).
    opt_out_capturing_by_default: true,
    opt_out_persistence_by_default: true,
    autocapture: true,
    // Pinned off here so a toggle in the PostHog dashboard can't turn them on.
    disable_session_recording: true,
    disable_surveys: true,
    capture_heatmaps: false,
    capture_performance: false,
    // No feature flags here; this also skips remote config, so nothing above
    // can be overridden from the dashboard and no request precedes consent.
    advanced_disable_flags: true,
    before_send: addLocale,
  });
  client = posthog;

  // A banner click before the SDK arrived is already in the cookie.
  const stored = readCookieConsent();
  if (stored) applyConsent(posthog, stored, { announce: false });

  window.addEventListener(CONSENT_CHANGE_EVENT, (event) => {
    applyConsent(posthog, (event as CustomEvent<ConsentValue>).detail, { announce: true });
  });
}

// A no-op until the SDK has loaded (or forever, without a key).
export function trackCtaClick(ctaId: CtaId, properties: Record<string, string> = {}) {
  client?.capture("cta_click", { cta_id: ctaId, ...properties });
}
