//handle brick collision
export function brickCollision(
  Bricks,
  Game,
  Sfx,
  Displays,
  canvas,
  x,
  y,
  dy,
  m
) {
  for (let c = 0; c < Bricks.brickColumnCount; c++) {
    for (let r = 0; r < Bricks.brickRowCount; r++) {
      let b = Bricks.bricks[c][r];
      if (b.health > 0) {
        if (
          x > b.x &&
          x < b.x + Bricks.brickWidth &&
          y > b.y &&
          y < b.y + Bricks.brickHeight
        ) {
          //handle brick collision
          Sfx.randomBrickSound();
          dy = -dy;
          ///
          //TODO: reverse direction of travel upon brick collision
          ///
          b.health--;
          if (b.health === 0) {
            Game.score++;
          }
          //level won when all bricks are smashed
          if (Game.score === Bricks.brickRowCount * Bricks.brickColumnCount) {
            Sfx.winSound.play();
            Bricks.init();
            m.displayScreen(Displays.winDisplay);
            canvas.classList.add("hidden");
            Displays.slDisplay.classList.add("hidden");
            Game.won = true;
            m.stop(Game);
          }
        }
      }
    }
  }
}
