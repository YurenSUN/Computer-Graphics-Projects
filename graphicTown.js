// The codes in this repo should not be copied for other student assignments for any courses.
/*jshint esversion: 6 */
// @ts-check

// framework provided by the instructors
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "./libs/CS559-Framework/WorldUI.js";
import * as T from "./libs/CS559-Three/build/three.module.js";

import { main } from "./graphicTown-main.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    background: "#baccd9",
    // groundplanesize: 20,
    groundplane: "", // not using the plane
    where: document.getElementById("div1"),
});

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
main(world);

// below code frameworks are also provided by the instructors
///////////////////////////////////////////////////////////////
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
highlight("highway0");
highlight("bridge0");
highlight("House10");
highlight("House20");
highlight("House30");
highlight("car20");
highlight("car10");
highlight("quad0");
highlight("addOnObj82");
highlight("surface")
highlight("tree");


///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world, 500, document.getElementById("div2"), false);
// now make it go!
world.go();
