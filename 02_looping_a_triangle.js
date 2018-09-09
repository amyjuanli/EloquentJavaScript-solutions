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