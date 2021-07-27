let capture;
let tam = 10;
let rap = 5;
let start = true;
let canvas2;
let ale = true;

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
  clear();
  if(ale){
    text("Modo de escolha do tamanho do pincel: humano (manual)", 10,520);
  } else {
    text("Modo de escolha do tamanho do pincel: algoritmo (randômico)", 10,520);
}
  text("Tamanho do pincel (modo manual): " + tam + " px", 10,550);

  if (start) {
    capture.loadPixels();
    for (let i = 0; i < rap; i++) {
      let x = random(capture.width-tam);
      let y = random(capture.height-tam);
      c = capture.get(x, y);
      canvas2.fill(c);
      canvas2.noStroke();
      if (ale){
      canvas2.circle(x, y, tam);
      } else {
      canvas2.circle(x, y, int(random(tam*3)));
      }
    }
    capture.updatePixels();
    print(frameRate());
  }
  image(canvas2, 0, 0);
}

function keyTyped() {
  if (key === "a" || key === "A") {
    tam += 5;
    if (tam > 200) {
      tam = 200;
    }
  } else if (key === "d" || key === "D") {
    tam -= 5;
    if (tam < 5) {
      tam = 5;
    }
}  else if (key === "i" || key === "I") {
    tam = 10;
    ale = true;
  } else if (key === "t" || key === "T"){
    ale = !ale;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "PixelRandom", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
  } else if (key === "f" || key === "F") {
      canvas2.background(255);
    }
}
