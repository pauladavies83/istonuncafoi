let tam = 10;
let rap = 10;
let pn = 0;
let caos = 0.01;
let start = true;
let canvas2;
let ale = true;


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
  

  for (let i = 0; i < rap; i++) {
    let x = map(noise(pn), 0, 1, 0, capture.width);
    let y = map(noise(pn+10), 0, 1, 0, capture.height);
    let c = capture.get(x, y);

    let newX = map(x, 0, capture.width, 0, cv.width);
    let newY = map(y, 0, capture.height, 0, cv.height); 

    fill(c);
    noStroke();
    circle(newX, newY, tam); 
    pn += caos;
  }
    
}  
