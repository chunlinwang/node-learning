const v8 = require("v8");

// const stream = v8.getHeapSnapshot();
// stream.pipe(process.stdout);

console.log(v8.cachedDataVersionTag());
