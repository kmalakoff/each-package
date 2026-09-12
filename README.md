## each-package

Run commands in each package folder starting with cwd skipping node_modules folders

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

# custom ignore - default is node_modules,.git
$ ep --ignore=node_modules,.git,.yarn,my-symlink-cycle npm test
```

The default run processes discovered packages concurrently. Each package command runs in that package's directory. A package failure is reported with the other results, and `ep` exits nonzero when any package fails. Use `-t` for dependency order and `-fd` to skip dependents after a failed dependency.

The package also exports a Promise and callback API for callers that need programmatic control. See the [API documentation](https://kmalakoff.github.io/each-package/).
