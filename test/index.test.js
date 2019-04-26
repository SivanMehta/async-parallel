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
    const args = [ 'one', 'two', 'three', 'four', 'five', 'six' ];
    parallel(
      args.map(x => callback => setTimeout(() => callback(null, x), 2000)),
      (err, results) => {
        assume(results).deep.equals(args);
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
