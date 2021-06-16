//sound effects for game

export class Sfx {
  constructor() {
    this.brickSounds = [
      new Audio("audio/brick1.wav"),
      new Audio("audio/brick2.wav"),
      new Audio("audio/brick3.wav"),
      new Audio("audio/brick4.wav"),
      new Audio("audio/brick5.wav"),
    ];
    this.startSound = new Audio("audio/start.wav");
    this.winSound = new Audio("audio/win.wav");
    this.loseSound = new Audio("audio/lose.wav");
    this.dropSound = new Audio("audio/drop.wav");
    this.wallSound = new Audio("audio/wall.wav");
    this.paddleSound = new Audio("audio/paddle.wav");
  }
  //play a random brick sound on collision
  randomBrickSound() {
    let random = Math.floor(Math.random() * (6 - 1));

    this.brickSounds[random].play();
  }
}
