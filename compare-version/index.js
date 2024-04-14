const { report } = require("process");

function compareVersion(version1, version2){
    version1Arr = completeArr(version1.split('.'));
    version2Arr = completeArr(version2.split('.'));

    let r = 0;
    for (let i = 0; i < 3; i++) {
        r = comp(version1Arr[i], version2Arr[i]);
        if (r !== 0) {
            return r;
        }
    }

    return r;
}

const completeArr = (arr) => {
    const delta = 3 - arr.length;
    for (let i = 0; i < delta; i++) {
        arr.push(0);
    }

    return arr;
}

const comp = (a,b) => {
    if (a > b) {
        return 1;
    } else if (a == b) {
        return 0;
    } else {
        return -1;
    }
}


console.log(compareVersion('1.2.3', '1.0.5')) // 1
console.log(compareVersion('0.1', '1.1.1')); // -1
console.log(compareVersion('13.37', '1.2 ')); // 1
console.log(compareVersion('1.1', '1.1.0')); // 0 
console.log(compareVersion('1.1.1', '1.5.0')); // -1