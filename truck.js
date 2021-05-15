/*jshint esversion: 6 */
// @ts-check

// these two things are the main UI code for the train
// students learned about them in last week's workbook

import { draggablePoints } from "./libs/CS559/dragPoints.js";
import { RunCanvas } from "./libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page 
// useful for turning features on and off
import { makeCheckbox } from "./libs/CS559/inputHelpers.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [400, 150],
  [50, 550],
  [450, 450],
  [500, 150]
];

/** @type Array<number[]> */
let smokes = [];


/**
 * used for arc-length param
 */
/** @type Array<number> */
// @ts-ignore
let lengthArc = [0,0,0,0];
let lenghParam = [[],[],[],[]]; // use to find u
let sumLengthArc = 0;
let ParamSegment = 100; // used in update lengh and find arc ui

let count = 0; // used for add smoke after some time
/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");
  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the control points
  thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  });

  // draw the curve
  // @ts-ignore
  if (document.getElementById("check-simple-track").checked){
    for (let i = 0; i< thePoints.length; i++){
      // draw the curve from current to next
      let p0 = thePoints[(i + thePoints.length - 1) % thePoints.length];
      let p1 = thePoints[i];
      let p2 = thePoints[(i + 1) % thePoints.length];
      let p3 = thePoints[(i + 2) % thePoints.length];
      
      drawCurve(context,p0[0], p0[1], p1[0], p1[1],p2[0], p2[1],p3[0], p3[1]);
    }
    context.closePath();
  }else{

    // outer
    for (let i = 0; i< thePoints.length; i++){
      drawTrackOut(context,i);
    }
    context.closePath();
    context.stroke();

    // inner
    for (let i = 0; i< thePoints.length; i++){
      drawTrackIn(context,i);
    }
    context.closePath();
    context.stroke();

    // ties
    updateLength(); // arc-length for ties
    context.save();
    drawAllTies(context);
    context.restore();
  }

  //draw train
  let smokePos = drawAllTrain(context, param);

  // draw smooke
  // @ts-ignore
  if(document.getElementById("check-smoke").checked){
    if(count >= 8){
      count = 0;
      let smokeSize = 10;
      // add, update, and draw smoke
      smokes.push([smokePos[0],smokePos[1],smokeSize]);
    }else{
      count ++;
    }
    
    updateDrawSmokes(context);
  }else{
    smokes = [];
  }

}

/**
 * update and draw the smoke
 * @returns 
 */
function updateDrawSmokes(context){
  smokes.forEach(function(smoke){
    // draw
    context.save();
    // context.fillStyle = "red";

    context.fillStyle = "rgba(0,0,0,0.3)";
    context.beginPath();
    context.arc(smoke[0], smoke[1], smoke[2], 0, Math.PI*2);
    context.closePath();
    context.fill();
    context.restore();

    // update
    smoke[2] += 0.3;
  })

  // filter the smoke with size over 100
  smokes = smokes.filter(
    // this defines a function using "arrow notation"
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    smoke => ((smoke[2] < 40))
);

}

/**
 * draw the whole train and attach the wheel
 * @param {*} context 
 */
