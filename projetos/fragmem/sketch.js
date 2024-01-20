let capture;
let switchFlag = false;
let resizing = false;
let startBtn;
let switchBtn;
let saveBtn;
let backBtn;
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
  
  startBtn = createButton("Iniciar!");
  startBtn.class("btnControl");
  startBtn.touchStarted(userStartAudio); // Use touchStarted for mobile touch interactions
  startBtn.parent("divControles");

  switchBtn = createButton("Mudar a câmera");
  switchBtn.class("btnControl");
  switchBtn.touchStarted(switchCamera); // Use touchStarted for mobile touch interactions
  switchBtn.parent("divControles");

  saveBtn = createButton("Salvar imagem");
  saveBtn.class("btnControl");
  saveBtn.touchStarted(saveImg); // Use touchStarted for mobile touch interactions
  saveBtn.parent("divControles");

  backBtn = createButton("Voltar");
  backBtn.class("btnControl");
  backBtn.touchStarted(back);
  backBtn.parent("divControles");
}

function windowResized() {
  // Adjust canvas size when the window is resized
  resizeCanvas(windowWidth, windowHeight);
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

function stopCapture() {
  let stream = capture.elt.srcObject;
  if (!stream) return;
  let tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });
}

function saveImg() {
  saveCanvas(cv, "IstoNuncaFoi", "jpg");
}

function back() {
  window.open("https://www.istonuncafoi.com", "_self");
}

function draw() {
  let spectrum = fft.analyze();
  
  for (let i = 0; i < bands; i++) {
    let amp = spectrum[i];
    
    let vol = map(amp, 0, 255, 1, capture.width / 2); 
    
    let x = int(random(0, capture.width));
    let y = int(random(0, capture.height));
    
    let newX = map(x, 0, capture.width, 0, cv.width + 50);
    let newY = map(y, 0, capture.height, 0, cv.height + 50); 
    
    copy(capture, x, y, vol, vol, newX, newY, vol, vol);
  }
}
