
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