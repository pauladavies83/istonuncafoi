let capture;
let x = 0;
let y = 0;
let larg = 1;
let fr = 60;
let start = true;
let canvas2;
let vel;

function setup() {
  createCanvas(720, 610);
  canvas2 = createGraphics(720, 480);
  canvas2.clear();
  canvas2.background(255);
  capture = createCapture(VIDEO);
  capture.size(720, 480);
  capture.hide();
  textFont("Helvetica", 20);
}

function draw() {
  frameRate(fr);
  clear();
  vel = floor(map(frameRate(), 1, 60, 0, 100));
  text("Velocidade (de 0 à 100%): " + vel + "%", 10, 520);
  text("Área de captura: " + larg + "px", 10, 550);

  if (start) {
  canvas2.copy(capture, capture.width/2, 0, larg, capture.height, x, 0, larg + 20, capture.height);
  x = x + larg;
  canvas2.copy(capture, 0, capture.height/2, capture.width, larg + 20, 0, y, capture.width, larg);
  y = y + larg;


  if (x > capture.width) {
    x = 0;
  }
    if (y > capture.height-larg) {
    y = 0;
  }
  }
  image(canvas2, 0, 0);
}

function keyTyped() {
  if (key === "i" || key === "I") {
    larg = 1;
    fr = 60;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "SlitScanHorVert", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    fr += 5;
    if (fr > 60) {
      fr = 60;
    }
  } else if (keyCode === DOWN_ARROW) {
    fr -= 5;
    if (fr < 5) {
      fr = 5;
    }
  } else if (keyCode === RIGHT_ARROW) {
    larg += 5;
    if (larg > capture.width) {
      larg = capture.width;
    }
  } else if (keyCode === LEFT_ARROW) {
    larg -= 5;
    if (larg < 1) {
      larg = 1;
    }
  }
}
