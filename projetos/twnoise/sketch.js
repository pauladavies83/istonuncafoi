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
    facingMode: "user",
  },
};

function setup() {
  cv = createCanvas(windowWidth, windowHeight);
  let containerId = "canvascontainer";
  cv.parent(containerId);

  capture = createCapture(options);
  capture.size(windowWidth, windowHeight); // Set the size of the capture element
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

  capture.remove();
  options = {
    video: {
      facingMode: facingModeOption,
    },
  };
  capture = createCapture(options);
  capture.size(windowWidth, windowHeight); // Set the size of the capture element
  capture.hide();
}

function saveImg() {
  saveCanvas(cv, "IstoNuncaFoi", "jpg");
}

function back() {
  window.open("https://www.istonuncafoi.com", "_self");
}

function draw() {
  r = int(noise(xoff) * capture.height);
  copy(capture, 0, r, capture.width, larg, 0, y, cv.width, larg);

  y = y + larg;
  xoff += caos;

  if (y > cv.height) {
    y = 0;
  }
}
