import processing.video.*;
Capture video;

float xoff = 0;
int larg = 10;

void setup() {
  size(1920, 1080);
  video = new Capture(this, 1920, 1080);
  video.start();
}

void captureEvent(Capture video) {
  video.read();
}

void draw() {

  float r = noise(xoff)*height;
  copy(video, 0, int(r), width, larg, 0, int(r), width, larg);  

  xoff += 0.01;
  println(xoff);
}

void keyPressed() {
  if (key == 'c' || key == 'C') {
    xoff += 1;
  }
  //if (key == CODED) {
  //  if (keyCode == UP) {
  //    fr += 5;
  //      if (fr > 60) {
  //    fr = 60;
  //  }
  //} else if (keyCode == DOWN) {
  //  fr -= 5;
  //  if (fr < 1) {
  //    fr = 1;
  //  }
if (keyCode == RIGHT) {
    larg += 5;
    if (larg > 1080) {
      larg = 1080;
    }
  } else if (keyCode == LEFT) {
    larg -= 5;
    if (larg < 1) {
      larg = 1;
    }
  }
}
