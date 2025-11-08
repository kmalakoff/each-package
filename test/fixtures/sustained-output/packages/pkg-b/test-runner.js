#!/usr/bin/env node
// Simulates long-running process with sustained output (like npm test)
// Produces ~2 seconds of continuous output to expose dual consumption bug

for (var i = 1; i <= 50; i++) {
  console.log('✓ test ' + i + 'passed (' + Math.floor(Math.random() * 100) + 'ms)');

  // Simulate test execution time (~40ms per test)
  const start = Date.now();
  while (Date.now() - start < 40) {
    /* busy wait */
  }
}

console.log('\n✓ 50 tests completed');
process.exit(0);
