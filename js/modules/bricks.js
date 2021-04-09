//brick setup
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
  setUp() {
    //set up brick rows and columns
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
    //change number of rows and columns
    this.brickRowCount = rows;
    this.brickColumnCount = cols;
  }
  drawBricks() {
    //draw brick rows and colums on canvas
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].health > 0) {
          let brickX =
            r * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          let brickY =
            c * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          if (this.bricks[c][r].health === 3) {
            ctx.fillStyle = itemColor;
          } else if (this.bricks[c][r].health === 2) {
            ctx.fillStyle = brokenColor1;
          } else {
            ctx.fillStyle = brokenColor2;
          }
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}
// let myBricks = new Bricks();
// myBricks.setUp(); //initialize bricks on page load
