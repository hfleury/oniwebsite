import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';

// Tests run with NODE_ENV=test, where styled-components already writes text
// rules. Force production-style CSSOM injection ("speedy") so the tests
// exercise the code path that throws error #17 in production.
beforeEach(() => {
  vi.stubEnv('SC_DISABLE_SPEEDY', 'false');
  vi.resetModules();
  document.head.querySelectorAll('style[data-styled]').forEach((el) => el.remove());
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

async function renderStyled(withStyleRoot: boolean) {
  const { default: styled } = await import('styled-components');
  const { default: StyleRoot } = await import('./StyleRoot');
  const Box = styled.div`
    color: rgb(1, 2, 3);
  `;
  render(withStyleRoot ? <StyleRoot><Box /></StyleRoot> : <Box />);
  return document.head.querySelector('style[data-styled]')?.textContent ?? '';
}

describe('StyleRoot', () => {
  it('reproduces production: without it, rules go through the CSSOM, not the tag text', async () => {
    expect(await renderStyled(false)).not.toContain('rgb(1, 2, 3)');
  });

  it('writes rules as text into the <style> tag, so no CSSStyleSheet is needed', async () => {
    expect(await renderStyled(true)).toContain('rgb(1, 2, 3)');
  });
});
