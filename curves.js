// The codes in this repo should not be copied for other student assignments for any courses.
/*jshint esversion: 6 */
// @ts-check

// framework provided by the instructors
import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "./libs/CS559/inputHelpers.js";
import * as SimpleObjects from "./libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "./libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });

  function colorVec(r,g,b){
    return new T.Vector3(r / 255, g / 255, b / 255);
  }

  let shaderMat = shaderMaterial("./shaders/curves.vs", "./shaders/curves.fs", {
    side: T.DoubleSide,
    uniforms: {
      pairs: { value: 5.0 },
      lineWidth: { value: 0.1 },
      linePeriod: { value: 4.0 },
      lineHeight: { value: 0.1 },
      background: { value: new T.Vector3(0.89, 0.79, 0.71) },
      dark: { value: colorVec(237,90,101) },
      light: { value: colorVec(44,150,120) },
      shiness: { value: 0. },
      time: { value: 0. },
      speed: { value: 0. },
    },
  });

  let sphere = new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat, widthSegments: 30, heightSegments: 30 });
  let rect = new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat });
  world.add(sphere);
  world.add(rect);

  // time, two geo use the same material, should change together
  let sphereTime = 0;
  sphere.stepWorld = function (delta, timeofday) {
    sphereTime += delta;
    shaderMat.uniforms.time.value = sphereTime * 0.001; // pass in the time in seconds
  };

  // periods number
  let periodSlider = new InputHelpers.LabelSlider("Period", {
    width: 400,
    min: 0,
    max: 5,
    step: 0.01,
    initial: 1,
    where: mydiv,
  });
  function onchange() {
    shaderMat.uniforms.linePeriod.value = periodSlider.value();
  }
  periodSlider.oninput = onchange;
  onchange();

  // number of pairs
  let pairSlider = new InputHelpers.LabelSlider("Pairs", {
    width: 400,
    min: 1,
    max: 20,
    step: 1,
    initial: 5,
    where: mydiv,
  });
  function changePair() {
    shaderMat.uniforms.pairs.value = pairSlider.value();
  }
  pairSlider.oninput = changePair;
  changePair();

  // height, change geo
  let heightSlider = new InputHelpers.LabelSlider("Height", {
    width: 400,
    min: 0,
    max: 0.3,
    step: 0.01,
    initial: 0.1,
    where: mydiv,
  });
  function changeHeight() {
    shaderMat.uniforms.lineHeight.value = heightSlider.value();
  }
  heightSlider.oninput = changeHeight;
  changeHeight();

  // shine
  let shineSlider = new InputHelpers.LabelSlider("Shine", {
    width: 400,
    min: 0,
    max: 2,
    step: 0.01,
    initial: 1,
    where: mydiv,
  });
  function changeShine() {
    shaderMat.uniforms.shiness.value = shineSlider.value();
  }
  shineSlider.oninput = changeShine;
  changeShine();

  // speed
  let speedSlider = new InputHelpers.LabelSlider("Speed", {
    width: 400,
    min: -1,
    max: 1,
    step: 0.001,
    initial: 0.5,
    where: mydiv,
  });
  function changeSpeed() {
    shaderMat.uniforms.speed.value = speedSlider.value();
  }
  speedSlider.oninput = changeSpeed;
  changeSpeed();

  // button for zero speed
  let zeroSpeed = InputHelpers.makeButton("Zero Speed", mydiv);
  zeroSpeed.onclick = function(){
    shaderMat.uniforms.speed.value = 0.0;
    speedSlider.set(0.0);
  };

  world.go();
}
