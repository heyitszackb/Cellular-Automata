function calcNextGen(oldBoard,newBoard) {
    //Loop through all the rows
    for (let i = 0; i < ROWS; i++) {
        //Loop through all the columns
        for (let j = 0; j < COLS;j++) {
        //Make a variable "Hoods" to store the neighbooring cell's value's
        let hoods = []
           //These two FOR loops loop though the 9 cells around and adjacent to the one we are looking at
           //We want to remove the cell that we are from the total tally later.
           for (let x = -1; x < 2; x++) {
              for (let y = -1;y < 2; y++) {
                   //Add to the array
                   //WRAP AROUND BOARD CODE
                  let checkRow = (i + x + ROWS) % ROWS
                  let checkCol = (j + y + COLS) % COLS
                  
                  //console.log("checkRow",checkRow,"checkCol",checkCol)
                  hoods.push(oldBoard.cells[checkRow][checkCol].state)
              }
           }
        //Initialize variables to count the array we just calculated
        let covid = 0
        let pox = 0
        let vd = 0
        //Loop though the hoods array and tally the total blacks and total whites
        for (let z = 0; z < 9; z++) {
          if (hoods[z] == newBoard.states[0]) {
            covid += 1
          } else if (hoods[z] == newBoard.states[1]){
            vd += 1
          } else if (hoods[z] == newBoard.states[2]){
              pox += 1
               }
          
          }
        //Remove yourself from the total tally
        if (oldBoard.cells[i][j].state.name == "void") {
          vd -= 1
        } else if (oldBoard.cells[i][j].state.name == "covid-19") {
          covid -= 1
        } else if (oldBoard.cells[i][j].state.name == "pox") {
            pox -= 1
        } 
          //ACTUAL RULESET CODE HERE
          
        //ZACK GEN 1
        ///*
        num1 = random(0,100)
        if (num1 < 50) {
          if ((oldBoard.cells[i][j].state.name == "void" || oldBoard.cells[i][j].state.name == "covid-19")  && pox  >= 3) {
            num = random(0,100)
            if (num < 50) {
                newBoard.cells[i][j].state = newBoard.states[2] //Pox
            }
          } else {
              newBoard.cells[i][j].state = oldBoard.cells[i][j].state
            }
      } else {
          if ((oldBoard.cells[i][j].state.name == "void" || oldBoard.cells[i][j].state.name == "pox")  && covid  >= 3) {
            num = random(0,100)
            if (num < 50) {
                newBoard.cells[i][j].state = newBoard.states[0] //Covid-19
            }
          } else {
              newBoard.cells[i][j].state = oldBoard.cells[i][j].state
            }
        }
         // */
        /*
        if (oldBoard.cells[i][j].state == "covid-19" && vd == 3) {
          newBoard.cells[i][j].state = "void"
          } else if (oldBoard.cells[i][j].state == "void" && (vd < 2 || vd > 3)) {
            newBoard.cells[i][j].state = "covid-19"
          } else {
            newBoard.cells[i][j].state = oldBoard.cells[i][j].state
          }
          */
          
          //ZACK GEN 2
          /*
          if (oldBoard.cells[i][j].state == "void" && virus == 3) {
          newBoard.cells[i][j].state = "virus"
          } else if (oldBoard.cells[i][j].state == "virus" && (virus < 2 || virus > 3)) {
            newBoard.cells[i][j].state = "void"
          } else {
            newBoard.cells[i][j].state = oldBoard.cells[i][j].state
          }
          */
        }
    }
    return newBoard,oldBoard
  }