import { describe, expect, it } from 'vitest';
import { caseStudies } from './caseStudies';
import { services } from './services';

// Guards the real registry as content tickets add entries.
describe('caseStudies registry', () => {
  it('has unique kebab-case ids', () => {
    const ids = caseStudies.map((cs) => cs.id);
    expect(new Set(ids).size).toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it.each(caseStudies.map((cs) => [cs.id, cs] as const))('%s links to an existing service', (_id, cs) => {
    expect(services.map((s) => s.id)).toContain(cs.serviceId);
  });

  it.each(caseStudies.map((cs) => [cs.id, cs] as const))('%s uses its own key prefix', (_id, cs) => {
    const prefix = `case_studies_${cs.id.replaceAll('-', '_')}_`;
    [cs.titleKey, cs.summaryKey, cs.contextKey, cs.problemKey, cs.approachKey, cs.resultKey].forEach(
      (key) => expect(key.startsWith(prefix)).toBe(true)
    );
  });
});
