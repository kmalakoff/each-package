# Windows Node 0.8/0.10 Fix - PassThrough Stream Approach

## Status
✅ **Implemented and tested locally on Linux/modern Node**
⏳ **Needs testing on real Windows Node 0.8/0.10 via GitHub Actions**

## The Problem (Recap)
When `stdio='inherit'`, spawn-streaming pipes `cp.stdout/stderr` directly to `process.stdout/stderr` but doesn't wait for the pipes to complete. It only waits for the child process 'close' event via `spawn.worker`. On Windows Node 0.8/0.10, the 'close' event never fires → infinite hang.

## Previous Failed Approaches
1. ❌ **Wait for cp.stdout/stderr 'end' events** → Hung (these events don't fire reliably)
2. ❌ **Wait for process.stdout/stderr events** → Hung (these streams don't emit expected events)

## The Key Insight
When stdio is **NOT** 'inherit', the code pipes to `concatWritable` streams, which are custom Writable streams that reliably emit 'finish' events - and **this works on Windows Node 0.8/0.10**.

The difference:
- **Non-inherit (works):** `cp.stdout → concatWritable → 'finish' event fires`
- **Inherit (hangs):** `cp.stdout → process.stdout → no reliable events`

## The PassThrough Solution
Use Node's built-in `PassThrough` stream as a relay between cp.stdout/stderr and process.stdout/stderr:

```typescript
if (stdio === 'inherit') {
  // Use PassThrough stream to ensure events fire reliably
  const relay = new PassThrough();
  relay.pipe(process.stdout);
  queue.defer(oo.bind(null, pipeline(cp.stdout, relay, options, color),
    ['error', 'end', 'close', 'finish']));
}
```

**Flow:** `cp.stdout → [prefix transform?] → PassThrough → process.stdout`

The PassThrough stream:
- Acts like concatWritable in that it's a proper Transform stream
- Emits 'finish' events when the pipe completes
- Doesn't buffer data (passes through immediately)
- Should work on Windows Node 0.8/0.10 like other custom streams do

## Test Results (Local)

**spawn-streaming tests:** ✅ All 8 tests pass in 2s
**each-package tests:** ✅ All 26 tests pass in 10s
- Including sustained output test: 5.2s (well under 12s timeout)

## Next Steps

### 1. Push spawn-streaming Branch for CI Testing
The fix is committed to `/home/user/spawn-streaming` on branch `fix/windows-node-0.8-passthrough` (commit 6015294).

```bash
cd /home/user/spawn-streaming
git push -u origin fix/windows-node-0.8-passthrough
```

Then create a PR or push to master to trigger CI.

### 2. Monitor GitHub Actions
Check: https://github.com/kmalakoff/spawn-streaming/actions

The CI runs `npm run test:engines` which uses `nvu` to test across Node versions including 0.8/0.10 on Windows.

### 3. If CI Passes
1. Merge to master in spawn-streaming
2. Publish new spawn-streaming version: `npm version patch && npm publish`
3. Update each-package: `npm update spawn-streaming`
4. Verify Windows Node 0.8/0.10 passes in each-package CI

### 4. If CI Fails
We'll need to investigate what events PassThrough streams DO emit on Windows Node 0.8/0.10 and iterate.

## Files Changed

**spawn-streaming:**
- `src/worker.ts` - Added PassThrough stream relay for stdio='inherit'
  - Lines 28-34 (stdout)
  - Lines 42-47 (stderr)

**Local testing:**
- Copied dist files to each-package node_modules to verify integration

## Why This Should Work
PassThrough is a built-in Node.js stream that has existed since very early versions. It's essentially a Transform stream with an identity transformation. Since:
1. Custom Writable streams (concatWritable) work on Windows Node 0.8/0.10
2. PassThrough is a standard stream that should emit standard events
3. The relay approach maintains real-time output (no buffering)

This approach should provide the reliable event firing we need.

## Acknowledgment
I apologize for not following TDD properly earlier. I cannot locally reproduce Windows Node 0.8/0.10 behavior, so this fix is based on:
1. Understanding what DOES work (concatWritable streams)
2. Using a similar approach with PassThrough streams
3. Testing the logic on modern Node/Linux (passes)
4. Requiring real CI testing to validate on Windows Node 0.8/0.10

This is the best approach I can take given the constraints.
