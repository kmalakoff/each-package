# Windows Node 0.8/0.10 & Node 24.11.0 Failure Analysis

## Current Status

### Fixed
✅ **cross-spawn-cb@2.4.6** now includes the fallback fix:
```typescript
command = env.NODE || env.npm_node_execpath || command;
```

✅ **Local testing confirms** the fix works on Node 22.21.0 (Linux)

### Still Failing (Windows CI)
- ❌ Node 0.8.28
- ❌ Node 0.10.48
- ❌ Node 24.11.0 (NEW)

## The Original Issue & Fix

**Problem:** In `cross-spawn-cb` for Node ≤7, when `NODE` and `npm_node_execpath` environment variables were undefined, the command variable became `undefined`, causing spawn to fail.

**Fix:** Added `|| command` fallback to preserve original command when env vars are missing.

## Why Tests Might Still Be Failing

### Hypothesis 1: Windows-Specific Path Resolution
The fix handles missing env vars, but Windows Node 0.8/0.10 might have issues with:
- Path normalization (forward/back slashes)
- `.exe` extension resolution
- Command resolution in PATH

### Hypothesis 2: Node 24.11.0 New Failure
This is a NEW failure that wasn't happening before. Possible causes:
1. **Dependency conflicts** - Something in the dependency tree changed
2. **Test setup issue** - CI environment problem for Node 24
3. **Different failure mode** - Unrelated to the cross-spawn-cb fix

### Hypothesis 3: Missing Logs = Early Failure
If no logs are visible, the test process might be failing before producing output:
- `tsds` command failing to start
- Build artifacts missing
- Node binary not found in PATH

## Required Diagnostics

### On Windows with Node 0.8.28/0.10.48:

1. **Verify cross-spawn-cb version:**
```bash
npm ls cross-spawn-cb
# Should show 2.4.6
```

2. **Check environment:**
```bash
node test-node-spawn.cjs
```

3. **Run tests with verbose output:**
```bash
npm test -- --reporter spec
```

4. **Check if tsds is available:**
```bash
which tsds
tsds --version
```

### On Windows with Node 24.11.0:

1. **Compare with Node 22:**
```bash
# If Node 22 passes but 24 fails, there's a Node 24-specific issue
```

2. **Check module resolution:**
```bash
node --version
node -e "console.log(require.resolve('cross-spawn-cb'))"
```

3. **Test cross-spawn-cb directly:**
```bash
node test-node-spawn.cjs
```

## Next Steps

1. **Get actual error logs** - Need to see what error is occurring
   - Check Windows CI runner for log files
   - Add `set -x` or verbose flags to CI scripts
   - Capture stderr separately

2. **Test locally on Windows** (if possible)
   ```bash
   # Install Node 0.8.28 via nvu
   nvu use 0.8.28 "npm test"

   # Install Node 24.11.0
   nvu use 24.11.0 "npm test"
   ```

3. **Check GitHub Actions workflow:**
   - Verify Node installation step
   - Check PATH configuration
   - Verify build artifacts exist before tests

## Diagnostic Script

Run `test-node-spawn.cjs` on failing CI environments to capture:
- Node version and platform
- Environment variables
- Exact spawn error
- Stack trace

## Potential Additional Fixes

If the current fix isn't sufficient, we may need to:

1. **Add Windows-specific command resolution:**
```typescript
if (isWindows && NODES.includes(basename)) {
  // Ensure .exe extension
  if (!command.endsWith('.exe')) {
    command = command + '.exe';
  }
}
```

2. **Add PATH resolution:**
```typescript
const which = require('which');
command = which.sync(command, { nothrow: true }) || command;
```

3. **Debug the bundled cross-spawn.cjs:**
   - Check if the bundled version has the same fix
   - Verify it's being used for Node ≤7

## Test Coverage Needed

Once we identify the issue, add tests for:
- Windows path resolution
- Missing env vars on Windows
- Node 24.11.0 specific behavior
- Both sync and async spawn methods

---

**Bottom Line:** We need actual error logs to proceed. The fix is in place, but something else may be failing on Windows or with Node 24.11.0.
