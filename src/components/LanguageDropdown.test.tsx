import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import LanguageDropdown from './LanguageDropdown';

afterEach(() => {
  delete window.__INITIAL_STATE__;
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
});
