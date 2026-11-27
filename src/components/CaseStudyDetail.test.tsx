import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '../i18n';
import { services } from '../data/services';
import { FIXTURE_CASE_STUDIES } from '../data/caseStudies.fixture';
import CaseStudyDetail from './CaseStudyDetail';

vi.mock('../analytics', () => ({ trackCtaClick: vi.fn() }));
vi.mock('../data/caseStudies', async () => {
  const { FIXTURE_CASE_STUDIES } = await import('../data/caseStudies.fixture');
  return { caseStudies: FIXTURE_CASE_STUDIES };
});

function renderAt(path: string) {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter initialEntries={[path]}>
      <I18nProvider>
        <Routes>
          <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
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

describe('CaseStudyDetail', () => {
  it.each(FIXTURE_CASE_STUDIES.map((cs) => [cs.id, cs] as const))(
    'renders context → problem → approach → result for %s',
    (_id, cs) => {
      renderAt(`/case-studies/${cs.id}`);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(cs.titleKey);

      const sectionTitles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
      expect(sectionTitles).toEqual([
        'case_studies_label_context',
        'case_studies_label_problem',
        'case_studies_label_approach',
        'case_studies_label_result',
        'case_studies_label_related_service',
        'cta_growth_title',
      ]);

      const texts = [cs.contextKey, cs.problemKey, cs.approachKey, cs.resultKey].map((key) =>
        screen.getByText(key)
      );
      texts.slice(1).forEach((text, i) => {
        expect(texts[i].compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      });

      const service = services.find((s) => s.id === cs.serviceId)!;
      expect(screen.getByRole('link', { name: service.titleKey })).toHaveAttribute(
        'href',
        `/services/${cs.serviceId}`
      );

      const cta = screen.getByRole('link', { name: 'cta_growth_button' });
      const backLink = screen.getByRole('link', { name: 'services_back_to_home' });
      expect(backLink).toHaveAttribute('href', '/');
      expect(cta.compareDocumentPosition(backLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  );

  it('redirects an unknown id to /', () => {
    renderAt('/case-studies/does-not-exist');

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
