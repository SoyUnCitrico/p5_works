class Particle {
  constructor(posicion = createVector(random(0, width), random(0, height)), size = 5, stroke = 1, type = 'circle', particleColor = "#000000", particleAngle = 0) {
    this.pos = createVector(posicion.x, posicion.y);
    this.size = size;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
    
    this.r = red(particleColor);
    this.g = green(particleColor);
    this.b = blue(particleColor);

    this.angle = particleAngle;

    // this.r = 0;
    // this.g = 0;
    // this.b = 0;

    this.alpha = 255;
    this.alphaIncrement = -0.005;
    /* this.stroke = random(1, 5); */
    this.stroke = stroke;
    this.type = type;
    this.direction = createVector(random(1),random(1));
    this.counter = 0;
  }

  setAngle(angle) {
    this.angle = angle;
  }

  setDirection(vector) {
    this.direction = createVector(vector.x, vector.y);
  }

  getAngle() {
    return this.angle;
  }

  getDirection() {
    return this.direction;
  }

  getPosition() {
    return this.pos
  }

  setPosition(position) {
    this.pos = position.copy();
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  //   this.r += 0.1;
  //   this.g += 0.1;
  //   this.b -= 0.1;
  }

  follow(force) {
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show(type) {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(this.r, this.g, this.b, this.alpha);
    strokeWeight(this.stroke);
    fill(this.r,this.g,this.b,this.alpha);
    switch(type) {
      case 'circle':
          circle(0, 0, this.size);
          // circle(this.pos.x, this.pos.y, this.size);
          break;
      case 'square':
        // rotate(PI/180 *45);
        rect(0, 0, this.size * 1, this.size);
        // rect(this.pos.x, this.pos.y, this.size, this.size);
          break;
      case 'line':
          line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
          this.updatePrev();
          break;
      default:
          circle(this.pos.x, this.pos.y, this.size);
          break;

    }
    pop();
  }

  updateRgb() {
    if (this.r > 10) {
      this.r -= random(0.1, 0.2);
    }
    if (this.r == 0) {
      this.r += random(0.1, 0.2);
    }

    if (this.g > 10) {
      this.g -= random(0.1, 0.2);
    }
    if (this.g == 0) {
      this.g += random(0.1, 0.2);
    }

    if (this.b == 0) {
      this.b += random(0.1, 0.3);
    }
    if (this.b == 255) {
      this.b -= random(0.1, 0.3);
    }
    this.alpha += this.alphaIncrement;
  } 

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prevPos.x = 0 - this.size / 2;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prevPos.x = width + this.size / 2;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prevPos.y = 0 - this.size / 2;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prevPos.y = height + this.size / 2;
    }
  }

}