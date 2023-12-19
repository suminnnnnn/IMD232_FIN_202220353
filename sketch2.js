let W2, H2;
let maxCanvasHeight = 600;
let xs = 12;
let w;
let theta = 0;
let amplitude = 75.0;
let period = 400.0;
let dx;
let yv;
let canvas2;

let mouse1;
let mouse2;

let circles = [];

function setup() {
  let container2 = document.querySelector('#canvas-container-2');
  W2 = windowWidth * 0.9;
  H2 = min(W2 * 0.6, maxCanvasHeight);
  canvas2 = createCanvas(W2, H2);
  canvas2.parent(container2);
  w = width + 12;
  dx = (TWO_PI / period) * xs;
  yv = new Array(floor(w / xs));

  noStroke();
}

function draw() {
  linearGradient(0, 0, width, height, color(130, 230, 255), color(0, 0, 255));
  Wave();
  whiteWave();

  mouse1 = map(mouseX, 0, width, 0, 2);
  mouse2 = map(mouseY, 0, height, 1, 3);

  update();
  display();
}

//파도를 표현하기 위해 for 루프를 기반으로 한 코드를 활용하였습니다. 고정된 파형의 기존 코드에 마우스를 활용해 진폭의 넓이, 높이가 바뀌도록 했습니다.
//https://www.geeksforgeeks.org/how-to-create-animation-of-sine-wave-pattern-using-p5-js/
function Wave() {
  theta += 0.09;
  let x = theta;

  for (let i = 0; i < yv.length; i++) {
    yv[i] = mouse2 * sin(x * mouse1) * amplitude;
    x += dx;
  }
}

function whiteWave() {
  noStroke();
  fill(255);

  for (let x = 0; x < yv.length; x++) {
    rect(
      map(x, 0, yv.length, 0, width),
      map(height / 3 + yv[x], 0, height, 0, height),
      20,
      50
    );
  }
}

//그라데이션 배경을 적용하고 싶어서 챗지피티의 도움을 빌렸습니다.
function linearGradient(x, y, w, h, c1, c2) {
  noFill();

  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function display() {
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];
    circle.update();
    circle.display();
    if (circle.isOffScreen()) {
      circles.splice(i, 1);
    }
  }
}

function update() {
  if (mouseIsPressed) {
    let circle = new Circle(mouseX, mouseY);
    circles.push(circle);
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(5, 20);
    this.color = color(255, 255, 255, 150);
    this.speed = random(1, 3);
    this.aSpeed = random(1, 3);
  }

  update() {
    this.y -= this.speed;
    this.color.setAlpha(this.color.levels[3] - this.aSpeed);
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, 2 * this.radius);
  }

  isOffScreen() {
    return this.y + this.radius < 0;
  }
}

function windowResized() {
  W2 = windowWidth * 0.9;
  H2 = min(W2 * 0.6, maxCanvasHeight);
  resizeCanvas(W2, H2);
  redraw();
}
