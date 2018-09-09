/*
    MINIMUM

    Write a function min that takes two arguments and returns their minimum.
*/

function min(num1, num2) {
    if(num1 <= num2) {
        return num1;
    } else {
        return num2
    }
}
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10



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


/*
   BEAN COUNTING

    Write a function countBs that takes a string as its only argument and  
    returns a number that indicates how many uppercase “B” characters there are  
     in the string.

     Next, write a function called countChar that behaves like countBs, except 
      it takes a second argument that indicates the character that is to be  
      counted (rather than counting only uppercase “B” characters). Rewrite  
      countBs to make use of this new function.
*/
function countBs(str) {
    let count = 0;
      for (let i = 0; i < str.length; i++) {
          if(str[i] === "B") {
              count++;
          }
      }
    return count;
  }
  
  function countChar(str, char) {
      let count = 0;
      for (let i = 0; i < str.length; i++) {
          if(str[i] === char) {
              count++;
          }
      }
    return count;
  }
  
  console.log(countBs("BBC"));
  // → 2
  console.log(countChar("kakkerlak", "k"));
  // → 4