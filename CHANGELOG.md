# Changelog

## [1.8.0] - 2026-11-18

### Added

- A global config file, `~/.config/each-package/config.json`, read on every `ep` run. Keys: `version` (must be `1`), `depth`, `private`, `dot` and `exclude`. `ep` never writes the file. When the file supplies a value that was not overridden on the command line, `ep` prints one line to stderr naming the file and the values (hidden by `--silent`). An invalid file stops `ep` with exit code 5 before anything runs.
- `--no-config` ignores the config file, for scripts and CI that must behave the same on every machine.
- `--dot` and `--no-dot`, and the config key `dot`, to enter dot-prefixed folders. They are skipped by default, as before. `.git` is always skipped and nothing can enable it.
- `-x, --exclude <list>` (repeatable) and the config key `exclude` skip folders by name or glob in addition to `node_modules`. Library options `dot` and `exclude` do the same.
- `--help` shows each option's default on this machine and whether it comes from the config file.

### Changed

- The help and README state the skip rules: `.git` always; dot-prefixed folders and `node_modules` by default.
- The library never reads the config file. Its default depth is still unlimited; the `ep` default is still 1.

### Deprecated

- `-i, --ignore` and the library option `ignore` will be removed in a future major. They keep working as before: the typed list replaces the whole skip list, so `node_modules` is no longer skipped and config `exclude` entries are not applied. Use `-x, --exclude`, which adds to the skip list. `ep` now prints one deprecation line to stderr when `-i` is used (hidden by `--silent`). Typing `-i` together with `-x` exits with code 5 before anything runs.

### Fixed

- `--fail-dependents` no longer swallows the next word on the command line.
- `-si` and `-fd` are removed from the help: they were parsed as `-s -i` and `-f -d` and never worked. `--silent` and `--fail-dependents` are the working spellings.
- A non-integer or non-positive `-d` (for example `-d abc`) exits with code 5. It previously walked with no depth limit.
- The help no longer lists `.git` as a default ignore.

## [1.7.2] - 2026-10-12

Dependency updates; no behaviour change.

## [1.7.1] - 2026-09-12

### Changed

- The README now shows how to install `ep`, states the Node.js requirement (>=0.8), and describes the default run, failure reporting and exit code, and the Promise and callback API.

## [1.7.0] - 2026-09-02

### Changed

- The `ep` command now searches only top-level packages by default (`-d, --depth` defaults to 1, previously unlimited). Pass `-d2` or higher to include nested packages, such as test fixtures, or a larger value to search deeper.
- The README and help describe the default concurrency as based on available CPUs and `-p` as including private packages.

## [1.6.3] - 2026-08-31

Dependency updates; no behaviour change.

## [1.6.2] - 2026-08-29

### Fixed

- `-d` counts correctly when the starting folder has its own `package.json`, and no longer fails on Node versions before 4.0.

## [1.6.1] - 2026-08-29

### Changed

- `-d, --depth` counts levels of `package.json` files below the starting folder, so folders without a `package.json` do not use up depth. `-d1` runs in top-level packages only and skips packages nested inside them.

## [1.6.0] - 2026-08-29

### Changed

- `-d, --depth` is now measured below the starting folder. The value that selected top-level and second-level packages in 1.5.x is now `-d2` (see 1.6.1 for the final counting rule).

## [1.5.7] - 2026-08-29

### Changed

- `ep` loads its scheduling and terminal-output code only after the arguments are parsed, so `--help`, `--version` and argument errors start faster and work on older Node versions.

## [1.5.6] - 2026-08-24

Dependency updates; no behaviour change.

## [1.5.5] - 2026-05-26

Dependency updates; no behaviour change.

## [1.5.4] - 2026-05-26

### Fixed

- `ep` no longer crashes when a run fails without producing per-package results; the failure count is reported correctly.
- The Promise API resolves with an empty array instead of `undefined` when there is nothing to run.

## [1.5.3] - 2026-01-08

### Changed

- The default concurrency is now based on the number of CPUs (between 8 and 64 at once) instead of unlimited. Pass `-c` to override it. The same limit applies while searching for packages.

### Fixed

- Startup errors from the `ep` command are written to stderr.

## [1.5.2] - 2025-12-27

### Changed

- The command header printed before a run now reads `<cwd>$ <command>` instead of `<cwd>> <command>`.

## [1.5.1] - 2025-12-27

### Changed

- The terminal UI is used only when stdout is a terminal and at least two packages will run. Otherwise `ep` prints a plain command header and streams output.
- Edge case: when no packages are found, `ep` returns an empty result.

## [1.5.0] - 2025-12-20

Dependency updates; no behaviour change.

## [1.4.12] - 2025-12-19

Dependency updates; no behaviour change.

## [1.4.11] - 2025-12-12

Dependency updates; no behaviour change.

## [1.4.10] - 2025-12-11

Dependency updates; no behaviour change.

## [1.4.9] - 2025-12-10

### Changed

- `spawn-term` is now a regular dependency installed with `each-package`. It is no longer downloaded on first use.

