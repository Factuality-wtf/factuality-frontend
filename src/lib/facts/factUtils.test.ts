import { describe, expect, it } from 'vitest';
import { buildFactUrl, createFactSlug } from './factUtils';

describe('factUtils', () => {
  it('creates URL-safe slugs', () => {
    expect(createFactSlug('  Cats, Dogs & Mice!  ')).toBe('cats-dogs-mice');
  });

  it('builds canonical fact URLs', () => {
    const url = buildFactUrl({
      id: '42',
      body: 'Honey never spoils.',
      name: 'honey',
      created: '',
      modified: '',
      property: 'factually.wtf',
      url: '',
      social_sharing: {
        title: 'Honey',
        description: 'Honey never spoils.',
      },
    });

    expect(url).toBe('/facts/42/honey-never-spoils');
  });
});
