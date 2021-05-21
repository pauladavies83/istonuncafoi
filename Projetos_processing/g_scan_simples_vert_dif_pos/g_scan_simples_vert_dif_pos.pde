//frame retirado em sequência e colocado em sequência

import processing.video.*;
Capture video;

int x = 0;
int y = 0;
int larg = 1;
int fr = 60;
boolean start = true;

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
  if (start) {
    copy(video, 0, y, width, larg, 0, y, width, larg);  
    y = y + larg;

    if (y > height) { 
      y = 0;
    }
  }
  println(frameRate);
}

void keyPressed() {
  start = !start;
}
