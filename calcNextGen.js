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
        let virus = 0
        let vd = 0
        //Loop though the hoods array and tally the total blacks and total whites
        for (let z = 0; z < 9; z++) {
          if (hoods[z] == "virus") {
            virus += 1
          } else if (hoods[z] == "void"){
            vd += 1
             }
          
          }
        //Remove yourself from the total tally
        if (oldBoard.cells[i][j].state == "void") {
          vd -= 1
        } else if (oldBoard.cells[i][j].state == "virus ") {
          virus -= 1
          } 
          //ACTUAL RULESET CODE HERE
          
        //ZACK GEN 1
        /*
        if (oldBoard.cells[i][j].state != "virus" && virus >= 3) {
          num = random(0,100)
          if (num < 50) {
              newBoard.cells[i][j].state = "virus"
          }
        } else {
            newBoard.cells[i][j].state = oldBoard.cells[i][j].state
          }
          */
        //*
        if (oldBoard.cells[i][j].state == "virus" && vd == 3) {
          newBoard.cells[i][j].state = "void"
          } else if (oldBoard.cells[i][j].state == "void" && (vd < 2 || vd > 3 || vd == 7)) {
            newBoard.cells[i][j].state = "virus"
          } else {
            newBoard.cells[i][j].state = oldBoard.cells[i][j].state
          }
          //*/
          
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