## [1.4.8] - 2025-12-09

Dependency updates; no behaviour change.

## [1.4.7] - 2025-12-09

### Added

- `-fd, --fail-dependents` (with `-t`) skips packages whose dependencies failed or were skipped. The library option is `failDependents`.

### Changed

- With `-t`, a package starts as soon as its own dependencies finish, instead of waiting for a whole dependency layer, and `-c` limits how many run at once.
- Packages in a dependency cycle are skipped, with a `Skipping cycle` message.

## [1.4.6] - 2025-12-07

### Changed

- When the terminal UI is not used, `ep` prints the command (`$ <command>`) before running it, unless `--silent`.

## [1.4.5] - 2025-12-05

Dependency updates; no behaviour change.

## [1.4.4] - 2025-12-04

Dependency updates; no behaviour change.

## [1.4.3] - 2025-12-04

Dependency updates; no behaviour change.

## [1.4.2] - 2025-12-02

Dependency updates; no behaviour change.

## [1.4.1] - 2025-12-02

### Added

- `-h, --help` prints usage and options. `-v, --version` prints the version.


## [1.4.0] - 2025-12-02

Dependency updates; no behaviour change.

## [1.3.8] - 2025-12-02

### Fixed

- `-I` works again as the short form of `--interactive`.
- The terminal session is used only when `interactive` is enabled, which the CLI does by default. Library callers no longer get an interactive session unless they ask for it.

## [1.3.7] - 2025-11-30

### Fixed

- Arguments containing spaces are quoted in the command header.

## [1.3.6] - 2025-11-29

### Changed

- Interactive mode is on by default for `ep`. The `-I` short form is removed in this version and returns in 1.3.8; use `--interactive`.

## [1.3.5] - 2025-11-29

Dependency updates; no behaviour change.

## [1.3.4] - 2025-11-29

### Added

- `-I, --interactive` and the library option `interactive` enable the interactive terminal session.

## [1.3.3] - 2025-11-29

### Changed

- `spawn-term` is installed on first use rather than at install time, and the terminal UI shows a header with the working folder and command plus a status bar.

## [1.3.2] - 2025-11-15

### Changed

- The duplicate-package message lists the paths of the packages that share a name: `Skipping duplicates: ["a/package.json", ...]`.

## [1.3.1] - 2025-11-08

### Added

- With `-t`, packages that share a name are skipped and reported with a `Skipping duplicate` message instead of failing the sort.

## [1.3.0] - 2025-10-24

### Added

- `-r, --root` and the library option `root` include the starting folder's own `package.json`. It is skipped by default, as before.

## [1.2.11] - 2025-10-21

### Fixed

- The TypeScript declarations are published as `dist/cjs/index.d.ts` and the `types` entry points to it.

## [1.2.10] - 2025-10-21

Dependency updates; no behaviour change.

## [1.2.9] - 2025-07-08

Dependency updates; no behaviour change.

## [1.2.8] - 2025-07-06

### Fixed

- A `package.json` that cannot be parsed no longer stops the run. `ep` prints `Failed to parse JSON for <path>` and continues with the other packages.

## [1.2.7] - 2025-07-02

Dependency updates; no behaviour change.

## [1.2.6] - 2025-07-02

Dependency updates; no behaviour change.

## [1.2.5] - 2025-07-02

Dependency updates; no behaviour change.

## [1.2.4] - 2025-07-02

Dependency updates; no behaviour change.

## [1.2.3] - 2025-07-02

### Changed

- Smaller install: the `--ignore` pattern matcher comes from a lighter dependency.

## [1.2.2] - 2025-06-30

Dependency updates; no behaviour change.

## [1.2.1] - 2025-06-30

### Fixed

- The README example for `--ignore` uses `--ignore` and lists `.git` in the default.

## [1.2.0] - 2025-06-30

### Added

- `-i, --ignore <list>` and the library option `ignore` replace the default skip list (`node_modules,.git`). Entries are comma-separated names or patterns.

### Changed

- Packages with no `name` are skipped.

## [1.1.1] - 2025-06-29

Dependency updates; no behaviour change.

## [1.1.0] - 2025-06-29

Dependency updates; no behaviour change.

## [1.0.4] - 2025-06-29

Dependency updates; no behaviour change.

## [1.0.3] - 2025-06-29

Dependency updates; no behaviour change.

## [1.0.2] - 2025-06-29

Dependency updates; no behaviour change.

## [1.0.1] - 2025-06-29

Dependency updates; no behaviour change.

## [1.0.0] - 2025-06-29

### Added

- `ep <command> [args]` runs a command in each package folder below the current directory, skipping `node_modules` and dot-prefixed folders.
- `-d, --depth`, `-c, --concurrency`, `-t, --topological` (dependency order), `-p, --private` (include private packages), `-e, --expanded`, `-s, --streaming` and `-si, --silent`.
- Exit code 5 when a package fails or the command is missing.
- A Promise and callback API from the package root (`each-package`).
