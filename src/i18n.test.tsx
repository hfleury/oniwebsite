import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nProvider, useTranslation } from './i18n';

function TranslatedText({ tKey }: { tKey: string }) {
  const { t } = useTranslation();
  return <>{t(tKey)}</>;
}

afterEach(() => {
  delete window.__INITIAL_STATE__;
});

describe('i18n', () => {
  it("t() falls back to the raw key when a translation is missing", () => {
    window.__INITIAL_STATE__ = {};

    render(
      <I18nProvider>
        <TranslatedText tKey="missing_key" />
      </I18nProvider>
    );

    expect(screen.getByText('missing_key')).toBeInTheDocument();
  });

  it('useTranslation() throws when called outside an I18nProvider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<TranslatedText tKey="missing_key" />)).toThrow(
      'useTranslation must be used within an I18nProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});
