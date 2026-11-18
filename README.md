## each-package

Run commands in each package folder starting with cwd, skipping `node_modules`, dot-prefixed folders and `.git`

```bash
npm install --global each-package
```

Requires Node.js >=0.8. The command is installed as `ep`.

```
# top-level packages only, skipping nested test packages (default depth: 1)
$ ep npm test

# search deeper, including nested test packages
$ ep -d2 npm test

# one at a time (default concurrency is based on available CPUs)
$ ep -c1 npm test

# topological (default topological: false)
$ ep -t npm deploy

# include private packages (default private: false)
$ ep -p npm test

# include the root package.json if it exists (default root: false)
$ ep -r npm test

# skip more folders by name or glob (adds to node_modules)
$ ep -x vendor,archive npm test

# also enter dot-prefixed folders such as .worktrees (.git is always skipped)
$ ep --dot npm test
```

The default run processes discovered packages concurrently. Each package command runs in that package's directory. A package failure is reported with the other results, and `ep` exits nonzero when any package fails. Use `-t` for dependency order and `--fail-dependents` to skip dependents after a failed dependency.

### Which folders are searched

`.git` is always skipped. By default `ep` also skips dot-prefixed folders and `node_modules`. `--dot` enters dot-prefixed folders, and `-x, --exclude` adds names or globs to skip. A name also skips folders that start with it, so `-x vendor` skips `vendor-old`.

Depth counts `package.json` levels below the current folder, not folders. The `ep` default is 1; the library default is unlimited.

### Config file

Create `~/.config/each-package/config.json` to set defaults for every `ep` run on a machine. `ep` never writes this file.

```json
{
  "version": 1,
  "depth": 2,
  "private": true,
  "dot": false,
  "exclude": ["vendor", "archive"]
}
```

All keys except `version` (which must be `1`) are optional. A typed flag beats the file (`-d 3`, `--no-private`, `--dot`/`--no-dot`), and the file beats the built-in defaults. `-x` adds to the file's `exclude`. An unknown key or an invalid file stops `ep` with exit code 5 before anything runs.

When the file supplies a value, `ep` prints one line to stderr, for example `ep: config /home/you/.config/each-package/config.json: private, exclude vendor,archive`. `--silent` hides it.

Scripts and CI that must behave the same on every machine should pass `--no-config`.

### Migrating from `-i`

`-i, --ignore` is deprecated and will be removed in a future major. It replaces the whole skip list, so `ep -i vendor npm test` also stops skipping `node_modules`. Use `-x vendor` instead, which adds to the list. `-i` and `-x` cannot be combined. `ep` prints one deprecation line to stderr when `-i` is used (`--silent` hides it).

## Library

The package also exports a Promise and callback API for callers that need programmatic control. It accepts `dot` and `exclude` options and never reads the config file. See the [API documentation](https://kmalakoff.github.io/each-package/).
