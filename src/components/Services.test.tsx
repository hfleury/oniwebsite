import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import Services from './Services';

// Design order, hardcoded so a reorder or dropped entry in data/services.tsx fails here.
const EXPECTED_IDS = [
  'cloud-devops',
  'ai-engineering',
  'legacy-modernization',
  'security-compliance',
  'enterprise-software',
  'staff-augmentation',
];

function titleKey(id: string) {
  return `services_${id.replaceAll('-', '_')}_title`;
}

function renderServices() {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter>
      <I18nProvider>
        <Services />
      </I18nProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
});

describe('Services', () => {
  it('renders the six cards in design order, each linking to its detail page', () => {
    renderServices();

    const titles = screen.getAllByRole('heading', { level: 4 }).map((h) => h.textContent);
    expect(titles).toEqual(EXPECTED_IDS.map(titleKey));

    const hrefs = screen
      .getAllByRole('link', { name: 'services_learn_more' })
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(EXPECTED_IDS.map((id) => `/services/${id}`));
  });
});
