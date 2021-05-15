// The codes in this repo should not be copied for other student assignments for any courses.
/*jshint esversion: 6 */
// @ts-check

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
import { Group, MeshToonMaterial, PositionalAudio } from "./libs/CS559-Three/build/three.module.js";

// define your buildings here - remember, they need to be imported
// into the "main" program
let house1Cnt = 0;
export class House1 extends GrObject {
  constructor(param = {}) {
    let geometry = new T.Geometry();
    // front 0-4 
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(2, 0, 0));
    geometry.vertices.push(new T.Vector3(2, 2, 0));
    geometry.vertices.push(new T.Vector3(1, 3, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    // back 5-9
    let l = 3.5; // strength the image as the original roof is too dense
    geometry.vertices.push(new T.Vector3(0, 0, -l));
    geometry.vertices.push(new T.Vector3(2, 0, -l));
    geometry.vertices.push(new T.Vector3(2, 2, -l));
    geometry.vertices.push(new T.Vector3(1, 3, -l));
    geometry.vertices.push(new T.Vector3(0, 2, -l));

    geometry.faceVertexUvs = [
      []
    ];
    // front
    let ff1 = new T.Face3(1, 4, 0);
    geometry.faces.push(ff1);
    geometry.faceVertexUvs[0].push([]);
    let ff2 = new T.Face3(1, 2, 4);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]);
    let ff3 = new T.Face3(2, 3, 4);
    geometry.faces.push(ff3);
    geometry.faceVertexUvs[0].push([]);

    // right
    let fr1 = new T.Face3(6, 7, 2);
    geometry.faces.push(fr1);
    geometry.faceVertexUvs[0].push([]);
    let fr2 = new T.Face3(2, 1, 6);
    geometry.faces.push(fr2);
    geometry.faceVertexUvs[0].push([]);

