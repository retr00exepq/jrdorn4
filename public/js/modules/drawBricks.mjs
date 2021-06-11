export function drawBricks(ctx, Bricks, itemColor, brokenColor1, brokenColor2) {
  //draw brick rows and colums on canvas
  for (let c = 0; c < Bricks.brickColumnCount; c++) {
    for (let r = 0; r < Bricks.brickRowCount; r++) {
      if (Bricks.bricks[c][r].health > 0) {
        let brickX =
          r * (Bricks.brickWidth + Bricks.brickPadding) +
          Bricks.brickOffsetLeft;
        let brickY =
          c * (Bricks.brickHeight + Bricks.brickPadding) +
          Bricks.brickOffsetTop;
        Bricks.bricks[c][r].x = brickX;
        Bricks.bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, Bricks.brickWidth, Bricks.brickHeight);
        if (Bricks.bricks[c][r].health === 3) {
          ctx.fillStyle = itemColor;
        } else if (Bricks.bricks[c][r].health === 2) {
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
