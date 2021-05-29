//sound effects for game

export class Sfx {
  constructor() {
    this.brickSound1 = new Audio("audio/brick1.wav");
    this.brickSound2 = new Audio("audio/brick2.wav");
    this.brickSound3 = new Audio("audio/brick3.wav");
    this.brickSound4 = new Audio("audio/brick4.wav");
    this.brickSound5 = new Audio("audio/brick5.wav");
    this.startSound = new Audio("audio/start.wav");
    this.winSound = new Audio("audio/win.wav");
    this.loseSound = new Audio("audio/lose.wav");
    this.dropSound = new Audio("audio/drop.wav");
    this.wallSound = new Audio("audio/wall.wav");
    this.paddleSound = new Audio("audio/paddle.wav");
  }
}
