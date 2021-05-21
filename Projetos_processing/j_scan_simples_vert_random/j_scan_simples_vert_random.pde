import processing.video.*;
Capture video;

int x = 0;
int y = 0;
int larg = 10;
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
  float r = random(0, height);
  copy(video, 0, int(r), width, larg, 0, int(r), width, larg); 

  y = y + larg;

  if (y > height) { // loop
    y = 0;
  }
  println("framerate: " + frameRate);
}

void keyPressed() {
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
