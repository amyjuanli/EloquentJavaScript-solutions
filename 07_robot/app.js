/* 
  STEP 1
  PREPARE DATA 
*/
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

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to]; // [to] create an array
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}
const roadGraph = buildGraph(roads);
console.log(roadGraph);
// output:
// { 'Alice\'s House': [ 'Bob\'s House', 'Cabin', 'Post Office' ],
//   'Bob\'s House': [ 'Alice\'s House', 'Town Hall' ],
//   Cabin: [ 'Alice\'s House' ],
//   'Post Office': [ 'Alice\'s House', 'Marketplace' ],
//   'Town Hall': [ 'Bob\'s House', 'Daria\'s House', 'Marketplace', 'Shop' ],
//   'Daria\'s House': [ 'Ernie\'s House', 'Town Hall' ],
//   'Ernie\'s House': [ 'Daria\'s House', 'Grete\'s House' ],
//   'Grete\'s House': [ 'Ernie\'s House', 'Farm', 'Shop' ],
//   Farm: [ 'Grete\'s House', 'Marketplace' ],
//   Shop: [ 'Grete\'s House', 'Marketplace', 'Town Hall' ],
//   Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ] }


/* 
  STEP 2 
  HANDING THE STATE 
  
  THE INITIAL STATE INDICATES THE SITUATION WHERE THE ROBOT IS AND PARCEL STATE 
  WHEN THE PARCEL IS UNDELIVERED; ONCE A PARCEL IS DELIVERED, A NEW STATE IS 
  RETURNED. 
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
                    return {
                        place: destination,
                        address: p.address
                    };
                })
                .filter(p => p.place != p.address); // if correct, deliver the parcel
            return new VillageState(destination, parcels); // return new state
        }
    }
}

// Test the functionality:
let first = new VillageState("Post Office", [{
        place: "Tomy Office",
        address: "Alice's House"
    },
    {
        place: "Post Office",
        address: "Alice's House"
    }
]);
let next = first.move("Alice's House");
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → [ { place: 'Tomy Office', address: 'Alice\'s House' } ]
console.log(first.place);
// → Post Office
console.log(first.parcels);
[{
        place: "Tomy Office",
        address: "Alice's House"
    },
    {
        place: "Post Office",
        address: "Alice's House"
    }
];


/* 
STEP 3
BUILD ROBOTS
*/

// ROBOT 1: randomRobot
//  ITS STRATEGY: 
//  RANDOMLY PICK UP A PARCEL AND RANDOMLY DELIVER IT. 

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {
        direction: randomPick(roadGraph[state.place])
    };
}

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({
            place,
            address
        });
    }
    return new VillageState("Post Office", parcels);
};


runRobot(VillageState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns 


// runRobotAnimation(VillageState.random(), randomRobot);


// ROBOT 2 - routeRobot
//   ITS STRATEGY:
//   ROUTE-FOLLOWING 
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

// use 'memory' to track the route robot has covered 
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {
        direction: memory[0],
        memory: memory.slice(1)
    };
}

// find the shortest path to the destination 
function findRoute(graph, from, to) {
    let work = [{
        at: from,
        route: []
    }];
    for (let i = 0; i < work.length; i++) {
        let {
            at,
            route
        } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({
                    at: place,
                    route: route.concat(place)
                });
            }
        }
    }
}

// ROBOT 3 - goalOrientedRobot
//   ITS STRATEGY:
//   IF THE PARCEL ON THE SET IS NOT PICKED UP YET, CREATE A ROUTE TOWARDS IT; OTHERWISE
//   CREATE ANOTHER ROUTE TO DELIVER IT.

function goalOrientedRobot({
    place,
    parcels
}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
            // create a route to pick up parcel
        } else {
            route = findRoute(roadGraph, place, parcel.address);
            // create a route to deliver the parcel
        }
    }
    return {
        direction: route[0],
        memory: route.slice(1)
    };
}


/* 
STEP 4
COMPARING DIFFERENT ROBOTS FOR THEIR PERFORMANCES OF COMPLETING SAME TASKS
*/
function compareRobots(robot1, memory1, robot2, memory2) {
    // Your code here
    // make the function return the 'turn' value
    function runRobot(state, robot, memory) {
        for (let turn = 0;; turn++) {
            if (state.parcels.length == 0) {
                return turn;
            }
            let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
        }
    }

    // generate 100 times tasks for both robots
    let totalStepsForRobot1 = 0;
    let totalStepsForRobot2 = 0;
    for (let i = 0; i < 100; i++) {
        totalStepsForRobot1 += runRobot(VillageState.random(), robot1, memory1);
        totalStepsForRobot2 += runRobot(VillageState.random(), robot2, memory2);
    }
    let avgStepsForRobot1 = totalStepsForRobot1 / 100;
    let avgStepsForRobot2 = totalStepsForRobot2 / 100;
    console.log(`Average steps of robot1: ${avgStepsForRobot1}\n`);
    console.log(`Average steps of robot2: ${avgStepsForRobot2}`);
    if (avgStepsForRobot1 < avgStepsForRobot2) {
        console.log(`Robot1 runs faster than Robot2`);
    } else {
        console.log(`Robot2 runs faster than Robot1`);
    }
}

compareRobots(routeRobot, [], goalOrientedRobot, []);
// example output: → 
// → Average steps of robot1: 18.35
// → Average steps of robot2: 15.45
// → Robot2 runs faster than Robot1