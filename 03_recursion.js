
/*
    RECURSION

    Write a recursion function to define whether a positive whole number is even 
    or odd:

*/

// function isEven(number) {
// 	function check(current) {
//     	if (current === number) {
//           return true;
//     } else if (current > number) {
//     	return false;
//     } else {
//     	return number > 0 && check(current+2);
//     }
//     }
//   return check(0);
// }

function isEven(number) {
    if (number === 0) {
        return true;
    } else if (number === 1) {
        return false;
    } else if (number < 0) {
        return isEven(-number);
    } else {
        return isEven(number - 2);
    }
}

console.log(isEven(0));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false 
