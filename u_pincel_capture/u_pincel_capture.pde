PImage fundo;
PImage transp;
int tam = 100;

import processing.video.*;


Capture video;

void setup() {
  size(1920, 1080);
  video = new Capture(this, 1920, 1080);
  video.start(); 
  fundo = createImage(video.width, video.height, RGB); 
  transp = createImage(video.width, video.height, RGB); 
  background(255);
}


void captureEvent(Capture video) {
  video.read(); 
}

//void mousePressed() { 
//  video.loadPixels();
//  fundo.loadPixels();
//  arrayCopy(video.pixels, fundo.pixels);
//  updatePixels();
//  background(fundo);
//}

void draw() {

  loadPixels();

  for (int x = 0; x < width; x++) {
    for (int y = 0; y <height; y++) {

      int loc = x+y*width;
      float d = dist(x, y, mouseX, mouseY);  

      if (d < tam) {
        pixels[loc] = video.pixels[loc];
      } else {
        pixels[loc] = transp.pixels[loc];
      }
    }
  }
  updatePixels();
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      tam += 5;
      if (tam > 500) {
        tam = 500;
      }
    } else if (keyCode == DOWN) {
      tam -= 10;
      if (tam < 10) {
        tam = 10;
      }
    }
  }
}