function drawAllTrain(context, param){
  updateLength();// for arc length param 

  let u, i; // decide u,i based on arc-length or not
  // @ts-ignore
  if(document.getElementById("check-arc-length").checked){
    let arcui = findArcui(param);
    i = arcui[1];
    u = arcui[0];
  }else{
    // position
    i = Math.floor(param);
    u = param - Math.floor(param);
  }

  // head
  context.save();
  let position = computePosition(u,i);
  let posRet = computePosition(u,i);

  context.translate(position[0],position[1]);
  // directiiono
  let deritive = computeDeri(u,i);
  context.rotate(-Math.atan2( deritive[0], deritive[1] ) + Math.PI);
  drawTrain(context);
  context.restore();

  let spacing = 300; 
  // body 1
  // @ts-ignore
  if(document.getElementById("check-arc-length").checked){
    param = (param - spacing/sumLengthArc + thePoints.length) % thePoints.length
    let arcui = findArcui(param);
    i = arcui[1];
    u = arcui[0];
  }else{
    let arcui = findNext(param, spacing - 220);
    i = arcui[1];
    u = arcui[0];
    param = i + u; // update param
  }
  position = computePosition(u,i)
  deritive = computeDeri(u,i);

  context.save();
  context.translate(position[0],position[1]);
  context.rotate(-Math.atan2( deritive[0], deritive[1] ) + Math.PI);
  drawBody(context,"#09AFE3", 10);
  context.restore();

  // body 2
  spacing = 260;
  // @ts-ignore
  if(document.getElementById("check-arc-length").checked){
    param = (param - spacing/sumLengthArc + thePoints.length) % thePoints.length
    let arcui = findArcui(param);
    i = arcui[1];
    u = arcui[0];
  }else{
    let arcui = findNext(param, spacing - 190);
    i = arcui[1];
    u = arcui[0];
  }

  context.save();
  position = computePosition(u,i)
  context.translate(position[0],position[1]);
  // directiiono
  deritive = computeDeri(u,i);
  context.rotate(-Math.atan2( deritive[0], deritive[1] ) + Math.PI);
  drawBody(context,"#61E6A4", 10);
  context.restore();

  // return position to add smoke
  return posRet
}

/**
 * find the param of next car
 */
function findNext(param,spacing){
  let i = Math.floor(param);
  let u = param - Math.floor(param);

  // find the current length passed in the cur arc
  let modU = u % (1/ParamSegment);
  let j = Math.floor((u-modU) * (ParamSegment-1)); // index in the arc length array
  
  let baseL = 0;
  if (j > 0){
    baseL = lenghParam[i][j-1];
  }

  let nextL = lenghParam[i][j];

  let curLen = modU * ParamSegment * (nextL - baseL) + baseL;
  // append the length of arcs passed
  for(let k = 0; k < i; k++){
    curLen += lengthArc[k];
  }

  let nextLen = (curLen - spacing + sumLengthArc) % sumLengthArc;
  
  // console.log(curLen, lenghParam[i]);
  // console.log(u,modU, j,baseL, nextL, nextLen);
  // console.log(curLen, lengthArc[i]);

  return findArcui(nextLen/sumLengthArc * thePoints.length);
}

/**
 * Draw the outer parellel track 
 * @returns 
 */
function drawTrackOut(context,i){
  // break down in to smaller segments 
  // draw line for each segment
  let segment = 100;
  let offset = 10;
  let curPos = computePosition(0, i);
  let curDeri = computeDeri(0, i);
  let distance = Math.sqrt( Math.pow(curDeri[0],2) + Math.pow(curDeri[1], 2));
  let deriOffset = [-offset * curDeri[1]/distance, offset * curDeri[0]/distance];

  // outer
  if (i == 0){
    context.beginPath();
    context.moveTo(curPos[0] + deriOffset[0],curPos[1] + deriOffset[1]);
  }else{
    context.lineTo(curPos[0] + deriOffset[0],curPos[1] + deriOffset[1]);
  }
  
  for(let j = 1; j < segment; j++){
    curPos = computePosition(j / segment, i);
    curDeri = computeDeri(j / segment, i);

    // normalize, use curDeri for the cur line
    let distance = Math.sqrt( Math.pow(curDeri[0],2) + Math.pow(curDeri[1], 2));
    let deriOffset = [-offset * curDeri[1]/distance, offset * curDeri[0]/distance];
    context.lineTo(curPos[0] + deriOffset[0],curPos[1] + deriOffset[1]);
  }
}

/**
 * Draw the inner parellel track 
 * @returns 
 */
 function drawTrackIn(context,i){
  // break down in to smaller segments 
  // draw line for each segment
  let segment = 100;
  let offset = 10;
  let curPos = computePosition(0, i);
  let curDeri = computeDeri(0, i);
  let distance = Math.sqrt( Math.pow(curDeri[0],2) + Math.pow(curDeri[1], 2));
  let deriOffset = [-offset * curDeri[1]/distance, offset * curDeri[0]/distance];

  // outer
  if (i == 0){
    context.beginPath();
    context.moveTo(curPos[0] - deriOffset[0],curPos[1] - deriOffset[1]);
  }else{
    context.lineTo(curPos[0] - deriOffset[0],curPos[1] - deriOffset[1]);
  }
  
  for(let j = 1; j < segment; j++){
    curPos = computePosition(j / segment, i);
    curDeri = computeDeri(j/segment, i);
    // normalize, use curDeri for the cur line
    let distance = Math.sqrt( Math.pow(curDeri[0],2) + Math.pow(curDeri[1], 2));
    let deriOffset = [-offset * curDeri[1]/distance, offset * curDeri[0]/distance];
  
    context.lineTo(curPos[0] - deriOffset[0],curPos[1] - deriOffset[1]);
  }
}

