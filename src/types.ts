import type { SpawnOptions, SpawnResult } from 'cross-spawn-cb';

export interface EachResult {
  command: string;
  args: string[];
  path: string;
  version?: string;
  result?: SpawnResult;
  error?: Error;
}

export interface EachError extends Error {
  results?: EachResult[];
}

export interface EachOptions extends SpawnOptions {
  concurrency?: number;
  depth?: number;
  expanded?: boolean;
  failDependents?: boolean;
  ignore?: string;
  interactive?: boolean;
  private?: boolean;
  root?: boolean;
  silent?: boolean;
  streaming?: boolean;
  topological?: boolean;
}

export type EachCallback = (err?: EachError, results?: EachResult[]) => undefined;
