import { describe, expect, it } from 'vitest';
import type { ErrorEvent } from '@sentry/react';
import { dropBotEvents, isBotEvent } from './sentryFilter';

const CHROME_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36';

function eventWithFrames(filenames: string[]): ErrorEvent {
  return {
    type: undefined,
    exception: {
      values: [
        {
          type: 'Error',
          value: 'boom',
          stacktrace: { frames: filenames.map((filename) => ({ filename })) },
        },
      ],
    },
  };
}

describe('isBotEvent', () => {
  it('flags events with an Obscura headless-browser frame', () => {
    const event = eventWithFrames(['<obscura:bootstrap>', '/assets/index-Cm5LnzOS.js']);
    expect(isBotEvent(event, CHROME_UA)).toBe(true);
  });

  it('flags HeadlessChrome user agents', () => {
    const event = eventWithFrames(['/assets/index.js']);
    expect(isBotEvent(event, 'Mozilla/5.0 HeadlessChrome/145.0.0.0 Safari/537.36')).toBe(true);
  });

  it('keeps real-browser events', () => {
    const event = eventWithFrames(['/assets/index.js']);
    expect(isBotEvent(event, CHROME_UA)).toBe(false);
  });

  it('keeps events without an exception', () => {
    expect(isBotEvent({ type: undefined, message: 'hi' }, CHROME_UA)).toBe(false);
  });
});

describe('dropBotEvents', () => {
  it('returns null for bot events and the event otherwise', () => {
    const bot = eventWithFrames(['<obscura:bootstrap>']);
    const real = eventWithFrames(['/assets/index.js']);
    expect(dropBotEvents(bot)).toBeNull();
    expect(dropBotEvents(real)).toBe(real);
  });
});
