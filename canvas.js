// Inintial Setup

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", resetCanvas);
window.addEventListener("click", restartAnimation);
function resetCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
// when the ball stops due to the friction its height becomes bigger the canvas height
let frictionDifference = 8;
let colorArray = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7f66"];
let friction = 0.9;

const gravity = 1;
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.update = function () {
      this.draw();
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction;
      } else {
        this.dy += gravity;
      }

      this.x += this.dx;
      if (this.x > canvas.width - this.radius || this.x <= 0 - this.radius) {
        this.dx = -this.dx;
      } else {
        this.y += this.dy;
      }
    };

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.fill();
      c.stroke();
      c.closePath();
    };
  }
}
let arrayofBalls = [];
function init() {
  for (let i = 0; i < 500; i++) {
    let radius = Math.floor(Math.random() * 30);
    let randomX = Math.floor(Math.random() * canvas.width - radius);
    let randomY = Math.floor(Math.random() * canvas.height - radius);

    let randomColors = Math.floor(Math.random() * colorArray.length);
    let randomDx = Math.random() - 0.5;
    arrayofBalls.push(
      new Ball(randomX, randomY, randomDx, 10, radius, colorArray[randomColors])
    );
  }
}
function restartAnimation() {
  arrayofBalls = [];
  init();
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(animate);
  arrayofBalls.forEach((element) => element.update());
}
init();
animate();
