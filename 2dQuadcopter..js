// we do enable typescript type checking - see
// https://graphics.cs.wisc.edu/Courses/559-sp2020/pages/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, -W141, esversion:6 */
export { };

// somewhere in your program you'll want a line
// that looks like:
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
const context = canvas.getContext("2d");

const length = 100;
const height = 100;
const cenRad = 15; // radius for the center circle
const outRad = 20;  // radius for the outer circle
const axCol = "blue";  // auxiliary color
const priCol = "grey";  // primary color 
const wCol = "#c5050c"; // color for w, dark uw-madisoon web red
let y = canvas.height - height / 2; // keyboard move up/down
let x = canvas.width - length / 2; // keyboard move left/right

/**
 * draw the whole quadcoptor
 * @param {Number} a: the speed of propellers
 * @param {string} axCol: the auxiliary color to distinguish quadcopter
 */
function drawAll(a, axCol) {
    // middle 4 crosses and two arrow for front and end
    context.save();
    // middle 4 crosses
    context.fillStyle = axCol;
    context.save();
    for (let i = 0; i < 4; i++) {
        context.beginPath();
        context.moveTo(- cenRad / 5, cenRad / 5);
        context.lineTo(cenRad / 5, -cenRad / 5);
        context.lineTo(-length / 2 + outRad, -height / 2 + outRad)
        context.closePath();
        context.fill();
        context.rotate(Math.PI / 2);
    }
    context.restore();

    // one arrow for the front
    context.beginPath();
    context.moveTo(-cenRad * 1.3, -cenRad * 1.3);
    context.lineTo(0, -cenRad * 1.5);
    context.lineTo(cenRad * 1.3, -cenRad * 1.3);
    context.lineTo(cenRad * 1.1, -cenRad * 1.1);
    context.lineTo(0, -cenRad * 1.4);
    context.lineTo(-cenRad * 1.1, -cenRad * 1.1);
    context.closePath();
    context.fill();

    // one arrow for the end
    context.beginPath();
    context.moveTo(-cenRad * 1.7, cenRad * 1.7);
    context.lineTo(0, cenRad * 1.4);
    context.lineTo(cenRad * 1.7, cenRad * 1.7);
    context.lineTo(cenRad * 1.5, cenRad * 1.5);
    context.lineTo(0, cenRad * 1.3);
    context.lineTo(-cenRad * 1.5, cenRad * 1.5);
    context.closePath();
    context.fill();

    context.restore();

    // middle circle
    context.save();
    context.beginPath();
    context.arc(0, 0, cenRad, 1.25 * Math.PI, 1.75 * Math.PI);
    context.arc(cenRad * 1.5, 0, cenRad, 0.75 * Math.PI, 1.25 * Math.PI);
    context.arc(0, 0, cenRad, 0.25 * Math.PI, 0.75 * Math.PI);
    context.arc(-cenRad * 1.5, 0, cenRad, 1.75 * Math.PI, 2.25 * Math.PI);
    context.closePath();
    context.fill();

    context.restore();

    // w in the middle
    context.save();
    context.strokeStyle = "red";
    context.scale(cenRad * 2 / 40, cenRad * 2 / 40);
    context.translate(0, -2);
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(-10, -10);
    context.lineTo(-5, 15);
    context.lineTo(0, 0);
    context.lineTo(5, 15);
    context.lineTo(10, -10);
    context.stroke();
    context.restore();

    // four outer circle 
    context.save();

    context.translate(-length / 2, -height / 2); //coordinate to upper left
    // upper left
    context.save();
    context.translate(outRad, outRad);
    drawOut(a * 2, axCol);
    context.restore();
    // upper right
    context.save();
    context.translate(length - outRad, outRad);
    drawOut(-a * 0.5, axCol);
    context.restore();
    // lower left
    context.save();
    context.translate(outRad, height - outRad);
    drawOut(a * 3, axCol);
    context.restore();
    // lower right
    context.save();
    context.translate(length - outRad, height - outRad);
    drawOut(a, axCol);
    context.restore();

    context.restore(); //coordinate to upper left
}

/**
 * draw the propeller
 * @param {Number} a: the speed of propellers
 * @param {string} axCol: the auxiliary color to distinguish quadcopter
 */
