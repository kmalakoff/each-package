import getopts from 'getopts-compat';
import type { ConfigResult, ConfigValues } from './loadConfig.ts';
import toList from './toList.ts';

const ALIAS = { depth: 'd', concurrency: 'c', topological: 't', failDependents: ['fail-dependents'], expanded: 'e', streaming: 's', private: 'p', exclude: 'x', ignore: 'i', root: 'r', interactive: 'I', version: 'v', help: 'h' };
const BOOLEAN = ['topological', 'failDependents', 'expanded', 'streaming', 'silent', 'private', 'dot', 'config', 'root', 'interactive', 'version', 'help'];

export type Parsed = Record<string, unknown> & { _: string[] };

export function parse(argv: string[], defaults: Record<string, unknown>): Parsed {
  return getopts(argv, { alias: ALIAS, boolean: BOOLEAN, default: defaults, stopEarly: true }) as Parsed;
}

function describeValue(key: string, values: ConfigValues): string {
  if (key === 'depth') return `depth ${values.depth}`;
  if (key === 'exclude') return `exclude ${(values.exclude || []).join(',')}`;
  return values[key as 'private' | 'dot'] ? key : `no ${key}`;
}

export function describeKeys(keys: string[], values: ConfigValues): string {
  return keys.map((key) => describeValue(key, values)).join(', ');
}

export type ResolvedOptions = { error: string } | { options: Parsed; warnings: string[] };

// Pure: merges flags, config values and defaults. The caller prints, exits and reads files.
export default function resolveOptions(argv: string[], name: string, config: ConfigResult, defaults: Record<string, unknown>): ResolvedOptions {
  // booleans cannot be told from absent in one parse, so two parses with opposite defaults find the typed ones
  const typedOn = parse(argv, { config: true, private: true, dot: true });
  const typedOff = parse(argv, { config: true, private: false, dot: false });
  const isTyped = (key: string): boolean => (key === 'depth' ? typedOn.depth !== undefined : typedOn[key] === typedOff[key]);

  if (config.error) return { error: `${name}: ${config.error.message}` };

  const { exclude: configExclude, ...configScalars } = config.values;
  const options = parse(argv, { ...defaults, ...configScalars });
  if (typeof options.depth !== 'number' || !(options.depth >= 1) || options.depth % 1 !== 0) return { error: `${name}: --depth must be an integer of 1 or more` };

  // a flag followed by another flag has no value; stop rather than run with an empty skip list
  if (typedOn.ignore === true || typedOn.exclude === true) return { error: `${name}: ${typedOn.ignore === true ? '-i/--ignore' : '-x/--exclude'} needs a value` };
  const ignoreTyped = typedOn.ignore !== undefined;
  const excludeTyped = typedOn.exclude !== undefined;
  if (ignoreTyped && excludeTyped) {
    return { error: `${name}: -i/--ignore and -x/--exclude cannot be combined; use --exclude only (-i is deprecated and replaces the skip list, so -i also stopped skipping node_modules)` };
  }
  // a typed -i is the whole skip list, so config exclude entries are not in effect
  options.exclude = ignoreTyped ? [] : toList(configExclude).concat(toList(typedOn.exclude));

  const warnings: string[] = [];
  if (!options.silent) {
    if (ignoreTyped) warnings.push(`${name}: -i/--ignore is deprecated and will be removed in a future major release; use -x/--exclude, which adds to the skip list instead of replacing it (-i also stops skipping node_modules)`);
    const shown: string[] = [];
    if (config.values.depth !== undefined && !isTyped('depth')) shown.push('depth');
    if (config.values.private !== undefined && !isTyped('private')) shown.push('private');
    if (config.values.dot !== undefined && !isTyped('dot')) shown.push('dot');
    if (configExclude && configExclude.length && !ignoreTyped) shown.push('exclude');
    if (shown.length) warnings.push(`${name}: config ${config.path}: ${describeKeys(shown, config.values)}`);
  }
  return { options, warnings };
}
