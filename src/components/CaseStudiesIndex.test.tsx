import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import type { CaseStudy } from '../data/caseStudies';
import { FIXTURE_CASE_STUDIES } from '../data/caseStudies.fixture';
import CaseStudiesIndex from './CaseStudiesIndex';

const registry = vi.hoisted(() => ({ list: [] as CaseStudy[] }));

vi.mock('../analytics', () => ({ trackCtaClick: vi.fn() }));
vi.mock('../data/caseStudies', () => ({
  get caseStudies() {
    return registry.list;
  },
}));

function renderIndex() {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter>
      <I18nProvider>
        <CaseStudiesIndex />
      </I18nProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
  registry.list = [];
});

describe('CaseStudiesIndex', () => {
  it('shows the empty-state line while no case study is published', () => {
    renderIndex();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('case_studies_heading');
    expect(screen.getByText('case_studies_intro')).toBeInTheDocument();
    expect(screen.getByText('case_studies_empty')).toBeInTheDocument();
    expect(screen.queryAllByRole('link', { name: 'case_studies_read_more' })).toHaveLength(0);
    expect(screen.getByRole('link', { name: 'services_back_to_home' })).toHaveAttribute('href', '/');
  });

  it('lists every case study in registry order', () => {
    registry.list = FIXTURE_CASE_STUDIES;
    renderIndex();

    expect(screen.queryByText('case_studies_empty')).not.toBeInTheDocument();
    const hrefs = screen
      .getAllByRole('link', { name: 'case_studies_read_more' })
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(FIXTURE_CASE_STUDIES.map((cs) => `/case-studies/${cs.id}`));
  });
});