function drawOut(a, axCol) {
    // coordinate at the center of the outer circle
    context.save();
    context.rotate(a);
    // outside circle
    context.beginPath();
    context.arc(0, 0, outRad, 0, 2 * Math.PI);
    context.closePath();
    context.stroke();

    // propellers
    context.beginPath();
    context.moveTo(-outRad / 10, -outRad * 2 / 3);
    context.lineTo(outRad / 10, -outRad * 2 / 3);
    context.lineTo(outRad / 10, outRad * 2 / 3);
    context.lineTo(-outRad / 10, outRad * 2 / 3);
    context.closePath();
    context.fill();
    context.restore();

    // small middle circle
    context.save();
    context.fillStyle = axCol;
    context.beginPath();
    context.arc(0, 0, outRad / 10, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
}


/**
 * draw all the objects for 4th quadcopter
 * @param {Number} a: the speed of propellers
 */
function drawObj(a) {
    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);
    context.fillStyle = "#f0a1a8";
    context.strokeStyle = axCol;

    leftObjs.forEach(obj => {
        context.beginPath();
        context.rect(obj.x, obj.y, objWid, objHei);
        context.closePath();
        context.fill();
        context.stroke();
        // inside
        context.save();
        context.fillStyle = axCol;
        context.translate(obj.x + objWid / 2, obj.y + objHei / 2);
        for (let i = 0; i < 4; i++) {
            context.beginPath();
            let radius = Math.min(objWid, objHei) / 5;
            context.moveTo(- radius, radius);
            context.lineTo(radius, -radius);
            context.lineTo(-objWid / 8 + radius, objHei / 8 + radius)
            context.closePath();
            context.fill();
            context.rotate(Math.PI / 2);
        }
        context.restore();

    });

    rightObjs.forEach(obj => {
        context.beginPath();
        context.rect(obj.x, obj.y, objWid, objHei);
        context.closePath();
        context.fill();
        context.stroke();
        // inside
        context.save();
        context.fillStyle = axCol;
        context.translate(obj.x + objWid / 2, obj.y + objHei / 2);
        for (let i = 0; i < 4; i++) {
            context.beginPath();
            let radius = Math.min(objWid, objHei) / 5;
            context.moveTo(- radius, radius);
            context.lineTo(radius, -radius);
            context.lineTo(-objWid / 8 + radius, objHei / 8 + radius)
            context.closePath();
            context.fill();
            context.rotate(Math.PI / 2);
        }
        context.restore();
    });

    // cur obj or next obj
    if (curObj) {
        context.beginPath();
        context.rect(curObj.x, curObj.y, objWid, objHei);
        context.closePath();
        context.fill();
        context.stroke();

    } else {
        context.beginPath();
        context.rect(nextObj.x, nextObj.y, objWid, objHei);
        context.closePath();
        context.fill();
        context.stroke();
        // inside
        context.save();
        context.fillStyle = axCol;
        context.translate(nextObj.x + objWid / 2, nextObj.y + objHei / 2);
        context.rotate(-a);

        for (let i = 0; i < 4; i++) {
            context.beginPath();
            let radius = Math.min(objWid, objHei) / 5;
            context.moveTo(- radius, radius);
            context.lineTo(radius, -radius);
            context.lineTo(-objWid / 8 + radius, objHei / 8 + radius)
            context.closePath();
            context.fill();
            context.rotate(Math.PI / 2);
        }
        context.restore();
    }

    context.restore();
}

/**
 * update the params to let the 4th quadcopter 
 * move the curObj
 */
function moveCur(){
    if (quad4.rotate){
        // before pick up the obj, rotate to up
        quad4.curR += quad4.dir;
        if ( (quad4.curR > quad4.tarR && quad4.dir > 0) ||
             (quad4.curR < quad4.tarR && quad4.dir < 0)){
            quad4.rotate = false;
            quad4.curR = quad4.tarR;
        }
        return
    }
    if (!moveDown) {
        // move to the height of the path
        curObj.y += speed;
        if (curObj.y >= pathHei) {
            // rotate to right or left, current up
            moveDown = true;
            quad4.rotate = true;
            quad4.tarR = (moveFrom === "left") ? 0.5 * Math.PI: -0.5*Math.PI;
            quad4.dir = (moveFrom === "left") ? 0.2: -0.2;
        }
    } else {
        if (quad4.rotate){
            quad4.curR += quad4.dir;
            if ( (quad4.curR > quad4.tarR && quad4.dir > 0) ||
             (quad4.curR < quad4.tarR && quad4.dir < 0)){
                quad4.rotate = false;
                quad4.curR = quad4.tarR;
            }
        }else{
            // move to the new stack
            if (moveFrom === "left") {
                if (curObj.x < rightX) {
                    curObj.x += speed;
                } else {
                    if (quad4.curR == Math.PI){
                        let goalY = rightObjs.length ? rightObjs[rightObjs.length - 1].y + objHei : 0;
                        if (curObj.y > goalY) {
                            curObj.y -= speed;
                        }
                    }else{
                        // need to rotate to down, current to right
                        quad4.rotate = true;
                        quad4.tarR = 1 * Math.PI;
                        quad4.dir = 0.2;
                    }
                }
            } else {
                if (curObj.x > leftX) {
                    curObj.x -= speed;
                } else {
                    if (quad4.curR == Math.PI){
                        // finish rotation, current down
                        let goalY = leftObjs.length ? leftObjs[leftObjs.length - 1].y + objHei : 0;
                        if (curObj.y > goalY) {
                            curObj.y -= speed;
                        }
                    }else{
                        // need to rotate to down, current to right
                        quad4.rotate = true;
                        quad4.tarR = 1 * Math.PI;
                        quad4.dir = 0.2;
                    }
                }
            }
        }

    }
}

