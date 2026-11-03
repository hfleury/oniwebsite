import type { CaseStudy } from './caseStudies';

function fixtureEntry(id: string, serviceId: string): CaseStudy {
  const prefix = `case_studies_${id.replaceAll('-', '_')}`;
  return {
    id,
    serviceId,
    titleKey: `${prefix}_title`,
    summaryKey: `${prefix}_summary`,
    contextKey: `${prefix}_context`,
    problemKey: `${prefix}_problem`,
    approachKey: `${prefix}_approach`,
    resultKey: `${prefix}_result`,
  };
}

// Two entries for tests that mock data/caseStudies (the real registry ships empty).
export const FIXTURE_CASE_STUDIES: CaseStudy[] = [
  fixtureEntry('fixture-cloud-savings', 'cloud-devops'),
  fixtureEntry('fixture-ai-rollout', 'ai-engineering'),
];
