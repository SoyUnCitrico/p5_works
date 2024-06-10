let capturador;

function setup () {
    createCanvas(100,75);
    background(0);
    capturador = createCapture(VIDEO);
    capturador.hide();
    describe('A video stream from the webcam.');
}

function draw() {
    image(capturador, 0, 0, 100, 75);
}


function keyReleased() {
    if (key === 'f') {
      saveCanvas('miFoto', 'png');
    } 
}