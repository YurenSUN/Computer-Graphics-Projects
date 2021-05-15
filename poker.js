// The codes in this repo should not be copied for other student assignments for any courses.
// @ts-check
/* jshint -W069, -W141, esversion:6 */
export { };  // null statement to tell VSCode we're doing a module

/**
 * drawing function for box 2
 * 
 * draw a picture using curves!
 **/
/* no need for onload - we use defer */

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
  throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

/**
 * Function to draw the heart
 * the line for curves with C(1) 
 * are marked in the comment
 */
function drawHeart() {
  context.beginPath();
  context.moveTo(0, 0);
  // right heart
  // below 2 line: C(1)
  context.bezierCurveTo(0, -10, 20, -20, 30, -10);
  context.bezierCurveTo(40, 0, 40, 15, 30, 20);

  context.bezierCurveTo(5, 35, 2, 35, 0, 50);
  // left heart
  context.bezierCurveTo(-2, 35, -5, 35, -30, 20);
  // below 2 line: C(1)
  context.bezierCurveTo(-40, 15, -40, 0, -30, -10);
  context.bezierCurveTo(-20, -20, 0, -10, 0, 0);

  // z close path
  context.closePath();

  context.stroke();
  context.fill();
}

function drawFrame() {
  context.beginPath();
  context.moveTo(radius, 0);
  // top
  context.lineTo(width - radius, 0);
  context.bezierCurveTo(width - radius / 3, 0, width, radius / 3, width, radius);

  // right
  context.lineTo(width, height - radius);
  context.bezierCurveTo(width, height - radius / 3, width - radius / 3, height, width - radius, height);

  // bottom
  context.lineTo(radius, height);
  context.bezierCurveTo(radius / 3, height, 0, height - radius / 3, 0, height - radius);

  // left
  context.lineTo(0, radius);
  context.bezierCurveTo(0, radius / 3, radius / 3, 0, radius, 0);

  context.closePath();

  context.stroke();
}

function drawSeven() {
  context.beginPath();
  context.moveTo(0, 0);

  context.lineTo(5, 0);
  context.lineTo(2.5, 4);
  context.lineTo(2.5, 10);

  context.stroke();
}

// poker card black 7 heart
// outside frame param 
let width = 220;
let height = 300;
let radius = 20;

// apply to all
context.translate(50, 50);

// outside frame
context.save();
drawFrame();
context.restore();

// middle hearts
context.save();
context.translate(65, 50);
for (let i = 0; i < 2; i++) {
  context.save();
  context.translate(0, i * 100);
  context.scale(0.7, 0.7);
  drawHeart();

  context.translate(90 / 0.7, 0);
  drawHeart();
  context.restore();
}

// lower two up-side down heart
context.save();
context.translate(0, 200);
context.scale(-0.7, -0.7);
drawHeart();
context.translate(-90 / 0.7, 0);
drawHeart();
context.restore();

// 7th heart
context.translate(45, 50);
context.scale(0.7, 0.7);
drawHeart();

context.restore();

// number and heart at the top 
context.save();

context.translate(10, 10);
context.scale(2, 2);
drawSeven();
context.scale(0.5, 0.5);
context.translate(5, 30);
context.scale(0.25, 0.25);
drawHeart();

context.restore();

// number and heart at the botton 
context.save();

context.translate(width, height);
context.scale(-1, -1);

context.translate(10, 10);
context.scale(2, 2);
drawSeven();
context.scale(0.5, 0.5);
context.translate(5, 30);
context.scale(0.25, 0.25);
drawHeart();

context.translate(100, 100);
context.moveTo(50, 0);
// context.moveTo(50,50);
for (let i = 0; i < 4; i++) {
  context.bezierCurveTo(50, 50, 50, 50, 0, 50);
  context.rotate(Math.PI / 2);
}

context.restore();




