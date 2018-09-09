/*
    THE SUM OF A RANGE 
*/
function range(start, end, step = 1) {
    let arr = [];

    if (start < end) {
        for (let i = start; i <= end; i += step) {
            arr.push(i);
        }
    } else {
        for (let i = start; i >= end; i += step) {
            arr.push(i);
        }
    }
    return arr;
}

function sum(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    return sum;
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55



/*
    REVERSING AN ARRAY

    The first, reverseArray, takes an array as argument and produces a new   
    array that has the same elements in the inverse order.  
    The second, reverseArrayInPlace, does what the reverse method does: it  
     modifies the array given as argument by reversing its elements. Neither 
      may use the standard reverse method.
*/
function reverseArray(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];

function reverseArrayInPlace(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        let old = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = old;
    }

    return arr;
}
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]



/*
    A LIST

    Write a function arrayToList that builds up a list structure like the one  
    shown when given [1, 2, 3] as argument. Also write a listToArray function  
    that produces an array from a list. Then add a helper function prepend,   
    which takes an element and a list and creates a new list that adds the  
     element to the front of the input list, and nth, which takes a list and   
     a number and returns the element at the given position in the list (with  
    zero referring to the first element) or undefined when there is no   
    such element.
*/
function arrayToList(arr) {
    let list = null;
    for (let i = arr.length - 1; i >= 0; i--) {
        list = {
            value: arr[i],
            rest: list
        };
    }
    return list;
}

function listToArray(list) {
    let arr = [];
    let pointer = list;
    while (pointer.rest) {
        arr.push(pointer.value);
        pointer = pointer.rest;
    }
    arr.push(pointer.value);
    return arr;
}

function prepend(element, list) {
    return {
        value: element,
        rest: list
    };
}

function nth(list, index) {
    if (index === 0) return list.value;
    if (!list) return undefined;

    let pointer = list;
    let n = 0; // set initial index equal zero
    while (n < index) {
        pointer = pointer.rest;
        n++;
    }
    return pointer.value;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20



/*
    DEEP COMPARISON 

    Reason: JavaScript's `==` compares objects by **identity** (produce  
    true only if both objects are precisely the same value; produce  
    false even if objects have identical properties). There is no  
    "deep" comparison operation built into JavaScript, which  
    compares objects by **contents**.

    Write a function `deepEqual` that takes two values and returns  
    true only if they are the same value or are objects with  
    the same properties, where the values of the properties are equal when  
    compared with a recursive call to `deepEqual`.
*/
function deepEqual(obj1, obj2) {
    // To check whether the typeof is object
    if ((typeof obj1 === "object") &&
        (typeof obj2 === "object") &&
        (obj1 !== null) &&
        (obj2 !== null)) {

        // deep comparison
        // To check whether they have the same set of property names 
        obj1Keys = Object.keys(obj1);
        obj2Keys = Object.keys(obj2);
        if (obj1Keys.length === obj2Keys.length) {
            for (let i = 0; i < obj1Keys.length; i++) {
                if (!obj2[obj1Keys[i]]) {
                    return false;
                } else {
                    return deepEqual(obj1[obj1Keys[i]], obj2[obj1Keys[i]]);
                }
            }
        }
    } else {
        return obj1 === obj2;
    }
}
let obj = {
    here: {
        is: "an"
    },
    object: 2
};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {
    here: 1,
    object: 2
}));
// → false
console.log(deepEqual(obj, {
    here: {
        is: "an"
    },
    object: 2
}));
// → true