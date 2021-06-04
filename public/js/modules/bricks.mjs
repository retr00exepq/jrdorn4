//keep track of brick count and parameters
export class Bricks {
  constructor() {
    this.brickRowCount = 2;
    this.brickColumnCount = 2;
    this.brickWidth = 30;
    this.brickHeight = 12;
    this.brickPadding = 5;
    this.brickOffsetLeft = 80;
    this.brickOffsetTop = 50;
    this.bricks = [];
  }
  init() {
    //initialize brick rows and columns
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = {
          x: 0,
          y: 0,
          health: 3,
        };
      }
    }
  }
  updateStage(rows, cols) {
    //change number of brick rows and columns
    this.brickRowCount = rows;
    this.brickColumnCount = cols;
  }
}
