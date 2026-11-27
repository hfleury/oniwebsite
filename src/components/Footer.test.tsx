import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import { profiles } from '../data/profiles';
import Footer from './Footer';

// basename mirrors main.tsx's BrowserRouter: '' for EN, '/pt' or '/sv' otherwise.
function renderFooter(basename = '') {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter basename={basename || undefined} initialEntries={[`${basename}/`]}>
      <I18nProvider>
        <Footer />
      </I18nProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
});

describe('Footer', () => {
  it('shows Oni branding and no template copy', () => {
    renderFooter();

    expect(screen.getAllByText('Oni Web Officer')).toHaveLength(2);
    expect(screen.queryByText(/Treact/)).not.toBeInTheDocument();
  });

  it('renders the translated tagline and Legal heading', () => {
    renderFooter();

    expect(screen.getByText('footer_description')).toBeInTheDocument();
    expect(screen.getByText('footer_legal_heading')).toBeInTheDocument();
  });

  it('renders the copyright with the current year', () => {
    renderFooter();

    expect(
      screen.getByText(`© ${new Date().getFullYear()} Oni Web Officer. footer_copyright`)
    ).toBeInTheDocument();
  });

  it.each(['', '/pt', '/sv'])('keeps the Legal links in the %s locale', (basename) => {
    renderFooter(basename);

    expect(screen.getByRole('link', { name: 'footer_legal_gdpr' })).toHaveAttribute(
      'href',
      `${basename}/privacy#gdpr`
    );
    expect(screen.getByRole('link', { name: 'footer_legal_privacy_policy' })).toHaveAttribute(
      'href',
      `${basename}/privacy`
    );
  });

  it.each(['', '/pt', '/sv'])('links each profile in a new tab in the %s locale', (basename) => {
    renderFooter(basename);

    expect(screen.getByText('footer_follow_heading')).toBeInTheDocument();
    profiles.forEach(({ name, url }) => {
      // jsdom drops the space before the sr-only hint; browsers keep it.
      const link = screen.getByRole('link', {
        name: (accessibleName) =>
          accessibleName.startsWith(name) && accessibleName.endsWith('footer_opens_new_tab'),
      });
      expect(link).toHaveAttribute('href', url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')?.split(' ')).toEqual(
        expect.arrayContaining(['noopener', 'noreferrer'])
      );
    });
  });

  it('has only the Legal and profile links and no placeholder links', () => {
    renderFooter();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2 + profiles.length);
    links.forEach((link) => expect(link).not.toHaveAttribute('href', '#'));
  });
});
