/*
ITERABLE GROUPS
Make the Group class from the previous exercise iterable. 
*/
class Group {
  constructor() {
    this.content = [];
    this.index = 0;
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
  next() {
    const value = this.content[this.index];
    const done = !(this.index in this.content);
    this.index++;
    return { value, done };
  }
  [Symbol.iterator]() {
    return {
      next: () => this.next()
    };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
