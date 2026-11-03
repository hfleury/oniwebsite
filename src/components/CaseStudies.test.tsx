import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import { trackCtaClick } from '../analytics';
import type { CaseStudy } from '../data/caseStudies';
import { FIXTURE_CASE_STUDIES } from '../data/caseStudies.fixture';
import CaseStudies from './CaseStudies';

const registry = vi.hoisted(() => ({ list: [] as CaseStudy[] }));

vi.mock('../analytics', () => ({ trackCtaClick: vi.fn() }));
vi.mock('../data/caseStudies', () => ({
  get caseStudies() {
    return registry.list;
  },
}));

function renderTeaser() {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter>
      <I18nProvider>
        <CaseStudies />
      </I18nProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
  registry.list = [];
  vi.mocked(trackCtaClick).mockClear();
});

describe('CaseStudies', () => {
  it('renders nothing while no case study is published', () => {
    const { container } = renderTeaser();

    expect(container).toBeEmptyDOMElement();
  });

  it('lists every case study in registry order, plus a link to the index', () => {
    registry.list = FIXTURE_CASE_STUDIES;
    renderTeaser();

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('case_studies_heading');
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(FIXTURE_CASE_STUDIES.map((cs) => cs.titleKey));

    const hrefs = screen
      .getAllByRole('link', { name: 'case_studies_read_more' })
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(FIXTURE_CASE_STUDIES.map((cs) => `/case-studies/${cs.id}`));

    expect(screen.getByRole('link', { name: 'case_studies_view_all' })).toHaveAttribute(
      'href',
      '/case-studies'
    );
  });

  it('tracks a Read more click with its case study id', () => {
    registry.list = FIXTURE_CASE_STUDIES;
    renderTeaser();

    fireEvent.click(screen.getAllByRole('link', { name: 'case_studies_read_more' })[1]);

    expect(trackCtaClick).toHaveBeenCalledExactlyOnceWith('case_studies_read_more', {
      case_study_id: FIXTURE_CASE_STUDIES[1].id,
    });
  });
});
