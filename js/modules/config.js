// export any top-level function (class, var, let, const)

export class Settings {
  constructor() {
    this.first = 1;
    this.second = 2;
  }
}
// const Set = new Settings();

export let myConfig = {
     canvas = document.querySelector("canvas"),
    canvas.width = 400,
    canvas.height = 250,
   ctx = canvas.getContext("2d"),
   ballRadius = 15,
   itemColor = "#6c9950", //green
   brokenColor1 = "#509199", //xxxx to display when brick hit twice
   brokenColor2 = "#7D5099", //xxxx to display when brick hit twice

   myScore = document.querySelector("#score"),
   myLives = document.querySelector("#hearts"),
   livesDisplay = document.querySelector("#lives"),
   slDisplay = document.querySelector("#scorelives"),

   startDisplay = document.querySelector("#start"),
   winDisplay = document.querySelector("#win"),
   loseDisplay = document.querySelector("#lose"),

  //sound effects
   startSound = new Audio("audio/start.wav"),
   winSound = new Audio("audio/win.wav"),
   loseSound = new Audio("audio/lose.wav"),
   dropSound = new Audio("audio/drop.wav"),
   wallSound = new Audio("audio/wall.wav"),
   paddleSound = new Audio("audio/paddle.wav"),

   brickSound1 = new Audio("audio/brick1.wav"),
   brickSound2 = new Audio("audio/brick2.wav"),
   brickSound3 = new Audio("audio/brick3.wav"),
   brickSound4 = new Audio("audio/brick4.wav"),
   brickSound5 = new Audio("audio/brick5.wav"),

  //x and y coordinates of ball
   x = canvas.width / 2,
   y = canvas.height - 30,

   dx = 3,
   dy = -3,

   paddleHeight = 10,
   paddleWidth = 60,
   paddleX = (canvas.width - paddleWidth) / 2,

   rightPressed = false,
   leftPressed = false,

};

// const canvas = document.querySelector("canvas");
// canvas.width = 400;
// canvas.height = 250;
// const ctx = canvas.getContext("2d");
// const ballRadius = 15;

// const itemColor = "#6c9950"; //green
// const brokenColor1 = "#509199"; //xxxx to display when brick hit twice
// const brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

// const myScore = document.querySelector("#score");
// const myLives = document.querySelector("#hearts");
// const livesDisplay = document.querySelector("#lives");
// const slDisplay = document.querySelector("#scorelives");

// const startDisplay = document.querySelector("#start");
// const winDisplay = document.querySelector("#win");
// const loseDisplay = document.querySelector("#lose");

// //sound effects
// const startSound = new Audio("audio/start.wav");
// const winSound = new Audio("audio/win.wav");
// const loseSound = new Audio("audio/lose.wav");
// const dropSound = new Audio("audio/drop.wav");
// const wallSound = new Audio("audio/wall.wav");
// const paddleSound = new Audio("audio/paddle.wav");

// const brickSound1 = new Audio("audio/brick1.wav");
// const brickSound2 = new Audio("audio/brick2.wav");
// const brickSound3 = new Audio("audio/brick3.wav");
// const brickSound4 = new Audio("audio/brick4.wav");
// const brickSound5 = new Audio("audio/brick5.wav");

// //x and y coordinates of ball
// let x = canvas.width / 2;
// let y = canvas.height - 30;

// let dx = 3;
// let dy = -3;

// const paddleHeight = 10;
// const paddleWidth = 60;
// let paddleX = (canvas.width - paddleWidth) / 2;

// let rightPressed = false;
// let leftPressed = false;
