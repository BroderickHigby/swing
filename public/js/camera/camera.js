let video;
let canvas;
let ctx;
let network;

function startVideo() {
    network = posenet.load();
    video = document.getElementById("camera");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.setAttribute("width", 500);
    canvas.setAttribute("height", 500);
        
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        });
    }

    window.setInterval(renderFrame, 10000);
}

function renderFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageScaleFactor = 0.5;
    var outputStride = 16;
    var flipHorizontal = false;

    network.then(function(net){
      return net.estimateSinglePose(canvas, imageScaleFactor, flipHorizontal, outputStride)
    }).then(function(pose){
      console.log(pose);
      drawSkeleton(pose, .1);
    }).catch(console.log);
}

