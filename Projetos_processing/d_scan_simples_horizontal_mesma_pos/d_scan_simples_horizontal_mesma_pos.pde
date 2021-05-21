import processing.video.*;
Capture video;

int x = 0;
int y = 0;
int larg = 1;
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
  copy(video, video.width/2, 0, 20 + larg, video.height, x, 0, 20 + larg, height);  
  x = x + larg;

  if (x > width) { 
    x = 0;
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
    if (fr < 5) {
      fr = 5;
    }
  } else if (keyCode == RIGHT) {
    larg += 5;
    if (larg > 1920) {
      larg = 1920;
    }
  } else if (keyCode == LEFT) {
    larg -= 5;
    if (larg < 1) {
      larg = 1;
    }
  }
}
}
