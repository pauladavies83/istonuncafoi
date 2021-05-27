let x = 0;
let y = 0;
let larg = 1;
let fr = 30;
let start = true;
let canvas2;
let vel;

function setup() {
  createCanvas(1280, 820);
  canvas2 = createGraphics(1280, 820);
  canvas2.clear();
  capture = createCapture(VIDEO);
  capture.size(1280, 720);
  capture.hide();
  textFont("Helvetica", 20);
}

function draw() {
  frameRate(fr);
  clear();
  vel = floor(map(frameRate(), 1, 35, 0, 100));
  text("Velocidade (de 0 à 100%): " + vel + "%", 10, 760);
  text("Área de captura: " + larg + "px", 10, 790);

  if (start) {
    canvas2.copy(capture, 0, y, capture.width, larg, 0, y, capture.width, larg);
    y = y + larg;

    if (y > capture.height) {
      y = 0;
    }
  }
  image(canvas2, 0, 0);
}

function keyTyped() {
  if (key === "r" || key === "R") {
    fr += 5;
    if (fr > 40) {
      fr = 40;
    }
  } else if (key === "d" || key === "D") {
    fr -= 5;
    if (fr < 5) {
      fr = 5;
    }
  } else if (key === "l" || key === "L") {
    larg += 5;
    if (larg > 720) {
      larg = 720;
    }
  } else if (key === "e" || key === "E") {
    larg -= 5;
    if (larg < 1) {
      larg = 1;
    }
  } else if (key === "s" || key === "S") {
    saveCanvas("TimeWarp", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  }
  print(frameRate());
}
