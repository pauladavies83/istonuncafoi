let capture;
// let alt;
// let larg;
let tam;
let start = true;
let r;
let r2;
let switchFlag = false;
let resizing = false;
let dimBtn;
let aumBtn;
let switchBtn;
let cv;

let fft;
let mic;
let bands = 128;
let vol;

var options = {
 video: {
    facingMode: "user"
  },
};

function setup() {
  //disabling navigation via gestures:
  let els = document.getElementsByClassName("disable-nav");
  let prevDefOnEl = (el) =>
    el.addEventListener("touchstart", (e) => e.preventDefault());
  els.forEach((el) => prevDefOnEl(el));

  //utilizando windowWidth and windowHeight ao invés de displayWidth
  cv = createCanvas((w = windowWidth), (h = windowHeight));
  let containerId = "canvascontainer";
  cv.parent(containerId);
  
  capture = createCapture(VIDEO);
  // capture.size(w, h);
  capture.hide();
  
  mic = new p5.AudioIn();
  // mic.start();

  fft = new p5.FFT(0, bands);
  fft.setInput(mic);

  background(100);

  switchBtn = createButton("Mudar câmera");
  switchBtn.class("btnControl");
  switchBtn.mousePressed(switchCamera);
  switchBtn.parent("divControles");

  saveBtn = createButton("Salvar imagem");
  saveBtn.class("btnControl");
  saveBtn.mousePressed(saveImg);
  saveBtn.parent("divControles");

  stopBtn = createButton("Parar / reiniciar");
  stopBtn.class("btnControl");
  stopBtn.mousePressed(stopCapt);
  stopBtn.parent("divControles");
  
  micBtn = createButton("Mic");
  micBtn.class("btnControl");
  micBtn.mousePressed(startMic);
  micBtn.parent("divControles");
}

function windowResized() {
  console.log("Window resized!");
  clear();

  resizing = true;
  
  //TODO group into method
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

  //capture.elt.srcObject = null;
}

function saveImg() {
saveCanvas(canvas, "IstoNuncaFoi", "jpg");
}

function stopCapt() {
start = !start;
}

function startMic() {
mic.start();
}

function draw() {
  if (start) {

    let spectrum = fft.analyze();
    
    for (var i = 0; i < bands; i++) {
    let amp = spectrum[i];
      
    let vol = map(amp, 0, 255, 1, height); 
    
    // alt = floor(capture.height / tam);
    // larg = floor(capture.width / tam);
      
    let tam = vol/5;
    // let larg = vol;
    
    let x = int(random(0, capture.height));
    let y = int(random(0, capture.width));
    
    let newX = map(x, 0, capture.height, 0, cv.height+200);
    let newY = map(y, 0, capture.width, 0, cv.width+200);    
    
    copy(capture, y, x, tam, tam, newY, newX, tam, tam);
  }
}
}  

function logGesture(gestureType, event) {
  console.log("Detected gesture: " + gestureType);
  showMessage(gestureType);
  console.log(event);
}

function showMessage(message) {
  //this mess is because I failed to animate the text with CSS
  //I create new elements every time
  let el = document.getElementById("messageContainer");
  el.innerHTML="";
  let newEl = document.createElement('p');
  newEl.appendChild(document.createTextNode(message));
  el.appendChild(newEl);
  newEl.classList.toggle("fade-in-out");
}
