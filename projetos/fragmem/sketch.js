let capture;
let switchFlag = false;
let resizing = false;
let startBtn;
let switchBtn;
let saveBtn;
let cv;
let fft;
let mic;
let bands = 128;
let vol;

var options = {
 video: {
    facingMode: "user"
  },
};

function setup() {
  cv = createCanvas((w = windowWidth), (h = windowHeight));
  let containerId = "canvascontainer";
  cv.parent(containerId);
  
  capture = createCapture(VIDEO);
  // capture.size(w, h);
  capture.hide();
  
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0, bands);
  fft.setInput(mic);

  background(100);
  
  startBtn = createButton("Start!");
  startBtn.class("btnControl");
  startBtn.mousePressed(userStartAudio);
  startBtn.parent("divControles");

  switchBtn = createButton("Switch camera");
  switchBtn.class("btnControl");
  switchBtn.mousePressed(switchCamera);
  switchBtn.parent("divControles");

  saveBtn = createButton("Save image");
  saveBtn.class("btnControl");
  saveBtn.mousePressed(saveImg);
  saveBtn.parent("divControles");

  saveBtn = createButton("Back");
  saveBtn.class("btnControl");
  saveBtn.mousePressed(back);
  saveBtn.parent("divControles");

}

function windowResized() {
  console.log("Window resized!");
  clear();

  resizing = true;
  
  stopCapture();
  capture.remove();
  capture = createCapture(options);
  capture.size(windowWidth, windowHeight);
  capture.hide();
}

function switchCamera() {

  switchFlag = !switchFlag;

  let facingModeOption = "environment";
  if (switchFlag != true) facingModeOption = "user";

  //stopCapture();
  capture.remove();
  options = {
    video: {
      facingMode: facingModeOption,
    },
  };
  capture = createCapture(options);
  capture.hide();
}

function stopCapture() {
  let stream = capture.elt.srcObject;
  if (!stream) return;
  let tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });
}

function saveImg() {
  // save();
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function back() {
window.open("https://www.istonuncafoi.com", "_self");
}

function draw() {
    let spectrum = fft.analyze();
    
    for (var i = 0; i < bands; i++) {
    let amp = spectrum[i];
      
    let vol = map(amp, 0, 255, 1, capture.width/1); 
    
    let x = int(random(0, capture.width));
    let y = int(random(0, capture.height));
    
    
    let newX = map(x, 0, capture.width, 0, cv.width+50);
    let newY = map(y, 0, capture.height, 0, cv.height+50); 
    
    copy(capture, x, y, vol, vol, newX, newY, vol, vol);

  }
}


