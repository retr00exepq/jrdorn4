import { collisionDetection } from "./modules/collision.mjs";
import { Bricks } from "./modules/bricks.mjs";
import { draw } from "./modules/draw.mjs";
import { Game } from "./modules/game.mjs";

(function main() {
  // || Variables

  const canvas = document.querySelector("canvas");
  canvas.width = 400;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");
  // const ballRadius = 15;

  const itemColor = "#6c9950"; //green
  const brokenColor1 = "#509199"; //xxxx to display when brick hit twice
  const brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

  const livesDisplay = document.querySelector("#lives");

  const brickSound1 = new Audio("audio/brick1.wav");
  const brickSound2 = new Audio("audio/brick2.wav");
  const brickSound3 = new Audio("audio/brick3.wav");
  const brickSound4 = new Audio("audio/brick4.wav");
  const brickSound5 = new Audio("audio/brick5.wav");

  //x and y coordinates of ball
  let x = canvas.width / 2;
  let y = canvas.height - 30;

  let dx = 3;
  let dy = -3;

  let rightPressed = false;
  let leftPressed = false;

  // || Event Listeners
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

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

  let myGame = new Game(canvas);

  //display start screen on page load
  myGame.displayScreen(myGame.startDisplay);

  draw(myBricks, myGame, canvas, ctx, x, y, itemColor);

  myBricks.drawBricks();

  //
  //draw ball on canvas
  //draw paddle on canvas
  //display score above canvas
  //display hearts to count lives
  //
})();
