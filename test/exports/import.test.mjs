import assert from 'assert';
import eachPackage from 'each-package';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof eachPackage, 'function');
  });
});
