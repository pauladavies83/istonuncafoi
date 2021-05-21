import processing.video.*;

Capture video;

float xoff = 0;

void setup() {
  size(1920, 1080);
  video = new Capture(this, 1920, 1080); // ao invés de colocar o tamanho da imagem, dá pra colocar um item da lista do Capture.list();
  video.start(); // pro video começar
}

void captureEvent (Capture video) {
  video.read();
}

//void mousePressed() {
//  video.jump(0);
//}

void draw() {
  //float r = map(mouseX, 0, width, 0, 4);
  //video.speed(r);
  //image(video, 0, 0);
  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y <height; y++) {
      int loc = x+y*width;
      float r = random((mouseX+mouseY)/4);
      int ran = int(r);
      pixels[loc] = video.pixels[abs(ran-loc)];
      //} else {
      //  pixels[loc] = video.pixels[loc];
      //}
    }
  }
  updatePixels();
}
