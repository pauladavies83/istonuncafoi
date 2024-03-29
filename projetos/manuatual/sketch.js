let capture;
let switchFlag = false;
let resizing = false;
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
  // capture.size(w, h);
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
  let facingModeOption = switchFlag ? "environment" : "user";

  capture.remove();
  setTimeout(() => {
    options = {
      video: {
        facingMode: facingModeOption,
      },
    };
    capture = createCapture(options);
    capture.hide();
  }, 1000); // Add a delay of 1 second (adjust as needed)
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
  window.location.href = "https://www.istonuncafoi.com";
}

function draw() {
  if (mouseIsPressed || touches.length > 0) {
    for (let i = 0; i < touches.length; i++) {
      copy(capture, touches[i].x, touches[i].y, 50, 50, touches[i].x, touches[i].y, 50, 50);
    }
  }
}

function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});
