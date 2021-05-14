import processing.video.*;
Capture video;

int x = 0;
int y = 0;

void setup() {
  size(1280, 720);
  video = new Capture(this, 1280, 720);
  video.start();
}

void captureEvent(Capture video) {
  video.read();
}

void draw() {
  //image(video,0,0);
  //for (int x = 0; x < width; x++) {
  //  copy(video, video.width/2, 0, 1, video.height, x, 0, 1, height);  // source, x (orig), y (orig), width (orig), height (orig), x (dest), y (dest), width (dest), height (dest)
  //}
  copy(video, video.width/2, 0, 1, video.height, x, 0, 1, height); 
  x = x+ 1;
  copy(video, 0, video.height/2, video.width, 1, 0, y, width, 1); 
  y = y + 1;
  
  if (x > width) { // loop
    x = 0;
  }
    if (y > height) { // loop
    y = 0;
  }
}

// vertical
// radial
// colocar os frames em lugares diferentes, não um atrás do outro.
