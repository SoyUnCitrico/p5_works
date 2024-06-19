class Spiral {
    totalParticles
    cicles
    radioInt
    radioExt
    stepsRadio
    particleSize
    particleStroke
    particleType
    particleColor
    particles
    offsetAngle
    spiral

    constructor (
            totalParticles = 100, // numero total de particulas
            cicles = 1, // vueltas alrededor del centro,  
            radioInt = 10, // radio de inicio de la espiral
            radioExt = 100, // rafio final de la espiral     (radioInt == radioExt && ciclos == 1)? circulo : espiral
            stepsRadio = 200,  // resolucion de incremento en radio
            particleSize = 5,  // tamaño de las particulas en la espiral
            particleStroke = 2, 
            particleType = 'circle', 
            particleColor = '#000000'
        ) {
            this.totalParticles = totalParticles;
            this.cicles = cicles;
            this.radioInt = radioInt;
            this.radioExt = radioExt;
            this.stepsRadio = stepsRadio;
            this.particleSize = particleSize;
            this.particleStroke = particleStroke;
            this.particleType = particleType;
            this.particleColor = particleColor;            
            this.offsetAngle = 0;
            
            this.spiral = [];
            for(var i = 0; i < this.totalParticles; i++) {
                let angleIncrement = 360 / this.totalParticles * cicles;
                let angle = PI / 180 * ((angleIncrement * i) + this.offsetAngle);
                let actualRadio = ((this.radioExt - this.radioInt) * i / this.stepsRadio) + this.radioInt;
                let xPos = actualRadio * sin(angle) + width / 2;
                let yPos = actualRadio * cos(angle) + height / 2; 
                const newPos = createVector(xPos, yPos);
                const newParticle = new Particle(newPos, this.particleSize, this.particleStroke, this.particleType, this.particleColor, angle);
                this.spiral.push(newParticle);
            }
    }

    update() {
        for(var i = 0; i < this.spiral.length; i++){
          let angleIncrement = 360 / this.spiral.length * this.cicles;
          let angle = PI / 180 * ((angleIncrement * i) + this.offsetAngle);
          let actualRadio = ((this.radioExt - this.radioInt) * i / this.stepsRadio) + this.radioInt;
          let xPos = actualRadio * sin(angle) + width / 2;
          let yPos = actualRadio * cos(angle) + height / 2;           
          const newPos = createVector(xPos, yPos);
          this.spiral[i].setPosition(newPos);
      
        }
    }
    setCicles (cicles) {
      this.cicles = cicles
    }

    setParticleSize(size) {
      this.particleSize = size;
    }
    setRadioInt(newRadio) {
      this.radioInt = newRadio;
    }
    setRadioExt(newRadio) {
      this.radioExt = newRadio;
    }
    setColor(color) {
      this.particleColor = color;
    }
    setOffsetAngle(angle) {
        this.offsetAngle = angle
    }
    setPosition(position) {
      this.position = position
    }


    draw() {
      // console.log(this.spiral ) 
        for (var i = 0; i < this.spiral.length; i++) {
            this.spiral[i].show(this.spiral[i].type);
          }
    }
      
}