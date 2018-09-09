
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