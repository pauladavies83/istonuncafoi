let capture;
let switchFlag = false;
let cv;
let fft;
let mic;
let bands = 128;

var options = {
  video: {
    facingMode: "user"
  },
};

function setup() {
  cv = createCanvas(displayWidth, displayHeight);
  let containerId = "canvascontainer";
  cv.parent(containerId);
  
  capture = createCapture(options);
  capture.hide();
  
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0, bands);
  fft.setInput(mic);

  background(100);
}

function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
}

function draw() {
  let spectrum = fft.analyze();
  
  for (let i = 0; i < bands; i++) {
    let amp = spectrum[i];
    
    let vol = map(amp, 0, 255, 1, capture.width / 2); 
    
    let x = int(random(0, width));
    let y = int(random(0, height));
    
    let size = map(vol, 0, capture.width / 2, 10, 100);
    
    let newX = map(x, 0, capture.width, 0, cv.width + 50);
    let newY = map(y, 0, capture.height, 0, cv.height + 50);
    let newSize = map(size, 0, capture.height, 0, cv.height + 50);

    copy(capture, x, y, size, size, newX, newY, newSize, newSize);
  }
}
