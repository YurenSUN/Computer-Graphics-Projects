// The codes in this repo should not be copied for other student assignments for any courses.
// @ts-check
/* jshint -W069, esversion:6 */

export { };

// circles created by users
let dots = [];
let radius = 10;
let colors = ["green", "yellow"]; // color to change between
let colors_clicked = ["red", "orange"]; // color to change between


/** @type {HTMLCanvasElement} */
let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("box1canvas"));
let context = canvas.getContext('2d');

// when user click, add the circle
canvas.onclick = function (event) {
  const x = event.clientX;
  const y = event.clientY;

  let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
  const mx = x - box.left;
  const my = y - box.top;

  // first check whether click on the existing circle
  let exist = false;
  dots.forEach(function (dot) {
    const dis_x = mx - dot.x;
    const dis_y = my - dot.y;
    if (Math.sqrt(dis_x * dis_x + dis_y * dis_y) <= radius) {
      // existing circle, change color
      dot.clicked = !dot.clicked;
      dot.mouseOn = false;
      exist = true;
    }
  });
  if (!exist) {
    dots.push({ "x": mx, "y": my, "r": radius, "mouseOn": false, "clicked": false });
  }
};

// change the color of circle if the mouse is on the circle
canvas.onmousemove = function (event) {
  const x = event.clientX;
  const y = event.clientY;

  let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
  const mx = x - box.left;
  const my = y - box.top;

  // check the distance between mouse and center of the circle
  dots.forEach(function (dot) {
    const dis_x = mx - dot.x;
    const dis_y = my - dot.y;

    if (Math.sqrt(dis_x * dis_x + dis_y * dis_y) <= radius) {
      // on the circle, change color
      dot.mouseOn = true;
    } else {
      dot.mouseOn = false;
    }
  });

};

function boxanimate() {
  // clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw all of the dots
  dots.forEach(function (dot) {
    if (dot.clicked) {
      context.fillStyle = dot.mouseOn ? colors_clicked[1] : colors_clicked[0];
    } else {
      context.fillStyle = dot.mouseOn ? colors[1] : colors[0];
    }
    context.beginPath();
    context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
  });
  window.requestAnimationFrame(boxanimate);
}
boxanimate();

