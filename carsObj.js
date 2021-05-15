// The codes in this repo should not be copied for other student assignments for any courses.
/*jshint esversion: 6 */
// @ts-check

import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrObject } from "./libs/CS559-Framework/GrObject.js";
// import { RGB_PVRTC_2BPPV1_Format } from "./libs/CS559-Three/build/three.module.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program
// helper, door and window to add to the house
let car1Cnt = 0;
export class Car1 extends GrObject {
  constructor(param = {}) {
    let g = new T.Group();
    super("car1" + String(car1Cnt++), g);

    let geometry = new T.Geometry();
    // front 0-4 
    let wf = 0.3;
    let wb = 2;
    let wt = 0.2;
    let hb = 0.5;
    let ht = 0.75;
    let hf = hb - 0.1;
    let l = -1.5;
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
    geometry.faceVertexUvs[0].push([]
    );
    let ff2 = new T.Face3(6, 1, 5);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]
    );
    let ff3 = new T.Face3(1, 2, 5);
    geometry.faces.push(ff3);
    geometry.faceVertexUvs[0].push([]
    );

    // front top
    let ff4 = new T.Face3(2, 3, 4);
    geometry.faces.push(ff4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(1, 1),
      new T.Vector2(0.12, 1)
    ]
    );
    let ff5 = new T.Face3(4, 5, 2);
    geometry.faces.push(ff5);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(.12, 1),
      new T.Vector2(0.02, 0),
      new T.Vector2(1, 0)
    ]
    );

    // back bottom
    let fb1 = new T.Face3(8, 9, 2);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]
    );
    let fb2 = new T.Face3(2, 1, 8);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]
    );

    // back top
    let fb3 = new T.Face3(9, 10, 3);
    geometry.faces.push(fb3);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.99, 0),
      new T.Vector2(0.99, 1),
      new T.Vector2(0.5, 1)
    ]
    );
    let fb4 = new T.Face3(3, 2, 9);
    geometry.faces.push(fb4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.5, 1),
      new T.Vector2(0.5, 0),
      new T.Vector2(0.99, 0)
    ]
    );

    // front bottom
    let ffo1 = new T.Face3(6, 13, 7);
    geometry.faces.push(ffo1);
    geometry.faceVertexUvs[0].push([]
    );
    let ffo2 = new T.Face3(7, 0, 6);
    geometry.faces.push(ffo2);
    geometry.faceVertexUvs[0].push([]
    );

    // front middle
    let ffo3 = new T.Face3(6, 5, 12);
    geometry.faces.push(ffo3);
    geometry.faceVertexUvs[0].push([]);
    let ffo4 = new T.Face3(12, 13, 6);
    geometry.faces.push(ffo4);
    geometry.faceVertexUvs[0].push([]
    );

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
    geometry.faceVertexUvs[0].push([]
    );
    let ft2 = new T.Face3(11, 4, 3);
    geometry.faces.push(ft2);
    geometry.faceVertexUvs[0].push([]
    );

    // bottom
    let fbo1 = new T.Face3(0, 7, 8);
    geometry.faces.push(fbo1);
    geometry.faceVertexUvs[0].push([]
    );
    let fbo2 = new T.Face3(8, 1, 0);
    geometry.faces.push(fbo2);
    geometry.faceVertexUvs[0].push([]
    );

    // left bottom
    let fl1 = new T.Face3(13, 8, 7);
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]
    );
    let fl2 = new T.Face3(13, 12, 8);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]
    );
    let fl3 = new T.Face3(12, 9, 8);
    geometry.faces.push(fl3);
    geometry.faceVertexUvs[0].push([]
    );

    // left top
    let fl4 = new T.Face3(11, 10, 9);
    geometry.faces.push(fl4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.12, 1),
      new T.Vector2(1, 1),
      new T.Vector2(1, 0)
    ]
    );
    let fl5 = new T.Face3(9, 12, 11);
    geometry.faces.push(fl5);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(1, 0),
      new T.Vector2(0.02, 0),
      new T.Vector2(.12, 1)
    ]
    );

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
      y: hb + ht + 0.21, x: 0.75, z: -1.25
    });
    bucky.objects[0].rotateX(-Math.PI / 2)
    g.add(bucky.objects[0]);

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
    super("car2" + String(car2Cnt++), g);

    let geometry = new T.Geometry();
    // front 0-4 
    let wf = 1;
    let wb = 3;
    let wt = 0.2;
    let hb = 0.5;
    let ht = 0.75;
    let l = -1.5;
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
    geometry.faceVertexUvs[0].push([]
    );
    let ff2 = new T.Face3(11, 6, 0);
    geometry.faces.push(ff2);
    geometry.faceVertexUvs[0].push([]
    );

    // front top
    let ff3 = new T.Face3(4, 10, 11);
    geometry.faces.push(ff3);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.99, 1),
      new T.Vector2(0.5, 0.99),
      new T.Vector2(0.5, 0)
    ]
    );
    let ff4 = new T.Face3(11, 5, 4);
    geometry.faces.push(ff4);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.5, 0),
      new T.Vector2(0.99, 0),
      new T.Vector2(0.99, 1)
    ]
    );

    // bottom
    let fb1 = new T.Face3(0, 6, 8);
    geometry.faces.push(fb1);
    geometry.faceVertexUvs[0].push([]
    );
    let fb2 = new T.Face3(8, 2, 0);
    geometry.faces.push(fb2);
    geometry.faceVertexUvs[0].push([]
    );

    // left front bottom
    let fl1 = new T.Face3(1, 12, 5)
    geometry.faces.push(fl1);
    geometry.faceVertexUvs[0].push([]
    );
    let fl2 = new T.Face3(5, 0, 1);
    geometry.faces.push(fl2);
    geometry.faceVertexUvs[0].push([]
    );

    // left front top
    let fl3 = new T.Face3(4, 5, 12);
    geometry.faces.push(fl3);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.15, 1),
      new T.Vector2(0.03, 0),
      new T.Vector2(0.4, 0)
    ]
    );

    // left end
    let fl4 = new T.Face3(2, 3, 4)
    geometry.faces.push(fl4);
    geometry.faceVertexUvs[0].push([]
    );
    let fl5 = new T.Face3(4, 1, 2);
    geometry.faces.push(fl5);
    geometry.faceVertexUvs[0].push([]
    );

    // top
    let ft1 = new T.Face3(3, 9, 10)
    geometry.faces.push(ft1);
    geometry.faceVertexUvs[0].push([]
    );
    let ft2 = new T.Face3(10, 4, 3);
    geometry.faces.push(ft2);
    geometry.faceVertexUvs[0].push([]
    );

    // back
    let fba1 = new T.Face3(8, 9, 3)
    geometry.faces.push(fba1);
    geometry.faceVertexUvs[0].push([]
    );
    let fba2 = new T.Face3(3, 2, 8);
    geometry.faces.push(fba2);
    geometry.faceVertexUvs[0].push([]
    );

    // right end
    let fr1 = new T.Face3(7, 10, 9)
    geometry.faces.push(fr1);
    geometry.faceVertexUvs[0].push([]
    );
    let fr2 = new T.Face3(9, 8, 7);
    geometry.faces.push(fr2);
    geometry.faceVertexUvs[0].push([]
    );

    // right front bottom
    let fr3 = new T.Face3(6, 11, 13)
    geometry.faces.push(fr3);
    geometry.faceVertexUvs[0].push([]
    );
    let fr4 = new T.Face3(13, 7, 6);
    geometry.faces.push(fr4);
    geometry.faceVertexUvs[0].push([]
    );

    // right front top
    let fr5 = new T.Face3(10, 13, 11);
    geometry.faces.push(fr5);
    geometry.faceVertexUvs[0].push([
      new T.Vector2(0.15, 1),
      new T.Vector2(0.4, 0),
      new T.Vector2(0.03, 0)
    ]
    );


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

    // bucky left
    let bucky = new addOnObj({
      h: 300 / 287, // image size
      y: 0.3, x: 1.75, z: 0.01,
      mat: "./imgs/bucky2.png"
    });

    g.add(bucky.objects[0]);

    // bucky right
    let bucky2 = new addOnObj({
      yrot: Math.PI,
      h: 300 / 287, // image size
      y: 0.3, x: 2.75, z: l - 0.01,
      mat: "./imgs/bucky2.png"
    });

    g.add(bucky2.objects[0]);

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


