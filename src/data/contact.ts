export const GROWTH_CTA_EMAIL = 'oniweb@oniweb.com.br';

interface GrowthMailto {
  subject: string;
  body?: string;
}

// encodeURIComponent rather than URLSearchParams: the latter encodes spaces as "+",
// which mail clients show literally in the subject/body.
export function buildGrowthMailto({ subject, body }: GrowthMailto): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) {
    params.push(`body=${encodeURIComponent(body)}`);
  }
  return `mailto:${GROWTH_CTA_EMAIL}?${params.join('&')}`;
}

export function openMailto(url: string): void {
  window.location.href = url;
}
