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
export const caseStudies: CaseStudy[] = [
  {
    id: "cloud-cost-reduction",
    serviceId: "cloud-devops",
    titleKey: "case_studies_cloud_cost_reduction_title",
    summaryKey: "case_studies_cloud_cost_reduction_summary",
    contextKey: "case_studies_cloud_cost_reduction_context",
    problemKey: "case_studies_cloud_cost_reduction_problem",
    approachKey: "case_studies_cloud_cost_reduction_approach",
    resultKey: "case_studies_cloud_cost_reduction_result",
  },
  {
    id: "event-driven-marketplace",
    serviceId: "enterprise-software",
    titleKey: "case_studies_event_driven_marketplace_title",
    summaryKey: "case_studies_event_driven_marketplace_summary",
    contextKey: "case_studies_event_driven_marketplace_context",
    problemKey: "case_studies_event_driven_marketplace_problem",
    approachKey: "case_studies_event_driven_marketplace_approach",
    resultKey: "case_studies_event_driven_marketplace_result",
  },
];
