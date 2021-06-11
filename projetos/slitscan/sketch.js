let capture;
let x = 0;
let larg = 1;
let fr = 60;
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
  vel = floor(map(frameRate(), 1, 60, 0, 100));
  text("Velocidade (de 0 à 100%): " + vel + "%", 10, 760);
  text("Área de captura: " + larg + "px", 10, 790);

  if (start){
  canvas2.copy(capture, capture.width / 2, 0, 20 + larg, capture.height, x, 0, 20 + larg, capture.height);
  x = x + larg;

  if (x > width) {
    x = 0;
  }
}
  image(canvas2, 0, 0);
}


function keyTyped() {
  if (key === "r" || key === "R") {
    fr += 5;
    if (fr > 60) {
      fr = 60;
    }
  } else if (key === "l" || key === "L") {
    fr -= 5;
    if (fr < 5) {
      fr = 5;
    }
  } else if (key === "a" || key === "A") {
    larg += 5;
    if (larg > 1280) {
      larg = 1280;
    }
  } else if (key === "d" || key === "D") {
    larg -= 5;
    if (larg < 1) {
      larg = 1;
    }
  } else if (key === "i" || key === "I") {
    larg = 1;
    fr = 60;
  } else if (key === "s" || key === "S") {
    saveCanvas("SlitScan", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  }
  print(frameRate());
  print(larg);
}
