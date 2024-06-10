// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html
let ciclos = 1; // number
const numParticulas = 360; // number
const fieldRes = 20; // number
const particleSize = 5; // number
const particleStroke = 2; // number
const fieldIncrement = 0.0005;

let radioInterior = 10;
let radioExterior = 280;
let radioSteps =  radioExterior * 2;
const particleType = 'line' // 'circle' | 'line' | 'square'

let flowfield;
let particles = [];
let playing = false;
let living = false;
let showField = false;

let infoRadioExt, infoRadioInt, infoCiclos;

function setup() {
  frameRate(30)
  createCanvas(600, 600).parent('mainContainer');
  background(0,0,0,10);
  rectMode(CENTER);   
  initSpiral(ciclos);

  createElement('div', `<h4>${'Radio Exterior'}</h4>`).parent('info')
  infoRadioExt = createInput(radioExterior, 'number').parent('info')
  createElement('div', `<h4>${'Radio Interior'}</h4>`).parent('info')
  infoRadioInt = createInput(radioInterior, 'number').parent('info')
  createElement('div', `<h4>${'Ciclos'}</h4>`).parent('info')
  infoCiclos = createInput(ciclos, 'number').parent('info')
  createElement('div', `<h4>${'Radio Steps'}</h4>`).parent('info')
  infoSteps = createInput(radioSteps, 'number').parent('info')
}

function draw() {
  background(0,0,0,40);
  
  /* flowfield.show(); */
  flowfield.update();
  /* console.log(flowfield) */

  var newDirections = flowfield.getDirections();
  for (var i = 0; i < particles.length; i++) {    
    particles[i].follow(newDirections[i]); 
    if(playing) {
      particles[i].update();     
    }
    if(living) {
      particles[i].updateRgb();
      if (particles[i].finished()) {
        particles.splice(i, 0);
      }
    }
    particles[i].edges();
    particles[i].show(particles[i].type);    
    
    infoCiclos.input(() => {
      let newCiclos = float(infoCiclos.value());
      /* console.log("CICLOS: ", newCiclos) */
      ciclos = newCiclos;
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    })

    infoRadioInt.input(() => {
      let newRadioInt = float(infoRadioInt.value());
      /* console.log("RadioInt: ", newRadioInt) */
      radioInterior = newRadioInt;
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    })

    infoRadioExt.input(() => {
      let newRadioExt = float(infoRadioExt.value());
      /* console.log("RadioExt: ", newRadioExt) */
      radioExterior = newRadioExt;
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    })

    infoSteps.input(() => {
      let newSteps = float(infoSteps.value());
      /* console.log("Steps: ", newSteps) */
      radioSteps = newSteps;
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    })
  }
    
  if(keyIsPressed) {
    // console.log(key)
    if(key === '+') {
      ciclos += 0.005;
      infoCiclos.value(ciclos);
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    }
    if(key === '-') {
      ciclos -= 0.005;
      infoCiclos.value(ciclos);
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    }
    if(key === 'j') {
      radioInterior -= 1;
      infoRadioInt.value(radioInterior);
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    }
    if(key === 'l') {
      radioInterior += 1
      infoRadioInt.value(radioInterior);
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    }

    if(key === 'u') {
      radioExterior -= 1
      infoRadioExt.value(radioExterior);
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    }
    if(key === 'o') {
      radioExterior += 1
      infoRadioExt.value(radioExterior);
      drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
    }
  }
}

function keyPressed() {
  /* console.log(key) */
  if(key == 'p') {
    playing = !playing;
  }
  if(key == 'l') {
    living = !living;
  }
  if(key == 'r') {
    initRandom();
  }
  if(key == 'j') {
    radioInterior -= 5
    infoRadioInt.value(radioInterior);
    drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
  }
  if(key == 'l') {
    radioInterior += 5
    infoRadioInt.value(radioInterior);
    drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
  }
  if(key == 's') {
    ciclos = 1;
    radioInterior = 10;
    radioExterior = 110;
    radioSteps = (radioExterior - radioInterior) * 2;
    infoRadioInt.value(radioInterior);
    infoRadioExt.value(radioExterior);
    infoSteps.value(radioSteps);
    infoCiclos.value(ciclos);
    initSpiral(ciclos, radioInterior, radioExterior, radioSteps);
  }
  if(key == '+') {
    ciclos += 0.1;
    infoCiclos.value(ciclos);
    drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
  }
  if(key == '-') {
    ciclos -= 0.1;
    infoCiclos.value(ciclos);
    drawSpiral(ciclos, radioInterior, radioExterior, radioSteps);
  }
}

function initRandom() {
  flowfield = new Flowfield(width, height, fieldRes, fieldIncrement);
  for (var i = 0; i < numParticulas; i++) {
    const newPos = createVector(random(width), random(height));
    particles[i] = new Particle(newPos, particleSize, particleStroke, particleType);
  }
}

function initSpiral(cicles, radInt, radExt, radSteps) {
  flowfield = new Flowfield(width, height, fieldRes, fieldIncrement);
  drawSpiral(cicles, radInt, radExt, radSteps);
}

function drawSpiral(ciclos = 1, radioInt = 10, radioExt = 100, stepsRadio = 200) {
    for(var i = 0; i < numParticulas; i++) {
      let angleIncrement = 360 / numParticulas * ciclos;
      let angle = TWO_PI / 360 * (angleIncrement * i);
      let actualRadio = ((radioExt - radioInt) * i / stepsRadio) + radioInt;
      let xPos = actualRadio * sin(angle) + width / 2;
      let yPos = actualRadio * cos(angle) + height / 2; 
      const newPos = createVector(xPos, yPos);
      particles[i] = new Particle(newPos, particleSize, particleStroke, particleType);
  }
}