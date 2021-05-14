export class Game {
  constructor(context) {
    this.main = context;
    this.state = 0;
    this.score = 0;
    this.lives = 3;
    this.won = false;
  }
  start() {
    (function () {
      console.log(this);
    })();
    //only start game if no game is currently running
    if (this.state === 0) {
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
      this.state = 1; //game running
    }
  }
  stop() {
    //mark game as stopped and reset score/ lives
    this.state = 0;
    this.score = 0;
    this.lives = 3;
  }
}
