/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Group, MeshToonMaterial, PositionalAudio } from "../libs/CS559-Three/build/three.module.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program
// helper, door and window to add to the house
let car1Cnt = 0;
export class Car1 extends GrObject {
  constructor(param = {}) {
    let g = new T.Group();
    let lg = new T.Group(); // larger group, car in the center
    super("car1" + String(car1Cnt++), lg);

    let geometry = new T.Geometry();
    // front 0-4 
    let wf = 0.3;
    let wb = 2;
    let wt = 0.2;
    let hb = 0.5;
    let ht = 0.75;
    let hf = hb - 0.1;
    let l = -1.5;

    // ridable
    if (!param.notRidable) {
      let gw = new T.CylinderGeometry(0.1, 0.1, 0.2);
      let mw = new T.MeshStandardMaterial({ transparent: true, opacity: 0 });
      let w1 = new T.Mesh(gw, mw);
      w1.position.y = hb + ht;
      // w1.rotation.x = Math.PI/2;
      w1.rotation.y = -Math.PI / 2;
      g.add(w1);
      this.rideable = w1;
    }


    // to stepworld
    lg.add(g);
    g.position.z = -l / 2;
    g.position.x = -(wf + wb + wt) / 2;

    // front 0-6
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(wf + wb, 0, 0));
    geometry.vertices.push(new T.Vector3(wf + wb, hb, 0));
    geometry.vertices.push(new T.Vector3(wf + wb, hb + ht, 0));
    geometry.vertices.push(new T.Vector3(wf + wt, hb + ht, 0));
    geometry.vertices.push(new T.Vector3(wf, hb, 0));
    geometry.vertices.push(new T.Vector3(0, hf, 0));
    // back 7-13
    geometry.vertices.push(new T.Vector3(0, 0, l));
    geometry.vertices.push(new T.Vector3(wf + wb, 0, l));
    geometry.vertices.push(new T.Vector3(wf + wb, hb, l));
    geometry.vertices.push(new T.Vector3(wf + wb, hb + ht, l));
    geometry.vertices.push(new T.Vector3(wf + wt, hb + ht, l));
    geometry.vertices.push(new T.Vector3(wf, hb, l));
    geometry.vertices.push(new T.Vector3(0, hf, l));

    geometry.faceVertexUvs = [
      []
    ];

