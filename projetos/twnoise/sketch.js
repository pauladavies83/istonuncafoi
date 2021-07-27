let capture;
let y = 0;
let larg = 1;
let fr = 60;
let start = true;
let canvas2;
let vel;
let r;
let caos = 0.01;
let xoff = 0;

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
  text("Caos (quanto maior o número, mais caótica a formação da imagem): " + round(caos, 10), 10, 580);

  if (start) {
  r = int(noise(xoff)*height);
  canvas2.copy(capture, 0, r, capture.width, larg, 0, y, capture.width, larg);

  y = y + larg;
  xoff += caos;

  if (y > capture.height) {
    y = 0;
  }
  }
  image(canvas2, 0, 0);
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
        larg = 1;;
      }
    }
  }

function keyTyped() {
  if (key === "q" || key === "Q") {
    caos *= 10;
    if (caos > 1000) {
    caos = 1000;
   }
 } else if (key === "a" || key === "A") {
    caos *= 0.1;
    if (caos < 0.00001) {
    caos = 0.00001;
   }
  } else if (key === "i" || key === "I") {
    larg = 1;
    fr = 60;
    caos = 0.01;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "TimeWarpPerlinNoise", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  }
}
