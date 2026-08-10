import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import Hero from './Hero';

afterEach(() => {
  delete window.__INITIAL_STATE__;
});

describe('Hero', () => {
  it('renders inside an I18nProvider', () => {
    window.__INITIAL_STATE__ = {};

    render(
      <I18nProvider>
        <Hero />
      </I18nProvider>
    );

    expect(screen.getByText('hero_cta_button')).toBeInTheDocument();
  });
});
