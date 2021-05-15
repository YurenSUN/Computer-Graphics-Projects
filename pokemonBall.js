// getting the canvas, the below two lines were provided by the instructors
let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("canvas1"));
let context = canvas.getContext('2d');

// some shadow with transparency for center small circle
context.fillStyle = `rgba(0,0,0,0.5)`;
context.beginPath();
context.arc(250, 100, 355, Math.PI / 4, Math.PI / 2, false);
context.arcTo(450, 350, 500, 350, 210)
context.closePath();
// context.stroke();
context.fill();

// poke ball
// upper half
context.lineWidth = 5;

context.fillStyle = "red";
context.beginPath();
context.arc(250, 250, 200, 0, Math.PI, true);
context.closePath();
context.fill();
context.stroke();

// lower half
context.fillStyle = "white";
context.beginPath();
context.arc(250, 250, 200, Math.PI, Math.PI * 2, true);
context.closePath();
context.fill();
context.stroke();

// some shadow with transparency for center small circle
context.fillStyle = `rgba(0,0,0,0.5)`;
context.beginPath();
context.arc(255, 255, 60, 0, Math.PI * 2, true);
context.closePath();
context.fill();

// center small circle
context.fillStyle = "white";
context.beginPath();
context.arc(250, 250, 60, 0, Math.PI * 2, true);
context.closePath();
context.fill();
context.stroke();

// broader outer stroke
context.lineWidth = 10;
context.beginPath();
context.arc(250, 250, 200, 0, Math.PI * 2, true);
context.closePath();
context.stroke();

// want to do the yellow lights 
// some shadow with transparency for center small circle
context.fillStyle = `rgba(248,223,114,0.4)`;
context.beginPath();
context.moveTo(45, 250);
context.lineTo(10, 100);
context.lineTo(55, 140);
context.lineTo(100, 40);
context.lineTo(140, 60);
context.lineTo(180, 10);
context.lineTo(230, 40);
context.lineTo(250, 0);
context.lineTo(270, 40);
context.lineTo(320, 10);
context.lineTo(380, 60);
context.lineTo(420, 40);
context.lineTo(465, 140);
context.lineTo(510, 100);
context.lineTo(455, 250);

context.closePath();
context.fill();





