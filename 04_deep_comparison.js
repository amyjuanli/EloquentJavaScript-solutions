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

// rewrite code to make it shorter and more readable 
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null) return false;
    let obj1Keys = Object.keys(obj1),
        obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) return false;
    for (let index of obj1Keys) {
        if (!obj2[index]) return false;
        return deepEqual(obj1[index], obj2[index]);
    }
}


// test
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