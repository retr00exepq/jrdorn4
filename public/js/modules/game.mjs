//keep track of whether the game is running or not, if the user wins, and the user's score and lives
export class Game {
  constructor() {
    this.state = 0;
    this.score = 0;
    this.lives = 3;
    this.won = false;
  }
}