/**
 * update the params to let the 4th quadcopter 
 * move to the next obj
 */
function moveToNext(){
    if (quad4.rotate){
        // before move up to next, rotate to up
        quad4.curR += quad4.dir;
        if ( (quad4.curR > quad4.tarR && quad4.dir > 0) ||
             (quad4.curR < quad4.tarR && quad4.dir < 0)){
            quad4.rotate = false;
            quad4.curR = quad4.tarR;
        }
        return
    }
    if (!moveDown) {
        // move to the height of the path
        quadY += speed;
        if (quadY >= pathHei) {
        // rotate to right or left, current up
        moveDown = true;
        quad4.rotate = true;
        quad4.tarR = (moveFrom === "right") ? 0.5 * Math.PI: -0.5*Math.PI;
        quad4.dir = (moveFrom === "right") ? 0.2: -0.2;
        }
    } else {
        // move to the next obj
        if (moveFrom === "left") {
            if (quadX > leftX + objWid / 2) {
                quadX -= speed;
            } else{
                if (quad4.curR < Math.PI){
                    // rotate till face down
                    quad4.rotate = true;
                    quad4.tarR = Math.PI;
                    quad4.dir = 0.2;
                }else{
                    quad4.curR = Math.PI;
                    if (quadY > nextObj.y + objHei / 2) {
                        quadY -= speed;
                    }
                }
            }
            
        } else {
            if (quadX < rightX + objWid / 2) {
                quadX += speed;
            } else{
                if (quad4.curR < Math.PI){
                    // rotate till face down
                    quad4.rotate = true;
                    quad4.tarR = Math.PI;
                    quad4.dir = 0.2;
                }else{
                    quad4.curR = Math.PI;
                    if (quadY > nextObj.y + objHei / 2) {
                        quadY -= speed;
                    }
                }
            }
        }
    }
}

/**
 * update the status of the 4th quadcopter
 * either moving curObj or move to nextObj
 */
function updateObj(){
    // update curobj if move complete
    let goalX = (moveFrom === "left") ? rightX : leftX;
    let goalStack = (moveFrom === "left") ? rightObjs : leftObjs;

    let goalY = goalStack.length ? goalStack[goalStack.length - 1].y + objHei : 0;
    if (curObj && curObj.y === goalY && curObj.x === goalX) {
        // goal reahced
        moveDown = false; // next move up

        let curStack = (moveFrom === "left") ? leftObjs : rightObjs;
        if (curStack.length) {
            ((moveFrom === "left") ? rightObjs : leftObjs).push(JSON.parse(JSON.stringify(curObj)));
            nextObj = curStack.pop();
            quadX = curObj.x + objWid / 2;
            quadY = curObj.y + objHei / 2;
            curObj = undefined;
        } else {
            moveFrom = (moveFrom === "left") ? "right" : "left";
        }
        // rotate back to up
        quad4.rotate = true;
        quad4.tarR = 0;
        quad4.dir = -0.2;
    }
    
    // update curobj if moved to the cur obj
    if (nextObj && nextObj.y + objHei / 2 === quadY && nextObj.x + objWid / 2 === quadX) {
        moveDown = false;
        curObj = JSON.parse(JSON.stringify(nextObj));
        nextObj = undefined;

        // rotate up     
        quad4.rotate = true;
        quad4.tarR = 0;
        quad4.dir = -0.2;
    }
}

let leftObjs = [];
let rightObjs = [];
let objWid = 80;
let objHei = 30;
let leftX = 50;
let rightX = 200;

// add to the left stack
for (let i = 0; i < 5; i++) {
    leftObjs.push({ x: leftX, y: i * objHei })
}

let curObj = leftObjs.pop();
let moveFrom = "left";
let pathHei = 200;
let speed = 5;
let moveDown = false;
let nextObj = undefined;
let quadX = 0;
let quadY = 0;

