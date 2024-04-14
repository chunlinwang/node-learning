const { lutimes } = require("fs/promises");
const { isArray } = require("util");

const now = new Date();
const reg = /(\S\s)+/g
const obj = {
    a: {
        b: {
            c: 'here'
        }
    },
    j: {
        h: {
            l: 'there'
        }
    },
    p: {
        n: now
    },
    r: {
        reg
    }
}


// solution 1
// Can not keep Date and RegRex
// const nObj = JSON.parse(JSON.stringify(obj));

// console.log(nObj);
// nObj.a.b.c = 'some';
// console.log(nObj, obj);

// solution 2

const deepCopy = (obj) => {
    let newObject = {}
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);

    if (obj !== null && typeof obj ==='object') {
        Object.entries(obj).map(([k, v]) => {
            if (v !== null && typeof obj === 'object') {
                newObject[k] = deepCopy(v);
            } else {
                newObject[k] = v;
            }
        })
    } else {
        return obj;
    }

    return newObject;
}

const nObj2 = deepCopy(obj)
console.log(nObj2);
nObj2.a.b.c = 'some';
console.log(nObj2, obj);

deepCopy(2);

deepCopy('2dss');


