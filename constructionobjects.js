/*jshint esversion: 6 */
// @ts-check

// crane and excavator were provided by the instructors

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Crane-${craneObCtr++}`, crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm rotation", 0, 360, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.wire.position.x = paramValues[3];
    this.arm.rotation.y = degreesToRadians(paramValues[4]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${excavatorObCtr++}`, excavator, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm rotate", 0, 50, 45],
      ["forearm rotate", 0, 90, 45],
      ["bucket rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = excavator;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    excavator.scale.set(scale, scale, scale);
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    this.arm.rotation.z = degreesToRadians(-paramValues[4]);
    this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[6]);
  }
}


let dumpCtr = 0;

function createWheel(geo, mat, x) {
  let wheel = new T.Mesh(geo, mat);
  wheel.rotateX(Math.PI / 2);
  wheel.position.x = x;
  return wheel
}

/**
 * @typedef DumpProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrDump extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let dump = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: false
    };

    // base of the dump truck
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(4.2, 0);
    base_curve.lineTo(4, 1);
    base_curve.lineTo(-1, 1);
    base_curve.lineTo(-1, 4);
    base_curve.lineTo(-2, 4);
    base_curve.lineTo(-3.5, 3);
    base_curve.lineTo(-3.5, 2);
    base_curve.lineTo(-4, 2);
    base_curve.lineTo(-4, 0);
    base_curve.lineTo(4.2, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    base.scale.set(0.5, 0.5, 0.75);
    base.position.y = 0.3;
    dump.add(base);
    base.translateZ(-0.25);

    // wheels
    let wheelGro = new T.Group();
    dump.add(wheelGro);
    wheelGro.position.y = 0.4;
    // left
    let wheellGro = new T.Group();
    wheellGro.position.z = 1.1;
    wheelGro.add(wheellGro);

    let wheels = [];
    let wheelGeo = new T.CylinderGeometry(0.4, 0.4, 0.4, 20);
    let wheelMat = new T.MeshStandardMaterial({
      color: 0x89742c,
      roughness: 1
    })

    let wheell1 = createWheel(wheelGeo, wheelMat, -1.2);
    wheels.push(wheell1);
    wheellGro.add(wheell1);
    let wheell2 = createWheel(wheelGeo, wheelMat, 0.5);
    wheels.push(wheell2);
    wheellGro.add(wheell2);
    let wheell3 = createWheel(wheelGeo, wheelMat, 1.35);
    wheels.push(wheell3);
    wheellGro.add(wheell3);

    // right
    let wheelrGro = new T.Group();
    wheelrGro.position.z = -0.1;
    wheelGro.add(wheelrGro);

    let wheelr1 = createWheel(wheelGeo, wheelMat, -1.2);
    wheels.push(wheelr1);
    wheelrGro.add(wheelr1);
    let wheelr2 = createWheel(wheelGeo, wheelMat, 0.5);
    wheels.push(wheelr2);
    wheelrGro.add(wheelr2);
    let wheelr3 = createWheel(wheelGeo, wheelMat, 1.35);
    wheels.push(wheelr3);
    wheelrGro.add(wheelr3);

    // dump
    let body = new T.Group();
    body.position.set(2, 0.8, -0.25)
    dump.add(body);

    // body.rotateZ(-Math.PI/2)

    /**@type THREE.Shape */
    let body_curve = new T.Shape();
    body_curve.moveTo(2, 0);
    body_curve.lineTo(-0.5, 0);
    body_curve.lineTo(-0.5, 1.5);
    body_curve.lineTo(-0.75, 1.5);
    body_curve.lineTo(-0.75, 1.75);
    body_curve.lineTo(-0.25, 1.75);
    body_curve.lineTo(-0.25, 0.25);
    body_curve.lineTo(2, 0.25);
    body_curve.lineTo(2, 0);
    let bodyGeo = new T.ExtrudeGeometry(body_curve, exSettings);
    let bodyMat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let body_base = new T.Mesh(bodyGeo, bodyMat);
    body.add(body_base);
    body_base.scale.z = 0.75;
    body_base.position.x = -2;

    // shields
    let shields = new T.Group();
    body.add(shields);
    let shieldGeo = new T.BoxGeometry(2.25, 1.25, 0.25);
    let bodyLShield = new T.Mesh(shieldGeo, bodyMat);
    shields.add(bodyLShield);
    bodyLShield.position.set(-1.125, 0.875, 1.4);
    let bodyRShield = new T.Mesh(shieldGeo, bodyMat);
    shields.add(bodyRShield);
    bodyRShield.position.set(-1.125, 0.875, 0.1);

    // back
    let backGro = new T.Group();
    body.add(backGro);
    backGro.position.set(-0.125, 0, 0.75);

    let backGeo = new T.BoxGeometry(0.25, 0.75, 1.5);
    let backDoor = new T.Mesh(backGeo, bodyMat);
    backDoor.position.set(0, 0.5, 0);

    backGro.add(backDoor);


    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Dump-${dumpCtr++}`, dump, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["dump z rotate", 0, 60, 0],
      ["wheels rotation", -45, 45, 0],
      ["dump x", 0, 0.8, 0],
      ["back door open degree", 0, 90, 0],

    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = dump;
    this.wheels = wheels;
    this.body = body;
    this.shields = shields;
    this.body_base = body_base;
    this.backDoor = backGro;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    dump.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.body.rotation.z = degreesToRadians(-paramValues[3]);

    this.wheels.forEach(function (wheel) {
      wheel.rotation.z = degreesToRadians(paramValues[4]);
    });

    // move dump x
    this.body_base.position.x = -2 + paramValues[5];
    this.shields.position.x = paramValues[5];
    this.backDoor.position.x = -0.125 + paramValues[5];
    // back door open    
    this.backDoor.rotation.z = degreesToRadians(-paramValues[6]);

  }
}

let liftCtr = 0;

/**
 * @typedef LiftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrLift extends GrObject {
  /**
   * @param {LiftProperties} params
   */
  constructor(params = {}) {
    let forkLift = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // body car
    /**@type THREE.Shape */
    let body_curve = new T.Shape();
    body_curve.moveTo(1.5, 0);
    body_curve.lineTo(-0.5, 0);
    body_curve.lineTo(-0.5, 0.8);
    body_curve.lineTo(-0.35, 0.9);
    body_curve.lineTo(-0.3, 1);
    body_curve.lineTo(-0.3, 1);
    body_curve.lineTo(-0.3, 1.8);
    body_curve.lineTo(-0.2, 2);
    body_curve.lineTo(1, 2);
    body_curve.lineTo(1.5, 1);
    body_curve.lineTo(1.5, 0);
    let bodyGeo = new T.ExtrudeGeometry(body_curve, exSettings);
    let bodyMat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.6,
      roughness: 0.3
    });
    let body_base = new T.Mesh(bodyGeo, bodyMat);
    forkLift.add(body_base);
    body_base.position.y = 0.4;
    // body_base.position.x = -2;

    // the lift
    /**@type THREE.Shape */
    let lift_curve = new T.Shape();
    // thickness 0.1
    lift_curve.moveTo(1, 0);
    lift_curve.lineTo(-0.5, 0);
    lift_curve.lineTo(-0.5, 1);
    lift_curve.lineTo(-0.4, 1);
    lift_curve.lineTo(-0.4, 0.1);
    lift_curve.lineTo(1, 0.1);
    lift_curve.lineTo(1, 0);
    let lift_geom = new T.ExtrudeGeometry(lift_curve, exSettings);
    let lift_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.7,
      wireframe: true
    });
    let lift = new T.Mesh(lift_geom, lift_mat);
    forkLift.add(lift);
    lift.position.x = 2.2;
    lift.position.y = 0.4;

    // two solid for the lift
    let solidGeo = new T.BoxGeometry(0.2, 4, 0.2);
    let solid_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.7,
    });

    let bodyLSolid = new T.Mesh(solidGeo, solid_mat);
    forkLift.add(bodyLSolid);
    bodyLSolid.position.set(1.7, 2.3, 1.1);
    let bodyRSolid = new T.Mesh(solidGeo, solid_mat);
    forkLift.add(bodyRSolid);
    bodyRSolid.position.set(1.7, 2.3, -0.1);


    // wheels
    let wheelGro = new T.Group();
    forkLift.add(wheelGro);
    wheelGro.position.y = 0.4;
    // left
    let wheellGro = new T.Group();
    wheellGro.position.z = -0.1;
    wheelGro.add(wheellGro);

    let wheels = [];
    let wheelGeo = new T.CylinderGeometry(0.4, 0.4, 0.4, 20);
    let wheelMat = new T.MeshStandardMaterial({
      color: 0x89742c,
      roughness: 1
    })

    let wheell1 = createWheel(wheelGeo, wheelMat, -0.3);
    wheels.push(wheell1);
    wheellGro.add(wheell1);
    let wheell2 = createWheel(wheelGeo, wheelMat, 1.1);
    wheels.push(wheell2);
    wheellGro.add(wheell2);

    // right
    let wheelrGro = new T.Group();
    wheelrGro.position.z = 1.1;
    wheelGro.add(wheelrGro);

    let wheelr1 = createWheel(wheelGeo, wheelMat, -0.3);
    wheels.push(wheelr1);
    wheelrGro.add(wheelr1);
    let wheelr2 = createWheel(wheelGeo, wheelMat, 1.1);
    wheels.push(wheelr2);
    wheelrGro.add(wheelr2);


    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Lift-${liftCtr++}`, forkLift, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["lift height", 0, 3.6, 0],
      ["wheels rotation", -45, 45, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = forkLift;
    this.lift = lift;
    this.wheels = wheels;
    // this.arm = arm_group;
    // this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    forkLift.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.lift.position.y = 0.4 + paramValues[3];
    this.wheels.forEach(function (wheel) {
      wheel.rotation.z = degreesToRadians(paramValues[4]);
    });
  }
}


