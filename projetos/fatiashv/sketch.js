let capture;
let switchFlag = false;
let resizing = false;
let switchBtn;
let saveBtn;
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
