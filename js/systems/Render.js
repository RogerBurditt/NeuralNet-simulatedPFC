class Render{
  constructor(){
    window.addEventListener("networkCreated", function(e){this.netView.networks.push(e.detail.network)}.bind(this));

    this.netView = {
      active:true,
      networks: []
    };

    this.cellWidth  = 20;
    this.cellHeight = 20;

    // Camera Controls
    this.scaleUpRate   = 1.09;
    this.scaleDownRate = 0.95;
    this.cameraSpeed   = 20;
  }

  loop(){
    if(this.netView.active){
      engine.netview.clearRect(0, 0, 10000, 10000);
      for(var a = 0; a < this.netView.networks.length; a++){
        for(var b = 0; b < this.netView.networks[a].render.lines.length; b++){
          this.drawLine(engine.netview, this.netView.networks[a].render.lines[b])
        }
      }
    }
  }

  drawLine(canvas, obj){
    var sNew = this.explode(obj.sx,obj.sy);
    var eNew = this.explode(obj.ex,obj.ey);

    canvas.beginPath();
    canvas.moveTo(sNew.x, sNew.y);
    canvas.lineTo(eNew.x, eNew.y);
    canvas.strokeStyle = "white";
    canvas.stroke();
  }

  explode(x, y){
    return {x:x*this.cellWidth, y:y*this.cellHeight};
  }
}
