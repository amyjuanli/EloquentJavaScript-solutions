/*
PERSISTENT GROUP
Write a new class PGroup, similar to the Group class from Chapter 6, which stores 
a set of values. Like Group, it has add, delete, and has methods.
Its add method, however, should return a new PGroup instance with the given member
 added and leave the old one unchanged. Similarly, delete creates a new instance 
 without a given member.
The class should work for values of any type, not just strings. It does not have 
to be efficient when used with large amounts of values.
The constructor shouldn’t be part of the class’s interface (though you’ll definitely 
want to use it internally). Instead, there is an empty instance, PGroup.empty, 
that can be used as a starting value.
*/
class PGroup {
    constructor(elements) {
        this.content = elements;
    }
    add(element) {
        if (!(this.has(element))) {
            return new PGroup(this.content.concat([element]));
        }
    }
    delete(element) {
        return new PGroup(this.content.filter(e => e !== element));
    }
    has(element) {
        return this.content.includes(element);
    }
}

PGroup.empty = new PGroup([]);
console.log(PGroup.empty);
// → {content: []}
let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");
console.log(a, ab, b);
// → {content: ["a"]} {content: ["a", "b"]} {content: ["b"]}
console.log(b.has("b"));
// → → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false