// Diagnostic test to understand spawn behavior across Node versions
// Run with: node test-node-spawn.js

console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('NODE env var:', process.env.NODE);
console.log('npm_node_execpath:', process.env.npm_node_execpath);

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE || '');
const NODE = isWindows ? 'node.exe' : 'node';

console.log('\nAttempting to spawn:', NODE);

// Test with cross-spawn-cb
try {
  const spawn = require('cross-spawn-cb');

  console.log('\n--- Testing cross-spawn-cb ---');

  // Save and clear env vars to simulate the bug condition
  const originalNODE = process.env.NODE;
  const originalNpmNodeExecpath = process.env.npm_node_execpath;

  delete process.env.NODE;
  delete process.env.npm_node_execpath;

  spawn(NODE, ['--version'], { encoding: 'utf8' }, (err, res) => {
    // Restore env vars
    if (originalNODE !== undefined) process.env.NODE = originalNODE;
    if (originalNpmNodeExecpath !== undefined) process.env.npm_node_execpath = originalNpmNodeExecpath;

    if (err) {
      console.error('ERROR:', err.message);
      console.error('Error code:', err.code);
      console.error('Full error:', err);
      process.exit(1);
    }

    console.log('SUCCESS');
    console.log('stdout:', res.stdout);
    console.log('stderr:', res.stderr);
    console.log('status:', res.status);
  });
} catch (error) {
  console.error('EXCEPTION:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}
