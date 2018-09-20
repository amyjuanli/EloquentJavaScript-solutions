/*
GROUPS

Write a class called Group (since Set is already taken). Like Set, it has add,  
delete, and has methods. Its constructor creates an empty group, add adds a  
value to the group (but only if it isn’t already a member), delete removes its  
argument from the group (if it was a member), and has returns a Boolean value  
indicating whether its argument is a member of the group.
*/
class Group {
  constructor() {
    this.content = [];
  }
  add(element) {
    if (!this.has(element)) this.content.push(element);
  }

  delete(element) {
    if (this.has(element)) {
      this.content = this.content.filter(x => x !== element);
      return true;
    }
    return false;
  }
  has(element) {
    return this.content.includes(element);
  }
  static from(iObj) {
    let group = new Group();
    for (let x of iObj) {
      group.add(x);
    }
    return group;
  }
}

let group = Group.from([10, 20]); // call the static function `from` 
// notice the data type for the instance - group
// apparently its not an array
console.log(group)
// -> Group {content: Array(2)}content: (2) [10, 20]__proto__: Object
console.log(Object.keys(group))
// -> ["content"]

console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
