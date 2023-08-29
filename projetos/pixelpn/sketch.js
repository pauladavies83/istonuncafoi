let capture;
let tam = 10;
let rap = 10;
let pn = 0;
let caos = 0.01;
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
  text("Escolha do tamanho do pincel: humana (manual)", 10,520);
} else {
  text("Escolha do tamanho do pincel: algoritmo (random)", 10,520);
}
  text("Tamanho do pincel: " + tam + " px", 10,550);
  text("Caos (quanto maior o número, mais caótica a formação da imagem): " + round(caos, 10), 10, 580);

  if (start) {
    for (let i = 0; i < rap; i++) {
      let x = map(noise(pn), 0, 1, 0, width-tam);
      let y = map(noise(pn+10), 0, 1, 0, height-tam);
      let c = capture.get(x, y);

      canvas2.fill(c);
      canvas2.noStroke();
      if (ale){
      canvas2.circle(x, y, tam);
      } else {
      canvas2.circle(x, y, int(random(tam*3)));
      }
      pn += caos;
    }
  }
  image(canvas2, 0, 0);
}


function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      tam += 5;
      if (tam > 200) {
        tam = 200;
      }
    } else if (keyCode === LEFT_ARROW) {
      tam -= 5;
      if (tam < 5) {
        tam = 5;
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
    ale = true;
    caos = 0.01;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "PixelPerlinNoise", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
  } else if (key === "x" || key === "X") {
        canvas2.background(255);
      }
}
