## each-package

Run commands in each package folder starting with cwd skipping node_modules folders

```
# top-level packages only, skipping nested test packages (default depth: 1)
$ ep npm test

# search deeper, including nested test packages
$ ep -d2 npm test

# one at a time (default concurrency: cpu)
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
