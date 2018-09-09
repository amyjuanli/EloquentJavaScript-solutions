
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
    let node = list;
    while (node) {
        arr.push(node.value);
        node = node.rest;
    }
    arr.push(node.value);

    // using for loop
    // for (let node = list; node; node = node.rest) {
    //     arr.push(node.value);
    // }
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

    let node = list;
    let n = 0; // set initial index equal zero
    while (n < index) {
        node = node.rest;
        n++;
    }
    return node.value;
}

// recursive version
function rnth(list, index) {
    if (index === 0) return list.value;
    else if (!list) return undefined;
    else return (list.rest, index-1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20