let concreteCtr = 0;

/**
 * @typedef concreteProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrConcrete extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let concrete = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };
    // base of the dump truck
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(4.2, 0);
    base_curve.lineTo(4, 1);
    base_curve.lineTo(.5, 1);
    base_curve.lineTo(0, 2);
    base_curve.lineTo(-.5, 2);
    base_curve.lineTo(-1, 1);

    base_curve.lineTo(-1, 1);
    base_curve.lineTo(-1, 4);
    base_curve.lineTo(-2, 4);
    base_curve.lineTo(-3.5, 3);
    base_curve.lineTo(-3.5, 2);
    base_curve.lineTo(-4, 2);
    base_curve.lineTo(-4, 0);
    base_curve.lineTo(4.2, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    base.scale.set(0.5, 0.5, 0.75);
    base.position.y = 0.3;
    concrete.add(base);
    base.translateZ(-0.05);

    // wheels
    let wheelGro = new T.Group();
    concrete.add(wheelGro);
    wheelGro.position.y = 0.4;
    // left
    let wheellGro = new T.Group();
    wheellGro.position.z = 1.1;
    wheelGro.add(wheellGro);

    let wheels = [];
    let wheelGeo = new T.CylinderGeometry(0.4, 0.4, 0.4, 20);
    let wheelMat = new T.MeshStandardMaterial({
      color: 0x89742c,
      roughness: 1
    })

    let wheell1 = createWheel(wheelGeo, wheelMat, -1.2);
    wheels.push(wheell1);
    wheellGro.add(wheell1);
    let wheell2 = createWheel(wheelGeo, wheelMat, 0.5);
    wheels.push(wheell2);
    wheellGro.add(wheell2);
    let wheell3 = createWheel(wheelGeo, wheelMat, 1.35);
    wheels.push(wheell3);
    wheellGro.add(wheell3);

    // right
    let wheelrGro = new T.Group();
    wheelrGro.position.z = -0.1;
    wheelGro.add(wheelrGro);

    let wheelr1 = createWheel(wheelGeo, wheelMat, -1.2);
    wheels.push(wheelr1);
    wheelrGro.add(wheelr1);
    let wheelr2 = createWheel(wheelGeo, wheelMat, 0.5);
    wheels.push(wheelr2);
    wheelrGro.add(wheelr2);
    let wheelr3 = createWheel(wheelGeo, wheelMat, 1.35);
    wheels.push(wheelr3);
    wheelrGro.add(wheelr3);

    // pumper
    let pumperGro = new T.Group();
    concrete.add(pumperGro);
    pumperGro.position.z = 0.5;
    pumperGro.position.x = -0.2;

    let armSettings = {
      steps: 2,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    let armGeo = new T.BoxGeometry(0.2, 4, 0.2);
    let armMat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.7,
    });

    let arm1Gro = new T.Group();
    pumperGro.add(arm1Gro);
    arm1Gro.position.y = 1.2;
    // arm1Gro.rotation.z = -Math.PI/2;

    let arm1_curve = new T.Shape();
    arm1_curve.moveTo(0, 0);
    arm1_curve.lineTo(0, 3);
    arm1_curve.lineTo(0.2, 3);
    arm1_curve.lineTo(0.2, 0);
    let arm1Geo = new T.ExtrudeGeometry(arm1_curve, armSettings);
    let arm1 = new T.Mesh(arm1Geo, armMat);
    arm1Gro.add(arm1);

    // 2rd arm
    let arm2Gro = new T.Group();
    arm1Gro.add(arm2Gro);
    arm2Gro.position.y = 3;

    /**@type THREE.Shape */
    let arm2_curve = new T.Shape();
    arm2_curve.moveTo(0, 0);
    arm2_curve.lineTo(0, 3.6);
    arm2_curve.lineTo(0.15, 3.6);
    arm2_curve.lineTo(0.15, 0);
    let arm2Geo = new T.ExtrudeGeometry(arm2_curve, armSettings);
    let arm2 = new T.Mesh(arm2Geo, armMat);
    // arm2.position.y = 1.2;
    arm2Gro.add(arm2);

    // 3rd arm
    let arm3Gro = new T.Group();
    arm2Gro.add(arm3Gro);
    arm3Gro.position.y = 3.6;
    arm3Gro.rotation.z = -Math.PI / 2;

    /**@type THREE.Shape */
    let arm3_curve = new T.Shape();
    arm3_curve.moveTo(0, 0);
    arm3_curve.lineTo(0, 1.6);
    arm3_curve.lineTo(0.15, 1.6);
    arm3_curve.lineTo(0.15, 0);
    let arm3Geo = new T.ExtrudeGeometry(arm3_curve, armSettings);
    let arm3 = new T.Mesh(arm3Geo, armMat);
    // arm2.position.y = 1.2;
    arm3Gro.add(arm3);

    // pump
    let pumpSettings = {
      steps: 2,
      depth: 0.05,
      bevelEnabled: false,
    };

    /**@type THREE.Shape */
    let pump_curve = new T.Shape();
    pump_curve.moveTo(0, 0);
    pump_curve.lineTo(0, 1.6);
    pump_curve.lineTo(0.15, 0);
    let pumpGeo = new T.ExtrudeGeometry(pump_curve, pumpSettings);
    let pump = new T.Mesh(pumpGeo, armMat);
    pump.position.y = 1.6;
    pump.position.z = 0.125;

    // pump.lookAt(pump.position.x, 0, pump.position.z);
    // pump.rotateZ(-Math.PI/2);
    // pump.rotateX(-Math.PI/2)
    arm3Gro.add(pump);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Concrete-${concreteCtr++}`, concrete, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["arm1 rotation", 0, 20, 0],
      ["arm2 rotation", -45, 90, 50],
      ["arm3 rotation", -45, 90, 45],
      ["pump rotation", -90, 90, 80],
      ["wheels rotation", -45, 45, 0],

    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = concrete;
    this.pumper = pumperGro;
    this.arm1 = arm1Gro;
    this.arm2 = arm2Gro;
    this.arm3 = arm3Gro;
    this.pump = pump;
    this.wheels = wheels;

    // this.arm = arm_group;
    // this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    concrete.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.arm1.rotation.z = degreesToRadians(-paramValues[3]);
    this.arm2.rotation.z = degreesToRadians(-paramValues[4]);
    this.arm3.rotation.z = degreesToRadians(-paramValues[5]);
    this.pump.rotation.z = degreesToRadians(-paramValues[6]);

    this.wheels.forEach(function (wheel) {
      wheel.rotation.z = degreesToRadians(paramValues[7]);
    });


  }
}
