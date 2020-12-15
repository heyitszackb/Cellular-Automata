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
                  hoods.push(oldBoard.cells[checkRow][checkCol].state)
              }
           }

        let sortedHoods = []
        //Loop through all the states
        for (let k = 0; k < oldBoard.states.length; k++) {
          //Initialize a blank placeholder variable
          stateList = []
          //Loop through all of the items in the hoods array
          for (let l = 0; l < hoods.length; l++) {
            //If the item equals the current state,
            if (hoods[l] == oldBoard.states[k]) {
              //Add that state to the placeholder array
              stateList.push(hoods[l])
            }
            //Add the placeholder array to the sortedHoods variable
          }
          sortedHoods.push(stateList)
        }
        //Loop through all the states in the oldBoard
        for (let m = 0; m < oldBoard.states.length; m++) {
          //If the state matches the current state,
          if (oldBoard.cells[i][j].state == oldBoard.states[m]) {
            //Remove the state from the sortedHoods array
            sortedHoods[m].splice(oldBoard.states[m],1)
          } 
        }
           
           
        //ZACK GEN 1
        ///*

        /*
        Covid-19 = 0
        Void     = 1
        pox      = 2
        */
       //Make a blank list that will later hold the indexes of the viruses we want to check for in the calc code below.
      numsList = []
      //Random number function
      get_random = function (list) {
        return list[Math.floor((Math.random()*list.length))]
      }
      //If the current cell is next to another virus, add that virus index to the numsList array
      for (let w = 1; w < sortedHoods.length; w++) {
        if (sortedHoods[w].length != 0) {
          numsList.push(w)
        }
      }
      //Get a random index from the numsList array, so that the viruses are balanced.
      myNum = get_random(numsList)
      //console.log(i,j,myNum,numsList)
//*/
      
      //console.log(i,j,numsList)
     
      //If the numsList is not Null (if the nums list is Null, it means it's in the middle of a field of void cells),
      if (numsList.length > 0) {
        //Check to see if any of the OTHER viruses are around it AND that there are at least X (3 now) of it's own kind near it.
       if ((oldBoard.cells[i][j].state != oldBoard.states[myNum]) && sortedHoods[myNum].length  >= 3) {
        //Get a random number between 0 and 100
        num = random(0,100)
        //If the number is less than 50,
        if (num < 60) {
          //Set the state to the state that you are currently
            newBoard.cells[i][j].state = newBoard.states[myNum]
        }
      } else {
        //Otherwise, set the state to the state that the cell was before
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