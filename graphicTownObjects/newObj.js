/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";


export class Surface extends GrObject{
  constructor(param = {}){
    // let image = new T.TextureLoader().load(param.map);
    let shaderMat = shaderMaterial("./shaders/surface.vs", "./shaders/surface.fs", {
      side: T.DoubleSide,
      uniforms: {
        colormap: { value: new T.TextureLoader().load(param.map) },
        time:{value:0},
        iChannel0: {value: new T.TextureLoader().load(param.channel0)},
        iChannel1: {value: new T.TextureLoader().load(param.channel1)},
        iChannel2: {value: new T.TextureLoader().load(param.channel2)},
      },
    });
    // the surface
    let planeGeo = new T.PlaneGeometry(40, 40, 40, 40);
    let plane = new T.Mesh(planeGeo, shaderMat);
    plane.rotateX(-Math.PI / 2);
  
    super("surface", plane);
    this.time = 0;
    this.mat = shaderMat;
  }

  stepWorld(delta, timeOfDay) {
    // update shader
    this.time += delta / 2000;
    this.mat.uniforms.time.value = this.time;
  }
}

let bridgeCnt = 0;
export class Bridge extends GrObject {
  constructor(param = {}) {
    // extrude geo for bridge base
    let base_curve = new T.Shape();
    base_curve.moveTo(0, 0);
    base_curve.lineTo(2, 0);
    base_curve.lineTo(4, 1);
    base_curve.lineTo(9, 1);
    base_curve.lineTo(11, 0);
    base_curve.lineTo(13, 0);
    base_curve.lineTo(10, 2);
    base_curve.lineTo(3, 2);
    base_curve.closePath();

    let exSettings = {
      steps: 2,
      depth: 3,
      bevelEnabled: false
    };
    let base_geo = new T.ExtrudeGeometry(base_curve, exSettings);

    let base_mat = new T.MeshStandardMaterial({
      transparent: !(param.noTrans),
      color: param.color ? param.color : "white",
    });
    let mesh = new T.Mesh(base_geo, base_mat);

    // upper 
    let upper_curve = new T.Shape();
    upper_curve.moveTo(0, 0);
    upper_curve.lineTo(0.1, 0);
    upper_curve.lineTo(3.1, 1.9);
    upper_curve.lineTo(9.9, 1.9);
    upper_curve.lineTo(12.9, 0);
    upper_curve.lineTo(13, 0);
    upper_curve.lineTo(10, 2);
    upper_curve.lineTo(3, 2);
    upper_curve.closePath();
    let upper_mat = new T.MeshStandardMaterial({
      transparent: !(param.noTrans),
      color: param.upperColor ? param.upperColor : "grey",
    });

    let upSetting = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: false
    }
    let upper_geo = new T.ExtrudeBufferGeometry(upper_curve, upSetting)
    let upper_left = new T.Mesh(upper_geo, upper_mat);
    upper_left.position.y = 1;
    upper_left.position.z = .2;

    let upper_right = new T.Mesh(upper_geo, upper_mat);
    upper_right.position.y = 1;
    upper_right.position.z = 2.7;

    // solid 
    // left
    let cylin_geo = new T.CylinderGeometry(0.05, 0.05, 1);
    let left_cy = new T.Group();
    left_cy.position.z = 0.25;
    let left1 = new T.Mesh(cylin_geo, upper_mat);
    left_cy.add(left1);
    left1.position.y = 1.45;
    left1.position.x = 1.5;

    let left2 = new T.Mesh(cylin_geo, upper_mat);
    left_cy.add(left2);
    left2.position.y = 2.45;
    left2.position.x = 3;

    let left3 = new T.Mesh(cylin_geo, upper_mat);
    left_cy.add(left3);
    left3.position.y = 2.45;
    left3.position.x = 10;

    let left4 = new T.Mesh(cylin_geo, upper_mat);
    left_cy.add(left4);
    left4.position.y = 1.45;
    left4.position.x = 11.5;