    // front bottom
    let ff1 = new T.Face3(0, 1, 6);
    geometry.faces.push(ff1);
    geometry.faceVertexUvs[0].push([]);
    let ff2 = new T.Face3(6, 1, 5);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]);
    let ff3 = new T.Face3(1, 2, 5);
    geometry.faces.push(ff3);
    geometry.faceVertexUvs[0].push([]);

    // front top
    let ff4 = new T.Face3(2, 3, 4);
    geometry.faces.push(ff4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0.12, 1)
    ]);
    let ff5 = new T.Face3(4, 5, 2);
    geometry.faces.push(ff5);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(.12, 1),
      new T.Vector2(0.02, 0),
      new T.Vector2(1, 0)
    ]);

    // back bottom
    let fb1 = new T.Face3(8, 9, 2);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]);
    let fb2 = new T.Face3(2, 1, 8);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]);

    // back top
    let fb3 = new T.Face3(9, 10, 3);
    geometry.faces.push(fb3);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.99, 0),
      new T.Vector2(0.99, 1),
      new T.Vector2(0.5, 1)
    ]);
    let fb4 = new T.Face3(3, 2, 9);
    geometry.faces.push(fb4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.5, 1),
      new T.Vector2(0.5, 0),
      new T.Vector2(0.99, 0)
    ]);

    // front bottom
    let ffo1 = new T.Face3(6, 13, 7);
    geometry.faces.push(ffo1);
    geometry.faceVertexUvs[0].push([]);
    let ffo2 = new T.Face3(7, 0, 6);
    geometry.faces.push(ffo2);
    geometry.faceVertexUvs[0].push([]);

    // front middle
    let ffo3 = new T.Face3(6, 5, 12);
    geometry.faces.push(ffo3);
    geometry.faceVertexUvs[0].push([]);
    let ffo4 = new T.Face3(12, 13, 6);
    geometry.faces.push(ffo4);
    geometry.faceVertexUvs[0].push([]);

    // front top
    let ffo5 = new T.Face3(5, 4, 11);
    geometry.faces.push(ffo5);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0.99, 0),
      new T.Vector2(0.99, 1),
      new T.Vector2(0.5, 1)
      ]
    );
    let ffo6 = new T.Face3(11, 12, 5);
    geometry.faces.push(ffo6);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0.5, 1),
      new T.Vector2(0.5, 0),
      new T.Vector2(0.99, 0)
      ]
    );

    // top
    let ft1 = new T.Face3(3, 10, 11);
    geometry.faces.push(ft1);
    geometry.faceVertexUvs[0].push([]);
    let ft2 = new T.Face3(11, 4, 3);
    geometry.faces.push(ft2);
    geometry.faceVertexUvs[0].push([]);

    // bottom
    let fbo1 = new T.Face3(0, 7, 8);
    geometry.faces.push(fbo1);
    geometry.faceVertexUvs[0].push([]);
    let fbo2 = new T.Face3(8, 1, 0);
    geometry.faces.push(fbo2);
    geometry.faceVertexUvs[0].push([]);

    // left bottom
    let fl1 = new T.Face3(13, 8, 7);
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]);
    let fl2 = new T.Face3(13, 12, 8);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]);
    let fl3 = new T.Face3(12, 9, 8);
    geometry.faces.push(fl3);
    geometry.faceVertexUvs[0].push([]);

    // left top
    let fl4 = new T.Face3(11, 10, 9);
    geometry.faces.push(fl4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.12, 1),
      new T.Vector2(1, 1),
      new T.Vector2(1, 0)
    ]);
    let fl5 = new T.Face3(9, 12, 11);
    geometry.faces.push(fl5);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(0.02, 0),
      new T.Vector2(.12, 1)
    ]);

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    // default door
    let matPath = param.mat ? param.mat : "./imgs/car_side.png";

    let tl = new T.TextureLoader().load(matPath);
    let material = new T.MeshStandardMaterial({
      map: tl,
      // transparent: true,
      color: param.color ? param.color : "white",
    });
    let mesh = new T.Mesh(geometry, material);

    g.add(mesh);
    mesh.translateY(0.2);

    let wheels = this.wheelG(wb - 0.5, -l, 0.25, "black");
    wheels.translateX(0.4);
    g.add(wheels);

    // add a bucky on the top
    let bucky = new addOnObj({
      yrot: -Math.PI / 2,
      y: hb + ht + 0.21,
      x: 0.75,
      z: -1.25
    });
    bucky.objects[0].rotateX(-Math.PI / 2)
    g.add(bucky.objects[0]);

    // set position and scale
    lg.position.x = param.x ? param.x : lg.position.x;
    lg.position.y = param.y ? param.y : lg.position.y;
    lg.position.z = param.z ? param.z : lg.position.z;

    lg.rotation.x = param.xrot ? param.xrot : lg.rotation.x;
    lg.rotation.y = param.yrot ? param.yrot : lg.rotation.y;
    lg.rotation.z = param.zrot ? param.zrot : lg.rotation.z;

    lg.scale.x = param.xscale ? param.xscale : lg.scale.x;
    lg.scale.y = param.yscale ? param.yscale : lg.scale.y;
    lg.scale.z = param.zscale ? param.zscale : lg.scale.z;

    // this.lg = lg; // larger group, car in the center
    this.car = lg;
    this.moving = param.move;
    this.time = 0;
    this.direction = param.direction ? param.direction : 1;
    this.rotating = param.rotating ? param.rotating : false;
    // default for vertical paths
    this.start = param.end ? param.start : 12;
    this.end = param.start ? param.end : -18;
    // in case of error in rounding
    this.startx = param.startx ? param.startx : 15.1;
    this.endx = param.endx ? param.endx : 13.92;

    this.rotateTar = param.rotateTar ? param.rotateTar : 0;
    this.rotateStrAng = 0;
    this.rotateDir = param.rotateDir ? param.rotateDir : 1;
    // rotation radius, half of the width of the road
    this.roadR = param.roadR ? param.roadR : 0.60;
    this.rotateStrTime = 0;
    this.rotateStrPosX = 0;
    this.rotateStrPosZ = 0;
  }

  stepWorld(delta, timeOfDay) {
    if (this.moving === "stop") {
      return;
    }
    this.time += delta / 5000;

    if (this.moving === "vertical") {
      let speed = delta / 100;
      this.moveVertical(delta, speed);
    }
  }

  /**
   * helper method to move in vertical road
   * @param {*} delta: time delta, change in time
   */
  moveVertical(delta, speed) {
    if (this.moving === "vertical") {
      if (this.rotating) {
        // use time after rotation
        // arc lengh param: arclen = 2PI*R * (theta/2PI) = speed
        let theta = speed / this.roadR;
        if (this.rotateDir == 1) {
          // end of the road, rotate to go back to house
          let rotateTo = this.car.rotation.y + theta;

          let z = this.rotateStrPosZ - this.roadR * Math.sin(rotateTo - this.rotateStrAng);
          let x = this.rotateStrPosX - this.roadR + this.roadR * Math.cos(rotateTo - this.rotateStrAng);
          this.car.position.x = x;
          this.car.position.z = z;
          this.car.rotation.y = rotateTo;

          if (this.car.rotation.y > this.rotateTar) {
            this.car.rotation.y = this.rotateTar;
            this.car.position.z = this.end;
            this.car.position.x = this.endx;
            this.rotating = false;
          }
        } else {
          // at house, rotate to go back to end
          let rotateTo = this.car.rotation.y + theta;
          let z = this.rotateStrPosZ + this.roadR * Math.sin(rotateTo - this.rotateStrAng);
          let x = this.rotateStrPosX + this.roadR - this.roadR * Math.cos(rotateTo - this.rotateStrAng);
          this.car.position.x = x;
          this.car.position.z = z;
          this.car.rotation.y = rotateTo;

          if (this.car.rotation.y >= this.rotateTar) {
            this.car.rotation.y = this.rotateTar - Math.PI * 2;
            this.rotating = false;
            this.car.position.z = this.start;
            this.car.position.x = this.startx;
          }
        }

      } else {
        // moving
        if (this.direction === 1) {
          // moving forward from house to the end
          this.car.position.z -= speed;
          // change state if reach the end
          if (this.car.position.z <= this.end) {
            this.direction = -1;
            this.rotating = true;
            this.rotateTar = Math.PI / 2;
            this.rotateStrAng = this.car.rotation.y;
            this.rotateDir = 1;
            this.rotateStrTime = this.time;
            this.rotateStrPosX = this.car.position.x;
            this.rotateStrPosZ = this.car.position.z;
          }
        } else {
          // moving backward, from the end to the houses
          this.car.position.z += speed;

          if (this.car.position.z >= this.start) {
            this.direction = 1;
            this.rotating = true;
            this.rotateTar = Math.PI / 2 * 3;
            this.rotateStrAng = this.car.rotation.y;
            this.rotateDir = -1;
            this.rotateStrTime = this.time;
            this.rotateStrPosX = this.car.position.x;
            this.rotateStrPosZ = this.car.position.z;
          }
        }
      }
    }
  }

  /**
   * helper method to create the group of wheels
   * @param {*} x 
   * @param {*} z 
   * @param {*} r 
   */
  wheelG(x, z, r, color) {
    let g = new T.Group();

    // cylinder for wheel
    let gw = new T.CylinderGeometry(r, r, 0.2);
    let mw = new T.MeshStandardMaterial({ color: color });

    let w1 = new T.Mesh(gw, mw);
    w1.translateY(r);
    w1.rotateX(Math.PI / 2);

    let w2 = new T.Mesh(gw, mw);
    w2.translateY(r);
    w2.rotateX(Math.PI / 2);
    w2.translateX(x);
    w2.translateY(-z); // translate y, after rotate on x 90 degree

    let w3 = new T.Mesh(gw, mw);
    w3.translateY(r);
    w3.rotateX(Math.PI / 2);
    w3.translateX(x);

    let w4 = new T.Mesh(gw, mw);
    w4.translateY(r);
    w4.rotateX(Math.PI / 2);
    w4.translateY(-z); // translate y, after rotate on x 90 degree

    g.add(w1);
    g.add(w2);
    g.add(w3);
    g.add(w4);


    return g;
  }
}

