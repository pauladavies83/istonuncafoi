let capture;
let x = 0;
let y = 0;
let xoff = 100;
let caos = 0.01;
let tam = 10;
let alt;
let larg;
let fr = 45;
let start = true;
let ale = false;
let canvas2;
let vel;

function setup() {
  createCanvas(720, 640);
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
  if(ale){
  text("Tipo de aleatoriedade: perlin noise", 10,580);
} else {
  text("Tipo de aleatoriedade: randômica", 10,580);
}
  text("Caos (quanto maior o número, mais caótica a formação da imagem): " + round(caos, 10), 10, 610);

  if (start) {
    alt = floor(capture.height / tam);
    larg = floor(capture.width / tam);
    let r = int(random(0, capture.height));
    let r2 = int(random(0, capture.width));
    let n = int(noise(xoff)*height);
    let n2 = int(noise(xoff)*width);


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
    if (y + alt > capture.width){
      y = 0;
    }
  }

  if (y >= capture.height) {
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
      tam -= 1;
      if (tam < 1) {
        tam = 1;
      }
    } else if (keyCode === LEFT_ARROW) {
      tam += 1;
      if (tam > 50) {
        tam = 50;
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
 } else if (key === "z" || key === "Z"){
    ale = !ale;
  } else if (key === "i" || key === "I") {
    tam = 10;
    fr = 45;
    caos = 0.01;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "RetRandomPerlinNoise", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      frameRate(0);
    } else {
      frameRate(fr);
    }
  } else if (key === "x" || key === "X") {
        canvas2.background(255);
      }
}
