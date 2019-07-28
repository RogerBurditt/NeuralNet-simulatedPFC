var engine = function(){}

engine.start = function(){
  engine.c = document.getElementById("NetworkView");
  engine.netview = engine.c.getContext("2d");
  engine.netview.scale(2, 2);

  engine.g = document.getElementById("GameView");
  engine.gameview = engine.g.getContext("2d");
  engine.gameview.scale(1, 1);

  log.start();
  keyboard.start();
  mouse.start();

  engine.controller = new Controller();

  // Systems
  engine.render = new Render();

  setInterval(engine.loop, 30);

  engine.setStage();
}

engine.loop = function(){
  engine.render.loop();
  engine.controller.loop();
}

engine.setStage = function(){
  engine.network = new Network();
}
