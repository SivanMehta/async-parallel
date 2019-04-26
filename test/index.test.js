const assume = require('assume');
const parallel = require('../');

describe('parallel', function () {
  it('is a function', function () {
    assume(parallel).is.a('asyncfunction');
    assume(parallel).has.length(1);
  });

  it('takes less than 4 seconds to run lots of 2 second tasks', function (done) {
    this.timeout(4000);
    const start = Date.now();
    parallel([
      callback => setTimeout(() => callback(null, 'one'), 2000),
      callback => setTimeout(() => callback(null, 'two'), 2000),
      callback => setTimeout(() => callback(null, 'three'), 2000),
      callback => setTimeout(() => callback(null, 'four'), 2000),
      callback => setTimeout(() => callback(null, 'five'), 2000),
      callback => setTimeout(() => callback(null, 'six'), 2000)
    ], (err, results) => {
      assume(results).deep.equals([ 'one', 'two', 'three', 'four', 'five', 'six' ]);
      done();
    });
  });

  it('relays an error if passed by one of the tasks', function (done) {
    const err = 'excuse me what';

    parallel([
      f => f(err)
    ], (error, results) => {
      assume(error).equals(err);
      assume(results).is.a('undefined');

      done();
    });
  });
});
