//start game if no game is currently running

export function start(game) {
  //if no game is currently running
  if (game.state === 0) {
    //hide start/ win/ lose screens before starting game
    if (!startDisplay.classList.contains("hidden")) {
      startDisplay.classList.add("hidden");
    } else if (!winDisplay.classList.contains("hidden")) {
      winDisplay.classList.add("hidden");
    } else if (!loseDisplay.classList.contains("hidden")) {
      loseDisplay.classList.add("hidden");
    }

    //display canvas, lives and score
    canvas.classList.remove("hidden");
    slDisplay.classList.remove("hidden");
    startSound.play();
    draw();
    game.state = 1;
    return game; //game running
  }
}
