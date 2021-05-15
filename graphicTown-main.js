/*jshint esversion: 6 */
// @ts-check

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "./libs/CS559-Framework/shaderHelper.js";
import { OBJLoader } from "./libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "./libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import { House1, House2, House3, addOnObj } from "./graphicTownObjects/buildings.js";
import { Car1, Car2, Quad } from "./graphicTownObjects/transportation.js";
import { Bridge, Highway, Surface } from "./graphicTownObjects/newObj.js";
import { MeshBasicMaterial } from "./libs/CS559-Three/build/three.module.js";

/**
 * The main function to add things to the world
 * @param world 
 */
export function main(world) {
  // the surface
  let surface = new Surface({
    map: "./imgs/surface.png",
    channel0: "./imgs/black.png",
    channel1: "./imgs/channel1.png",
    channel2: "./imgs/channel2.png",
  });
  world.add(surface);

  // house group on the ground
  for (let i = -5; i < 10; i += 6) {
    // let h1 = new House1({ side: false, x: 15, z: -15, });
    world.add(new House1({ side: false, x: 17.5, z: i + 2, rotateY: -Math.PI / 2 }));
  }
  for (let i = 10; i < 20; i += 4) {
    world.add(new House3({ side: true, x: i, z: 17.5, rotateY: Math.PI }));
  }

  // 1 house on the mountain
  world.add(new House2({ side: false, x: -7, z: -10, y: 5.3, rotateY: -Math.PI / 4 }));

  // parking lot, with one car
  let parking = new addOnObj({
    mat: "./imgs/parking.png",
    h: 7, w: 5, xrot: -Math.PI / 2,
    z: 13, x: -11
  });
  world.add(parking);

  let car_lot = new Car1({
    yrot: Math.PI,
    xscale: 0.5, yscale: 0.5, zscale: 0.5,
    x: 10.4, z: 6.8,
    move: "stop",
    notRidable: true,
  });
  world.add(car_lot);

  // road
  addRoads(world);

  // bridge
  let bridge = new Bridge({
    z: 12.3, x: -15,
    xscale: 0.9,
  });
  world.add(bridge);

  // highway to the mountain
  let highway = new Highway({
    z: 8, x: -18, yrot: Math.PI / 2,
    xscale: 1.744,
  });
  world.add(highway);


  // models for tree
  // achieved from https://free3d.com/3d-model/low_poly_tree-816203.html
  // learned about loading material from https://threejsfundamentals.org/threejs/lessons/threejs-load-obj.html
  let objloader = new OBJLoader();
  let matLoader = new MTLLoader();
  // the one to highlight
  let toHighlightTree;
  matLoader.load("./graphicTownObjects/tree.mtl", function (mat) {
    mat.preload();
    objloader.setMaterials(mat);
    objloader.load("./graphicTownObjects/tree.obj", function (tree) {

      // positions in order x, z,y
      let indices = [
        [-1, 10, 0, 0.1, 0],
        [1, 7, 0, 0.2, Math.PI / 4],
        [3, 6, 0, 0.05, -Math.PI / 2],
        [3.5, 4, 0, 0.08, 0],
        [4.8, 1, 0, 0.14, Math.PI / 3],
        [4.9, -2, 0, 0.06, -Math.PI / 3],
        [5, -3.5, 0, 0.21, -Math.PI / 3 * 2],
        [5, -7, 0, 0.1, 0],
        [7, -8, 0, 0.12, Math.PI / 2],
        [7.4, -11, 0, 0.14, Math.PI / 5],
        [9, -15, 0, 0.19, Math.PI / 5 * 2],
      ];

      for (let i = 0; i < indices.length - 1; i++) {
        let cur = tree.clone();
        cur.position.set(indices[i][0], indices[i][2] + 0.1, indices[i][1]);
        cur.scale.set(indices[i][3], indices[i][3], indices[i][3]);
        cur.rotation.y = (indices[i][4]);
        world.add(new GrObject("tree" + String(i), cur));
      }

      let i = indices.length - 1;
      toHighlightTree = tree.clone();
      toHighlightTree.position.set(indices[i][0], indices[i][2] + 0.1, indices[i][1]);
      toHighlightTree.scale.set(indices[i][3], indices[i][3], indices[i][3]);
      toHighlightTree.rotation.y = (indices[i][4]);
    });
  });
  world.add(new GrObject("tree", toHighlightTree));

  // cars moving between the parking lot and top of the mountain
  let car_m = new Car2({
    xscale: 0.5, yscale: 0.5, zscale: 0.5,
    roadR: 0.5,
    stage: 0,
    move: "mountain",
  });
  world.add(car_m);

  let car_m2 = new Car2({
    xscale: 0.5, yscale: 0.5, zscale: 0.5,
    roadR: 0.5,
    stage: 10,
    move: "mountain",
  });
  world.add(car_m2);


  // cars driving in the right vertical
  let start = [15.1, 12];
  let end = [13.92, -18]
  let car_v1 = new Car1({
    yrot: -Math.PI / 2,
    xscale: 0.5, yscale: 0.5, zscale: 0.5,
    z: start[1], x: start[0],
    move: "vertical",
  });
  world.add(car_v1);

  let car_v2 = new Car1({
    yrot: Math.PI / 2,
    xscale: 0.5, yscale: 0.5, zscale: 0.5,
    z: end[1] + 5, x: end[0],
    direction: -1,
    move: "vertical",
  });
  world.add(car_v2);

  let car_v3 = new Car2({
    yrot: -Math.PI / 2,
    xscale: 0.5, yscale: 0.5, zscale: 0.5,
    z: start[1] - 6, x: start[0],
    direction: -1,
    move: "vertical",
  });
  world.add(car_v3);

  // one quadcoptor for articulating object
  let quad1 = new Quad({ y: 10 });
  world.add(quad1);

  // helicoptor move objects to the top of the mountain
  // not enough time

}

function addRoads(world) {
  // right vertical
  let road1 = new addOnObj({
    mat: "./imgs/road.png",
    w: 3, h: 32.3,
    xrot: -Math.PI / 2, yrot: -Math.PI / 2,
    z: 13, x: -12.3,
    noTrans: true,
  });
  world.add(road1);

  // right turn
  let road_turn1 = new addOnObj({
    mat: "./imgs/road_turn.png",
    w: 3, h: 3,
    xrot: -Math.PI / 2,
    z: 15.99, x: -15.285, y: 0.001,
    noTrans: true,
  });
  world.add(road_turn1);

  // right horizontal
  let road_2 = new addOnObj({
    mat: "./imgs/road.png",
    w: 3, h: 18,
    xrot: -Math.PI / 2,
    z: 13, x: -15.3,
    noTrans: true,
  });
  world.add(road_2);

  // road at turn after the bridge
  let road_turn2 = new addOnObj({
    mat: "./imgs/road_turn.png",
    w: 3, h: 3,
    xrot: -Math.PI / 2, yrot: -Math.PI / 2,
    z: -18, x: -15.285,
    noTrans: true,
  });
  world.add(road_turn2);

  // road to the highway
  let road_3 = new addOnObj({
    mat: "./imgs/road.png",
    w: 3, h: 5,
    xrot: -Math.PI / 2, yrot: -Math.PI / 2,
    z: -18.015, x: -12.3,
    noTrans: true,
  });
  world.add(road_3);
}