let car2Cnt = 0;
export class Car2 extends GrObject {
  constructor(param = {}) {
    let g = new T.Group();
    let lg = new T.Group();

    super("car2" + String(car2Cnt++), lg);

    let geometry = new T.Geometry();
    // front 0-4 
    let wf = 1;
    let wb = 3;
    let wt = 0.2;
    let hb = 0.5;
    let ht = 0.75;
    let l = -1.5;

    lg.add(g);
    g.position.z = -l / 2;
    g.position.x = -(wf + wb + wt) / 2;

    // front 0-5
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(wf, 0, 0));
    geometry.vertices.push(new T.Vector3(wf + wb, 0, 0));
    geometry.vertices.push(new T.Vector3(wf + wb, hb + ht, 0));
    geometry.vertices.push(new T.Vector3(wf, hb + ht, 0));
    geometry.vertices.push(new T.Vector3(0, hb, 0));
    // back 6-11
    geometry.vertices.push(new T.Vector3(0, 0, l));
    geometry.vertices.push(new T.Vector3(wf, 0, l));
    geometry.vertices.push(new T.Vector3(wf + wb, 0, l));
    geometry.vertices.push(new T.Vector3(wf + wb, hb + ht, l));
    geometry.vertices.push(new T.Vector3(wf, hb + ht, l));
    geometry.vertices.push(new T.Vector3(0, hb, l));
    // aux point 12, 13
    geometry.vertices.push(new T.Vector3(wf, hb, 0));
    geometry.vertices.push(new T.Vector3(wf, hb, l));


    geometry.faceVertexUvs = [
      []
    ];

