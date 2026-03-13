import { describe, expect, it, vi } from 'vitest';
import { httpClient } from '../api/httpClient';
import { FactClient } from './factClient';
import type { Fact } from './factsTypes';

const FACT: Fact = {
  id: '123',
  body: 'A group of flamingos is called a flamboyance.',
  name: 'Flamingo fact',
  created: '',
  modified: '',
  property: 'factually.wtf',
  url: '',
  social_sharing: {
    title: 'Flamingo fact',
    description: 'A group of flamingos is called a flamboyance.',
  },
};

describe('FactClient', () => {
  it('fetches and parses a random fact', async () => {
    vi.spyOn(httpClient, 'get').mockResolvedValue(FACT);
    const client = new FactClient();

    await expect(client.getFact()).resolves.toEqual(FACT);
    expect(httpClient.get).toHaveBeenCalledWith('/fact/random');
  });

  it('fetches and parses a fact by id', async () => {
    vi.spyOn(httpClient, 'get').mockResolvedValue(FACT);
    const client = new FactClient();

    await expect(client.getFactById('123')).resolves.toEqual(FACT);
    expect(httpClient.get).toHaveBeenCalledWith('/fact/123');
  });

  it('throws when upstream payload is malformed', async () => {
    vi.spyOn(httpClient, 'get').mockResolvedValue({ nope: true } as never);
    const client = new FactClient();

    await expect(client.getFact()).rejects.toThrow('Malformed upstream response');
  });
});