/**
 * loop the curve to draw ties
 * @param {} context 
 */
function drawAllTies(context){
  // updateLength(); // arc-length for ties

  let segment = 50;
  for(let i = 0; i < segment; i ++){
    let curui = findArcui(i / segment * thePoints.length);
    let position = computePosition(curui[0], curui[1]);
    let deri = computeDeri(curui[0],curui[1]);

    context.save();
    context.translate(position[0],position[1]);
    context.rotate(-Math.atan2( deri[0], deri[1] ) + Math.PI);
    drawTie(context);
    context.restore();
  }
}


/**
 * Draw the track tie
 * @returns 
 */
function drawTie(context){
  context.save();
  context.fillStyle = "brown";
  context.beginPath();
  context.rect(-15, -5, 30,5);
  context.fill();
  context.stroke();
  context.restore();
}


/**
 * Find the u and i for arc-lengh param 
 * based on param from draw function
 * @param {*} param 
 */
function findArcui(param){
  let curPos = param/thePoints.length * sumLengthArc;

  let curSum = 0;
  let tarLen = 0;
  let index = 0;
  for(let i = 0; i < thePoints.length; i ++){
    if (curPos > curSum && curPos <= curSum + lengthArc[i]){
      // find the position
      tarLen = curPos - curSum;
      index = i;
      break;
    }
    curSum += lengthArc[i];
  }

  if (tarLen == 0 ){
    return [0, index];
  }
  // get the u in the current arc
  let lastLen = 0
  for(let i = 0; i < ParamSegment -1; i ++){
    let curLen = lenghParam[index][i]
    if(tarLen > lastLen && tarLen <= curLen){
      // the current u is between last and cur
      let offset = (tarLen - lastLen)/(curLen - lastLen);
      let u = offset * 1 / ParamSegment + (i+1) / ParamSegment;
      return [u,index];
    }
    lastLen = curLen;
  }
  
  // rounding error
  return [0, (index + 1)% thePoints.length];
}



/**
 * update length for arc-length param
 */
function updateLength(){
  // reset the sum
  sumLengthArc = 0;
  lenghParam = [];

  // draw the curve
  for (let i = 0; i< thePoints.length; i++){
    // draw the curve from current to next
    lenghParam.push([]);
    let sumLen = 0;
    let curPos = thePoints[i];
    for( let j = 1; j < ParamSegment; j ++){
      let nextPos = computePosition(1/ParamSegment * j,i);
      sumLen += Math.sqrt( Math.pow(curPos[0] - nextPos[0] , 2) + Math.pow(curPos[1] - nextPos[1] , 2));
      curPos = nextPos;

      lenghParam[i].push(sumLen);
    }
    lengthArc[i] = sumLen;
    sumLengthArc += sumLen;
  }
}

/**
 * Compute deritive of the curve to rotate the train
 * @param {Number} u the portion past on the current curve 
 * @param {Number} i the index of the curve that the point is on
 * @returns 
 */
