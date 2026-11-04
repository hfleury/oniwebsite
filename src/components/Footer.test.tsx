import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../i18n';
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

  it('has only the two Legal links and no placeholder links', () => {
    renderFooter();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).not.toHaveAttribute('href', '#'));
  });
});
