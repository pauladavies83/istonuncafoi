let capture;
let switchFlag = false;
let resizing = false;
let switchBtn;
let saveBtn;
let cv;
let x = 0;
let y = 0;
let r;
let r2;
let tam = 70;


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

  switchBtn = createButton("Câmera frontal / traseira");
  switchBtn.class("btnControl");
  switchBtn.mousePressed(switchCamera);
  switchBtn.parent("divControles");

  saveBtn = createButton("Salvar imagem");
  saveBtn.class("btnControl");
  saveBtn.mousePressed(saveImg);
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
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function draw() {
  
    let x = int(random(0, capture.width));
    let y = int(random(0, capture.height));
    let newX = map(x, 0, capture.width, 0, cv.width+50);
    let newY = map(y, 0, capture.height, 0, cv.height+50);
    copy(capture, x, y, tam, tam, newX, newY, tam, tam);
  
}  