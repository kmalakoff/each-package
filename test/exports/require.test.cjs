const assert = require('assert');
const eachPackage = require('each-package');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof eachPackage, 'function');
  });
});
