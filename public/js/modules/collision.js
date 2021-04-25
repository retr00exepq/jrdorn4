export function collisionDetection() {
  for (let c = 0; c < myBricks.brickColumnCount; c++) {
    for (let r = 0; r < myBricks.brickRowCount; r++) {
      let b = myBricks.bricks[c][r];
      if (b.health > 0) {
        if (
          x > b.x &&
          x < b.x + myBricks.brickWidth &&
          y > b.y &&
          y < b.y + myBricks.brickHeight
        ) {
          //handle brick collision
          randomBrick();
          dy = -dy;
          b.health--;
          if (b.health === 0) {
            myGame.score++;
          }
          //level won when all bricks are smashed
          if (
            myGame.score ===
            myBricks.brickRowCount * myBricks.brickColumnCount
          ) {
            winSound.play();
            myBricks.setUp();
            displayScreen("winDisplay");
            canvas.classList.add("hidden");
            slDisplay.classList.add("hidden");
            myGame.stop();
            myGame.won = true;
          }
        }
      }
    }
  }
}
