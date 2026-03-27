import { afterEach, vi } from 'vitest';

process.env.API_URL ??= 'https://api.example.test';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
