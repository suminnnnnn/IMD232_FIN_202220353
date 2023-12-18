let W2, H2;
let maxCanvasHeight = 600;
let xspacing = 12;
let w;
let theta = 0;
let amplitude = 75.0;
let period = 400.0;
let dx;
let yvalues;
let canvas2;

let mouse1;
let mouse2;

function setup() {
  let container2 = document.querySelector('#canvas-container-2');
  W2 = windowWidth * 0.9;
  H2 = min(W2 * 0.6, maxCanvasHeight);
  canvas2 = createCanvas(W2, H2);
  canvas2.parent(container2);
  w = width + 12;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
}

function draw() {
  linearGradient(0, 0, width, height, color(130, 230, 255), color(0, 0, 255));
  Wave();
  whiteWave();
  mouse1 = map(mouseX, 0, width, 0, 2);
  mouse2 = map(mouseY, 0, height, 1, 3);
}

//파도를 표현하기 위해 for 루프를 기반으로 한 코드를 활용하였습니다. 고정된 파형의 기존 코드에 마우스를 활용해 진폭의 넓이, 높이가 바뀌도록 했습니다.
//https://www.geeksforgeeks.org/how-to-create-animation-of-sine-wave-pattern-using-p5-js/
function Wave() {
  theta += 0.09;
  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = mouse2 * sin(x * mouse1) * amplitude;
    x += dx;
  }
}

function whiteWave() {
  noStroke();
  fill(255);

  for (var x = 0; x < yvalues.length; x++) {
    rect(
      map(x, 0, yvalues.length, 0, width),
      map(height / 3 + yvalues[x], 0, height, 0, height),
      20,
      50
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
  H2 = min(W2 * 0.6, maxCanvasHeight);
  resizeCanvas(W2, H2);
  redraw();
}