    // front bottom
    let ff1 = new T.Face3(0, 5, 11);
    geometry.faces.push(ff1);
    geometry.faceVertexUvs[0].push([]);
    let ff2 = new T.Face3(11, 6, 0);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]);

    // front top
    let ff3 = new T.Face3(4, 10, 11);
    geometry.faces.push(ff3);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.99, 1),
      new T.Vector2(0.5, 0.99),
      new T.Vector2(0.5, 0)
    ]);
    let ff4 = new T.Face3(11, 5, 4);
    geometry.faces.push(ff4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.5, 0),
      new T.Vector2(0.99, 0),
      new T.Vector2(0.99, 1)
    ]);

    // bottom
    let fb1 = new T.Face3(0, 6, 8);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]);
    let fb2 = new T.Face3(8, 2, 0);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]);

    // left front bottom
    let fl1 = new T.Face3(1, 12, 5)
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]);
    let fl2 = new T.Face3(5, 0, 1);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]);

    // left front top
    let fl3 = new T.Face3(4, 5, 12);
    geometry.faces.push(fl3);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.15, 1),
      new T.Vector2(0.03, 0),
      new T.Vector2(0.4, 0)
    ]);

    // left end
    let fl4 = new T.Face3(2, 3, 4)
    geometry.faces.push(fl4);
    geometry.faceVertexUvs[0].push([]);
    let fl5 = new T.Face3(4, 1, 2);
    geometry.faces.push(fl5);
    geometry.faceVertexUvs[0].push([]);

    // top
    let ft1 = new T.Face3(3, 9, 10)
    geometry.faces.push(ft1);
    geometry.faceVertexUvs[0].push([]);
    let ft2 = new T.Face3(10, 4, 3);
    geometry.faces.push(ft2);
    geometry.faceVertexUvs[0].push([]);

    // back
    let fba1 = new T.Face3(8, 9, 3)
    geometry.faces.push(fba1);
    geometry.faceVertexUvs[0].push([]);
    let fba2 = new T.Face3(3, 2, 8);
    geometry.faces.push(fba2);
    geometry.faceVertexUvs[0].push([]);

    // right end
    let fr1 = new T.Face3(7, 10, 9)
    geometry.faces.push(fr1);
    geometry.faceVertexUvs[0].push([]);
    let fr2 = new T.Face3(9, 8, 7);
    geometry.faces.push(fr2);
    geometry.faceVertexUvs[0].push([]);

    // right front bottom
    let fr3 = new T.Face3(6, 11, 13)
    geometry.faces.push(fr3);
    geometry.faceVertexUvs[0].push([]);
    let fr4 = new T.Face3(13, 7, 6);
    geometry.faces.push(fr4);
    geometry.faceVertexUvs[0].push([]);

    // right front top
    let fr5 = new T.Face3(10, 13, 11);
    geometry.faces.push(fr5);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.15, 1),
      new T.Vector2(0.4, 0),
      new T.Vector2(0.03, 0)
    ]);


    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;
    // default door
    let matPath = param.mat ? param.mat : "./imgs/car_side.png";

    let tl = new T.TextureLoader().load(matPath);
    let material = new T.MeshStandardMaterial({
      map: tl,
      // transparent: true,
      color: param.color ? param.color : "white",
    });
    let mesh = new T.Mesh(geometry, material);

    g.add(mesh);
    mesh.translateY(0.2);

    let wheels = this.wheelG(wb - 0.6, -l, 0.25, "black");
    wheels.translateX(0.6);
    g.add(wheels);

    // ridable
    let gw = new T.CylinderGeometry(0.1, 0.1, 0.2);
    let mw = new T.MeshStandardMaterial({ transparent: true, opacity: 0 });
    let w1 = new T.Mesh(gw, mw);
    w1.position.y = hb + ht;
    // w1.rotation.x = Math.PI/2;
    w1.rotation.y = -Math.PI / 2;
    g.add(w1);
    this.rideable = w1;

    // bucky left
    let bucky = new addOnObj({
      h: 300 / 287, // image size
      y: 0.3,
      x: 1.75,
      z: 0.01,
      mat: "./imgs/bucky2.png"
    });

    g.add(bucky.objects[0]);
    // this.rideable = bucky.objects[0];

    // bucky right
    let bucky2 = new addOnObj({
      yrot: Math.PI,
      h: 300 / 287, // image size
      y: 0.3,
      x: 2.75,
      z: l - 0.01,
      mat: "./imgs/bucky2.png"
    });

    g.add(bucky2.objects[0]);

    // set position and scale
    lg.position.x = param.x ? param.x : lg.position.x;
    lg.position.y = param.y ? param.y : lg.position.y;
    lg.position.z = param.z ? param.z : lg.position.z;

    lg.rotation.x = param.xrot ? param.xrot : lg.rotation.x;
    lg.rotation.y = param.yrot ? param.yrot : lg.rotation.y;
    lg.rotation.z = param.zrot ? param.zrot : lg.rotation.z;

    lg.scale.x = param.xscale ? param.xscale : lg.scale.x;
    lg.scale.y = param.yscale ? param.yscale : lg.scale.y;
    lg.scale.z = param.zscale ? param.zscale : lg.scale.z;
    this.car = lg;
    this.moving = param.move;
    this.time = 0;
    this.direction = param.direction ? param.direction : 1;
    this.rotating = param.rotating ? param.rotating : false;
    // default for vertical paths
    this.start = param.end ? param.start : 12;
    this.end = param.start ? param.end : -18;
    this.startx = param.startx ? param.startx : 15.1;
    this.endx = param.endx ? param.endx : 13.92;
    this.rotateTar = param.rotateTar ? param.rotateTar : 0;
    this.rotateStrAng = 0;
    this.rotateDir = param.rotateDir ? param.rotateDir : 1;
    // rotation radius, half of the width of the road
    this.roadR = param.roadR ? param.roadR : 0.60;
    this.rotateStrTime = 0;
    this.rotateStrPosX = 0;
    this.rotateStrPosZ = 0;

    if (this.moving == "mountain") {
      // x,y,z, rotx, roty, rotz, list of states
      let b1forz = 13.2
      let b2upx = -16;
      let b2downx = -17;
      let b1backz = 14.2;
      // to move for between mountain and parking
      this.stage = param.stage ? param.stage : 0;
      this.sListInd = param.sListInd ? param.sListInd : 0;
      let stagePt = [
        [8, 0, 8.5, 0, 0, 0, ["forward", "left"]], // parking lot
        [4, 0, 8.5, 0, Math.PI / 2, 0, ["forward", "left"]], // lot out, to the road
        [4, 0, b1forz, 0, 0, 0, ["forward"]], // on the road, before bridge 1
        [-3, 0, b1forz, 0, 0, 0, ["upz"]], // to go up to bridge 1
        [-6, 2, b1forz, 0, 0, -35 / 360 * Math.PI * 2, ["downz", "forward"]], // finish go  up, to the top of the bridge
        [-12.3, 2, b1forz, 0, 0, 0, ["downz", "downward"]], // on the bridge, to go down
        [-14.3, 0.5, b1forz, 0, 0, 40 / 360 * Math.PI * 2, ["upz"]], // end to the bridge, return to ground
        [b2upx, 0, b1forz, 0, 0, 0, ["left"]], // before turn
        [b2upx, 0, b1forz, 0, -Math.PI / 2, 0, ["forward"]], // before road to bridge 2
        [b2upx, 0, 8.5, 0, -Math.PI / 2, 0, ["upx"]], // before go up to bridge 2
        [b2upx, 5, 1, 30 / 360 * Math.PI * 2, -Math.PI / 2, 0, ["downx", "movex"]], // end of first step
        [b2upx, 6.75, -3.5, 22 / 360 * Math.PI * 2, -Math.PI / 2, 0, ["downx", "movex"]], // end of second step
        [b2upx, 7.4, -7, 8 / 360 * Math.PI * 2, -Math.PI / 2, 0, ["180"]], // end going up, to go back
        [b2downx, 7.4, -7, 8 / 360 * Math.PI * 2, Math.PI / 2, 0, ["movex"]], // going back
        [b2downx, 7, -4.3, 8 / 360 * Math.PI * 2, Math.PI / 2, 0, ["downx", "movex"]], // first change x rotation
        [b2downx, 5, 1, 22 / 360 * Math.PI * 2, Math.PI / 2, 0, ["downx", "movex"]], // second change x rotation
        [b2downx, 0.6, 7.2, 35 / 360 * Math.PI * 2, Math.PI / 2, 0, ["upx"]], // bottom of bridge2, go to bridge1
        [b2downx, 0, 8.5, 0, Math.PI / 2, 0, ["forward", "right"]], // before go up to bridge 1
        [b2downx, 0, b1backz, 0, -Math.PI, 0, ["forward"]],
        [-15.5, 0, b1backz, 0, -Math.PI, 0, ["upz"]], // up to bridge 2
        [-12.3, 2, b1backz, 0, -Math.PI, -35 / 360 * Math.PI * 2, ["downz", "forward"]], // on bridge2
        [-6, 2, b1backz, 0, -Math.PI, 0, ["downz", "downward"]], // return to ground
        [-4, 0.5, b1backz, 0, -Math.PI, 35 / 360 * Math.PI * 2, ["upz"]],
        [-2.7, 0, b1backz, 0, -Math.PI, 0, ["forward", "left"]], // go back to parking
        [4, 0, 0, 0, -Math.PI / 2, 0, ["forward"]], // go back to parking
        [4, 0, 8.5, 0, -Math.PI / 2, 0, ["left", "backward"]], // go back to parking
      ];
      lg.position.x = stagePt[this.stage][0];
      lg.position.y = stagePt[this.stage][1];
      lg.position.z = stagePt[this.stage][2];
      lg.rotation.x = stagePt[this.stage][3];
      lg.rotation.y = stagePt[this.stage][4];
      lg.rotation.z = stagePt[this.stage][5];

      this.state = param.state ? param.state : stagePt[this.stage][6][0];
      this.stagePt = stagePt;
      this.strStage = stagePt[this.stage];
      this.tarStage = stagePt[(this.stage + 1) % stagePt.length];
      this.xToY = (this.tarStage[0] - this.strStage[0]) / (this.tarStage[1] - this.strStage[1])
      this.ratioSqrt = Math.sqrt(this.xToY * this.xToY + 1);
    }

  }

  stepWorld(delta, timeOfDay) {
    if (this.moving === "stop") {
      return;
    }
    this.time += delta / 5000;

    if (this.moving === "vertical") {
      let speed = delta / 100;
      this.moveVertical(delta, speed);
    }
    if (this.moving === "mountain") {
      let speed = delta / 300;
      this.moveMountain(delta, speed);
    }
  }

  /**
   * helper method to mover between parking and mountain
   * @param {*} delta 
   * @param {*} speed 
   */
  moveMountain(delta, speed) {
    switch (this.state) {
      case "forward":
        // forward based on cur y
        let curDir = this.car.rotation.y;
        if (curDir == 0) {
          this.car.position.x -= speed;
          // check whether go to next state, 
          // set position incase of rounding error
          if (this.car.position.x <= this.tarStage[0]) {
            this.car.position.x = this.tarStage[0];
            this.nextStage();
          }
        } else if (curDir == Math.PI / 2) {
          this.car.position.z += speed;
          if (this.car.position.z >= this.tarStage[2]) {
            this.car.position.z = this.tarStage[2];
            this.nextStage();
          }
        } else if (curDir == -Math.PI / 2) {
          this.car.position.z -= speed;
          if (this.car.position.z <= this.tarStage[2]) {
            this.car.position.z = this.tarStage[2];
            this.nextStage();
          }
        } else {
          // curDir == Math.PI
          this.car.position.x += speed;
          if (this.car.position.x >= this.tarStage[0]) {
            this.car.position.x = this.tarStage[0];
            this.nextStage();
          }
        }

        break;
      case "left":
        // turn left 90 degree 
        this.car.rotation.y = this.car.rotation.y + speed / this.roadR;
        if (this.car.rotation.y > this.tarStage[4]) {
          // set the rotation incase or error
          this.car.rotation.y = this.tarStage[4];
          this.nextStage();
        }
        break
      case "right":
        // turn left 90 degree  
        this.car.rotation.y = this.car.rotation.y - speed / this.roadR;

        if (this.car.rotation.y > this.tarStage[4]) {
          // set the rotation incase or error
          this.car.rotation.y = this.tarStage[4];
          this.nextStage();
        }
      case "backward":
        this.car.position.x += speed;
        // check whether go to next state, 
        // set position incase of rounding error
        if (this.car.position.x >= this.tarStage[0]) {
          this.car.position.x = this.tarStage[0];
          this.nextStage();
        }
        break;
      case "downward": // moving down, not turn
        if (this.car.rotation.y == 0) {
          if (this.car.position.x >= this.tarStage[0]) {
            this.car.position.x -= speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y -= speed / this.ratioSqrt;
          } else {
            this.car.position.x = this.tarStage[0];
            this.car.position.y = this.tarStage[1];
            // check whether reach the z point
            this.nextStage();
          }
        } else {
          if (this.car.position.x <= this.tarStage[0]) {
            this.car.position.x += speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y -= speed / this.ratioSqrt;
          } else {
            this.car.position.x = this.tarStage[0];
            this.car.position.y = this.tarStage[1];
            // check whether reach the z point
            this.nextStage();
          }
        }
        break;
      case "upz":
        // rotate up on z and more forward
        if (this.car.rotation.z >= this.tarStage[5]) {
          this.car.rotation.z = this.car.rotation.z - speed / this.roadR;
        }
        let upzPosReach = false;

        if (this.car.rotation.y == 0) {
          if (this.car.position.x >= this.tarStage[0]) {
            this.car.position.x -= speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y += this.tarStage[1] > this.strStage[1] ? speed / this.ratioSqrt : -speed / this.ratioSqrt;
          } else {
            upzPosReach = true;
          }
        } else {
          if (this.car.position.x <= this.tarStage[0]) {
            this.car.position.x += speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y += this.tarStage[1] > this.strStage[1] ? speed / this.ratioSqrt : -speed / this.ratioSqrt;
          } else {
            upzPosReach = true;
          }
        }
        if (this.car.rotation.z <= this.tarStage[5] && upzPosReach) {
          // set the rotation incase or error
          this.car.rotation.z = this.tarStage[5];
          this.car.position.x = this.tarStage[0];
          this.car.position.y = this.tarStage[1];
          // check whether reach the z point
          this.nextStage();
        }
        break;
      case "downz":
        // rotate down on z, not move position
        this.car.rotation.z = this.car.rotation.z + speed / this.roadR;

        if (this.car.rotation.z >= this.tarStage[5]) {
          // set the rotation incase or error
          this.car.rotation.z = this.tarStage[5];

          // check whether reach the z point
          this.nextStage();
        }
        break;
      case "upx":
        // rotate up on z and more forward
        if (this.car.rotation.x <= this.tarStage[3]) {
          this.car.rotation.x -= this.tarStage[3] > this.strStage[3] ? -speed / this.roadR : speed / this.roadR;
        }
        let upxPosReach = false;

        if (this.car.rotation.y == Math.PI / 2) {
          if (this.car.position.z <= this.tarStage[2]) {
            this.car.position.z += speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y += this.tarStage[1] > this.strStage[1] ? speed / this.ratioSqrt : -speed / this.ratioSqrt;
          } else {
            upxPosReach = true;
          }
        } else {
          if (this.car.position.z >= this.tarStage[2]) {
            this.car.position.z -= speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y += this.tarStage[1] > this.strStage[1] ? speed / this.ratioSqrt : -speed / this.ratioSqrt;
          } else {
            upxPosReach = true;
          }
        }
        if (this.car.rotation.x >= this.tarStage[3] && upxPosReach) {
          // set the rotation incase or error
          this.car.rotation.x = this.tarStage[3];
          this.car.position.z = this.tarStage[2];
          this.car.position.y = this.tarStage[1];
          // check whether reach the z point
          this.nextStage();
        }
        break;
      case "downx": // rotate down x
        // rotate down on z, not move position
        this.car.rotation.x -= this.tarStage[3] > this.strStage[3] ? -speed / this.roadR : speed / this.roadR;
        if ((this.tarStage[3] > this.strStage[3] && this.car.rotation.x >= this.tarStage[3]) ||
          (this.tarStage[3] < this.strStage[3] && this.car.rotation.x <= this.tarStage[3])) {
          // set the rotation incase or error
          this.car.rotation.x = this.tarStage[3];
          // check whether reach the z point
          this.nextStage();
        }
        break;
      case "movex": // move upward with x rotated
        if (this.car.rotation.y == Math.PI / 2) {
          if (this.car.position.z <= this.tarStage[2]) {
            this.car.position.z += speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y += this.tarStage[1] > this.strStage[1] ? speed / this.ratioSqrt : -speed / this.ratioSqrt;
          } else {
            this.car.rotation.x = this.tarStage[3];
            this.car.position.z = this.tarStage[2];
            this.car.position.y = this.tarStage[1];
            // check whether reach the z point
            this.nextStage();
          }
        } else {
          if (this.car.position.z >= this.tarStage[2]) {
            this.car.position.z -= speed / this.ratioSqrt * Math.abs(this.xToY);
            this.car.position.y += this.tarStage[1] > this.strStage[1] ? speed / this.ratioSqrt : -speed / this.ratioSqrt;
          } else {
            this.car.rotation.x = this.tarStage[3];
            this.car.position.z = this.tarStage[2];
            this.car.position.y = this.tarStage[1];
            // check whether reach the z point
            this.nextStage();
          }
        }
        break;
      case "180":
        this.car.rotation.y += speed / this.roadR;

        let z = this.strStage[2] - this.roadR * Math.sin(this.car.rotation.y - this.strStage[4]);
        let x = this.strStage[0] - this.roadR + this.roadR * Math.cos(this.car.rotation.y - this.strStage[4]);

        this.car.position.x = x;
        // // this.car.position.y -= x / this.ratioSqrt;
        this.car.position.z = z;

        if (this.car.rotation.y >= this.tarStage[4]) {
          this.car.position.z = this.tarStage[2];
          this.car.position.x = this.tarStage[0];
          this.car.position.y = this.tarStage[1];
          this.car.rotation.y = this.tarStage[4];

          // check whether reach the z point
          this.nextStage();
        }
        break;
      default:
        console.log("error");
        break;
        return;
    }
  }

  nextStage() {
    if (this.sListInd >= this.strStage[6].length - 1) {
      if (this.stage == 2) {
        console.log("leave 2", this.car.position, this.car.rotation)
      }
      this.state = this.tarStage[6][0];
      this.sListInd = 0;
      this.stage = (this.stage + 1) % this.stagePt.length;
      this.strStage = this.stagePt[this.stage];
      this.tarStage = this.stagePt[(this.stage + 1) % this.stagePt.length];
      this.xToY = ((this.tarStage[0] - this.strStage[0]) ? ((this.tarStage[0] - this.strStage[0])) : (this.tarStage[2] - this.strStage[2])) / (this.tarStage[1] - this.strStage[1])
      this.ratioSqrt = Math.sqrt(this.xToY * this.xToY + 1);

      if (this.stage == 2) {
        console.log("state 2, update", this.stagePt[this.stage], this.strStage, this.tarStage, this.state);
        this.car.position.x = this.stagePt[this.stage][0];
        this.car.position.y = this.stagePt[this.stage][1];
        this.car.position.z = this.stagePt[this.stage][2];
        this.car.rotation.x = this.stagePt[this.stage][3];
        this.car.rotation.y = this.stagePt[this.stage][4];
        this.car.rotation.z = this.stagePt[this.stage][5];
      }

    } else {
      this.sListInd += 1;
      this.state = this.strStage[6][this.sListInd];
      this.xToY = ((this.tarStage[0] - this.strStage[0]) ? ((this.tarStage[0] - this.strStage[0])) : (this.tarStage[2] - this.strStage[2])) / (this.tarStage[1] - this.strStage[1])
      this.ratioSqrt = Math.sqrt(this.xToY * this.xToY + 1);
    }
  }

  /**
   * helper method to move in vertical road
   * @param {*} delta: time delta, change in time
   */
  moveVertical(delta, speed) {
    if (this.rotating) {
      // use time after rotation
      // arc lengh param: arclen = 2PI*R * (theta/2PI) = speed
      let theta = speed / this.roadR;
      if (this.rotateDir == 1) {
        // end of the road, rotate to go back to house
        let rotateTo = this.car.rotation.y + theta;
        let z = this.rotateStrPosZ - this.roadR * Math.sin(rotateTo - this.rotateStrAng);
        let x = this.rotateStrPosX - this.roadR + this.roadR * Math.cos(rotateTo - this.rotateStrAng);
        this.car.position.x = x;
        this.car.position.z = z;
        this.car.rotation.y = rotateTo;

        if (this.car.rotation.y > this.rotateTar) {
          this.car.rotation.y = this.rotateTar;
          this.car.position.z = this.end;
          this.car.position.x = this.endx;
          this.rotating = false;
        }
      } else {
        // at house, rotate to go back to end
        let rotateTo = this.car.rotation.y + theta;
        let z = this.rotateStrPosZ + this.roadR * Math.sin(rotateTo - this.rotateStrAng);
        let x = this.rotateStrPosX + this.roadR - this.roadR * Math.cos(rotateTo - this.rotateStrAng);
        this.car.position.x = x;
        this.car.position.z = z;
        this.car.rotation.y = rotateTo;

        if (this.car.rotation.y >= this.rotateTar) {
          this.car.rotation.y = this.rotateTar - Math.PI * 2;
          this.rotating = false;
          this.car.position.z = this.start;
          this.car.position.x = this.startx;
        }
      }

    } else {
      // moving
      if (this.direction === 1) {
        // moving forward from house to the end
        this.car.position.z -= speed;
        // change state if reach the end
        if (this.car.position.z <= this.end) {
          this.direction = -1;
          this.rotating = true;
          this.rotateTar = Math.PI / 2;
          this.rotateStrAng = this.car.rotation.y;
          this.rotateDir = 1;
          this.rotateStrTime = this.time;
          this.rotateStrPosX = this.car.position.x;
          this.rotateStrPosZ = this.car.position.z;
        }
      } else {
        // moving backward, from the end to the houses
        this.car.position.z += speed;

        if (this.car.position.z >= this.start) {
          this.direction = 1;
          this.rotating = true;
          this.rotateTar = Math.PI / 2 * 3;
          this.rotateStrAng = this.car.rotation.y;
          this.rotateDir = -1;
          this.rotateStrTime = this.time;
          this.rotateStrPosX = this.car.position.x;
          this.rotateStrPosZ = this.car.position.z;
        }
      }
    }

  }


  /**
   * helper method to create the group of wheels
   * @param {*} x 
   * @param {*} z 
   * @param {*} r 
   */
  wheelG(x, z, r, color) {
    let g = new T.Group();

    // cylinder for wheel
    let gw = new T.CylinderGeometry(r, r, 0.2);
    let mw = new T.MeshStandardMaterial({ color: color });

    let w1 = new T.Mesh(gw, mw);
    w1.translateY(r);
    w1.rotateX(Math.PI / 2);

    let w12 = new T.Mesh(gw, mw);
    w12.translateY(r);
    w12.translateX(2 * r);
    w12.rotateX(Math.PI / 2);

    let w2 = new T.Mesh(gw, mw);
    w2.translateY(r);
    w2.rotateX(Math.PI / 2);
    w2.translateX(x);
    w2.translateY(-z); // translate y, after rotate on x 90 degree
    let w22 = new T.Mesh(gw, mw);
    w22.translateY(r);
    w22.rotateX(Math.PI / 2);
    w22.translateX(x + 2 * r);
    w22.translateY(-z); // translate y, after rotate on x 90 degree

    let w3 = new T.Mesh(gw, mw);
    w3.translateY(r);
    w3.rotateX(Math.PI / 2);
    w3.translateX(x);
    let w32 = new T.Mesh(gw, mw);
    w32.translateY(r);
    w32.rotateX(Math.PI / 2);
    w32.translateX(x + 2 * r);

    let w4 = new T.Mesh(gw, mw);
    w4.translateY(r);
    w4.rotateX(Math.PI / 2);
    w4.translateY(-z); // translate y, after rotate on x 90 degree
    let w42 = new T.Mesh(gw, mw);
    w42.translateY(r);
    w42.rotateX(Math.PI / 2);
    w42.translateX(2 * r);
    w42.translateY(-z); // translate y, after rotate on x 90 degree

    g.add(w1);
    g.add(w12);
    g.add(w2);
    g.add(w22);
    g.add(w3);
    g.add(w32);
    g.add(w4);
    g.add(w42);


    return g;
  }
}


