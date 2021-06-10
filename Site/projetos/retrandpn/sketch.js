let capture;
let x = 0;
let y = 0;
let xoff = 100;
let caos = 0.01;
let tam = 12;
let alt;
let larg;
let fr = 60;
let start = true;
let ale = true;
let canvas2;
let vel;
let r;
let r2;

function setup() {
  createCanvas(1280, 850);
  canvas2 = createGraphics(1280, 850);
  canvas2.clear();
  capture = createCapture(VIDEO);
  capture.size(1280, 720);
  capture.hide();
  textFont("Helvetica", 20);
}

function draw() {
  frameRate(fr);
  clear();
  vel = floor(map(frameRate(), 1, 50, 0, 100));
  text("Velocidade (de 0 à 100%): " + vel + "%", 10, 760);
  text("Tamanho do retângulo: " + alt + " x " + larg + " px", 10,790);
  text("Índice de caos (quanto maior o número, mais caótica a formação da imagem): " + round(caos, 10), 10, 820);

  if (start) {
    alt = floor(capture.height / tam);
    larg = floor(capture.width / tam);
    r = int(random(0, capture.height));
    r2 = int(random(0, capture.width));
    n = int(noise(xoff)*height);
    n2 = int(noise(xoff)*width);


 if (ale) {
    canvas2.copy(capture, n2, n, larg, alt, x, y, larg, alt);
  } else {
    canvas2.copy(capture, r2, r, larg, alt, x, y, larg, alt);
  }

  xoff += caos;
  x += larg;

  if ( x > capture.width) {
    x = 0;
    y = y + alt;
    if (y + alt > 720){
      y = 0;
    }
  }

  if (y >= capture.height) {
    y = 0;
  }

  }
  image(canvas2, 0, 0);
}

function keyTyped() {
  if (key === "r" || key === "R") {
    fr += 5;
    if (fr > 50) {
      fr = 50;
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
} else if (key === "c" || key === "C") {
    caos *= 10;
  if (caos > 1000) {
    caos = 1000;
    }
  } else if (key === "o" || key === "O") {
    caos *= 0.1;
    if (caos < 0.00001) {
    caos = 0.00001;
    }
  } else if (key === "i" || key === "I") {
    tam = 12;
    fr = 45;
    caos = 0.01;
  } else if (key === "t" || key === "T"){
    ale = !ale;
  } else if (key === "s" || key === "S") {
    saveCanvas("RetRandomPerlin", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  }
  print(frameRate());
  print(alt, larg);
  print(tam);
}
