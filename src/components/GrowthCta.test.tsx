import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { I18nProvider } from '../i18n';
import { trackCtaClick } from '../analytics';
import GrowthCta from './GrowthCta';

vi.mock('../analytics', () => ({ trackCtaClick: vi.fn() }));

function renderGrowthCta() {
  window.__INITIAL_STATE__ = {};
  render(
    <I18nProvider>
      <GrowthCta serviceId="cloud-devops" />
    </I18nProvider>
  );
}

afterEach(() => {
  cleanup();
  vi.mocked(trackCtaClick).mockClear();
  delete window.__INITIAL_STATE__;
});

describe('GrowthCta', () => {
  it('links to the growth mailto', () => {
    renderGrowthCta();

    const href = screen.getByRole('link', { name: 'cta_growth_button' }).getAttribute('href');
    expect(href).toMatch(/^mailto:/);
    expect(href).toContain('subject=cta_growth_title');
  });

  it('tracks a click as the growth_mailto CTA with its service id', () => {
    renderGrowthCta();

    fireEvent.click(screen.getByRole('link', { name: 'cta_growth_button' }));

    expect(trackCtaClick).toHaveBeenCalledExactlyOnceWith('growth_mailto', { service_id: 'cloud-devops' });
  });
});
