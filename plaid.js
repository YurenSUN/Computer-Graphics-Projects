// The codes in this repo should not be copied for other student assignments for any courses.
/*jshint esversion: 6 */
// @ts-check

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "./libs/CS559/inputHelpers.js";
import * as SimpleObjects from "./libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "./libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

  let shaderMat = shaderMaterial("./shaders/plaid.vs", "./shaders/plaid.fs", {
    side: T.DoubleSide,
    uniforms: {
      plaids: { value: 5.0 },
      center: { value: 0.3 },
      lineWidth: { value: 0.1 },
      background: { value: new T.Vector3(0.89, 0.79, 0.71) },
      dark: { value: new T.Vector3(0.31, 0.36, 0.68) },
      light: { value: new T.Vector3(0.49, 0.75, 0.88) },
    },
  });

  world.add(new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat }));
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.go();
}
