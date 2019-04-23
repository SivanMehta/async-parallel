const assume = require('assume');
const parallel = require('../');

describe('signature', function () {
  it('is a function', function () {
    assume(parallel).is.a('function');
    assume(parallel).has.length(2);
  });
});