function computeDeri(u,i){
  // draw the curve from current to next
  // curve is p1 to p2
  let p0 = thePoints[(i + thePoints.length - 1) % thePoints.length];
  let p1 = thePoints[i];
  let p2 = thePoints[(i + 1) % thePoints.length];
  let p3 = thePoints[(i + 2) % thePoints.length];

  // get the two control points
  // velocity
  let v1 = [p2[0] - p0[0], p2[1] - p0[1]];
  let v2 = [p3[0] - p1[0], p3[1] - p1[1]];
  
  // control points
  let c1 = [p1[0] + v1[0]/6, p1[1] + v1[1]/6];
  let c2 = [p2[0] - v2[0]/6, p2[1] - v2[1]/6];

  let u1 = 1-u;
  let d1 = -3 * Math.pow(u1,2) * p1[0] 
          + 3 * Math.pow(u1,2) * c1[0] -6*u*u1 * c1[0] 
          + 6 * u * u1 * c2[0] - 3 * Math.pow(u,2) * c2[0]
          + 3* Math.pow(u,2) * p2[0];
  
  let d2 = - 3 * Math.pow(u1,2) * p1[1] 
          + 3 * Math.pow(u1,2) * c1[1] -6*u*u1 * c1[1] 
          + 6 * u * u1 * c2[1] - 3 * Math.pow(u,2) * c2[1]
          + 3* Math.pow(u,2) * p2[1];

  return [d1,d2];
}

/**
 * Compute the position of the train
 * @param {Number} u, the portion past on the current curve 
 * @param {Number} i, the index of the curve that the point is on
 */
function computePosition(u,i){
  // draw the curve from current to next
  // curve is p1 to p2
  let p0 = thePoints[(i + thePoints.length - 1) % thePoints.length];
  let p1 = thePoints[i];
  let p2 = thePoints[(i + 1) % thePoints.length];
  let p3 = thePoints[(i + 2) % thePoints.length];
  
  // get the two control points
  // velocity
  let v1 = [p2[0] - p0[0], p2[1] - p0[1]];
  let v2 = [p3[0] - p1[0], p3[1] - p1[1]];
  
  // control points
  let c1 = [p1[0] + v1[0]/6, p1[1] + v1[1]/6];
  let c2 = [p2[0] - v2[0]/6, p2[1] - v2[1]/6];

  // three points based on u
  let u1 = [(1-u)*p1[0] + u*c1[0],(1-u)*p1[1] + u*c1[1]] ;
  let u2 = [(1-u)*c1[0] + u*c2[0],(1-u)*c1[1] + u*c2[1]] ;
  let u3 = [(1-u)*c2[0] + u*p2[0],(1-u)*c2[1] + u*p2[1]] ;

  // two points based on u1-u3
  let u11 = [(1-u)*u1[0] + u* u2[0],(1-u)* u1[1] + u* u2[1]] ;
  let u12 = [(1-u)*u2[0] + u* u3[0],(1-u)* u2[1] + u* u3[1]] ;

  // the last point, position
  return [(1-u)*u11[0] + u* u12[0],(1-u)* u11[1] + u* u12[1]]
}

/**
 * draw the bezeir curve from x1,y1 to x2,y2
 * use x0,y0 and x3,y3 to decide the control points
 */
function drawCurve(context, x0,y0, x1,y1,x2,y2,x3,y3){
  // velocity
  let v1x = x2 - x0;
  let v1y = y2 - y0;
  let v2x = x3 - x1;
  let v2y = y3 - y1;
  // control points
  let c1x = x1 + v1x/6;
  let c1y = y1 + v1y/6;
  let c2x = x2 - v2x/6;
  let c2y = y2 - v2y/6;
  
  // craw the curve
  context.beginPath();
  context.moveTo(x1,y1);
  context.bezierCurveTo(c1x,c1y, c2x, c2y, x2,y2);
  context.stroke();
  
}

/**
 * the function to draw the train
 */
 function drawBody(context, color, size){
  let width = 30;
  let height = 60;
  let radius = 10;
  let offset = 5;

  // to the whole train
  context.save();
  context.lineWidth = "3";
  context.translate(-width/2, -height/2);

  // middle rectangle
  context.save();
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(radius + offset, 0);
  // top
  context.lineTo(width - radius - offset, 0);
  context.bezierCurveTo(width - radius / 3 - offset, 0, width-offset, radius / 3, width, radius);

  // right
  context.lineTo(width, height - radius);
  context.bezierCurveTo(width, height - radius / 3, width - radius / 3, height, width - radius, height);

  // bottom
  context.lineTo(radius, height);
  context.bezierCurveTo(radius / 3, height, 0, height - radius / 3, 0, height - radius);

  // left
  context.lineTo(0, radius);
  context.bezierCurveTo(offset, radius / 3, radius / 3 + offset, 0, radius + offset, 0);

  context.closePath();

  context.fill();
  context.stroke();
  context.restore();

  // w in the middle
  // let cenRad = 15;  // the size of the w
  context.save();
  // context.strokeStyle =  "red";
  context.translate(width/2, height/2);
  context.scale(size * 2 / 40, size * 2 / 40);
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(-10, -10);
  context.lineTo(-5, 15);
  context.lineTo(0, 0);
  context.lineTo(5, 15);
  context.lineTo(10, -10);
  context.stroke();
  context.restore();

  // for the whole train
  context.restore();
}

