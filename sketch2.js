let W2, H2;
let maxCanvasHeight = 600; // 최대 세로 길이 설정
let xspacing = 12;
let w;
let theta = 0;
let amplitude = 75.0;
let period = 400.0;
let dx;
let yvalues;
let canvas2;

let sensor1;
let sensor2;

function setup() {
  let container2 = document.querySelector('#canvas-container-2');
  W2 = windowWidth * 0.9;
  H2 = min(W2 * 0.6, maxCanvasHeight); // 세로 길이는 최대 700으로 제한
  canvas2 = createCanvas(W2, H2);
  canvas2.parent(container2);
  w = width + 12;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  linearGradient(0, 0, width, height, color(130, 230, 255), color(0, 0, 255));
  calcWave();
  renderWave();
  sensor1 = map(mouseX, 0, width, 0, 5);
  sensor2 = map(mouseY, 0, height, 1, 3);
}

function calcWave() {
  theta += 0.09;
  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sensor2 * sin(x * sensor1) * amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255);

  for (var x = 0; x < yvalues.length; x++) {
    ellipse(
      map(x, 0, yvalues.length, 0, width),
      map(height / 105 + yvalues[x], 0, height, 0, height),
      10,
      -390
    );
  }
}

function linearGradient(x, y, w, h, c1, c2) {
  noFill();

  for (var i = y; i <= y + h; i++) {
    var inter = map(i, y, y + h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function windowResized() {
  W2 = windowWidth * 0.9;
  H2 = min(W2 * 0.6, maxCanvasHeight); // 세로 길이는 최대 700으로 제한
  resizeCanvas(W2, H2);
  redraw();
}
