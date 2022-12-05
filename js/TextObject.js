class TextObject{
  constructor(x, y, constrainY, content, fontSize){
    this.x = x;
    this.y = y;
    this.constrainY = constrainY;
    this.content = content;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.speed = undefined;
    this.timer = 0;
    this.active = false;
    this.fontSize = fontSize;
    this.opacity = 100;
  }

update(force, amount, fontGrowth, opacityAmount){
  this.move();
  this.gravity(force, amount);
  this.constrain();
  this.display(amount, fontGrowth, opacityAmount);

  // Automatic Activation
  if(!this.active){
    this.timer++;
    if (this.timer > 2.5*60){
       this.active = true;
    }
  }
}

move(){
  // Acceleration
  this.vx = this.vx + this.ax;
  this.vy = this.vy + this.ay;
  // Velocity
  this.x = this.x + this.vx;
  this.y = this.y + this.vy;
}

gravity(force){
    this.ay = this.ay + force;
  }

constrain(){
    // Constrain Creature to canvas
    this.x = constrain(this.x, width/6, 5*width/6);
    this.y = constrain(this.y, 0, this.constrainY);
  }

  display(amount, fontGrowth, opacityAmount){
    // Establish Coordinat Y
    let coordinateY;
    coordinateY = this.y - amount * this.y;
    coordinateY = constrain(coordinateY, 0, 5*height/6);

    // Spawn Text Size
    textSize(this.fontSize);

    // Apply Mic Input
    // Check Location
    if(this.active){
      // Establish Font Growth
      if(amount > 0.1){
        textSize(this.fontSize + fontGrowth);
      }
      if(amount > 0.05){
        coordinateY = this.y - amount * this.y;
        this.opacity = this.opacity + opacityAmount;
      }
      else{
        coordinateY = this.y;
        this.opacity = 100;
      }
    }
    else{
      coordinateY = this.y;
      // Spawn Text Size
      textSize(this.fontSize);
      this.opacity = 100;
    }

    // Display TextObject
    push();
    fill(30, this.opacity);
    text( this.content, this.x, coordinateY);
    pop();
  }

  }
