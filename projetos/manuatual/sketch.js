let capture;
let switchFlag = false;
let resizing = false;
let cv;
let canvas2;

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
  capture.size(w, h);
  capture.hide();

  background(100);

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

function draw() {

   for (var i = 0; i < touches.length; i++) {

    let newX = map(x, 0, capture.width, 0, cv.width);
    let newY = map(y, 0, capture.height, 0, cv.height); 

copy(capture, touches[i].x, touches[i].y, 50, 50, touches[i].newX, touches[i].newY, 50, 50);
  
}  
}

function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});
