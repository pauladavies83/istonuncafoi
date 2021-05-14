import processing.video.*;
Capture video;

int fr = 60;
int tam = 12;


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
  int alt = video.height/tam;
  int larg = video.width/tam;
  float r = random(0, height);
  float r2 = random(0, width);

  copy(video, int(r2), int(r), larg, alt, int(r2), int(r), larg, alt);



  println(frameRate);
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
    } else if (keyCode == LEFT) {
      tam += 1;
      if (tam > 1080) {
        tam = 1080;
      }
    } else if (keyCode == RIGHT) {
      tam -= 1;
      if (tam == 0) {
        tam = 1;
      }
    }
  }
}