    // left
    let fl1 = new T.Face3(0, 4, 9);
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]);

    let fl2 = new T.Face3(9, 5, 0);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]);

    // bottom
    let fb1 = new T.Face3(0, 5, 6);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]);
    let fb2 = new T.Face3(6, 1, 0);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]);

    // back
    let fba1 = new T.Face3(5, 9, 7);
    geometry.faces.push(fba1);
    geometry.faceVertexUvs[0].push([]);
    let fba2 = new T.Face3(7, 6, 5);
    geometry.faces.push(fba2);
    geometry.faceVertexUvs[0].push([]);
    let fba3 = new T.Face3(9, 8, 7);
    geometry.faces.push(fba3);
    geometry.faceVertexUvs[0].push([]);

    // roof left
    let rl1 = new T.Face3(3, 8, 9);
    geometry.faces.push(rl1);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0)
      ]
    );
    let rl2 = new T.Face3(9, 4, 3);
    geometry.faces.push(rl2);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1)
      ]
    );

    // roof right
    let rr1 = new T.Face3(3, 2, 7);
    geometry.faces.push(rr1);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0)
      ]
    );
    let rr2 = new T.Face3(7, 8, 3);
    geometry.faces.push(rr2);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
      ]
    );

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;

    let color = param.color ? param.color : "white";
    let matPath = param.mat ? param.mat : "./imgs/roof1.png";

    let tl = new T.TextureLoader().load(matPath);
    let material = new T.MeshStandardMaterial({
      map: tl,
      roughness: 0.75,
      color: color
    });
    let mesh = new T.Mesh(geometry, material);
    // change the center to 0.5, 0.5, 0.5
    let g = new T.Group();
    g.add(mesh);
    mesh.position.set(-1, 0, l / 2);

    // door
    let door = new addOnObj({ h: 1.5, w: 0.75, z: 1.01, x: 0.5 });
    g.add(door.objects[0]);

    // window
    if (!param.side) {
      // 2 window at front
      let w1 = new addOnObj({
        h: 0.75, w: 0.75,
        x: -.5, z: 1.01, y: 0.75,
        mat: "./imgs/window1.png"
      });
      g.add(w1.objects[0]);

      let w2 = new addOnObj({
        h: 0.75, w: 0.75,
        x: -1.5, z: 1.01, y: 0.75,
        mat: "./imgs/window1.png"
      });
      g.add(w2.objects[0]);
    }

    // right
    let w3 = new addOnObj({
      h: 1.5, w: 0.75, yrot: Math.PI / 2,
      x: 1.76, z: 0.375, y: 0.4,
      mat: "./imgs/window4.png",
    });
    g.add(w3.objects[0]);

    // left
    let w4 = new addOnObj({
      h: 1.5, w: 0.75, yrot: -Math.PI / 2,
      x: -1.76, z: -0.375, y: 0.4,
      mat: "./imgs/window4.png",
    });
    g.add(w4.objects[0]);

    // back
    let w5 = new addOnObj({
      h: 0.75, w: 0.75, yrot: Math.PI,
      x: .375, z: -1.01, y: 0.75,
      mat: "./imgs/window1.png"
    });
    g.add(w5.objects[0]);

    let w6 = new addOnObj({
      h: 0.75, w: 0.75, yrot: Math.PI,
      x: 1.5, z: -1.01, y: 0.75,
      mat: "./imgs/window1.png"
    });
    g.add(w6.objects[0]);

    let w7 = new addOnObj({
      h: 0.75, w: 0.75, yrot: Math.PI,
      x: -0.75, z: -1.01, y: 0.75,
      mat: "./imgs/window1.png"
    });
    g.add(w7.objects[0]);

    // on roof front
    let w8 = new addOnObj({
      h: 0.75, w: 0.75, xrot: -Math.PI / 4,
      x: -1, z: 0.76, y: 2.25,
      mat: "./imgs/window1.png"
    });
    // w8.objects[0].rotateZ(Math.PI/4);
    g.add(w8.objects[0]);

    let w9 = new addOnObj({
      h: 0.75, w: 0.75, xrot: -Math.PI / 4,
      x: 0.25, z: 0.76, y: 2.25,
      mat: "./imgs/window1.png"
    });
    // w8.objects[0].rotateZ(Math.PI/4);
    g.add(w9.objects[0]);

    // roof back
    let w10 = new addOnObj({
      h: 0.75, w: 0.75, xrot: -Math.PI * 3 / 4,
      x: -1, z: -0.26, y: 2.75,
      mat: "./imgs/window1.png"
    });
    // w8.objects[0].rotateZ(Math.PI/4);
    g.add(w10.objects[0]);

    let w11 = new addOnObj({
      h: 0.75, w: 0.75, xrot: -Math.PI * 3 / 4,
      x: 0.25, z: -0.26, y: 2.75,
      mat: "./imgs/window1.png"
    });
    // w8.objects[0].rotateZ(Math.PI/4);
    g.add(w11.objects[0]);


    if (param.side) {
      // side house
      let h2 = new House2({ h: 2, mat: matPath, w: 1.5, l: 1.6, nodoor: true });
      h2.objects[0].position.x = 2.5;
      h2.objects[0].position.z = 0.25;
      g.add(h2.objects[0]);
    }

    g.rotation.y = Math.PI * 3 / 2;

    let lg = new T.Group();
    lg.add(g);
    lg.position.x = param.x ? param.x : lg.position.x;
    lg.position.y = param.y ? param.y : lg.position.y;
    lg.position.z = param.z ? param.z : lg.position.z;

    super("House2" + String(house1Cnt++), lg);
  }
}

let house2Cnt = 0;
export class House2 extends GrObject {
  constructor(param = {}) {
    let geometry = new T.Geometry();
    // front 0-4 
    let h = 2;
    let l = 3;
    let w = 3;
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(w, 0, 0));
    geometry.vertices.push(new T.Vector3(w, h, 0));
    geometry.vertices.push(new T.Vector3(w / 2, h + 1, -l / 2));
    geometry.vertices.push(new T.Vector3(0, h, 0));
    // back
    geometry.vertices.push(new T.Vector3(0, 0, -l));
    geometry.vertices.push(new T.Vector3(w, 0, -l));
    geometry.vertices.push(new T.Vector3(w, h, -l));
    geometry.vertices.push(new T.Vector3(0, h, -l));


