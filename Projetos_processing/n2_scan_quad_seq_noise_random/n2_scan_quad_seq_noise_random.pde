import processing.video.*;
Capture video;

boolean ale = false;
int x = 0;
int y = 0;
float xoff = 0;
float xoff2 = 20;
float caos = 0.01;
int fr = 30;
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
  float n = noise(xoff)*height;
  float n2 = noise(xoff)*width;

  if (ale) {
    copy(video, int(n2), int(n), larg, alt, x, y, larg, alt);
  } else {
    copy(video, int(r2), int(r), larg, alt, x, y, larg, alt);
  }

  xoff += caos;
  x += larg;

  if ( x > width) {
    x = 0;
    y = y + alt;
  }

  if (y >= height) { 
    y = 0;
  }
  
  println("framerate: " + frameRate + " altura: " + alt + " largura: " + larg);
}

void keyPressed() {
  if (key == TAB) {
    ale = !ale;
  }
  if (key == CODED) {
    if (keyCode == UP) {
      fr += 5;
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
