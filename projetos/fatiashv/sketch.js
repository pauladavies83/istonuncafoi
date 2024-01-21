let capture;
let switchFlag = false;
let resizing = false;
let switchBtn;
let saveBtn;
let backBtn;
let cv;
let x = 0;
let y = 0;
let larg = 1;

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

  background(100);

  switchBtn = createButton("Mudar a câmera");
  switchBtn.class("btnControl");
  switchBtn.mousePressed(switchCamera);
  switchBtn.parent("divControles");

  saveBtn = createButton("Salvar imagem");
  saveBtn.class("btnControl");
  saveBtn.mousePressed(saveImg);
  saveBtn.parent("divControles");

  backBtn = createButton("Voltar");
  backBtn.class("btnControl");
  backBtn.mousePressed(back);
  backBtn.parent("divControles");

}

function windowResized() {
  // Adjust canvas size when the window is resized
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth, windowHeight); // Update the size of the capture element
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
  window.location.href = "https://www.istonuncafoi.com";
}

function draw() {
  
  copy(capture, capture.width/2, 0, larg, capture.height, x, 0, larg + 20, cv.height);
  x = x + larg;
  copy(capture, 0, capture.height/2, capture.width, larg + 20, 0, y, cv.width, larg);
  y = y + larg;


  if (x > cv.width) {
    x = 0;
  }
    if (y > cv.height-larg) {
    y = 0;
  }
}  
