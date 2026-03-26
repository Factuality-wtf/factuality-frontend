import { httpClient } from '../api/httpClient';
import { Fact } from './factsTypes';

export class FactClient {
  async getFact(): Promise<Fact> {
    const data = await httpClient.get<Fact>('/fact/random');
    return this.parse(data);
  }

  async getFactById(id: string): Promise<Fact> {
    const data = await httpClient.get<Fact>(`/fact/${id}`);
    return this.parse(data);
  }

  private parse(data: unknown): Fact {
    if (typeof data === 'object' && data !== null && 'body' in data && 'id' in data) {
      return data as Fact;
    }

    throw new Error('Malformed upstream response');
  }
}
