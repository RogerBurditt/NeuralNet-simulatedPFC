/*
  Author: Roger Burditt Jr.
  Date: 5/25/19
  Notes: This is the Network Operations Center - netops for short.
         This class will generate and modify network scaffolds and connections.
*/
class NetOps{
  constructor(){

  }

  createArray(rows, cols, maxRows, maxCols){
    var array = [];
    array.maxRows = maxRows;
    array.maxCols = maxCols;
    this.scaleArray(array, rows, cols);
    return array;
  }

  scaleArray(array, rows, cols){
    var oldHeight = array.length-1;
    var newHeight = rows - oldHeight;
    if(newHeight > 0){
      for(var a = 0; a < newHeight; a++){
        array.push([]);
      }
    }
    //else{ log.add("### No need to resize height ###"); }
    for(var b = 0; b < array.length; b++){
      var oldWidth = array[b].length-1;
      var newWidth = cols - oldWidth;
      if(newWidth > 0){
        for(var c = 0; c < newWidth; c++){
          array[b].push({starts:[],ends:[]});
          array[b][c].maxOuts = util.randomIntBetween(1, 4);
        }
      }
      //else{ log.add("### No need to resize width ###"); }
    }
  }

  // s/er = start/end row
  // s/ec = start/end column
  addLink(array, sr, sc, er, ec){
    if(er <= array.maxRows && ec <= array.maxCols){
      this.scaleArray(array, er, ec);
      var link = {weight:util.randomFloatBetween(-1,1),value:0,line:{sx:sr,sy:sc,ex:er,ey:ec}};
      if(array[sr][sc] != undefined){
        array[sr][sc].starts.push(link);
      }
      if(array[er][ec] != undefined){
        array[er][ec].ends.push(link);
      }
      util.createEvent("linkCreated", {detail:{line:{sx:sr,sy:sc,ex:er,ey:ec}}});
    }
    else{ log.add("### er||ec > array.maxRows||Cols ###"); }
  }

  removeLink(array){

  }


  /****************
    CONNECTORS
   ****************/

  fullyConnect(array){
    for(var a = 0; a < array.length-1; a++){
      for(var b = 0; b < array[a].length; b++){
        for(var c = 0; c < array[a+1].length; c++){
          this.addLink(array, a, b, a+1, c);
        }
      }
    }
  }

  limitedConnect(array, yMin, yMax, xMin, xMax){
    for(var a = 0; a < array.length-1; a++){
      for(var b = 0; b < array[a].length; b++){
        var reachable = this.getReachableCells(array, a, b, yMin, yMax, xMin, xMax, array[a][b].maxOuts);
        for(var c = 0; c < reachable.length; c++){
          this.addLink(array, a, b, reachable[c].x, reachable[c].y);
        }
      }
    }
  }

  /*********
     UTILS
   *********/
   // This class will return an array of cell locations in the form of objects.
   getReachableCells(array, x, y, yMin, yMax, xMin, xMax, maxLinks){
     var result = [];
     for(var a = xMin; a <= xMax; a++){
       for(var b = yMin; b <= yMax; b++){
         if(x+a >= -1 &&
            y-b >= -1 &&
            x+a < array.length &&
            y+b < array[a].length){
           result.push({x:x+a, y:y+b});
         }
       }
     }
     for(var c = xMin; c <= xMax; c++){
       for(var d = yMin; d <= yMax; d++){
         if(x+c >= -1 &&
            y-d >= -1 &&
            x+c < array.length &&
            y+d < array[c].length+1){
           result.push({x:x+c, y:y-d});
         }
       }
     }
     this.dedupeCoordArray(result);
     return util.getRandomFromArray(result, maxLinks);
   }

   // Removes duplicates from a coordinate array :: must contain .x, .y
   dedupeCoordArray(array){
    for(var a = 0; a < array.length; a++){
      for(var b = 0; b < array.length; b++){
        if(a != b && array[a].x == array[b].x && array[a].y == array[b].y){
          array.splice(b, 1);
        }
      }
    }
  }

  labelInputs(array, labels){
    if(array[0].length >= labels.length){
      for(var a = 0; a < array[0].length; a++){
        array[0][a].label = labels[a];
      }
    }
    else{ log.add("### Not enough inputs to label ###"); }
  }

  labelOutputs(array, labels){
    if(array[array.length-1].length >= labels.length){
      for(var a = 0; a < array[array.length-1].length; a++){
        array[array.length-1][a].label = labels[a];
      }
    }
    else{ log.add("### Not enough outputs to label ###"); }
  }
}
