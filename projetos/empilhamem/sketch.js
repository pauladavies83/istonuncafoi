let capture;
let switchFlag = false;
let resizing = false;
let aumBtn;
let dimBtn;
let switchBtn;
let saveBtn;
let backBtn;
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

function back() {
  window.location.href = "https://www.istonuncafoi.com";
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
