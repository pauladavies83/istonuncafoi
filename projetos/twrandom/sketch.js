let capture;
let switchFlag = false;
let resizing = false;
let switchBtn;
let saveBtn;
let backBtn;
let cv;
let x = 0;
let y = 0;
let larg = 2;
let r;

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

  backBtn = createButton("Back");
  backBtn.class("btnControl");
  backBtn.mousePressed(back);
  backBtn.parent("divControles");

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
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function back() {
window.open("https://www.istonuncafoi.com", "_self");
}

function draw() {
  r = int(random(0, capture.height));
  newR = map(r, 0, capture.height, 0, cv.height);

  copy(capture, 0, r, capture.width, larg, 0, newR, cv.width, larg); 
}  