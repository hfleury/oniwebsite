import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import { services } from '../data/services';
import ServiceDetail from './ServiceDetail';

const EXPECTED_IDS = [
  'cloud-devops',
  'ai-engineering',
  'legacy-modernization',
  'security-compliance',
  'enterprise-software',
  'staff-augmentation',
];

function keyPrefix(id: string) {
  return `services_${id.replaceAll('-', '_')}`;
}

function renderAt(path: string) {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter initialEntries={[path]}>
      <I18nProvider>
        <Routes>
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/" element={<p>home</p>} />
        </Routes>
      </I18nProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
});

describe('ServiceDetail', () => {
  it.each(EXPECTED_IDS)('renders the detail page for %s', (id) => {
    renderAt(`/services/${id}`);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(`${keyPrefix(id)}_title`);
    expect(screen.getByText(`${keyPrefix(id)}_description`)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('services_technologies_heading');

    const techs = screen.getAllByRole('listitem').map((li) => li.textContent);
    expect(techs).toEqual(services.find((s) => s.id === id)?.technologies);
  });

  it('redirects an unknown id to /', () => {
    renderAt('/services/does-not-exist');

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
