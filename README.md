## each-package

Run commands in each package folder starting with cwd skipping node_modules folders

```
# infinite depth
$ ep npm test

# top and second level only (--depth=1)
$ ep -d1 npm test

# one at a time (--concurrency=1)
$ ep -c1 npm test

# topological (--topological)
$ ep -t npm deploy
```
