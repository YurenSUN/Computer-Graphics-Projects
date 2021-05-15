/*jshint esversion: 6 */
// @ts-check

// framework, crane, and excavator were provided by the instructors

// import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
import { AutoUI } from "./libs/CS559-Framework/AutoUI.js";
import { GrCrane, GrExcavator, GrDump, GrLift, GrConcrete } from "./constructionobjects.js";

let cDiv = document.getElementById("construction");
let world = new GrWorld({ groundplanesize: 10, where: cDiv });

let concrete = new GrConcrete({ x: 10 });
let co_ui = new AutoUI(concrete, 300, cDiv);
co_ui.set("x", -2);
co_ui.set("z", 4);
world.add(concrete);

let dump = new GrDump({ x: 10 });
let d_ui = new AutoUI(dump, 300, cDiv);
d_ui.set("x", -4);
d_ui.set("z", 0);
world.add(dump);

let lift = new GrLift({ x: 10 });
let l_ui = new AutoUI(lift, 300, cDiv);
l_ui.set("z", 4);
l_ui.set("x", 4);
world.add(lift);

let crane = new GrCrane({ x: 2, z: -2 });
world.add(crane);
let c_ui = new AutoUI(crane, 300, cDiv);
c_ui.set("x", -4);
c_ui.set("z", -3);

let excavator = new GrExcavator({ x: -2, z: 2 });
world.add(excavator);
let e_ui = new AutoUI(excavator, 300, cDiv);
e_ui.set("x", 6);
e_ui.set("z", -3);
e_ui.set("theta", 36);

world.go();
