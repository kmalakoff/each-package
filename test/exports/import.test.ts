import assert from 'assert';
import eachPackage from 'each-package';

describe('exports .ts', () => {
  it('default', () => {
    assert.equal(typeof eachPackage, 'function');
  });
});
