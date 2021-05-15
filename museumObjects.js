/**
 * Framework, helper codes, and codes related to object 1 were 
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "./libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "./libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { setupBasicScene } from "./museumObj-helper.js";
// import { OBJLoader } from "./libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
// import { DirectionalLight } from "./libs/CS559-Three/build/three.module.js";

// students can use the object loader
// uncomment this if necessary
// import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

/** Setup the window */
/** @type{number} */
let wid = 670; // window.innerWidth;
/** @type{number} */
let ht = 500; // window.innerHeight;
/** @type{T.WebGLRenderer} */
let renderer = new T.WebGLRenderer();
renderer.setSize(wid, ht);
renderer.shadowMap.enabled = true;

document.getElementById("museum_area").appendChild(renderer.domElement);

/* setupBasicScene creates a scene and puts the pedestals in place */
/** @type{T.Scene} */
let scene = setupBasicScene();

let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);

// Here, we add a basic, simple first object to the museum.
/**@type{T.Material} */
let material = new T.MeshPhongMaterial({
  color: "#00aa00",
  shininess: 15,
  specular: "#00ff00",
});
/**@type{T.Geometry} */
let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
/**@type{T.Mesh} */
let cube = new T.Mesh(geometry, material);
cube.position.set(2, 1.35, 2);
cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
cube.castShadow = true;
// camera_1
camera_1.position.z = 5;
camera_1.position.y = 3;
camera_1.position.x = 2;
camera_1.lookAt(cube.position);
/* put a spotlight on the first object */
/**@type{T.SpotLight} */
let spotlight_1 = new T.SpotLight(0xaaaaff, 0.5);
spotlight_1.angle = Math.PI / 16;
spotlight_1.position.set(2, 5, 2);
spotlight_1.target = cube;
spotlight_1.castShadow = true;
scene.add(spotlight_1);

// second
let obj2 = new T.Group();
let geo2 = new T.BoxGeometry(1, 1, 1);
// middle
let m21 = new T.MeshStandardMaterial({ color: 0xceb221, emissive: 0x4132aa, wireframe: true });
let obj21 = new T.Mesh(geo2, m21);
obj21.position.set(0, 1, 0);
obj21.scale.set(1, 4, 2);
obj21.rotation.set(Math.PI / 4, 0, Math.PI / 4);
obj21.castShadow = true;
obj2.add(obj21);

let m22 = new T.MeshStandardMaterial({ color: 0xceb221, emissive: 0x4132aa });
let obj22 = new T.Mesh(geo2, m22);
obj22.position.set(0, 0.4, 0.5);
obj22.scale.set(4, 0.5, 1);
obj22.rotation.set(-Math.PI / 4, 0, -Math.PI / 4);
obj22.castShadow = true;
obj2.add(obj22);

let m23 = new T.MeshStandardMaterial({ color: 0x55b7ab, roughness: 0, flatShading: true });
let obj23 = new T.Mesh(geo2, m23);
obj23.position.set(0, 0.4, 0.5);
obj23.scale.set(4, 0.5, 1);
obj23.rotation.set(-Math.PI / 4, 0, Math.PI / 4);
obj23.castShadow = true;
obj2.add(obj23);
// sphere
let gs = new T.SphereBufferGeometry(3, 20, 20);
let m24 = new T.MeshStandardMaterial({ color: 0x92e2d9, roughness: 0.2, wireframe: true });
let obj24 = new T.Mesh(gs, m24);
obj24.position.set(0, 0.5, 0);
obj24.castShadow = true;
obj2.add(obj24);

// above the ground
obj2.position.set(-2, 2, 2);
obj2.scale.set(0.25, 0.25, 0.25);
scene.add(obj2);

// camera_2
camera_2.position.z = 5;
camera_2.position.y = 3;
camera_2.position.x = -2;
camera_2.lookAt(obj2.position);

// spot light 2
let spotlight_2 = new T.SpotLight(0xaaaaff, 0.7);
spotlight_2.angle = Math.PI / 12;
spotlight_2.castShadow = true;
spotlight_2.position.set(-2, 4, 2);
spotlight_2.target.position.set(-2, 0, 2);
spotlight_2.castShadow = true;
scene.add(spotlight_2);
scene.add(spotlight_2.target);

