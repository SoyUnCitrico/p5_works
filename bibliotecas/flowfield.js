class Flowfield {
    constructor(width, height, scale = 5, increment = 0.01) {
        this.inc = increment;
        this.scl = scale;
        this.cols = floor(width / this.scl);
        this.rows = floor(height / this.scl);
        this.noise = 0;
        this.noiseIncrement = 0.0001;
        /* console.log("TOTAL MATRIZ: ", this.cols * this.rows) */
        /* crea posicion original campo en cuadricula */        
        this.campo = [];
        for (var y = 0; y < this.rows; y += 1) {
            for (var x = 0; x < this.cols; x += 1) {
                const newFieldParticle = new Particle(createVector((x * this.scl) + (this.scl / 2), (y * this.scl) + (this.scl / 2)), 2)
                this.campo.push(newFieldParticle);
            }
        }
        /* console.log(this.campo) */
    }

    update() {
        //actualiza la posicion del campo
        if(this.campo.length > 0) {
            var yVar = 0
            for(var yoff = 0; yoff < this.rows; yoff++) {
                var xVar = 0
                for(var xoff = 0; xoff < this.cols; xoff++) {
                    var index = xoff + (this.cols * yoff);
                    var angleNoise = noise(xVar, yVar, this.noise) * TWO_PI;
                    var v = p5.Vector.fromAngle(angleNoise);
                    v.setMag(1);
                    this.campo[index]?.setDirection(v)
                    xVar += this.inc;
                }
                yVar += this.inc;                
                this.noise += this.noiseIncrement;
            }
        }         
        
    }

    show() {
        /* console.log("CAMPO: ", this.campo) */
        for(var i = 0; i < this.campo.length; i++) {            
            push();
            /* stroke(255,0,0); */
            strokeWeight(2);
            point(this.campo[i].pos.x, this.campo[i].pos.y)
            pop();

            push();
            translate(this.campo[i].pos.x, this.campo[i].pos.y);
            rotate(this.campo[i].direction.heading());
            /* rotate(radians(360 - 45)); */
            stroke(0, 50);
            strokeWeight(1);
            line(0, 0, this.scl, 0);
            pop();
        }
    }

    getDirections() {
        const direcciones = [];
        for(let d = 0; d < this.campo. length; d++) {
            direcciones.push(this.campo[d]?.getDirection())
        }
        return direcciones;
    }
}