    geometry.faceVertexUvs = [
      []
    ];
    // front
    let ff1 = new T.Face3(1, 4, 0);
    geometry.faces.push(ff1);
    geometry.faceVertexUvs[0].push([]);
    let ff2 = new T.Face3(1, 2, 4);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]);

    // right
    let fr1 = new T.Face3(6, 7, 2);
    geometry.faces.push(fr1);
    geometry.faceVertexUvs[0].push([]);
    let fr2 = new T.Face3(2, 1, 6);
    geometry.faces.push(fr2);
    geometry.faceVertexUvs[0].push([]);

    // left
    let fl1 = new T.Face3(0, 4, 8);
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]);

    let fl2 = new T.Face3(8, 5, 0);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]);

    // bottom
    let fb1 = new T.Face3(0, 5, 6);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]);
    let fb2 = new T.Face3(6, 1, 0);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]);

    // back
    let fba1 = new T.Face3(5, 8, 7);
    geometry.faces.push(fba1);
    geometry.faceVertexUvs[0].push([]);
    let fba2 = new T.Face3(7, 6, 5);
    geometry.faces.push(fba2);
    geometry.faceVertexUvs[0].push([]);

    // roof left
    let rl = new T.Face3(4, 3, 8);
    geometry.faces.push(rl);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0.1, 0.1),
      new T.Vector2(0.5, 0.9),
      new T.Vector2(0.9, 0.1)
      ]
    );
    // roof front
    let rf = new T.Face3(2, 3, 4);
    geometry.faces.push(rf);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0.1, 0.1),
      new T.Vector2(0.5, 0.9),
      new T.Vector2(0.9, 0.1)
      ]
    );
    // roof back
    let rb = new T.Face3(3, 7, 8);
    geometry.faces.push(rb);
    geometry.faceVertexUvs[0].push(
      [
        new T.Vector2(0.5, 0.9),
        new T.Vector2(0.9, 0.1), new T.Vector2(0.1, 0.1),
      ]
    );
    // roof right
    let rr = new T.Face3(7, 3, 2);
    geometry.faces.push(rr);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0.1, 0.1),
      new T.Vector2(0.5, 0.9),
      new T.Vector2(0.9, 0.1)
      ]
    );

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;

    let matPath = param.mat ? param.mat : "./imgs/roof2.png";
    let tl = new T.TextureLoader().load(matPath);
    let material = new T.MeshStandardMaterial({
      map: tl,
      roughness: 0.75,
      color: "white"
    });
    let mesh = new T.Mesh(geometry, material);
    // change the center to 0.5, 0.5, 0.5
    let g = new T.Group();
    let lg = new T.Group();
    lg.add(g);
    g.translateX(-w / 2);
    g.translateZ(l / 2);
    super("House2" + String(house2Cnt++), lg);

    g.add(mesh);

    // door
    if (param.nodoor) {
      let w1 = new addOnObj({
        h: h, w: 0.75, yrot: -Math.PI / 2,
        z: 0.75, x: -.01,
        mat: "./imgs/window3.png"
      });
      g.add(w1.objects[0]);
    } else {
      let door = new addOnObj({
        h: 1.5, w: 0.75, yrot: -Math.PI / 2,
        z: 0.75, x: -.01,
      });
      g.add(door.objects[0]);
    }

    // front
    let w1 = new addOnObj({
      h: h, w: 0.751, yrot: -Math.PI / 2,
      z: -0.01, x: -.01,
      mat: "./imgs/window3.png"
    });
    g.add(w1.objects[0]);
    let w2 = new addOnObj({
      h: h, w: 0.75, yrot: -Math.PI / 2,
      z: 1.5, x: -.01,
      mat: "./imgs/window3.png"
    });
    g.add(w2.objects[0]);
    let w3 = new addOnObj({
      h: h, w: 0.75, yrot: -Math.PI / 2,
      z: 2.25, x: -.01,
      mat: "./imgs/window3.png"
    });
    g.add(w3.objects[0]);

    // right
    let wgr = this.windowG(h);
    wgr.rotateY(Math.PI / 2);
    wgr.position.set(w + 0.01, 0, 0);
    g.add(wgr);

    // back
    let wgb = this.windowG(h);
    wgb.rotateY(Math.PI);
    wgb.position.set(w, 0, -l - 0.01);
    g.add(wgb);

    // left
    let wgl = this.windowG(h);
    wgl.rotateY(-Math.PI / 2);
    wgl.position.set(-0.01, 0, -l);
    g.add(wgl);

    // scale
    g.scale.x = param.w ? param.w / w : g.scale.x;
    g.scale.y = param.h ? param.h / h : g.scale.y;
    g.scale.z = param.l ? param.l / l : g.scale.z;

    // lg to move
    lg.position.x = param.x ? param.x : lg.position.x;
    lg.position.y = param.y ? param.y : lg.position.y;
    lg.position.z = param.z ? param.z : lg.position.z;

  }

  /**
   * helper method to create a group of windows
   * 
   * @param h: the height of windows
   */
  windowG(h) {
    let g = new T.Group();

    let w4 = new addOnObj({
      h: h, w: 0.75, yrot: -Math.PI / 2,
      z: 0.75,
      mat: "./imgs/window3.png"
    });
    g.add(w4.objects[0]);
    let w1 = new addOnObj({
      h: h, w: 0.751, yrot: -Math.PI / 2,
      z: -0.001,
      mat: "./imgs/window3.png"
    });
    g.add(w1.objects[0]);
    let w2 = new addOnObj({
      h: h, w: 0.75, yrot: -Math.PI / 2,
      z: 1.5,
      mat: "./imgs/window3.png"
    });
    g.add(w2.objects[0]);
    let w3 = new addOnObj({
      h: h, w: 0.75, yrot: -Math.PI / 2,
      z: 2.25,
      mat: "./imgs/window3.png"
    });
    g.add(w3.objects[0]);

    return g;
  }
}

