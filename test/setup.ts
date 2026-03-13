import { afterEach, vi } from 'vitest';

process.env.NEXT_PUBLIC_API_URL ??= 'https://api.example.test';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
