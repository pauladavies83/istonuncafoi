let capture;
let fundo;
let transp;
let tam = 10;
let rap = 10;
let start = true;
let canvas2;
let x;
let y;
let ale = true;

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
  clear();
  // vel = floor(map(rap, 1, 50, 0, 100));
  // text("Velocidade (de 0 à 100%): " + vel + "%", 10, 760);
  if(ale){
  text("Modo de escolha do tamanho dos quadrados: manual", 10,760);
} else {
  text("Modo de escolha do tamanho dos quadrados: automático", 10,760);
}
  text("Tamanho do quadrado: " + tam + " px", 10,790);

  if (start) {
    capture.loadPixels();
    for (let i = 0; i < rap; i++) {
      let x = random(capture.width-tam);
      let y = random(capture.height-tam);
      c = capture.get(x, y);

      canvas2.fill(c);
      canvas2.noStroke();
      if (ale){
      canvas2.square(x, y, tam);
      } else {
      canvas2.square(x, y, int(random(tam)));
      }
    }
    capture.updatePixels();
    updatePixels();

  }
  image(canvas2, 0, 0);
}

function keyTyped() {
  if (key === "r" || key === "R") {
    rap += 5;
    if (rap > 50) {
      rap = 50;
    }
  } else if (key === "l" || key === "L") {
    rap -= 5;
    if (rap < 5) {
      rap = 5;
    }
  } else if (key === "a" || key === "A") {
    tam += 5;
    if (tam > 200) {
      tam = 200;
    }
  } else if (key === "d" || key === "D") {
    tam -= 5;
    if (tam > 5) {
      tam = 5;
    }
}  else if (key === "i" || key === "I") {
    tam = 10;
    rap = 10;
  } else if (key === "t" || key === "T"){
    ale = !ale;
  } else if (key === "s" || key === "S") {
    saveCanvas("PixelP", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
    if (start == false) {
      rap = 0;
    } else {
      rap = 25;
    }
  }
  print(rap);
  print(tam);
}