let house3Cnt = 0;
export class House3 extends GrObject {
  constructor(param = {}) {
    let geometry = new T.Geometry();
    // front 0-4 
    geometry.vertices.push(new T.Vector3(0, 0, 0));
    geometry.vertices.push(new T.Vector3(2, 0, 0));
    geometry.vertices.push(new T.Vector3(2, 1.5, 0));
    geometry.vertices.push(new T.Vector3(1, 3, 0));
    geometry.vertices.push(new T.Vector3(0, 2, 0));
    // back 5-9
    let l = 3; // strength the image as the original roof is too dense
    geometry.vertices.push(new T.Vector3(0, 0, -l));
    geometry.vertices.push(new T.Vector3(2, 0, -l));
    geometry.vertices.push(new T.Vector3(2, 1.5, -l));
    geometry.vertices.push(new T.Vector3(1, 3, -l));
    geometry.vertices.push(new T.Vector3(0, 2, -l));

    if (param.side) {
      // side smaller house front 10 - 13
      geometry.vertices.push(new T.Vector3(0, 0, -0.5));
      geometry.vertices.push(new T.Vector3(-1, 0, -0.5));
      geometry.vertices.push(new T.Vector3(-1, 1.3, -0.5));
      geometry.vertices.push(new T.Vector3(0, 1.7, -0.5));

      // side smaller house back 14 - 17
      geometry.vertices.push(new T.Vector3(0, 0, -2.5));
      geometry.vertices.push(new T.Vector3(-1, 0, -2.5));
      geometry.vertices.push(new T.Vector3(-1, 1.3, -2.5));
      geometry.vertices.push(new T.Vector3(0, 1.7, -2.5));
    }

    geometry.faceVertexUvs = [
      []
    ];
    // front
    let ff1 = new T.Face3(1, 4, 0);
    geometry.faces.push(ff1);
    geometry.faceVertexUvs[0].push([]);
    let ff2 = new T.Face3(1, 2, 4);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]);
    let ff3 = new T.Face3(2, 3, 4);
    geometry.faces.push(ff3);
    geometry.faceVertexUvs[0].push([]);

    // right
    let fr1 = new T.Face3(6, 7, 2);
    geometry.faces.push(fr1);
    geometry.faceVertexUvs[0].push([]);
    let fr2 = new T.Face3(2, 1, 6);
    geometry.faces.push(fr2);
    geometry.faceVertexUvs[0].push([]);

    // left
    let fl1 = new T.Face3(0, 4, 9);
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]);

    let fl2 = new T.Face3(9, 5, 0);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]);

    // bottom
    let fb1 = new T.Face3(0, 5, 6);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]);
    let fb2 = new T.Face3(6, 1, 0);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]);

    // back
    let fba1 = new T.Face3(5, 9, 7);
    geometry.faces.push(fba1);
    geometry.faceVertexUvs[0].push([]);
    let fba2 = new T.Face3(7, 6, 5);
    geometry.faces.push(fba2);
    geometry.faceVertexUvs[0].push([]);
    let fba3 = new T.Face3(9, 8, 7);
    geometry.faces.push(fba3);
    geometry.faceVertexUvs[0].push([]);

    // roof left
    let rl1 = new T.Face3(3, 8, 9);
    geometry.faces.push(rl1);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(1, 1),
      new T.Vector2(0, 1),
      new T.Vector2(0, 0)
      ]
    );
    let rl2 = new T.Face3(9, 4, 3);
    geometry.faces.push(rl2);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0, 0),
      new T.Vector2(1, 0),
      new T.Vector2(1, 1)
      ]
    );

    // roof right
    let rr1 = new T.Face3(3, 2, 7);
    geometry.faces.push(rr1);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(0, 1),
      new T.Vector2(0, 0),
      new T.Vector2(1, 0)
      ]
    );
    let rr2 = new T.Face3(7, 8, 3);
    geometry.faces.push(rr2);
    geometry.faceVertexUvs[0].push(
      [new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0, 1)
      ]
    );

    // side smaller
    if (param.side) {
      // front
      let fsf1 = new T.Face3(10, 13, 12);
      geometry.faces.push(fsf1);
      geometry.faceVertexUvs[0].push([]);
      let fsf2 = new T.Face3(12, 11, 10);
      geometry.faces.push(fsf2);
      geometry.faceVertexUvs[0].push([]);

      // back
      let fsb1 = new T.Face3(16, 17, 14);
      geometry.faces.push(fsb1);
      geometry.faceVertexUvs[0].push([]);
      let fsb2 = new T.Face3(14, 15, 16);
      geometry.faces.push(fsb2);
      geometry.faceVertexUvs[0].push([]);

      // left
      let fsl1 = new T.Face3(12, 16, 15);
      geometry.faces.push(fsl1);
      geometry.faceVertexUvs[0].push([]);
      let fsl2 = new T.Face3(15, 11, 12);
      geometry.faces.push(fsl2);
      geometry.faceVertexUvs[0].push([]);

      // roof
      let fsr1 = new T.Face3(12, 13, 17);
      geometry.faces.push(fsr1);
      geometry.faceVertexUvs[0].push(
        [new T.Vector2(0.75, 0),
        new T.Vector2(0.75, 1),
        new T.Vector2(0, 1)
        ]
      );
      let fsr2 = new T.Face3(17, 16, 12);
      geometry.faces.push(fsr2);
      geometry.faceVertexUvs[0].push(
        [new T.Vector2(0, 1),
        new T.Vector2(0, 0),
        new T.Vector2(0.75, 0)
        ]
      );
    }

    geometry.computeFaceNormals();
    geometry.uvsNeedUpdate = true;

    let tl = new T.TextureLoader().load("./imgs/roof3.png");
    let material = new T.MeshStandardMaterial({
      map: tl,
      roughness: 0.75,
      color: "white"
    });
    let mesh = new T.Mesh(geometry, material);
    // change the center to 0.5, 0.5, 0.5
    let g = new T.Group();
    let lg = new T.Group();
    lg.add(g);
    g.translateZ(l / 2);
    super("House3" + String(house3Cnt++), lg);

    g.add(mesh);

    // door
    let door = new addOnObj({
      h: 1.5, w: 0.75, yrot: -Math.PI / 2,
      z: 0.3, x: -0.01
    });
    g.add(door.objects[0]);

    // window 
    // front
    let w1 = new addOnObj({
      h: 1, w: 0.75, yrot: -Math.PI / 2,
      z: 1.1, x: -0.01, y: 0.5,
      mat: "./imgs/window2.png"
    });
    g.add(w1.objects[0]);

    // right
    let wgr = this.windowG();
    wgr.position.set(2, 0.5, 0);
    wgr.rotation.y = Math.PI / 2;
    g.add(wgr);

    // left
    if (param.side) {
      let wgl = this.windowG({ notAddthird: true });
      wgl.position.set(-1, 0.4, -l + 0.425);
      wgl.rotation.y = -Math.PI / 2;
      g.add(wgl);

    } else {
      // no side smaller, add windows
      let wgl = this.windowG();
      wgl.position.set(0, 0.5, -l);
      wgl.scale.y = 1.2;
      wgl.rotation.y = -Math.PI / 2;
      g.add(wgl);
    }

    // roof right
    let wgl = this.windowG({ mat: "./imgs/window4.png" });
    wgl.scale.y = 1.4;
    wgl.rotateY(Math.PI / 2);
    // wgl.rotateX(-Math.PI / 4);
    wgl.rotateX(-Math.atan(1 / 1.5));

    wgl.position.set(1.75, 1.86, 0);

    g.add(wgl);

    // lg to move
    lg.position.x = param.x ? param.x : lg.position.x;
    lg.position.y = param.y ? param.y : lg.position.y;
    lg.position.z = param.z ? param.z : lg.position.z;
  }

  /**
   * helper method, create window group
   */
  windowG(param = {}) {
    let g = new T.Group();
    let mat = param.mat ? param.mat : "./imgs/window1.png";
    let w1 = new addOnObj({
      h: 0.75, w: 0.75, yrot: -Math.PI / 2,
      z: 0.25, x: -0.01,
      mat: mat
    });
    g.add(w1.objects[0]);

    let w2 = new addOnObj({
      h: 0.75, w: 0.75, yrot: -Math.PI / 2,
      z: 1.15, x: -0.01,
      mat: mat
    });
    g.add(w2.objects[0]);

    if (!param.notAddthird) {
      let w3 = new addOnObj({
        h: 0.75, w: 0.75, yrot: -Math.PI / 2,
        z: 2.05, x: -0.01,
        mat: mat
      });
      g.add(w3.objects[0]);
    }

    return g;
  }
}

