// The codes in this repo should not be copied for other student assignments for any courses.
/*jshint esversion: 6 */
// @ts-check

// framework provided by the instructors
// import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
// import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import { Car1, Car2 } from "./carsObj.js";

let world = new GrWorld({where: document.getElementById("div1")});

// place your vehicles into the world here
let car1 = new Car1({x: -3});
world.add(car1);

let car2 = new Car2({x:0});
world.add(car2);

world.go();

