// The codes in this repo should not be copied for other student assignments for any courses.
// @ts-check
/* jshint -W069, esversion:6 */

class Boid {
  /**
   * 
   * @param {number} x    - initial X position
   * @param {number} y    - initial Y position
   * @param {number} vx   - initial X velocity
   * @param {number} vy   - initial Y velocity
   */
  constructor(x, y, vx = 1, vy = 0) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.hit = false;
    this.hitPast = 0;
  }

  /**
   * Draw the Boid
   * @param {CanvasRenderingContext2D} context 
   */
  draw(context) {
    context.save();

    context.translate(this.x, this.y);
    context.rotate(Math.atan2(this.vx, -this.vy));
    // just draw a circle with a arrow inside
    context.fillStyle = this.hit ? "lightyellow" : "lightblue";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, 10, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();

    // an arrow inside
    context.beginPath();
    context.moveTo(-5, 3);
    context.lineTo(0, -3);
    context.lineTo(5, 3);
    context.stroke();
    context.restore();
  }
  /**
   * Perform the "steering" behavior -
   * This function should update the velocity based on the other
   * members of the flock.
   * It is passed the entire flock (an array of Boids) - that includes
   * "this"!
   * Note: dealing with the boundaries does not need to be handled here
   * (in fact it can't be, since there is no awareness of the canvas)
   * *
   * And remember, (vx,vy) should always be a unit vector!
   * @param {Array<Boid>} flock 
   */
  steer(flock) {
    let curx = this.x;
    let cury = this.y;
    let curvx = this.vx;
    let curvy = this.vy;
    let sumx = 0;
    let sumy = 0;
    let sumAng = 0;
    let cnt = 0;
    flock.forEach(function (boid) {
      if (curx == boid.x && cury == boid.y && boid.vx == curvx && boid.vy == curvy) {
        // same boid
        return;
      }
      // distance of two center
      let dis = Math.sqrt(Math.pow(boid.x - curx, 2) + Math.pow(boid.y - cury, 2));
      // collision
      if (dis <= radius * 2) {
        // sheer
        let cenx = curx - boid.x;
        let ceny = cury - boid.y;

        let angle = Math.atan2(boid.vx, boid.vy) - Math.atan2(cenx, ceny);
        angle = Math.PI - angle;
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        let ovx = boid.vx;
        let ovy = boid.vy;
        boid.vx = ovx * c + ovy * s;
        boid.vy = -ovx * s + ovy * c;

        // change color
        boid.hit = true;
        boid.hitPast = 0;
        // once collision, no aligment
        return
      }

      if (dis <= radius * 5) {
        // calculate the total angle
        sumAng += Math.atan2(boid.vx, boid.vy);
        sumx += boid.x;
        sumy += boid.y;
        cnt += 1;
      }
    })

    // alignment for the current boid
    if (cnt && (!this.hit) && aligment) {
      // let angle = (sumAng / cnt) %(2*Math.PI);
      let angle = (sumAng / cnt) - Math.atan2(curvx, curvy);
      // let angle = Math.atan2(sumx/cnt, sumy/cnt) - Math.atan2(curx, cury);
      angle = angle;
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      let ovx = this.vx;
      let ovy = this.vy;
      this.vx = ovx * c + ovy * s;
      this.vy = -ovx * s + ovy * c;
    }

    // mouse
    if (mouse && (!this.hit)) {
      let limit = Math.PI / 180 * 5; // 5 degree at most
      let angle = Math.atan2(mousex - this.x, mousey - this.y);
      let curAng = Math.atan2(this.vx, this.vy);
      angle = curAng > angle ? Math.max(-limit, angle - curAng) : Math.min(limit, angle - curAng);
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      let ovx = this.vx;
      let ovy = this.vy;
      this.vx = ovx * c + ovy * s;
      this.vy = -ovx * s + ovy * c;
    }
  }
}


/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

/** @type Array<Boid> */
let theBoids = [];
let radius = 10; //radius of the boids
let aligment = false; // aligment on
let mouse = false; // mouse on
let mousex = 0;
let mousey = 0;
// max color number
let max_color = Math.pow(16, 6) - 1;

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
let context = canvas.getContext("2d");

let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // draw obstacles, 2 rectangle
  context.beginPath();
  context.rect(100, 100, 200, 100);
  context.fill();

  context.beginPath();
  context.rect(300, 400, 200, 100);
  context.fill();

  theBoids.forEach(boid => boid.draw(context));
}

/**
 * check whether the boid is in obstacle
 * @param x 
 * @param y 
 */
function inObs(x, y) {
  if (x + radius >= 100 && x - radius <= 300
    && y + radius >= 100 && y - radius <= 200) {
    return true;
  }
  if (x + radius >= 300 && x - radius <= 500
    && y + radius >= 400 && y - radius <= 500) {
    return true;
  }
  return false;
}

/**
 * Create 10 initial boids
 */
