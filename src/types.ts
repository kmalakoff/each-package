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
  /** Maximum package.json levels below cwd. The library default is unlimited; the `ep` CLI defaults to 1. */
  depth?: number;
  /** Also enter dot-prefixed folders. `.git` is never entered. Default: false. */
  dot?: boolean;
  /** Folder names or globs to skip in addition to `node_modules`. */
  exclude?: string | string[];
  expanded?: boolean;
  failDependents?: boolean;
  /** @deprecated Replaces the skip list, so `node_modules` is no longer skipped. Use `exclude`. */
  ignore?: string;
  interactive?: boolean;
  private?: boolean;
  root?: boolean;
  silent?: boolean;
  streaming?: boolean;
  topological?: boolean;
}

export type EachCallback = (err?: EachError, results?: EachResult[]) => void;
