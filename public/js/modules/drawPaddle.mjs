//draw paddle on a canvas
//coordinates (paddleX), width(paddleWidth, height(paddleHeight), color(itemColor), context (ctx),
//canvasHeight (canvas.height)

export function drawPaddle(
  coords,
  color,
  context,
  canvasHeight,
  width,
  height
) {
  context.beginPath();
  context.rect(coords, canvasHeight - height, width, height);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}
