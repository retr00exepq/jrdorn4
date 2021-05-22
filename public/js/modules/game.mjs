export class Game {
  constructor(canvas) {
    this.startDisplay = document.querySelector("#start");
    this.winDisplay = document.querySelector("#win");
    this.loseDisplay = document.querySelector("#lose");
    this.slDisplay = document.querySelector("#scorelives");
    this.canvas = canvas;
    this.state = 0;
    this.score = 0;
    this.lives = 3;
    this.won = false;
  }
  //display a screen
  displayScreen(name) {
    return name.classList.remove("hidden");
  }
  start() {
    //only start game if no game is currently running
    if (this.state === 0) {
      //hide start/ win/ lose screens before starting game
      if (!this.startDisplay.classList.contains("hidden")) {
        this.startDisplay.classList.add("hidden");
      } else if (!this.winDisplay.classList.contains("hidden")) {
        this.winDisplay.classList.add("hidden");
      } else if (!this.loseDisplay.classList.contains("hidden")) {
        this.loseDisplay.classList.add("hidden");
      }

      //display canvas, lives and score
      this.canvas.classList.remove("hidden");
      this.slDisplay.classList.remove("hidden");
      // startSound.play();
      // draw();
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
