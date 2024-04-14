async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    new Promise(function(resolve) {
        console.log('promise1');
        resolve();
        console.log("promiseResolve")
    }).then(function() {
        setTimeout(function() {
            console.log('setTimeout1');
        })
        console.log('promise2');
    });
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout2');
}, 0)

async1();

process.nextTick(() => {
    console.log("nextTick");
})

new Promise(function(resolve) {
    console.log('promise3');
    resolve();
    setTimeout(() => {
        console.log('setTimeout3')
    })
}).then(function() {
    console.log('promise4');
})
.then(() => console.log('promise5'))
.then(() => console.log('promise6'))

console.log('script end');

/*
script start
async1 start
promise1
promiseResolve
promise3
script end
nextTick
promise2
async1 end
promise4
promise5
promise6
setTimeout2
setTimeout3
setTimeout1
 */

/* 
#no await
script start
async1 start
promise1
promiseResolve
async1 end
promise3
script end
nextTick
promise2
promise4
promise5
promise6
setTimeout2
setTimeout3
setTimeout1
*/