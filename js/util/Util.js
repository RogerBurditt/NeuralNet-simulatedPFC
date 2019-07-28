var util = function(){}

util.createEvent = function(name = "notset", args = {}){
  var event = new CustomEvent(name, args);
  window.dispatchEvent(event);
}

util.randomFloatBetween = function(a, b){
  return (Math.random()*(a-b)+b);
}

util.sortByKey = function(array, key){
  return array.sort(function(a, b){
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

util.randomIntBetween = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

util.relu = function(x) {
  return x > 0
    ? x
    : 0
}

util.sigmoid = function(t) {
  return 1/(1+Math.pow(Math.E, -t));
}

util.simple_normalize = function(val) {
  if(val > 0) return 1;
  if(val < 0) return -1;
  if(val == 0) return 0;
}

util.map_range = function(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

util.aabb = function(r1, r2){
  if(r1.x < r2.x + r2.w &&
     r1.x + r1.w > r2.x &&
     r1.y < r2.y + r2.h &&
     r1.y + r1.h > r2.y) {
    return true;
  }
  return false;
}

util.pointInRect = function(x, y, rectX, rectY, rectW, rectH) {
    return x >= rectX && y >= rectY && x <= rectX + rectW && y <= rectY + rectH;
}

util.pointInCircle = function(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}

util.getRandomFromArray = function(array, n=1) {
  var shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