// third
let obj3 = new T.Group();
let geo3 = new T.BoxGeometry(1, 1, 1);

// middle
let m31 = new T.MeshStandardMaterial({ color: 0x6083c6, roughness: 0.1 });
let obj31 = new T.Mesh(geo3, m31);
obj31.position.set(0, 1, 0);
obj31.scale.set(2, 2, 2);
obj31.rotation.set(Math.PI / 4, 0, 0);
obj31.castShadow = true;
obj3.add(obj31);

let m32 = new T.MeshStandardMaterial({ color: 0xdd2063, roughness: 0.1 });
let obj32 = new T.Mesh(geo3, m32);
obj32.position.set(0, 1, 0);
obj32.scale.set(2, 2, 2);
obj32.rotation.set(0, Math.PI / 4, 0);
obj32.castShadow = true;
obj3.add(obj32);

let m33 = new T.MeshStandardMaterial({ color: 0xddd520, roughness: 0.1 });
let obj33 = new T.Mesh(geo3, m33);
obj33.position.set(0, 1, 0);
obj33.scale.set(2, 2, 2);
obj33.rotation.set(0, 0, Math.PI / 4);
obj33.castShadow = true;
obj3.add(obj33);

let obj34 = new T.Mesh(geo3, m31);
obj34.position.set(0, 1, 0);
obj34.scale.set(0.25, 5, 0.25);
obj34.castShadow = true;
obj3.add(obj34);

let obj35 = new T.Mesh(geo3, m32);
obj35.position.set(0, 1, 0);
obj35.scale.set(0.25, 0.25, 5);
obj35.castShadow = true;
obj3.add(obj35);

let obj36 = new T.Mesh(geo3, m33);
obj36.position.set(0, 1, 0);
obj36.scale.set(5, 0.25, 0.25);
obj36.castShadow = true;
obj3.add(obj36);

let m37 = new T.MeshStandardMaterial({ color: 0xffffff, flatShading: true, wireframe: true });
let obj37 = new T.Mesh(geo3, m37);
obj37.position.set(0, 1, 0);
obj37.scale.set(5, 5, 5);
obj37.castShadow = true;
obj3.add(obj37);

// above the ground
obj3.position.set(2, 1.8, -2);
obj3.scale.set(0.2, 0.2, 0.2);
scene.add(obj3);

// camera_3
camera_3.position.z = -5;
camera_3.position.y = 3;
camera_3.position.x = 2;
camera_3.lookAt(obj3.position);

// spot light 3
let spotlight_3 = new T.SpotLight(0xaaaaff, 0.7);
spotlight_3.angle = Math.PI / 12;
spotlight_3.castShadow = true;
spotlight_3.position.set(2, 4, -2);
spotlight_3.castShadow = true;
spotlight_3.target.position.set(2, 0, -2);
scene.add(spotlight_3);
scene.add(spotlight_3.target);

// fourth
let obj4 = new T.Group();

// two cones
let g41 = new T.ConeGeometry(1, 2, 32);
let m41 = new T.MeshStandardMaterial({ color: 0xFFB675, roughness: 0, wireframe: true });
let obj41 = new T.Mesh(g41, m41);
obj41.position.set(0, 1, 0);
obj41.rotateX(Math.PI);
obj41.castShadow = true;
obj4.add(obj41);

let obj42 = new T.Mesh(g41, m41);
obj42.position.set(0, 0, 0);
obj42.castShadow = true;
obj4.add(obj42);

let g43 = new T.CylinderGeometry(1.5, 1.5, 0.2, 32, 1, true);
let m43 = new T.MeshStandardMaterial({ color: 0x53CCE6, roughness: 0, flatShading: true });
let obj43 = new T.Mesh(g43, m43);
obj43.position.set(0, 0.6, 0);
obj43.castShadow = true;
obj4.add(obj43);

