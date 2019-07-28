var mouse = function(){}

mouse.start = function(){
  mouse.locked = false;

  engine.c.addEventListener("mousedown", mouse.down);
}
