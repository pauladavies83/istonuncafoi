PImage fundo;
PImage transp;
int tam = 50;
int rap = 300;

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

  video.loadPixels();
    float x = mouseX;
    float y = mouseY;
    color c = video.pixels[int(x) + int(y) * width]; // a função get pega a cor de um determinado pixel. deve ser informada com 2 números int, por isso a função de conversão
    fill(c); // 25 é o alpha
    noStroke();
    ellipse(x, y, tam, tam);

    video.updatePixels();
  }

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      tam += 5;
      if (tam > 1000) {
        tam = 1000;
      }
    } else if (keyCode == DOWN) {
      tam -= 5;
      if (tam < 5) {
        tam = 5;
      }
    } else if (keyCode == RIGHT) {
      rap += 10;
      if (rap > 1000) {
        rap = 1000;
      }
    } else if (keyCode == LEFT) {
      rap -= 10;
      if (rap < 10) {
        rap = 10;
      }
    }
  }
}
