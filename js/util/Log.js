var log = function(){}

log.start = function(){
  this.report = [];
}

log.add = function(newLine){
  this.report.push(newLine);
}

log.print = function(){
  console.log(this.report);
}
