import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import { openMailto } from '../data/contact';
import { trackCtaClick } from '../analytics';
import Hero from './Hero';

vi.mock('../data/contact', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../data/contact')>()),
  openMailto: vi.fn(),
}));
vi.mock('../analytics', () => ({ trackCtaClick: vi.fn() }));

function renderHero() {
  window.__INITIAL_STATE__ = {};
  render(
    <I18nProvider>
      <Hero />
    </I18nProvider>
  );
}

function submitWithEmail(email: string) {
  fireEvent.change(screen.getByPlaceholderText('hero_email_placeholder'), { target: { value: email } });
  const form = screen.getByRole('button', { name: 'hero_cta_button' }).closest('form');
  if (!form) throw new Error('hero CTA is not inside a form');
  fireEvent.submit(form);
}

afterEach(() => {
  cleanup();
  vi.mocked(openMailto).mockClear();
  vi.mocked(trackCtaClick).mockClear();
  delete window.__INITIAL_STATE__;
});

describe('Hero', () => {
  it('renders inside an I18nProvider', () => {
    renderHero();

    expect(screen.getByText('hero_cta_button')).toBeInTheDocument();
  });

  it('uses the localized image alt', () => {
    renderHero();

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'hero_image_alt');
  });

  it('opens the growth mailto with the typed email in the body', () => {
    renderHero();
    submitWithEmail('a@b.co');

    expect(openMailto).toHaveBeenCalledTimes(1);
    const url = vi.mocked(openMailto).mock.calls[0][0];
    expect(url).toContain('subject=cta_growth_title');
    expect(url).toContain('body=cta_growth_mailto_body%20a%40b.co');
  });

  it('tracks the submit as the hero_email CTA', () => {
    renderHero();
    submitWithEmail('a@b.co');

    expect(trackCtaClick).toHaveBeenCalledExactlyOnceWith('hero_email');
  });

  it('opens the growth mailto without a body when no email is typed', () => {
    renderHero();
    submitWithEmail('');

    expect(openMailto).toHaveBeenCalledTimes(1);
    const url = vi.mocked(openMailto).mock.calls[0][0];
    expect(url).toContain('subject=cta_growth_title');
    expect(url).not.toContain('body=');
  });
});
