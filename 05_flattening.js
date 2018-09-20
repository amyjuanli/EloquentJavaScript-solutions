/*
   FLATTENING

Use the reduce method in combination with the concat method to “flatten” an   
array of arrays into a single array that has all the elements of the original arrays.
*/
let arrays = [
    [1, 2, 3],
    [4, 5],
    [6]
];
let combinedArray = arrays.reduce((combined, subArr) => {
    combined = combined.concat(subArr);
    return combined;
}, []);
console.log(combinedArray);
// → [1, 2, 3, 4, 5, 6]