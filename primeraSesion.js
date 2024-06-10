// Add JS here

let contenedorPrincipal = document.querySelector(".cajitaPrincipal")
contenedorPrincipal.id = 'cajaID'
let body = document.querySelector('body');
//console.log("El contenido es: ", contenedorPrincipal);
//console.log("El body es: ", body);
let contador = 0;

let nuevaCajita = document.createElement('div');
nuevaCajita.style.border = '1px solid blue';
nuevaCajita.innerText = 'Nuevo Contenido';

body.appendChild(nuevaCajita)

setTimeout(() => {
    contenedorPrincipal.style.backgroundColor = 'gray';
    contenedorPrincipal.style.color = 'green';
    contenedorPrincipal.style.height = '800px';
}, 5000);

let micuenta = setInterval(() => {
    contador = contador + 1;
    // console.log(contador)
    if(contador >= 5) {
        clearInterval(micuenta);
    }
}, 1000)


let entradaTexto = document.querySelector('.entrada');
console.log(entradaTexto)


entradaTexto.addEventListener('change', (event) => {
    //console.log(event.target.value);
    console.log(event)
})

/*. Comienza p5.js */



function setup () {
    createCanvas(500, 500).parent('cajaID');
   background(100,0,255)

   stroke(0,255,0);
   strokeWeight(10);
   point(250, 250);

   line();
   //ellipse();
   //rectagle();
}