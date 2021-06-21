//move paddle back and forth
export function movePaddle(Vars) {
  if (
    Vars.rightPressed &&
    Vars.paddleX < Vars.canvas.width - Vars.paddleWidth
  ) {
    Vars.paddleX += 5;
  } else if (Vars.leftPressed && Vars.paddleX > 0) {
    Vars.paddleX -= 5;
  }
  return Vars;
}
