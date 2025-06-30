## each-package

Run commands in each package folder starting with cwd skipping node_modules folders

```
# infinite depth
$ ep npm test

# top and second level only (default depth: Infinity)
$ ep -d1 npm test

# one at a time (default depth: concurrency)
$ ep -c1 npm test

# topological (default topological: false)
$ ep -t npm deploy

# one at a time (default private: false)
$ ep -p npm test

# custom ignore - default is node_modules,.git
$ ep --ignore=node_modules,.git,.yarn,my-symlink-cycle npm test
```
