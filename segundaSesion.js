//Variables de color
let intensidadR = 0;
let intensidadG = 0;
let intensidadB = 255;
let posX = 0;
let posY = 0;

let ancho = 20;
let alto = 20;
let aumentoX = 1;
let aumentoY = 3;

function setup () {
    createCanvas(600,600)
    background(100);
}

function draw() {
    background(100)
    fill(intensidadR, intensidadG, intensidadB);
    ellipse(posX, posY, ancho, alto);
    intensidadR = intensidadR + 1;
    intensidadB  = intensidadB - 1;
    posX = posX + aumentoX;
    posY = posY + aumentoY;

    if((posX > width) || (posY > height) ||  (posX <= 0) || (posY <= 0)) {
        aumentoX = aumentoX * (-1);
        aumentoY = aumentoY * (-1);
    }


    if(ancho === width) {
        noLoop();
    }
}