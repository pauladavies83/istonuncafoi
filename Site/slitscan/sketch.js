let capture;
let x = 0;
let y = 0;
let larg = 1;
let fr = 60;
let start = true;

function setup() {
  createCanvas(1920, 1080);
  capture = createCapture(VIDEO);
  capture.size(720, 480);
  capture.hide();
}

function draw() {
  frameRate(fr);
  if (start){
  copy(capture, capture.width / 2, 0, 20 + larg, capture.height, x, 0, 20 + larg, height);
  x = x + larg;

  if (x > width) {
    x = 0;
  }

  print(frameRate());
}
}

function keyPressed() {
   if (keyCode === RIGHT_ARROW) {
    larg += 5;
    if (larg > 720) {
      larg = 720;
    }
  } else if (keyCode === LEFT_ARROW) {
    larg -= 5;
    if (larg < 1) {
      larg = 1;
    }  
}
}

function keyTyped(){
  if (key === 'r') {
    fr += 5;
    if (fr > 60) {
      fr = 60;
    }
  } else if (key === 'd') {
    fr -= 5;
    if (fr < 5) {
      fr = 5;
    } 
  } else if (key === 's') {
  saveCanvas('SlitScan_hor', 'jpg');
  } else if (key === 'p') {
  start = !start;
  }
}

function detectMob() {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
  }