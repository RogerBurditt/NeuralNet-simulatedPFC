// Values are always nested in arrays
predict(values){
  this.log.push("### Prediction in progress ###");
  var result = [];
  this.resetValues();

  if(values.length <= this.links[0].length){
    // Set values of afferent neurons
    for(var a = 0; a < values.length; a++){
      this.links[0][a].starts[a].value = values[a];
    }
    // Feed through hidden layers
    for(var b = 1; b < this.links.length; b++){
      for(var c = 0; c < this.links[b].length; c++){
        var sum = 0;
        for(var d = 0; d < this.links[b][c].ends.length; d++){
          sum += this.links[b][c].ends[d].weight * this.links[b][c].ends[d].value;
        }
        for(var e = 0; e < this.links[b][c].starts.length; e++){
          this.links[b][c].starts[e].value = util.sigmoid(sum);
        }
      }
    }

    // Finalize results
    for(var g = 0; g < this.links[this.links.length-1].length; g++){
      var sum = 0;
      for(var h = 0; h < this.links[this.links.length-1][g].ends.length; h++){
        sum += util.sigmoid(this.links[this.links.length-1][g].ends[h].weight * this.links[this.links.length-1][g].ends[h].value);
      }
      result.push(sum);
    }
  }
  else{
    this.log.push("... Not enough afferent neurons ...");
    this.log.push("*** Afferent growth signal ***");
  }

  this.log.push("### Prediction Complete ###");
  return result;
}

train(tSet){
  var answers = tSet.yData;
  for(var z = 0; z < tSet.epochs; z++){
    var prediction = this.predict(tSet.xData);

    for(var a = 0; a < answers.length; a++){
      // Calc loss
      var loss = answers[a] - prediction[a];

      for(var b = 0; b < this.links.length; b++){
        for(var c = 0; c < this.links[b].length; c++){
          for(var d = 0; d < this.links[b][c].starts.length; d++){
            this.links[b][c].starts[d].weight += loss * this.learningRate;
          }
        }
      }
    }
    console.log(prediction);
  }
}

resetValues(){
  for(var a = 0; a < this.links.length; a++){
    for(var b = 0; b < this.links[a].length; b++){
      for(var c = 0; c < this.links[a][b].starts.length; c++){
        this.links[a][b].starts[c].value = 0;
      }
    }
  }
}
