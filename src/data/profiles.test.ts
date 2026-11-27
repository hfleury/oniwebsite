import { describe, expect, it } from 'vitest';
import { profiles } from './profiles';

describe('profiles', () => {
  it('lists at least one profile', () => {
    expect(profiles.length).toBeGreaterThan(0);
  });

  it.each(profiles)('$name links to an https URL', ({ url }) => {
    expect(new URL(url).protocol).toBe('https:');
  });

  it('has unique names', () => {
    const names = profiles.map((profile) => profile.name);

    expect(new Set(names).size).toBe(names.length);
  });
});
