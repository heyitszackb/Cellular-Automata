let WIDTH = 500 //Width of the display
let HEIGHT = 500 //Height of the display
let RES = 5 //Resolution of the pixels. The smaller this number is, the more pixels there will be.
let CELL_SIZE = (WIDTH/HEIGHT)*RES //Calculated value based on window size and res.
let COLS = WIDTH/RES
let ROWS = HEIGHT/RES
let going = false
let VIRUS_COLOR = [100,255,255] //Color of the virus
let SMOOTH_CELLS = false // Setting this to false will improve framerate performance

function setup() {  
     
  // Create Canvas of given size  
  myCanvas = createCanvas(WIDTH, HEIGHT);
  voidCounter = createElement("h1","Number of void cells:")
  virusCounter = createElement("h1","Number of virus cells:")
  
  button = createButton("Toggle Smoothing")
  button.mousePressed(toggleSmoothing)
  background(0,0,0);
  cb1 = initRandomBoard()
  cb2 = initBlankBoard()
  c = new Canvas()
  c.createBlankCanvas()
  p = new Pen(cb1.cells,c.pixels,[100,255,100,75],10,"create-void")
}
//Create a canvas where I will display the pen tool (will not update cells with color from pen tool, it will be overlayed)
class Canvas {
  constructor() {
    //Similarly to the cells in the cellBoard, this replicates that idea and uses pixels instead.
    this.pixels = []
  }
  //Similar to the idea of creating a blank cellboard, this will create and load into the this.pixels array an array of initialized pixels
  createBlankCanvas() {
      for (let i = 0; i < ROWS; i++) {
          let row = []
          for (let j = 0; j < COLS; j++) {
              let c = new Pixel(CELL_SIZE*i,CELL_SIZE*j,CELL_SIZE,[200,100,100,200])
              row.push(c)
      }
      this.pixels.push(row)
  }
    
  }
  //dont need this, but will keep it here for now
  show() {
    for (let i = 0;i < ROWS;i++) {
      for (let j = 0; j < COLS;j++) {
        this.pixels[i][j].show()
      }
    }
  }
}

//The pen tool! This combines the cells class AND the pixels class, it's the common deniminator for communicating
//Information that pertains to both. The pixels array and the cells array's match up exactly over each other.
class Pen {
  constructor(cells,pixels,color1,size,mode) {
    this.cells = cells
    this.pixels = pixels
    this.size = size
    this.color1 = color1
    this.color2 = [255,100,100,75]
    //The mode is something that will be expanded later. Currently, it only has two modes: create-void, and create-virus.
    //Create void, the default, will act like an eraser tool. Create virus will create that virus.
    this.mode = "create-void"
  }
  show() {
    //Loop through all the rows and cols (since the cells and the pixels are exactly overlapping, you can reference the same cells in each)
    //For the show pen function, however, we are only displaying the cells that make up the tool. In this method we don't actaully define
    //What the pen tool actually does, we just display it.
    for (let i = 0;i < ROWS;i++) {
      for (let j = 0;j < COLS;j++) {
        //Take the distance from the mouse to the pixel (uses top left, so sometimes the cirlces can be wonky but it's fineeee)
        let d = dist(mouseX,mouseY,this.pixels[i][j].x,this.pixels[i][j].y)
        if (d < this.pixels[i][j].size*this.size){
          //If the mode is create-voide, then set the color to color1
          if (this.mode == "create-void") {
          this.pixels[i][j].color = this.color1
            //Else, set the color to color2 (we use a hotkey to switch between modes in the future)
          } else if (this.mode == "create-virus") {
          this.pixels[i][j].color = this.color2
          }
          //Regardless of what the color is, show the pen (taking pixels from the pixels array, NOT the cells array. Rememebr they are
          //two different arrays on purpose.)
          
          this.pixels[i][j].show()  
        } else {
          //If the pixels are not in the proper distance of the mouse, then essentailly make them dissapear (alpha set to 0)
          //So at all times there is another layer of pixels across the screen, and moving the mouse reveals more of that layer.
          this.pixels[i][j].color = [0,0,0,0]
        }
        
      }
    }
  }
  //This is the method where the updating actually happens in the cells array.
  updateCells() {
    //Loop through the cells and pixels (they're the same just on top of each other)
    for (let i = 0;i < ROWS;i++) {
      for (let j = 0;j < COLS;j++) {
        //Get the distance again
        let d = dist(mouseX,mouseY,this.pixels[i][j].x,this.pixels[i][j].y)
        //If the mouse is pressed and the mode is create-void, then we want to set the STATE of the current CELL
        //To VOID. 
        if (d < this.pixels[i][j].size*this.size && mouseIsPressed){
          if (this.mode == "create-void") {
          this.cells[i][j].state = "void"
            //Otherwise, set it to virus.
          } else {
          this.cells[i][j].state = "virus"
          }
        }
        
      }
    }
  }
}

//The building block of our pen tool. Each pixel is so simple and it makes something so much more complex.
class Pixel {
  constructor(x,y,size,color) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
  }
  show() {
    noStroke()
    fill(this.color)
    rect(this.x,this.y,this.size,this.size)
    
  }
}

//Initialize Random Board State
function initRandomBoard() {
  let cb = new CellBoard()
  cb.createRandomCells()
  return cb
}


//Initialize Blank Board State
function initBlankBoard() {
  let cb = new CellBoard()
  cb.createBlankCells()
  return cb
}

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
      ///*
      if (oldBoard.cells[i][j].state == "virus" && vd == 3) {
        newBoard.cells[i][j].state = "void"
        } else if (oldBoard.cells[i][j].state == "void" && (vd < 2 || vd > 3)) {
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
function draw() {
     //update the background to white
     background(VIRUS_COLOR)
     //Show the cells
     cb1.showCells()
     showCounter()
     //show the canvas screen over the cells (the pen tool)
     p.show()
     //Update the cells
     p.updateCells()
     //c.show()
  //If the variable "going" is true, do the update calculations.
  if (going) {
     //Update the cells (if the game is going, which is determined by the going variable)
     cb1,cb2 = calcNextGen(cb1,cb2)
  }
}

//Handles displaying the count of the virus and void cells
function showCounter() {
    cb1.updateStateCount()
     //Update HTML element that displays the number of virus cells and the number of void cells
    voidCounter.html("Void cells: " + cb1.stateCount[0])
    virusCounter.html("Virus cells: " + cb1.stateCount[1])
}