let capture;
let alt;
let larg;
let tam = 14;
let fr = 45;
let start = true;
let canvas2;
let vel;
let r;
let r2;

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
  text("Tamanho do retângulo: " + alt + " x " + larg + " px", 10, 550);

  if (start) {
    alt = floor(capture.height / tam);
    larg = floor(capture.width / tam);
    r = int(random(0, capture.height));
    r2 = int(random(0, capture.width));
    canvas2.copy(capture, int(r2), int(r), larg, alt, int(r2), int(r), larg, alt);
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
    tam -= 1;
    if (tam < 1) {
      tam = 1;
    }
  } else if (key === "d" || key === "D") {
    tam += 1;
    if (tam > 50) {
      tam = 50;
    }
  } else if (key === "i" || key === "I") {
    tam = 12;
    fr = 45;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "RetRandom", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  }
}
