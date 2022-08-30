let capture;
let switchFlag = false;
let resizing = false;
let aumBtn;
let dimBtn;
let switchBtn;
let cv;
let imgs = [];
let prev;
let memoria = 250;

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
  
  aumBtn = createButton("Memória longa");
  aumBtn.class("btnControl");
  aumBtn.mousePressed(aumMem);
  aumBtn.parent("divControles");

  dimBtn = createButton("Memória curta");
  dimBtn.class("btnControl");
  dimBtn.mousePressed(dimMem);
  dimBtn.parent("divControles");
  
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

function aumMem() {
  memoria = 1000;
}

function dimMem() {
  memoria = 1;
}

function saveImg() {
  // save();
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function draw() {
  prev = capture.get();
  imgs.push(prev);

  for (let i = 0; i < imgs.length; i++) {
    tint(255, 20);
    image(imgs[i], 0, 0, cv.width, cv.height);
  }

  if (imgs.length >= memoria) {
    for (let i = 0; i < imgs.length; i++) {
      imgs.shift();
    }
  } 
}  