// helper, door and window to add to the house
let addOnObjCnt = 0;
class addOnObj extends GrObject {
  constructor(param = {}) {
    let geometry = new T.Geometry();
    // front 0-4 
    let h = param.h ? param.h : 1544 / 1200; // image size
    let w = param.w ? param.w : 1;
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(w, 0, 0));
    geometry.vertices.push(new T.Vector3(w, h, 0));
    geometry.vertices.push(new T.Vector3(0, h, 0));

    geometry.faceVertexUvs = [
      []
    ];
    // front
    let ff1 = new T.Face3(1, 3, 0);
    geometry.faces.push(ff1);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(1, 0),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0)
      ]
    );
    let ff2 = new T.Face3(1, 2, 3);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
      ]
    );

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;

    // default door
    let matPath = param.mat ? param.mat : "./imgs/bucky.png";

    let tl = new T.TextureLoader().load(matPath);
    let material = new T.MeshStandardMaterial({
      map: tl,
      transparent: true,
      color: param.color ? param.color : "white",
    });
    let mesh = new T.Mesh(geometry, material);
    // change the center to 0.5, 0.5, 0.5
    let g = new T.Group();
    g.add(mesh);

    // set position and scale
    g.position.x = param.x ? param.x : g.position.x;
    g.position.y = param.y ? param.y : g.position.y;
    g.position.z = param.z ? param.z : g.position.z;

    g.rotation.x = param.xrot ? param.xrot : g.rotation.x;
    g.rotation.y = param.yrot ? param.yrot : g.rotation.y;
    g.rotation.z = param.zrot ? param.zrot : g.rotation.z;

    g.scale.x = param.xscale ? param.xscale : g.scale.x;
    g.scale.y = param.yscale ? param.yscale : g.scale.y;
    g.scale.z = param.zscale ? param.zscale : g.scale.z;

    super("addOnObj" + String(addOnObjCnt++), g);
  }
}

