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
  cv.parent("canvascontainer"); // Assuming your div is named "canvascontainer"
  
  capture = createCapture(options);
  capture.hide();
  
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0, bands);
  fft.setInput(mic);
}

function draw() {

  let spectrum = fft.analyze();
  
  for (let i = 0; i < bands; i++) {
    let amp = spectrum[i];
    
    let vol = map(amp, 0, 255, 1, capture.width / 2); 
    
    let x = int(random(0, capture.width));
    let y = int(random(0, capture.height));
    
    let newX = map(x, 0, capture.width, 0, width + 50);
    let newY = map(y, 0, capture.height, 0, height + 50); 
    
    copy(capture, x, y, vol, vol, newX, newY, vol, vol);
  }
}

function touchStarted() {
  userStartAudio();
  return false; // Prevent default behavior
}

function touchEnded() {
  return false; // Prevent default behavior
}

function switchCamera() {
  switchFlag = !switchFlag;

  let facingModeOption = switchFlag ? "environment" : "user";

  capture.remove();
  options = {
    video: {
      facingMode: facingModeOption,
    },
  };
  capture = createCapture(options);
  capture.hide();
}

function saveImg() {
  saveCanvas(cv, "IstoNuncaFoi", "jpg");
}

function back() {
  window.open("https://www.istonuncafoi.com", "_self");
}