// record the rotation params
let rotSpeed = 0.2;
let quad2 = {curR: 0, tarR:0, rotate: false, direction: -1}; // complex path
let quad3 = {x: 0, y: 0, curR: 0, tarR: Math.PI, rotate: false, rotDir: 0.02, xDir: 1}; // keyboard
let quad4 = {curR: 0, tarR:0, rotate: false, dir: 0.2}; // do sth.

// and you will want to make an animation loop with something like:
/**
 * the animation loop gets a timestamp from requestAnimationFrame
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function loop(timestamp) {
    let a = performance.now() / 100;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // rotate the quadcopter, circle path
    context.save();
    context.translate(length * 1.7, height * 1.7);
    context.rotate(a / 5);
    context.translate(length * 0.7, height * 0.7);
    context.rotate(-0.75* Math.PI);
    drawAll(a, axCol);
    context.restore();

    // second, keyboard press, up down
    // update rotation
    if (quad2.rotate && quad2.cur != quad2.tarR){
        quad2.direction = (quad2.curR > quad2.tarR)? -1 : 1;
        quad2.curR += quad2.direction * rotSpeed;
        if ( (quad2.curR >= quad2.tarR && quad2.direction === 1) || 
        (quad2.curR <= quad2.tarR && quad2.direction === -1) ){
            quad2.curR = quad2.tarR;
            quad2.rotate = false;
        }
    }
    context.save();
    context.translate(x, y);
    context.rotate(quad2.curR)
    drawAll(a * 1.3, wCol);
    context.restore();

    // third move in sin curve
    if (!quad3.rotate){
        quad3.x += quad3.xDir;
        quad3.y = (quad3.y + 0.01 * quad3.xDir) % (Math.PI *2);
        if ( (quad3.x >= canvas.width - length/2 && quad3.xDir > 0) || 
            (quad3.x + quad3.xDir <= length/2 && quad3.xDir < 0) ) {
            // reach the end
            quad3.rotate = true;
        }
    } else{
        quad3.curR += quad3.rotDir;
        if  (quad3.curR >= quad3.tarR) {
            quad3.rotate = false;
            quad3.curR = 0;
            quad3.xDir = -quad3.xDir;
        }
    }

    context.save();
    context.translate(0, 200);
    context.translate( quad3.x, Math.sin(quad3.y) * 40);

    let rot = (quad3.y < 1 * Math.PI)? 1 * Math.PI - quad3.y % (1 * Math.PI): quad3.y % (1 * Math.PI);
    context.rotate(rot);
    if (quad3.rotate){
        context.rotate(quad3.curR);
    }
    if (quad3.xDir < 0){
        context.rotate(Math.PI);
    }

    drawAll(a, "#57c3c2");
    context.restore();

    // fourth quadcopter to move object
    context.save();
    // move the object
    if (curObj) {
        moveCur();
        drawObj(a);
        context.translate(0, canvas.height);
        context.scale(1, -1);
        context.translate(curObj.x + objWid / 2, curObj.y + objHei / 2);
    } else {
        // moved the last object, move to next
        moveToNext();
        drawObj(a);
        context.translate(0, canvas.height);
        context.scale(1, -1);
        context.translate(quadX, quadY);
    }
    context.scale(1, -1);
    context.rotate(quad4.curR);
    drawAll(a, "#fecc11");
    context.restore();
    updateObj();

    window.requestAnimationFrame(loop);
};

// and then you would start the loop with:
window.requestAnimationFrame(loop);

// use keyboard to move the quadcopter
window.addEventListener("keydown", function (event) {
    let speed = 10;
    if (event.key === "s") { // down
        quad2.tarR = Math.PI;
        if (quad2.tarR == quad2.curR){
            y = Math.min(canvas.height - height / 2, y + speed);
        }else{
            quad2.rotate = true;
        }
    }
    if (event.key === "w") { // up
        quad2.tarR = 0;
        if (quad2.tarR == quad2.curR){
            y = Math.max(height / 2, y - speed);
        }else{
            quad2.rotate = true;
        }
    }
    if (event.key === "a") { // left
        quad2.tarR = 1.5 * Math.PI;
        if (quad2.tarR == quad2.curR){
            x = Math.max(length / 2, x - speed);
        }else{
            quad2.rotate = true;
        }
    }
    if (event.key === "d") { // right
        quad2.tarR = 0.5 * Math.PI;
        if (quad2.tarR == quad2.curR){
            x = Math.min(canvas.width - length / 2, x + speed);
        }else{
            quad2.rotate = true;
        }
    }
}, true);

// button to reset the quadcopter
document.getElementById("reset").addEventListener("click", function () {
    // reset to lower left
    y = canvas.height - height / 2;
    x = canvas.width - length / 2;
});