<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="css/custom.css">
</head>

<body>
  <canvas id="NetworkView"   width="600" height="400"></canvas>
  <canvas id="GameView"   width="600" height="400"></canvas>

<!-- Dependencies -->
<script type="text/javascript" src="js/dependencies/jQuery.js"></script>
<script type="text/javascript" src="js/dependencies/gl-matrix-min.js"></script>

<!-- Utilities -->
<script type="text/javascript" src="js/util/Util.js"></script>
<script type="text/javascript" src="js/util/Keyboard.js"></script>
<script type="text/javascript" src="js/util/Mouse.js"></script>
<script type="text/javascript" src="js/util/Log.js"></script>
<script type="text/javascript" src="js/util/Controller.js"></script>

<!-- Engine -->
<script type="text/javascript" src="js/engine/Engine.js"></script>

<!-- Network -->
<script type="text/javascript" src="js/network/Network.js"></script>
<script type="text/javascript" src="js/network/NetOps.js"></script>
<script type="text/javascript" src="js/network/Link.js"></script>
<script type="text/javascript" src="js/network/TrainingSet.js"></script>

<!-- Systems -->
<script type="text/javascript" src="js/systems/Render.js"></script>

<script>
  window.addEventListener('load', function(){ engine.start(); }, false);
</script>

</body>
</html>
