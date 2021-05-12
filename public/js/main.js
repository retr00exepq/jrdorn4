import { collisionDetection } from "./modules/collision.mjs";
import { Bricks } from "./modules/bricks.mjs";
import {
  drawBall,
  drawPaddle,
  drawScore,
  drawLives,
  draw,
} from "./modules/draw.mjs";
import { Game } from "./modules/game.mjs";


let main = {
  // || Variables

  canvas: {
    obj: document.querySelector("canvas"),
    width: 400,
    height: 250,
  },


   ctx: canvas.getContext("2d"),
   ballRadius: 15,

   itemColor: "#6c9950", //green
   brokenColor1: "#509199", //xxxx to display when brick hit twice
   brokenColor2: "#7D5099", //xxxx to display when brick hit twice

   myScore: document.querySelector("#score"),
   myLives: document.querySelector("#hearts"),
   startDisplay: document.querySelector("#start"),
   livesDisplay: document.querySelector("#lives"),
   slDisplay: document.querySelector("#scorelives"),

  //////////////////////////////////////////
  // window.startDisplay = startDisplay;
  // window.canvas = canvas;
  //////////////////////////////////////////

   winDisplay: document.querySelector("#win"),
   loseDisplay: document.querySelector("#lose"),

  //sound effects
   startSound: new Audio("audio/start.wav"),
   winSound: new Audio("audio/win.wav"),
   loseSound: new Audio("audio/lose.wav"),
   dropSound: new Audio("audio/drop.wav"),
   wallSound: new Audio("audio/wall.wav"),
   paddleSound: new Audio("audio/paddle.wav"),

   brickSound1: new Audio("audio/brick1.wav"),
   brickSound2: new Audio("audio/brick2.wav"),
   brickSound3: new Audio("audio/brick3.wav"),
   brickSound4: new Audio("audio/brick4.wav"),
   brickSound5: new Audio("audio/brick5.wav"),

  //x and y coordinates of ball
   x: canvas.width / 2,
   y: canvas.height - 30,

   dx: 3,
   dy: -3,

   paddleHeight: 10,
   paddleWidth: 60,
   paddleX: (canvas.width - paddleWidth) / 2,

   rightPressed = false,
   leftPressed = false,

  // || Event Listeners
  document.addEventListener("keydown", keyDownHandler, false),
  document.addEventListener("keyup", keyUpHandler, false),

  // || Event Handlers

  //move paddle left or right on arrow key press
  function keyDownHandler(e) {
    e.preventDefault(); //prevent page from moving
    if (e.code === "ArrowRight") {
      rightPressed = true;
    } else if (e.code === "ArrowLeft") {
      leftPressed = true;
    }
    //handle spacebar, include closure for state?
  }

  //stop moving paddle when arrow key released
  function keyUpHandler(e) {
    if (e.code === "ArrowRight") {
      rightPressed = false;
    } else if (e.code === "ArrowLeft") {
      leftPressed = false;
    } else if (e.code === "Space") {
      myGame.start();
    }
  }

  //play a random sound on brick collision
  function randomBrick() {
    let random = Math.floor(Math.random() * (6 - 1)) + 1;
    random = random.toString();
    return Function(`brickSound${random}.play();`)();
  }

  //
  //draw ball on canvas
  //draw paddle on canvas
  //display score above canvas
  //display hearts to count lives
  //

  //display a screen
  function displayScreen(name) {
    return name.classList.remove("hidden");
    //   return Function(`${name}.classList.remove("hidden");`)();
  }

  //////////////////////////////////////////
  // function muteUmute() {
  //   let muteButton = document.createElement("button");
  // }
  //////////////////////////////////////////

  // || Consolidate Modules

  //brick setup
  let myBricks = new Bricks();
  myBricks.setUp(); //initialize bricks on page load

  //functionality for starting game
  let myGame = new Game(this);

  ///draw

  //display start screen on page load
  displayScreen(startDisplay);
}
