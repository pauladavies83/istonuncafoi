//frame retirado em noise e colocado em sequência, automático

import processing.video.*;
Capture video;
int y = 0;
int larg = 1;
float xoff = 0;
int fr = 60;



void setup() {
  size(1920, 1080);
  video = new Capture(this, 1920, 1080);
  video.start();
}

void captureEvent(Capture video) {
  video.read();
}


void draw() {
  frameRate(fr);
  int r = int(noise(xoff)*height);
  copy(video, 0, r, width, larg, 0, y, width, larg); 
  y = y + larg;

  xoff += 0.01;

  if (y > height) {
    y = 0;
  }
  println("framerate: " + frameRate + " caos: " + xoff);
}

void keyPressed() {
  if (key == 'c' || key == 'C') {
    xoff += 1;
  }
  if (key == CODED) {
    if (keyCode == UP) {
      fr += 5;
      if (fr > 60) {
        fr = 60;
      }
    } else if (keyCode == DOWN) {
      fr -= 5;
      if (fr < 1) {
        fr = 1;
      }
    } else if (keyCode == RIGHT) {
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
}
