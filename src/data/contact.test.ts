import { describe, expect, it } from 'vitest';
import { GROWTH_CTA_EMAIL, buildGrowthMailto } from './contact';

describe('buildGrowthMailto', () => {
  it('targets the growth CTA address with an encoded subject', () => {
    expect(buildGrowthMailto({ subject: 'Start with an IT growth conversation' })).toBe(
      `mailto:${GROWTH_CTA_EMAIL}?subject=Start%20with%20an%20IT%20growth%20conversation`
    );
  });

  it('escapes & and ? so they cannot break the query', () => {
    const url = buildGrowthMailto({ subject: 'R&D?', body: 'a&b=c?d' });

    expect(url).toBe(`mailto:${GROWTH_CTA_EMAIL}?subject=R%26D%3F&body=a%26b%3Dc%3Fd`);
  });

  it('adds an encoded body when one is given', () => {
    const url = buildGrowthMailto({ subject: 'Hi', body: 'My email: a@b.co' });

    expect(url).toBe(`mailto:${GROWTH_CTA_EMAIL}?subject=Hi&body=My%20email%3A%20a%40b.co`);
  });

  it.each([undefined, ''])('omits the body when it is %j', (body) => {
    expect(buildGrowthMailto({ subject: 'Hi', body })).toBe(`mailto:${GROWTH_CTA_EMAIL}?subject=Hi`);
  });
});