    // right
    let right_cy = new T.Group();
    right_cy.position.z = 2.75;
    let right1 = new T.Mesh(cylin_geo, upper_mat);
    right_cy.add(right1);
    right1.position.y = 1.45;
    right1.position.x = 1.5;

    let right2 = new T.Mesh(cylin_geo, upper_mat);
    right_cy.add(right2);
    right2.position.y = 2.45;
    right2.position.x = 3;

    let right3 = new T.Mesh(cylin_geo, upper_mat);
    right_cy.add(right3);
    right3.position.y = 2.45;
    right3.position.x = 10;

    let right4 = new T.Mesh(cylin_geo, upper_mat);
    right_cy.add(right4);
    right4.position.y = 1.45;
    right4.position.x = 11.5;

    let g = new T.Group();
    g.add(mesh);
    g.add(upper_left);
    g.add(upper_right);
    g.add(left_cy);
    g.add(right_cy);

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


    super("bridge" + String(bridgeCnt++), g);
  }
}

let highwayCnt = 0;
export class Highway extends GrObject {
  constructor(param = {}) {
    // extrude geo for bridge base
    let base_curve = new T.Shape();
    base_curve.moveTo(0, 0);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(4, 4);
    base_curve.lineTo(7, 6);
    base_curve.lineTo(10, 7);
    base_curve.lineTo(10, 7.7);
    base_curve.lineTo(7, 7);
    base_curve.lineTo(4, 5);
    base_curve.closePath();

    let exSettings = {
      steps: 2,
      depth: 3,
      bevelEnabled: false
    };
    let base_geo = new T.ExtrudeGeometry(base_curve, exSettings);

    let base_mat = new T.MeshStandardMaterial({
      transparent: !(param.noTrans),
      color: param.color ? param.color : "white",
    });
    let mesh = new T.Mesh(base_geo, base_mat);

    // upper 
    let upper_curve = new T.Shape();
    upper_curve.moveTo(0, 0);
    upper_curve.lineTo(0.1, 0);
    upper_curve.lineTo(4, 4.9);
    upper_curve.lineTo(7, 6.9);
    upper_curve.lineTo(10, 7.6);
    upper_curve.lineTo(10, 7.7);
    upper_curve.lineTo(7, 7);
    upper_curve.lineTo(4, 5);
    upper_curve.closePath();
    let upper_mat = new T.MeshStandardMaterial({
      transparent: !(param.noTrans),
      color: param.upperColor ? param.upperColor : "grey",
    });

    let upSetting = {
      steps: 2,
      depth: 0.1,
      bevelEnabled: false
    }
    let upper_geo = new T.ExtrudeBufferGeometry(upper_curve, upSetting)
    let upper_left = new T.Mesh(upper_geo, upper_mat);
    upper_left.position.y = 1;
    upper_left.position.z = .2;

    let upper_right = new T.Mesh(upper_geo, upper_mat);
    upper_right.position.y = 1;
    upper_right.position.z = 2.7;

    let g = new T.Group();
    super("highway" + String(highwayCnt++), g);

    // solids
    let cylin_geo = new T.CylinderGeometry(0.05, 0.05, 1);
    let left_solids = this.upSolids(cylin_geo, upper_mat);
    left_solids.position.z = 0.25
    let right_solids = this.upSolids(cylin_geo, upper_mat);
    right_solids.position.z = 2.75;

    g.add(mesh);
    g.add(upper_left);
    g.add(upper_right);
    g.add(left_solids);
    g.add(right_solids);

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

  upSolids(geo, mat) {
    let g = new T.Group();

    let xy = [[0.5, 5/8 + 0.45],
              [2.25, 22.5/8 + 0.45],
              [4, 5.45],
              [5.5, 6.45],
              [7,7.45],
              [8.25,7.45 + 0.7/5*2],
              [9.5, 7.45 + 0.7/5*4]];
    
    for (let i = 0; i < xy.length; i ++){
      let s1 = new T.Mesh(geo, mat);
      s1.position.x = xy[i][0];
      s1.position.y = xy[i][1];
      g.add(s1);
    }
    return g;
  }
}