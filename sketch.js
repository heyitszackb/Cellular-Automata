let WIDTH = 500 //Width of the display
let HEIGHT = 500 //Height of the display
let RES = 5 //Resolution of the pixels. The smaller this number is, the more pixels there will be.
let CELL_SIZE = (WIDTH/HEIGHT)*RES //Calculated value based on window size and res.
let COLS = WIDTH/RES
let ROWS = HEIGHT/RES
let going = false
let bg_color = [100,255,255] //Color of the virus
let SMOOTH_CELLS = false // Setting this to false will improve framerate performance

function setup() {  
     
  // Create Canvas of given size  
  myCanvas = createCanvas(WIDTH, HEIGHT);
  voidCounter = createElement("h1","Number of void cells:")
  virusCounter = createElement("h1","Number of covid-19 cells:")
  poxCounter = createElement("h1","Number of pox cells:")
  slider = createSlider(0,255,250)
  createP("")
  button = createButton("Toggle Smoothing")
  button.mousePressed(toggleSmoothing)
  background(0,0,0);
  cb1 = initRandomBoard()
  cb2 = initBlankBoard()
  //cb2.loadStates()
  c = new Canvas()
  c.createBlankCanvas()
  p = new Pen(cb1,c.pixels,10,"void")
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
  constructor(cellBoard,pixels,size,mode) {
    this.cellBoard = cellBoard
    this.pixels = pixels
    this.size = size
    this.mode = "void" //The mode corresponds to the name of the state of the cell. Setting the mode to something will allow the
    //pen tool to "paint" that state onto the cells below it.
  }
  show() {
    //Loop through all the rows and cols (since the cells and the pixels are exactly overlapping, you can reference the same cells in each)
    //For the show pen function, however, we are only displaying the cells that make up the tool. In this method we don't actaully define
    //What the pen tool actually does, we just display it.
    for (let i = 0;i < ROWS;i++) {
      for (let j = 0;j < COLS;j++) {
        //Take the distance from the mouse to the pixel (uses top left, so sometimes the cirlces can be wonky but it's fineeee)
        let d = dist(mouseX,mouseY,this.pixels[i][j].x,this.pixels[i][j].y)
        //If the pen size distance is over that pixel, display it with the appriopriate color that corresponds to the state of the cell
        if (d < this.pixels[i][j].size*this.size){
          let ran = false
          //loop through all the states that exist in the cellboard and check to see if the pen mode is equal to that state name.
          for (let k = 0; k < this.cellBoard.states.length; k++)
          //If the pen mode is equal to the name of a state, set the pen color to the color that corrosponds to that state.
            if (this.mode == this.cellBoard.states[k].name) {
              this.pixels[i][j].color = this.cellBoard.states[k].color
              this.pixels[i][j].show()
              ran = true
            }
            //Set all the other pixels in the canvas to transparent when the mouse is not over them within the range of the pen.
            if (ran == true){
              this.pixels[i][j].color = [0,0,0,0]
            }
          }
        
        }
      }
    }
  
  //This is the method where the updating actually happens in the cells array.
  updateCells() {
    //Loop through the cells and pixels (they're the same just on top of each other)
    for (let i = 0;i < ROWS;i++) {
      for (let j = 0;j < COLS;j++) {
        //Get the distance again from the mouse position
        let d = dist(mouseX,mouseY,this.pixels[i][j].x,this.pixels[i][j].y)
        //If the mouse is pressed and the individual pixel is within the distance of the current size of the pen
        if (d < this.pixels[i][j].size*this.size && mouseIsPressed){
          //Loop through all the states in the cellboard.
          for (let k = 0; k < this.cellBoard.states.length; k++) {
            //If the mode of the pen is equal to the state name, 
            if (this.mode == this.cellBoard.states[k].name) {
              //set the state of the cellboard to that state.
              this.cellBoard.cells[i][j].state = this.cellBoard.states[k]
            }
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
  cb.loadStates()
  cb.createRandomCells()
  return cb
}


//Initialize Blank Board State
function initBlankBoard() {
  let cb = new CellBoard()
  cb.loadStates()
  cb.createBlankCells()
  return cb
}

function draw() {
     //update the background to white
     bg_color = slider.value()
     //background(bg_color)
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
    poxCounter.html("Pox cells: " + cb1.stateCount[2])
    voidCounter.html("Void cells: " + cb1.stateCount[1])
    virusCounter.html("Covid-19 cells: " + cb1.stateCount[0])
}