/* STEP 1: PREPARE DATA */
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

/* STEP2: TO GENERATE ALL THE POSSIBLE ROUTES */
// Approach 1:
// function buildGraph(edges) {
//     let graph = Object.create(null);
//     function addEdge(from, to) {
//       if (graph[from] == null) {
//         graph[from] = [to]; // [to] create an array
//       } else {
//         graph[from].push(to);
//       }
//     }
//     for (let [from, to] of edges.map(r => r.split("-"))) {
//       addEdge(from, to);
//       addEdge(to, from);
//     }
//     return graph;
// }
// const roadGraph = buildGraph(roads);
// console.log(roadGraph);

// Approach 2:  using `reduce`
function buildGraph(roads) {
  function addNodes(acc, from, to) {
    if (!acc[from]) {
      acc[from] = [to];
    } else {
      acc[from].push(to);
    }
  }
  const graph = roads.map(r => r.split("-")).reduce((acc, curr) => {
    addNodes(acc, curr[0], curr[1]); // one direction between nodes
    addNodes(acc, curr[1], curr[0]); // opposite direction between nodes
    return acc;
  }, {});
  return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

/* 
STEP 3: 
BUILD A CLASS TO MANGE HANDLE THE STATE FOR MOVING AND DELIVERING 
The initial state describes situation where the robot is when the parcel is undelivered;
The next state is returned when the parcel is delivered caused by the move motion.
*/
class VillageState {
  constructor(place, parcels) {
    this.place = place; // the current place of robot
    this.parcels = parcels; // containing the current location and sending address of parcels
  }

  move(destination) {
    // first check if a valid move from current place to destination
    if (!roadGraph[this.place].includes(destination)) {
      return this; // return old state since it's not a valid move
    } else {
      // valid move: return new state of parcels
      let parcels = this.parcels
        .map(p => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter(p => p.place != p.address); // if correct, deliver the parcel
      return new VillageState(destination, parcels); // return new state
    }
  }
}

let first = new VillageState("Post Office", [
  { place: "Tomy Office", address: "Alice's House" },
  { place: "Post Office", address: "Alice's House" }
]);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → [ { place: 'Tomy Office', address: 'Alice\'s House' } ]

console.log(first.place);
// → Post Office
console.log(first.parcels);
[
  { place: "Tomy Office", address: "Alice's House" },
  { place: "Post Office", address: "Alice's House" }
];


/* STEP 4: */
