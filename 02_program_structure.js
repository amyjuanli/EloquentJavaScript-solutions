/*
    LOOPING A TRIANGLE

    Write a loop that makes seven calls to console.log to output the following triangle:

    #
    ##
    ###
    ####
    #####
    ######
    #######
*/
// way 1: seven calls to console.log
for (let row = 0; row < 7; row++) {
    let output = "";
    for (let col = 0; col < row + 1; col++) {
        output += "#";
    }
    console.log(output + "\n");
}
// way 2: better practice (create a variable to hold the string and print out)
let output = "";
for (let row = 0; row < 7; row++) {
    for (let col = 0; col < row + 1; col++) {
        output += "#";
    }
    output += "\n";
}
console.log(output);


/*
    FIZZBUZZ

    Write a program that uses console.log to print all the numbers from 1 to 100, 
    with two exceptions. 
    For numbers divisible by 3, print "Fizz" instead of the number, and for 
    numbers divisible by 5 (and not 3), print "Buzz" instead.
*/
for (let num = 1; num <= 100; num++) {
    if (num % 3 === 0) {
        console.log("Fizz");
    } else if (num % 5 === 0) {
        console.log('Buzz');
    } else {
        console.log(num);
    }
}
/*
    When you have that working, modify your program to print "FizzBuzz" for numbers
     that are divisible by both 3 and 5
    (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/
for (let num = 1; num <= 100; num++) {
    if (num % 3 === 0 && num % 5 === 0) {
        console.log("FizzBuzz");
    } else if (num % 3 === 0) {
        console.log("Fizz");
    } else if (num % 5 === 0) {
        console.log('Buzz');
    } else {
        console.log(num);
    }
}


/*
    CHESSBOARD

    Write a program that creates a string that represents an 8×8 grid, using 
    newline characters to separate lines. 
    At each position of the grid there is either a space or a "#" character. 
    The characters should form a chessboard.

    Passing this string to console.log should show something like this:

     # # # #
    # # # # 
     # # # #
    # # # # 
     # # # #
    # # # # 
     # # # #
    # # # #
*/
// way 1: static chessboard: 
let output = "";
for (let row = 0; row < 8; row++) {
    if(row % 2 === 0 ) {
        output += " # # # #\n";
        
    } else {
        output += "# # # #\n";
    }
}
console.log(output);

// way 2: flexible chessboard: dynamic size 
let output = "";
for (let row = 0; row < 8; row++) {
   for (let col = 0; col < 8; col++) {
       if ( (row + col) % 2 === 0) {
            output += " ";
       } else {
           output += "#";
       }
   }
   output += "\n"; 
}
console.log(output);

/*
 When you have a program that generates this pattern, define a binding size = 8 
    and change the program so that it works for any size, 
    outputting a grid of the given width and height.
*/
let size = 8;
let output = "";
for (let row = 0; row < size; row++) {
   for (let col = 0; col < size; col++) {
       if ( (row + col) % 2 === 0) {
            output += " ";
       } else {
           output += "#";
       }
   }
   output += "\n"; 
}
console.log(output);
