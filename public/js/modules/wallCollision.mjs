//handle wall collision
export function wallCollision(
  Sfx,
  canvas,
  ballRadius,
  x,
  y,
  dx,
  dy,
  paddleX,
  paddleWidth,
  Game,
  Bricks,
  Displays,
  m
) {
  //ball bounces off side wall
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    Sfx.wallSound.play();
    dx = -dx;
  }

  //ball bounces off top wall
  if (y + dy < 1) {
    Sfx.wallSound.play();
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      //paddle collision
      Sfx.paddleSound.play();
      dy = -dy;
    } else {
      //ball hit ground
      Sfx.dropSound.play();
      Game.lives--;
      if (!Game.lives) {
        //display lose screen, exit game and hide canvas/ score/ lives
        Sfx.loseSound.play();
        Bricks.init();
        m.displayScreen(Displays.loseDisplay);
        canvas.classList.add("hidden");
        Displays.slDisplay.classList.add("hidden");
        m.stop(Game);
        Game.lives = 4;
        return;
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}
