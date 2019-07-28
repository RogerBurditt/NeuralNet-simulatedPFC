class Controller{
  constructor(){
    this.active = true;

    window.addEventListener("networkCreated", function(e){this.networks.push(e.detail.network)}.bind(this));

    this.networks = [];

    // KEYBOARD
    this.printLog = 112; // F1
    this.left  = 37;  // Left Arrow
    this.right = 39;  // Right Arrow
    this.up    = 38;  // Up Arrow
    this.down  = 40;  // Down Arrow
    this.space = 32;  // Space
    this.plus  = 61;  // =
    this.minus = 173; // -
  }

  loop(){
    // DBUG
    if(keyboard.keys[this.printLog]){
      log.print();
    }

    // CAMERA
    if(keyboard.keys[this.plus]){
      engine.netview.scale(engine.render.scaleUpRate, engine.render.scaleUpRate);
    }

    if(keyboard.keys[this.minus]){
      engine.netview.scale(engine.render.scaleDownRate, engine.render.scaleDownRate);
    }

    if(keyboard.keys[this.left]){
      engine.netview.translate(engine.render.cameraSpeed, 0);
    }

    if(keyboard.keys[this.right]){
      engine.netview.translate(-engine.render.cameraSpeed, 0);
    }

    if(keyboard.keys[this.up]){
      engine.netview.translate(0, engine.render.cameraSpeed);
    }

    if(keyboard.keys[this.down]){
      engine.netview.translate(0, -engine.render.cameraSpeed);
    }
  }
}
