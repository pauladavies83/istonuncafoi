let capture;
let alt;
let larg;
let tam = 14;
let fr = 45;
let start = true;
let button;
let vel;
let r;
let r2;

function setup() {
  createCanvas(displayWidth, displayHeight);
  capture = createCapture(VIDEO);
  // capture.size(720, 480);
  capture.hide();
  
  button = createButton('Diminuir retângulo');
  button.position(0, 0);
  button.size(150,50)
  button.mousePressed(dimRet);
  button.style('font-size', '18px');

}

function dimRet() {
    tam += 1;
    if (tam > 50) {
      tam = 50;
    }
}

function draw() {

  if (start) {
    alt = floor(capture.height / tam);
    larg = floor(capture.width / tam);
    r = int(random(0, capture.height));
    r2 = int(random(0, capture.width));
    copy(capture, int(r2), int(r), larg, alt, int(r2), int(r), larg, alt);
  }
}


function keyTyped() {
  if (key === "i" || key === "I") {
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
  } else if (key === "x" || key === "X") {
        background(255);
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
