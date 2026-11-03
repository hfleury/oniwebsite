export interface CaseStudy {
  id: string;
  serviceId: string;
  titleKey: string;
  summaryKey: string;
  contextKey: string;
  problemKey: string;
  approachKey: string;
  resultKey: string;
}

// Every entry here is published: the home teaser and /case-studies list them
// all. Each id also needs case_studies_<id>_meta_title/_meta_description in
// oniwebsite_bk's locales (and in its caseStudyIDs test var), or its page 404s.
export const caseStudies: CaseStudy[] = [];
