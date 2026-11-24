import type { ErrorEvent } from '@sentry/react';

// Headless browsers and scrapers render the site with incomplete DOM/CSSOM
// support, which throws errors no real visitor can hit (e.g. styled-components
// error #17, ONIWEB-FRONTEND-1, from the Obscura headless browser). Their
// events are noise, so they are dropped before reaching Sentry.

const BOT_FRAME_PATTERN = /obscura/i;
const BOT_USER_AGENT_PATTERN = /HeadlessChrome|PhantomJS/i;

function hasBotFrame(event: ErrorEvent): boolean {
  return (event.exception?.values ?? []).some((exception) =>
    (exception.stacktrace?.frames ?? []).some((frame) =>
      BOT_FRAME_PATTERN.test(`${frame.filename ?? ''} ${frame.abs_path ?? ''}`),
    ),
  );
}

export function isBotEvent(event: ErrorEvent, userAgent: string): boolean {
  return BOT_USER_AGENT_PATTERN.test(userAgent) || hasBotFrame(event);
}

export function dropBotEvents(event: ErrorEvent): ErrorEvent | null {
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  return isBotEvent(event, userAgent) ? null : event;
}
