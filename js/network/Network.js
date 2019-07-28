/*
  Author: Roger Burditt Jr.
  Date: 5/24/19
  Notes: This network is designed with synapses, known here as links, as the
         focus. In order to facilitate sparse connectivity, each conceptual
         neuron contains two arrays: starts and ends. A neuron can be thought
         simply as a cell in a grid. Each neuron has connections coming into
         and extending from it. The ends array references the incoming
         links, and the starts array references the outgoing links. Neurons here
         are purely conceptual and do not actually exist as objects.
*/
class Network{
  constructor(){
    this.log = [];
    this.render = {
      lines:[]
    };
    this.learningRate = 0.1;

    util.createEvent("networkCreated", {detail:{network:this}});
    window.addEventListener("linkCreated", function(e){this.render.lines.push(e.detail.line)}.bind(this))

    this.netops = new NetOps();
    this.links = this.netops.createArray(20, 20, 14, 9);

    this.netops.limitedConnect(this.links, 0, 1, 1, 2);

    this.netops.labelInputs(this.links, ["pX", "py", "tx", "ty"]); // Player x, player y, target x, target y
    this.netops.labelOutputs(this.links, ["Down", "Left", "Up", "Right"]);


    var tset = new TrainingSet([0], [1], 100);
    this.train(this.links, tset);
  }

  train(array, tSet){
    var answers = tSet.yData;
    for(var z = 0; z < tSet.epochs; z++){
      var prediction = this.chainFeed(array, tSet.xData);

      for(var a = 0; a < answers.length; a++){
        // Calc loss
        var loss = answers[a] - prediction.result[a].value;

        for(var b = 0; b < prediction.chain.length; b++){
          prediction.chain[b].weight += loss * this.learningRate;
        }
      }
    }
    console.log(prediction.result);
  }

  chainFeed(array, values){
    var result = [];
    var chains = [];

  }

  oldChainFeed(array, values){
    var result = [];
    var chains = [];
    this.resetValues(array);

    if(values.length <= array[0].length){
      // Set values of afferent neurons
      for(var a = 0; a < values.length; a++){
        for(var b = 0; b < array[0][a].starts.length; b++){
          array[0][a].starts[b].value = values[a];
        }
      }
      // Feed through hidden layers
      for(var c = 0; c < array.length; c++){
        for(var d = 0; d < array[c].length; d++){
          var sum = 0;
          for(var e = 0; e < array[c][d].ends.length; e++){
            if(array[c][d].ends[e].value != 0){
              sum += array[c][d].ends[e].weight * array[c][d].ends[e].value;
            }
          }
          for(var f = 0; f < array[c][d].starts.length; f++){
            array[c][d].starts[f].value = util.sigmoid(sum);
          }
        }
      }

      // Finalize results
      for(var g = 0; g < array[array.length-1].length; g++){
        var sum = 0;
        for(var h = 0; h < array[array.length-1][g].ends.length; h++){
          if(array[array.length-1][g].ends[h].value != 0){
            sum += util.sigmoid(array[array.length-1][g].ends[h].weight * array[array.length-1][g].ends[h].value);
          }
        }
        result.push({label:array[array.length-1][g].label, value:util.sigmoid(sum)});
      }
    }
    return {result:result};
  }

  resetValues(array){
    for(var a = 0; a < array.length; a++){
      for(var b = 0; b < array[a].length; b++){
        for(var c = 0; c < array[a][b].starts.length; c++){
          array[a][b].starts[c].value = 0;
        }
      }
    }
  }
}