let g44 = new T.CylinderGeometry(1.5, 1.5, 3.4, 32);
let m44 = new T.MeshStandardMaterial({ color: 0x53CCE6, roughness: 0, flatShading: true, wireframe: true });
let obj44 = new T.Mesh(g44, m44);
obj44.position.set(0, 0.5, 0);
obj44.castShadow = true;
obj4.add(obj44);

// above the ground
obj4.position.set(-2, 1.7, -2);
obj4.scale.set(0.25, 0.25, 0.25);
scene.add(obj4);

// camera_4
camera_4.position.z = -5;
camera_4.position.y = 3;
camera_4.position.x = -2;
camera_4.lookAt(obj4.position);

// spot light 4
let spotlight_4 = new T.SpotLight(0xaaaaff, 0.7);
spotlight_4.angle = Math.PI / 12;
spotlight_4.castShadow = true;
spotlight_4.position.set(-2, 4, -2);
spotlight_4.target.position.set(-2, -2, -2);
spotlight_4.castShadow = true;
scene.add(spotlight_4.target);
scene.add(spotlight_4);

/** create a "main camera" */
/** @type{T.PerspectiveCamera} */
let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
main_camera.position.set(0, 4, 6);
main_camera.rotation.set(-0.5, 0, 0);

/** this will be the "current camera" - we will switch when a button is pressed */
let active_camera = main_camera;

scene.add(cube);

// add orbit controls - but only to the main camera
let controls = new OrbitControls(main_camera, renderer.domElement);

/** Tie the buttons to the cameras */
function setupCamButton(name, camera) {
  const button = document.getElementById(name);
  if (!(button instanceof HTMLButtonElement))
    throw new Error(`Button ${name} doesn't exist`);
  button.onclick = function () {
    active_camera = camera;
    renderer.render(scene, active_camera);
  };
}
setupCamButton("main_cam", main_camera);
setupCamButton("cam_1", camera_1);
setupCamButton("cam_2", camera_2);
setupCamButton("cam_3", camera_3);
setupCamButton("cam_4", camera_4);

// finally, draw the scene. Also, add animation.
renderer.render(scene, active_camera);

let lastTimestamp; // undefined to start
let curH3 = 0;
let dir3 = 1;
let curD4 = 0;
let dir4 = 1;
function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
  lastTimestamp = timestamp;

  // Animate the cube (basic object)
  cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);

  // obj2
  if (lastTimestamp) {
    obj2.rotateX(timeDelta * 1.2);

    let t_theta = 0.5 * ((0.001 * timestamp) % 2.0);
    let theta = Math.PI * 2 * t_theta;
    let y = Math.cos(theta) / 10 + 2;
    let x = Math.sin(theta) / 10 - 2;
    // point spotlight 2
    obj2.position.set(x, y, obj2.position.z);
  }

  // obj3
  if (lastTimestamp) {
    curH3 += timeDelta * dir3;
    obj3.translateY(timeDelta * dir3);
    if (curH3 > 0.25) {
      dir3 = -1;
    }
    if (curH3 < -0.25) {
      dir3 = 1;
    }
    let t_theta = 0.5 * ((0.001 * timestamp) % 2.0);
    let theta = Math.PI * 2 * t_theta;
    let x = Math.cos(theta) / 10 + 2;
    let z = Math.sin(theta) / 10 - 2;
    // point spotlight 2
    obj3.position.set(x, obj3.position.y, z);
  }

  // obj4
  if (lastTimestamp) {
    curD4 += timeDelta * dir4;
    obj4.rotateZ(timeDelta * dir4);
    if (curD4 > Math.PI / 3) {
      dir4 = -1;
    }
    if (curD4 < -Math.PI / 3) {
      dir4 = 1;
    }

    let t_theta = 0.5 * ((0.001 * timestamp) % 2.0);
    let theta = Math.PI * 2 * t_theta;
    let x = Math.cos(theta) / 10 - 2;
    let y = Math.sin(theta) / 10 + 1.7;
    // point spotlight 2
    obj4.position.set(x, y, obj4.position.z);
  }

  // draw and loop
  renderer.render(scene, active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