let quadCnt = 0;
export class Quad extends GrObject {
  constructor(param = {}) {
    let g = new T.Group();
    super("quad" + String(quadCnt++), g);

    let heli = this.createHelibody();
    g.add(heli);
    heli.scale.set(1.5, 1.5, -1.5);

    // propellers, need animation, create here to get object
    // right
    let prop1 = this.creatProp();
    prop1.position.set(-0.5, -0.1, 0.45);
    prop1.rotateX(Math.PI / 2);
    heli.add(prop1);
    // left
    let prop2 = this.creatProp();
    prop2.position.set(0.5, -0.1, 0.45);
    prop2.rotateX(Math.PI / 2);
    heli.add(prop2);

    // radar 1
    let radar2 = new T.Group();
    radar2.position.x = 1;
    radar2.position.z = 1;

    // set self values for animation
    this.time = 0;
    this.heli = heli;
    this.prop1 = prop1;
    this.prop2 = prop2;

    // set position and scale
    g.position.x = param.x ? param.x : g.position.x;
    g.position.y = param.y ? param.y : g.position.y;
    g.position.z = param.z ? param.z : g.position.z;

    g.rotation.x = param.xrot ? param.xrot : g.rotation.x;
    g.rotation.y = param.yrot ? param.yrot : g.rotation.y;
    g.rotation.z = param.zrot ? param.zrot : g.rotation.z;

    g.scale.x = param.xscale ? param.xscale : g.scale.x;
    g.scale.y = param.yscale ? param.yscale : g.scale.y;
    g.scale.z = param.zscale ? param.zscale : g.scale.z;

  }

