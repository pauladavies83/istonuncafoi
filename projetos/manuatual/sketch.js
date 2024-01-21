let capture;
let switchFlag = false;
let cv;
let switchBtn;
let saveBtn;
let backBtn;

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
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth, windowHeight);
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
  window.location.href = "https://www.istonuncafoi.com";
}

function draw() {
  if (mouseIsPressed || touches.length > 0) {
    for (let i = 0; i < touches.length; i++) {
      let circleSize = 50; // Set the size of the circles
      ellipse(touches[i].x, touches[i].y, circleSize, circleSize);
    }
  }
}

function mousePressed() {
  // Prevent default behavior for touch
  return false;
}

// Disable pinch and zoom gestures on mobile
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
