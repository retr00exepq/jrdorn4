//start game if no game is currently running

export function start(game, displays, canvas, sfx) {
  //if no game is currently running
  if (game.state === 0) {
    //hide start/ win/ lose screens before starting game
    if (!displays.startDisplay.classList.contains("hidden")) {
      displays.startDisplay.classList.add("hidden");
    } else if (!displays.winDisplay.classList.contains("hidden")) {
      displays.winDisplay.classList.add("hidden");
    } else if (!displays.loseDisplay.classList.contains("hidden")) {
      displays.loseDisplay.classList.add("hidden");
    }

    //display canvas, lives and score
    canvas.classList.remove("hidden");
    displays.slDisplay.classList.remove("hidden");
    sfx.startSound.play();
    game.state = 1;
    return game; //game running
  }
}