  creatProp() {
    let outerGeo = new T.TorusGeometry(0.3, 0.02, 20, 20);
    let outerMat = new T.MeshBasicMaterial({ color: 0xcec4f9 });
    let innerGeo = new T.BoxGeometry(0.5, 0.03, 0.03);
    let innerMat = new T.MeshBasicMaterial({ color: 0xcec4f9 });

    let prop = new T.Group();
    let out = new T.Mesh(outerGeo, outerMat);
    out.rotateX(Math.PI / 2);
    prop.add(out);
    let inner = new T.Mesh(innerGeo, innerMat);
    prop.add(inner);
    return prop;
  }

  createHelibody() {
    // center geo
    let heli = new T.Group();
    let bodyGeo = new T.BoxGeometry(0.3, 0.2, 1.5);
    let bodyMat = new T.MeshStandardMaterial({
      color: 0xf9c4e3,
      roughness: 0.2,
      metalness: 0.5,
    });
    let bodyRect = new T.Mesh(bodyGeo, bodyMat);
    heli.add(bodyRect);
    // head
    let headGeo = new T.CylinderGeometry(0.15, 0.15, 0.2, 20);
    let head = new T.Mesh(headGeo, bodyMat);
    head.position.z = -0.75;
    heli.add(head);
    this.rideable = head;

    // tail
    let tailGeo = new T.CylinderGeometry(0.17, 0.17, 0.2, 3);
    let tail = new T.Mesh(tailGeo, bodyMat);
    tail.position.z = 0.83;
    heli.add(tail);


    // wings
    let wingSettings = {
      steps: 2,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.05,
      bevelSegments: 2
    };
    let wing_curve = new T.Shape();
    wing_curve.moveTo(0, 0);
    wing_curve.lineTo(0.15, 0);
    wing_curve.lineTo(0.15, 1);
    wing_curve.lineTo(0.1, 1);
    wing_curve.lineTo(0, 0);
    let arm1Geo = new T.ExtrudeGeometry(wing_curve, wingSettings);
    let wingl = new T.Mesh(arm1Geo, bodyMat);
    wingl.rotateZ(-Math.PI / 2);
    wingl.rotateY(Math.PI / 2);
    wingl.position.z = 0.2;
    wingl.position.y = 0.05;
    heli.add(wingl);

    let wingr = new T.Mesh(arm1Geo, bodyMat);
    wingr.rotateZ(Math.PI / 2);
    wingr.rotateY(Math.PI / 2);
    wingr.position.z = 0.2;
    wingr.position.y = -0.1;
    heli.add(wingr);

    let winguSettings = {
      steps: 2,
      depth: 0.05,
      bevelEnabled: false,
    };
    let wingu_curve = new T.Shape();
    wingu_curve.moveTo(0, 0);
    wingu_curve.lineTo(0.1, 0.5);
    wingu_curve.lineTo(0.1, 0);
    let winguGeo = new T.ExtrudeGeometry(wingu_curve, winguSettings);
    let wingu = new T.Mesh(winguGeo, bodyMat);
    // wingu.rotateZ(Math.PI/2);
    wingu.rotateY(Math.PI / 2);
    wingu.position.z = -0.7;
    heli.add(wingu);

    // frame under wings for the prop
    // https://threejs.org/docs/#api/en/geometries/LatheGeometry
    let pointsprop = [];
    for (let i = 0; i < 10; i++) {
      pointsprop.push(new T.Vector2(Math.sin(i * 0.03), (i - 0.1) * 0.05));
    }
    let wingGeo = new T.LatheGeometry(pointsprop, 20);
    let wingMat = new T.MeshStandardMaterial({
      color: 0xf9c4e3,
      wireframe: true,
      roughness: 0.5,
      metalness: 0.4,
    });

    let framel = new T.Mesh(wingGeo, wingMat);
    framel.rotateX(Math.PI / 2);
    framel.position.set(0.5, -0.1, 0);
    heli.add(framel);

    let framer = new T.Mesh(wingGeo, wingMat);
    framer.rotateX(Math.PI / 2);
    framer.position.set(-0.5, -0.1, 0);
    heli.add(framer);

    return heli;
  }

  stepWorld(delta, timeOfDay) {
    this.time += delta / 1000;
    let x = 10 * Math.sin(this.time);
    let z = 10 * Math.cos(this.time);

    this.heli.position.x = x;
    this.heli.position.z = z;
    let rotAngle = Math.atan2(x, z) - Math.PI / 2;
    this.heli.rotation.y = rotAngle;

    this.prop1.rotation.y = this.time * 10;
    this.prop2.rotation.y = this.time * 10;
  }
}