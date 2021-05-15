/*jshint esversion: 6 */
// @ts-check

// frameworks provided by the instructors
// import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
// import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import { House1, House2, House3, Tree } from "./buildingsObj.js";

let world = new GrWorld({
  groundplanesize: 8,
  groundplanecolor: "grey",
});


let h1f = new House1({ side: false, x: -5.5, z: -2.5 });
world.add(h1f);
let h1t = new House1({ side: true, x: -5.5, z: 2.5 });
world.add(h1t);

let h2 = new House2({ x: 0, z: 0 });
world.add(h2);

let h3f = new House3({ side: false, x: 5, z: -2.5 });
world.add(h3f);
let h3t = new House3({ side: true, x: 5, z: 2.5 });
world.add(h3t);

// left line
for (let i = 0; i < 10; i++) {
  let t1 = new Tree({
    x: -2.5, z: - 6 + 12 * i / 10,
    xscale: 0.5, yscale: 0.8, zscale: 0.5
  });
  world.add(t1);
}

// right line
for (let i = 0; i < 10; i++) {
  let t1 = new Tree({
    x: 2.5, z: - 6 + 12 * i / 10,
    xscale: 0.5, yscale: 0.8, zscale: 0.5
  });
  world.add(t1);
}


world.go();