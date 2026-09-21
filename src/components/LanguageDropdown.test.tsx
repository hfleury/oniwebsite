import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import LanguageDropdown from './LanguageDropdown';

function clearLanguageCookie() {
  document.cookie = 'lang=; Path=/; Max-Age=0';
}

beforeEach(() => {
  clearLanguageCookie();
});

afterEach(() => {
  delete window.__INITIAL_STATE__;
  clearLanguageCookie();
  vi.unstubAllGlobals();
});

describe('LanguageDropdown', () => {
  it('renders the default language in an I18nProvider', () => {
    window.__INITIAL_STATE__ = {};

    render(
      <I18nProvider>
        <LanguageDropdown />
      </I18nProvider>
    );

    // "English" appears twice: the trigger button and the (CSS-hidden, but
    // still mounted) dropdown option for the same language.
    expect(screen.getAllByText('English')).toHaveLength(2);
  });

  it.each([
    ['Português', 'pt', '/pt'],
    ['Svenska', 'sv', '/sv'],
    ['English', 'en', '/'],
  ])('choosing %s saves the lang cookie and navigates to %s', (label, code, path) => {
    window.__INITIAL_STATE__ = {};
    // Replace location so the click's navigation doesn't hit jsdom's "not implemented".
    vi.stubGlobal('location', { href: '/somewhere', protocol: 'http:' });

    render(
      <I18nProvider>
        <LanguageDropdown />
      </I18nProvider>
    );

    // The current language is also rendered on the trigger button; the option is the last match.
    const matches = screen.getAllByText(label);
    fireEvent.click(matches[matches.length - 1]);

    expect(document.cookie).toContain(`lang=${code}`);
    expect(window.location.href).toBe(path);
  });
});
