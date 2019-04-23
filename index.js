async function parallel(fns, callback = () => {}) {
  const tasks = fns.map(f => {
    return new Promise((resolve, reject) => {
      f((err, result) => {
        if(err) reject(err);
        resolve(result);
      });
    });
  });

  let results = [];
  try {
    results = await Promise.all(tasks);
  } catch (err) {
    return callback(err);
  }

  callback(null, results);
}

module.exports = parallel;
