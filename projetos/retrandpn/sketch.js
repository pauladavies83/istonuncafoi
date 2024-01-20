let capture;
let switchFlag = false;
let resizing = false;
let trocaBtn;
let switchBtn;
let saveBtn;
let backBtn;
let cv;
let x = 0;
let y = 0;
let xoff = 100;
let caos = 0.01;
let tam = 70;
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

  trocaBtn = createButton("Variar!");
  trocaBtn.class("btnControl");
  trocaBtn.mousePressed(troca);
  trocaBtn.parent("divControles");
  
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

function troca() {
ale = !ale;
}

function saveImg() {
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function back() {
window.open("https://www.istonuncafoi.com", "_self");
}

function draw() {

    let rx = int(random(0, capture.width));
    let ry = int(random(0, capture.height));
  
    let nx = int(noise(xoff)*capture.width);
    let ny = int(noise(xoff)*capture.height);
    
 if (ale) {
    copy(capture, nx, ny, tam, tam, x, y, tam, tam);
  } else {
    copy(capture, rx, ry, tam, tam, x, y, tam, tam);
  }

  xoff += caos;
  x += tam;

  if ( x > cv.width) {
    x = 0;
    y = y + tam;
    if (y > cv.height){
      y = 0;
    }
  }

  if (y >= cv.height) { 
    y = 0;
  }
}  