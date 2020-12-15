class CellBoard {
    constructor() {
      this.cells = []
      this.states = []
      this.stateCount = []
      //Try this out and see if I can implement nested classes with states and state colors.

      //this.state = new State("void",[255,255,255])
    }
    loadStates() {
      class State {
        constructor(name, color) {
          this.name = name
          this.color = color
        }
      }
      //state 0 will always be evaluated as the void state
      let state0 = new State("void",[255,255,255])
      let state1 = new State("covid-19",[200,100,100])
      let state2 = new State("pox",[100,200,100])
      let state3 = new State("flu",[100,100,200])
      let state4 = new State("sars",[200,100,200])
      let state5 = new State("sars2",[200,200,100])
      //let state6 = new State("sars3",[100,200,200])
      this.states.push(state0)
      this.states.push(state1)
      this.states.push(state2)
      this.states.push(state3)
      this.states.push(state4)
      this.states.push(state5)
      //this.states.push(state6)
     console.log("hello")
    }
    updateStateCount() {
        this.stateCount = []
        for (let h = 0; h < this.states.length;h++) {
            let count = 0
            for (let i = 0;i < ROWS;i++) {
                for (let j = 0;j < COLS;j++) {
                    if (this.cells[i][j].state.name == this.states[h].name) {
                        //console.log(this.states[i])
                        count += 1
                    }
                }
            }
            this.stateCount.push(count)
        }
    }
    //display all the cells in this.cells
    showCells() {
      //Check every row
      for (let i = 0; i < ROWS;i++)  {
          //Check every column
          for (let j = 0; j < COLS;j++)  {
            //Check the neighboring cells around the one you are looking at to draw it correctly
            let hoodCells = []
            for (let x = -1; x < 2; x++) {
              for (let y = -1;y < 2; y++) {
                   //WRAP AROUND BOARD CODE to check the opposite row or column if you are currently on the edge of the board
                  /*
                  BOARD CHECKING ORDER ILLUSTRATION
                  [2] [5] [8]
                  [1] [4] [7]
                  [0] [3] [6]
                  */
                  let checkRow = (i + x + ROWS) % ROWS
                  let checkCol = (j + y + COLS) % COLS
                  //store the states of the surrounding cells in the hoodCells array.
                  hoodCells.push(this.cells[checkRow][checkCol].state)
              }
           }
            //The variable "hoodCells" now contains a list of the neighboring cell's states; we can therefore use these to calculate
            //how the cell should be displayed based on these 9 values (one for each of the surrounding cells and the current cell)
            //NOTE that hoodCell[4] is YOUR current state
            //****Remeber the the computer in this program counts cells from bottom to top, left to right!****
            
            //Create a variable holding all the states that a cell could be
            
            //Loop through all the states and display the cells based on the states/
            //This code ensures that only the same states code will "Connect" with itself visually.
            if (SMOOTH_CELLS == true) {
                for (let k = 0;k < this.states.length;k++) {
                if (hoodCells[1] == this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[7] == this.states[k]) {
                        this.cells[i][j].show("left-right")
                        break
                } else if (hoodCells[3] == this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] == this.states[k]) {
                        this.cells[i][j].show("up-down")
                        break
                } else if (hoodCells[1] == this.states[k] &&
                        hoodCells[3] != this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] != this.states[k] &&
                        hoodCells[7] != this.states[k]) {
                        this.cells[i][j].show("left")
                        break
                } else if (hoodCells[1] != this.states[k] &&
                        hoodCells[3] != this.states[k] &&
                        hoodCells[4] == this.states[k] && 
                        hoodCells[5] != this.states[k] &&
                        hoodCells[7] == this.states[k]) {
                        this.cells[i][j].show("right")
                        break
                } else if (hoodCells[1] != this.states[k] &&
                        hoodCells[3] != this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] == this.states[k] &&
                        hoodCells[7] != this.states[k]) {
                        this.cells[i][j].show("up")
                        break
                    } else if (hoodCells[1] != this.states[k] &&
                        hoodCells[3] == this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] != this.states[k] &&
                        hoodCells[7] != this.states[k]) {
                        this.cells[i][j].show("down")
                        break
                } else if (hoodCells[1] != this.states[k] &&
                        hoodCells[3] != this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] == this.states[k] &&
                        hoodCells[7] == this.states[k]) {
                        this.cells[i][j].show("down-right")
                        break
                } else if (hoodCells[1] != this.states[k] &&
                        hoodCells[3] == this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] != this.states[k] &&
                        hoodCells[7] == this.states[k]) {
                        this.cells[i][j].show("up-right")
                        break
                } else if (hoodCells[1] == this.states[k] &&
                        hoodCells[3] != this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] == this.states[k] &&
                        hoodCells[7] != this.states[k]) {
                        this.cells[i][j].show("down-left")
                        break
                } else if (hoodCells[1] == this.states[k] &&
                        hoodCells[3] == this.states[k] &&
                        hoodCells[4] == this.states[k] &&
                        hoodCells[5] != this.states[k] &&
                        hoodCells[7] != this.states[k]) {
                        this.cells[i][j].show("up-left")
                    }
                }
            } else {
                this.cells[i][j].show("left-right")
            }
        }
      }
    }
    //create a randomly generated cell block with random states.
    createRandomCells() {
      this.cells = []
        for (let i = 0; i < ROWS; i++) {
        let row = []
            for (let j = 0; j < COLS; j++) {
               let num = floor(random(this.states.length))
               let thestate = this.states[num]
               //let state = random(["void","covid-19","pox"])
               let c = new Cell(CELL_SIZE*i,CELL_SIZE*j,CELL_SIZE,thestate)
               row.push(c)
        }
        this.cells.push(row)
      }
    }
    //create a blank cell block ...All cells are VOID state...
    createBlankCells() {
        for (let i = 0; i < ROWS; i++) {
            let row = []
            for (let j = 0; j < COLS; j++) {
              let state = this.states[1]
                let c = new Cell(CELL_SIZE*i,CELL_SIZE*j,CELL_SIZE,state)
                row.push(c)
        }
        this.cells.push(row)
    }
      
    }
  }

//The building block of the entire program. A singular Cell Class

  class Cell {
    constructor(x,y,size,state) {
      this.x = x
      this.y = y
      this.size = size
      this.state = state
    }
    show(pos) {
      //Eliminate the lines from the outside of the shapes
      noStroke()
      //Fill with specified color based on state (Virus or Void)
      fill(this.state.color)
      //Check the position in relation to the other cells around the current one and draw appropriately
      if (pos == "left-right" || pos == "up-down") {
        rect(this.x,this.y,this.size,this.size)
      } else if (pos == "default") {
        rect(this.x,this.y,this.size,this.size,RES)
      } else if (pos == "left") {
        rect(this.x,this.y,this.size,this.size,0,RES,RES,0)
      } else if (pos == "right") {
        rect(this.x,this.y,this.size,this.size,RES,0,0,RES)
      } else if (pos == "up") {
        rect(this.x,this.y,this.size,this.size,RES,RES,0,0)
      } else if (pos == "down") {
        rect(this.x,this.y,this.size,this.size,0,0,RES,RES)
      } else if (pos == "down-right") {
        rect(this.x,this.y,this.size,this.size,RES,0,0,0)
      } else if (pos == "up-right") {
        rect(this.x,this.y,this.size,this.size,0,0,0,RES)
      } else if (pos == "down-left") {
        rect(this.x,this.y,this.size,this.size,0,RES,0,0)
      } else if (pos == "up-left") {
        rect(this.x,this.y,this.size,this.size,0,0,RES,0)
      }
      }
  }