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
let r;
let caos = 0.01;
let xoff = 0;

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
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function back() {
window.open("https://www.istonuncafoi.com", "_self");
}

function draw() {
  r = int(noise(xoff)*capture.height);
  copy(capture, 0, r, capture.width, larg, 0, y, cv.width, larg);

  y = y + larg;
  xoff += caos;

  if (y > cv.height) {
    y = 0;
  }
}  