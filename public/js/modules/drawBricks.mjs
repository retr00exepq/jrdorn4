export function drawBricks() {
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
