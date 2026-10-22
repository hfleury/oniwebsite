import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import Footer from './Footer';

function renderFooter() {
  window.__INITIAL_STATE__ = {};
  return render(
    <I18nProvider>
      <Footer />
    </I18nProvider>
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

  it.each([
    ['footer_legal_gdpr', '/privacy#gdpr'],
    ['footer_legal_privacy_policy', '/privacy'],
  ])('links %s to %s', (name, href) => {
    renderFooter();

    expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
  });

  it('has only the two Legal links and no placeholder links', () => {
    renderFooter();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).not.toHaveAttribute('href', '#'));
  });
});
