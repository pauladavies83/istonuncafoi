let capture;
let y = 0;
let larg = 5;
let fr = 60;
let start = true;
let canvas2;
let vel;
let r;

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
  r = int(random(0, height));
  canvas2.copy(capture, 0, r, capture.width, larg, 0, r, capture.width, larg);
  y = y + larg;

  if (y > capture.height) {
    y = 0;
  }
  }
  image(canvas2, 0, 0);


}

function keyTyped() {
  if (key === "i" || key === "I") {
    larg = 10;
    fr = 60;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "TimeWarpRandomico", "jpg");
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
