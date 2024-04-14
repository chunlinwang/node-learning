console.log('script start');

const dog = new Promise(function(resolve) {
    console.log('dog1');
    resolve();
    console.log("promiseResolve")
}).then(function() {
    console.log('dog2');
    return "dog"
}).then(console.log("dog end")); // 注意这里没有回调

const cat = new Promise(function(resolve) {
    console.log('cat1');
    resolve();
    setTimeout(() => {
        console.log('setTimeout1')
    })
}).then(function() {
    console.log('cat2');
    return "cat"
})

setTimeout(function() {
    console.log('setTimeout2');
}, 0)

console.log("before promise.race")

Promise.race([dog, cat])
    .then((one, two) => {
        console.log("one", one)
        console.log("two", two)
    })
    .catch(err => {
        console.error('err', err);
    })

console.log('script end');

/*
script start
dog1
promiseResolve
dog end
cat1
before promise.race
script end
dog2
cat2
one cat
two undefined
setTimeout1
setTimeout2
 */