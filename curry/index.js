
function add (a, b, c) {
    return a+b+c;
}

function curry(fn, ...args) {
    if  (fn.length <= args.length) {
        return fn(...args);
    } else {
        return (x) => curry(fn, ...args, x);
    }
}

console.log(add(1, 2, 3)) //3
console.log(curry(add, 1, 2, 3))
console.log(curry(add)(1)(2)(3))
console.log(curry(add, 1)(2)(3))
console.log(curry(add, 1, 3)(3)) // 7