for (let i = 0; i < 10; i++) {
  // should be *601 to get to positioon at 600,
  // just to keep the boids in the canvas
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  while (inObs(x, y)) {
    x = Math.floor(Math.random() * 600);
    y = Math.floor(Math.random() * 600);
  }
  let deg = Math.random() * 2 * Math.PI;
  let vx = Math.cos(deg);
  let vy = Math.sin(deg);
  theBoids.push(new Boid(x, y, vx, vy));
}

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
  // add 10 new boids
  for (let i = 0; i < 10; i++) {
    // should be *601 to get to positioon at 600,
    // just to keep the boids in the canvas
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    while (inObs(x, y)) {
      x = Math.floor(Math.random() * 600);
      y = Math.floor(Math.random() * 600);
    }
    let deg = Math.random() * 2 * Math.PI;
    let vx = Math.cos(deg);
    let vy = Math.sin(deg);
    theBoids.push(new Boid(x, y, vx, vy));
  }
};
document.getElementById("clear").onclick = function () {
  // clear the theBoids
  theBoids = [];
};

// alignemnt checkbox
document.getElementById("ali").onclick = function () {
    /** @type {HTMLInputElement} */(document.getElementById("mouse")).checked = false;

  let cur = document.getElementById("ali");
  if (/** @type {HTMLInputElement} */(cur).checked) {
    aligment = true;
    mouse = false;
  } else {
    aligment = false;
  }
}

// // separation checkbox
// document.getElementById("sep").onclick = function () {
//     /** @type {HTMLInputElement} */(document.getElementById("ali")).checked = false;
//     /** @type {HTMLInputElement} */(document.getElementById("mouse")).checked = false;

//     let cur = document.getElementById("sep");
//     if (/** @type {HTMLInputElement} */(cur).checked) {
//         aligment = false;
//         mouse = false;
//         separation = true
//     } else {
//         separation = false;
//     }
// }

// mouse checkbox
document.getElementById("mouse").onclick = function () {
    /** @type {HTMLInputElement} */(document.getElementById("ali")).checked = false;

  let cur = document.getElementById("mouse");
  if (/** @type {HTMLInputElement} */(cur).checked) {
    aligment = false;
    mouse = true;
  } else {
    mouse = false;
  }
}

// mouse move
let canvasOffset = canvas.getBoundingClientRect();;
let offsetX = canvasOffset.left;
let offsetY = canvasOffset.top;
canvas.addEventListener("mousemove", function (e) {
  mousex = Math.round(e.clientX - offsetX);
  mousey = Math.round(e.clientY - offsetY);
})


let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
  // time step - convert to 1/60th of a second frames
  // 1000ms / 60fps
  const delta = (lastTime ? timestamp - lastTime : 0) * 1000.0 / 60.0;

  // move forward
  let speed = Number(speedSlider.value);
  theBoids.forEach(function (boid) {
    boid.x += boid.vx * speed;
    boid.y += boid.vy * speed;
  });

  // make sure that we stay on the screen
  for (let i = 0; i < theBoids.length; i++) {
    let boid = theBoids[i];
    // update hit and hitpast to make sure only change color briefly
    boid.hitPast += boid.hit ? 1 : 0;
    if (boid.hitPast >= 5) {
      boid.hit = false;
      boid.hitPast = 0;
    }
    // update bounce into wall
    let bounce = false;
    if (boid.x + radius >= canvas.width || boid.x - radius <= 0) {
      boid.x = (boid.x + radius >= canvas.width) ? canvas.width - radius : radius;
      boid.vx = -boid.vx;
      // boid.x += boid.vx;
      bounce = true;
    } else if (boid.y + radius >= canvas.height || boid.y - radius <= 0) {
      boid.y = (boid.y + radius >= canvas.height) ? canvas.height - radius : radius;
      boid.vy = -boid.vy;
      // boid.y += boid.vy;
      bounce = true;
    }

    // obstacles
    if (boid.x + radius >= 100 && boid.x - radius <= 300 && boid.y + radius >= 100 && boid.y - radius <= 200) {
      boid.vy = -boid.vy;
      boid.vx = -boid.vx;
      boid.x += boid.vx * speed;
      boid.y += boid.vy * speed;
      bounce = true;
    }
    if (boid.x + radius >= 300 && boid.x - radius <= 500 && boid.y + radius >= 400 && boid.y - radius <= 500) {
      boid.vy = -boid.vy;
      boid.vx = -boid.vx;
      boid.x += boid.vx * speed;
      boid.y += boid.vy * speed;
      bounce = true;
    }

    if (bounce) {
      boid.hit = true;
      boid.hitPast = 0;
    }
  }

  // change directions
  theBoids.forEach(boid => boid.steer(theBoids));

  // now we can draw
  draw();
  // and loop
  window.requestAnimationFrame(loop);

}
// start the loop with the first iteration
window.requestAnimationFrame(loop);