// helper, door and window to add to the house
let treeCnt = 0;
export class Tree extends GrObject {
  constructor(param = {}) {
    let g = new T.Group();

    // cone for the top 
    let gTop = new T.ConeGeometry(1, 2, 32);
    let mTop = new T.MeshStandardMaterial({ color: "green" });
    let top = new T.Mesh(gTop, mTop);
    top.position.y = 1.5
    g.add(top);

    // cylinder for bottom
    let gBot = new T.CylinderGeometry(0.2, 0.2, 1);
    let mBot = new T.MeshStandardMaterial({ color: "#6E380E" });
    let bot = new T.Mesh(gBot, mBot);
    bot.position.y = 0.5;
    g.add(bot);


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

    super("tree" + String(treeCnt++), g);
  }
}

// helper, door and window to add to the house
let addOnObjCnt = 0;
class addOnObj extends GrObject {
  constructor(param = {}) {
    let geometry = new T.Geometry();
    // front 0-4 
    let h = param.h ? param.h : 2;
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
    let matPath = param.mat ? param.mat : "./imgs/door.png";
    let tl = new T.TextureLoader().load(matPath);
    let material = new T.MeshStandardMaterial({
      map: tl,
      roughness: 0.75,
      color: param.color ? param.color : "white",
    });
    let mesh = new T.Mesh(geometry, material);
    // change the center to 0.5, 0.5, 0.5
    let g = new T.Group();
    g.add(mesh);
    mesh.rotation.y = Math.PI / 2;
    mesh.position.x = 1;

    if (param.z) {
      mesh.position.x = param.z; // z pos as y rotate 90
    }
    if (param.x) {
      mesh.position.z = -param.x; // x pos as y rotate 90
    }
    if (param.y) {
      mesh.position.y = param.y; // x pos as y rotate 90
    }

    if (param.yrot) {
      mesh.rotateY(param.yrot);
    }
    if (param.zrot) {
      mesh.rotateZ(param.zrot);
    }
    if (param.xrot) {
      mesh.rotateX(param.xrot);
    }

    super("addOnObj" + String(addOnObjCnt++), g);
  }
}

