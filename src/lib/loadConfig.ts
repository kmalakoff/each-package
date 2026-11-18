import fs from 'fs';
import path from 'path';
import removeBOM from 'remove-bom-buffer';
import { homedir } from '../compat.ts';
import { CONFIG_DIR, CONFIG_FILE, CONFIG_KEYS, CONFIG_VERSION } from '../constants.ts';

export interface ConfigValues {
  depth?: number;
  private?: boolean;
  dot?: boolean;
  exclude?: string[];
}

export interface ConfigResult {
  path: string;
  values: ConfigValues;
  error?: Error;
}

function validate(value: unknown): ConfigValues | string {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return 'must contain a JSON object';
  const config = value as Record<string, unknown>;
  for (const key in config) {
    if (CONFIG_KEYS.indexOf(key) < 0) return `unknown key "${key}" (allowed: ${CONFIG_KEYS.join(', ')})`;
  }
  if (config.version !== CONFIG_VERSION) return `"version" must be ${CONFIG_VERSION}`;
  const values: ConfigValues = {};
  if (config.depth !== undefined) {
    const depth = config.depth;
    if (typeof depth !== 'number' || !(depth >= 1) || depth % 1 !== 0) return '"depth" must be an integer of 1 or more';
    values.depth = depth;
  }
  if (config.private !== undefined) {
    if (typeof config.private !== 'boolean') return '"private" must be true or false';
    values.private = config.private;
  }
  if (config.dot !== undefined) {
    if (typeof config.dot !== 'boolean') return '"dot" must be true or false';
    values.dot = config.dot;
  }
  if (config.exclude !== undefined) {
    const exclude = config.exclude;
    if (!Array.isArray(exclude)) return '"exclude" must be an array of strings';
    for (let i = 0; i < exclude.length; i++) {
      if (typeof exclude[i] !== 'string' || exclude[i] === '' || exclude[i].indexOf(',') >= 0) return '"exclude" entries must be non-empty strings without commas';
    }
    values.exclude = exclude;
  }
  return values;
}

// Reads ~/.config/each-package/config.json. A missing file is not an error; it never prints or exits.
export default function loadConfig(home?: string): ConfigResult {
  const configPath = path.join(home === undefined ? homedir() : home, '.config', CONFIG_DIR, CONFIG_FILE);
  const fail = (problem: string): ConfigResult => ({ path: configPath, values: {}, error: new Error(`${configPath}: ${problem}`) });

  let text: Buffer;
  try {
    text = fs.readFileSync(configPath);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOENT' || code === 'ENOTDIR') return { path: configPath, values: {} };
    return fail((err as Error).message);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(removeBOM(text).toString());
  } catch (err) {
    return fail(`invalid JSON: ${(err as Error).message}`);
  }
  const result = validate(parsed);
  if (typeof result === 'string') return fail(result);
  return { path: configPath, values: result };
}
