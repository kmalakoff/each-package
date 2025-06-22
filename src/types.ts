import type { SpawnOptions, SpawnResult } from 'cross-spawn-cb';

export interface EachResult {
  command: string;
  args: string[];
  path: string;
  version: string;
  result?: SpawnResult;
  error?: Error;
}

export interface EachError extends Error {
  results?: EachResult[];
}

export interface EachOptions extends SpawnOptions {
  concurrency?: number;
  streaming?: boolean;
  expanded?: boolean;
  depth?: number;
  private?: boolean;
  topological?: boolean;
  silent?: boolean;
}

export type EachCallback = (err?: EachError, results?: EachResult[]) => undefined;
