// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

// we use defer, so there is no need for onload. Just find the canvas and
// circles created by users
let dots = [];
let rects = [];
let radius = 5;
let aniPast = 0;

/** @type {HTMLCanvasElement} */
let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("box2canvas"));
let context = canvas.getContext('2d');

// when user click, add the circle
canvas.onclick = function (event) {
    const x = event.clientX;
    const y = event.clientY;

    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    const mx = x - box.left;
    const my = y - box.top;

    const curx = Math.floor(Math.random() * (canvas.width));
    const cury = canvas.height; // button of the 

    // random color
    const color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

    dots.push({ "x": curx, "y": cury, "r": radius, "vx": (mx - curx) / 20, "vy": (my - cury) / 20, "tx": mx, "ty": my, "color": color });
};

function addFW(dot) {
    // add 20 rect with random direction
    let i;
    for (i = 0; i < 20; i++) {
        let vx = (Math.random() - 0.5) * 5;
        let vy = (Math.random() - 0.5) * 5;
        const color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

        rects.push({ "x": dot.tx, "y": dot.ty, "vx": vx, "vy": vy, "color": color, "trans": 1, "size": 3});
    }
}

function addRandom() {
    const mx = Math.floor(Math.random() * (canvas.width - 1)) + 1;
    const my = Math.floor(Math.random() * (canvas.height - 10)) + 10;
    const curx = Math.floor(Math.random() * (canvas.width));
    const cury = canvas.height; // button of the 

    // random color
    const color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

    dots.push({ "x": curx, "y": cury, "r": radius, "vx": (mx - curx) / 20, "vy": (my - cury) / 20, "tx": mx, "ty": my, "color": color });
}

function animate() {
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // add random firework after some animations
    aniPast += 1;
    if (aniPast >= 50) {
        aniPast = 0;
        addRandom();
    }
    // move all the dots
    dots.forEach(function (dot) {
        dot.y += dot.vy;
        dot.x += dot.vx;

    });
    // move all rect
    rects.forEach(function (rect) {
        rect.size -= 0.04;
        rect.y -= rect.vy;
        rect.x -= rect.vx;
        // projectile
        rect.vy -= 0.1;

    });

    // add firework if reach the place
    // move all the dots
    dots.filter(dot => ((dot.y <= dot.ty))).forEach(function (dot) {
        addFW(dot);
    });

    // remove dots that get to the place for firework
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    dots = dots.filter(
        // this defines a function using "arrow notation"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        dot => ((dot.y > dot.ty))
    );
    rects = rects.filter(
        // this defines a function using "arrow notation"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        rect => ((rect.size > 0))
    );

    // draw all of the dots
    dots.forEach(function (dot) {
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2, false);
        context.closePath();
        context.fill();
    });
    // draw all of the dots
    rects.forEach(function (dot) {
        context.fillStyle = dot.color;
        context.fillRect(dot.x - dot.size/2, dot.y - dot.size/2, dot.size, dot.size);
    });

    window.requestAnimationFrame(animate);
}
animate();