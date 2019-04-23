# async-parallel

Trying to write caolan's [`async.parallel`] for my own learning. From the docs,
this example will work identically to caolan's implementation:

```js
parallel([
    function(callback) {
        setTimeout(function() {
            callback(null, 'one');
        }, 200);
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results) {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});

// an example using an object instead of an array
parallel({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback) {
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equals to: {one: 1, two: 2}
});
```

## Testing [![Build Status](https://travis-ci.com/SivanMehta/async-parallel.svg?branch=master)](https://travis-ci.com/SivanMehta/async-parallel)

```
npm it
```

[`async.parallel`](https://caolan.github.io/async/docs.html#parallel)