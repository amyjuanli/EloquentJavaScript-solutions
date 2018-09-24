/* 
LOCKED BOX
Write a function called withBoxUnlocked that takes a function value as argument,  
unlocks the box, runs the function, and then ensures that the box is locked again  
before returning, regardless of whether the argument function returned normally  
or threw an exception.
*/

const box = {
    locked: true,
    unlock() {
        this.locked = false;
    },
    lock() {
        this.locked = true;
    },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    let locked = box.locked;
    if (!locked) {
         body()// make sure to call body function when box stay unlocked
    }
    box.unlock();
    try {
        body();
    } finally {
        box.locked = true;
    }
}

withBoxUnlocked(function () {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function () {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised:", e);
}
console.log(box.locked);
// → true