let capture;
let start = true;
let canvas2;
let tam = 25;

function setup() {
  createCanvas(720, 610);
  canvas2 = createGraphics(720, 480);
  canvas2.clear();
  canvas2.background(255);
  capture = createCapture(VIDEO);
  capture.size(720, 480);
  capture.hide();
  textFont("Helvetica", 20);
}

function draw() {
  clear();
  text("Tamanho do pincel: " + tam + " px", 10,520);
  if (start) {
  capture.loadPixels();
  canvas2.loadPixels();

    for (let y = 0; y < height; y++) {
     for (let x = 0; x < width; x++) {

    let loc = (x + y * width) * 4;
    let d = dist(x, y, mouseX, mouseY);

      if (d < tam) {
        canvas2.pixels[loc + 0] = capture.pixels[loc + 0];
        canvas2.pixels[loc + 1] = capture.pixels[loc + 1];
        canvas2.pixels[loc + 2] = capture.pixels[loc + 2];
        canvas2.pixels[loc + 3] = capture.pixels[loc + 3];
      }

   }
  }
    capture.updatePixels();
    canvas2.updatePixels();
  }
  image(canvas2, 0, 0);
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      tam += 5;
      if (tam > 200) {
        tam = 200;
      }
    } else if (keyCode === LEFT_ARROW) {
      tam -= 5;
      if (tam < 5) {
        tam = 5;
      }
    }
  }

function keyTyped() {
  if (key === "i" || key === "I") {
    tam = 35;
  } else if (key === "s" || key === "S") {
    saveCanvas(canvas2, "PixelCapture", "jpg");
  } else if (key === "p" || key === "P") {
    start = !start;
  } else if (key === "x" || key === "X") {
        canvas2.background(255);
      }
}
