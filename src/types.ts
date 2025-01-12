import type { SpawnResult } from 'cross-spawn-cb';

export interface SpawnError extends Error {
  results?: SpawnResult[];
}
