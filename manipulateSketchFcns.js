function keyPressed() {
    //key code is space
    if (keyCode === 32) {
      if (going == true) {
      going = false
      } else {
        going = true
      }
    }
    //R
    if (keyCode == 82) {
      cb1.createRandomCells()
      cb2.createRandomCells()
    }
    if (keyCode === 39) {
       background(255)
       cb1.showCells()
       //Switch the data between the boards ...cb2 is the junk board, cb1 is the only thing that get's shown here...
       cb1,cb2 = calcNextGen(cb1,cb2)
      
    }
    //If the user presses the up arrow, increase the pen size
    if (keyCode === 38) {
      p.size += 1
    //If the user presses the down arrow, decrease the pen size
    } else if (keyCode === 40) {
      p.size -= 1
    }
    if (keyCode === 83) {
      if (p.mode == "void") {
      p.mode = "covid-19"
      } else if (p.mode == "covid-19"){
        p.mode = "pox"
      } else if (p.mode == "pox") {
        p.mode = "void"
      }
    }
    
  }

  //Toggles the smoothing of the cells
function toggleSmoothing() {
    if (SMOOTH_CELLS == false) {
        SMOOTH_CELLS = true
        button.html("Smoothing: on")
    } else {
        SMOOTH_CELLS = false
        button.html("Smoothing: off")
    }
}

//Changes the color of the virus
function changeColor() {
    if (VIRUS_COLOR[0] < 255) {
        VIRUS_COLOR[0] += 40
    } else {
        VIRUS_COLOR[0] = 40
    }
}