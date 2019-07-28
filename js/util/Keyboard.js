var keyboard = function(){}

keyboard.start = function(){
  keyboard.locked = false;
  keyboard.keys = (keyboard.keys || []);

  window.addEventListener('keydown', function (e) {
      // This block prevents page scrolling with arrow and space keys
      switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
      }

      keyboard.keys[e.keyCode] = (e.type == "keydown");
  });

  window.addEventListener('keyup', function (e) {
      keyboard.keys[e.keyCode] = (e.type == "keydown");
  });
}