/**
 * the function to draw the train
 */
function drawTrain(context){
  let auxColor = "red";
  let priColor = "blacl";
  let lightColor = "rgba(255,255,0,0.5)";
  let width = 30;
  let height = 60;
  let radius = 10;
  let offset = 5;

  // to the whole train
  context.save();
  context.translate(-width/2, -height/2);

  // button part
  context.save();
  context.beginPath();
  context.fillStyle = auxColor;
  context.translate(0,height-radius);
  context.moveTo(-offset/2,0);
  context.lineTo(width + offset/2,0);
  context.lineTo(width + offset,20);
  context.lineTo( -offset,20);
  context.closePath();
  context.fill();
  context.restore();

  // light
  context.save();
  context.beginPath();
  context.fillStyle = lightColor;
  context.translate(0, radius);
  context.moveTo(offset,0);
  context.lineTo(width - offset,0);
  context.lineTo(width + offset, -60);
  context.lineTo( -offset,-60);
  context.closePath();
  context.fill();
  context.restore();

  // middle rectangle
  context.save();
  context.fillStyle = priColor;
  context.beginPath();
  context.moveTo(radius + offset, 0);
  // top
  context.lineTo(width - radius - offset, 0);
  context.bezierCurveTo(width - radius / 3 - offset, 0, width-offset, radius / 3, width, radius);

  // right
  context.lineTo(width, height - radius);
  context.bezierCurveTo(width, height - radius / 3, width - radius / 3, height, width - radius, height);

  // bottom
  context.lineTo(radius, height);
  context.bezierCurveTo(radius / 3, height, 0, height - radius / 3, 0, height - radius);

  // left
  context.lineTo(0, radius);
  context.bezierCurveTo(offset, radius / 3, radius / 3 + offset, 0, radius + offset, 0);

  context.closePath();

  context.fill();
  context.restore();

  // w in the middle
  let cenRad = 15;  // the size of the w
  context.save();
  context.strokeStyle =  auxColor;
  context.translate(width/2, height/2);
  context.scale(cenRad * 2 / 40, cenRad * 2 / 40);
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(-10, -10);
  context.lineTo(-5, 15);
  context.lineTo(0, 0);
  context.lineTo(5, 15);
  context.lineTo(10, -10);
  context.stroke();
  context.restore();

  // for the whole train
  context.restore();
}

/**
 * Initialization code - sets up the UI and start the train
 */
{
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas1"
  ));
  // @ts-ignore
  let context = canvas.getContext("2d");
  // we need the slider for the draw function, but we need the draw function
  // to create the slider - so create a variable and we'll change it later
  let slider; // = undefined;

  // note: we wrap the draw call so we can pass the right arguments
  function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % thePoints.length);
  }
  
  // create a UI
  let runcavas = new RunCanvas(canvas, wrapDraw);
  // now we can connect the draw function correctly
  slider = runcavas.range;

  // note: if you add these features, uncomment the lines for the checkboxes
  // in your code, you can test if the checkbox is checked by something like:
  // document.getElementById("simple-track").checked
  // in your drawing code
  //
  // lines to uncomment to make checkboxes
  // @ts-ignore
  makeCheckbox("simple-track",false);
  // @ts-ignore
  makeCheckbox("arc-length",true);
  // @ts-ignore
  makeCheckbox("smoke",false);

  // helper function - set the slider to have max = # of control points
  function setNumPoints() {
    runcavas.setupSlider(0, thePoints.length, 0.01);
  }

  setNumPoints();
  runcavas.setValue(0);

  // add the point dragging UI
  draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);
}
