import { collisionDetection } from "./modules/collision";
import {
  drawBall,
  drawPaddle,
  drawScore,
  drawLives,
  draw,
} from "./modules/draw";
import { myConfig } from "./modules/config";
import { Game } from "./modules/game";
import { Bricks } from "./modules/bricks";

//check for namespace existence: if already defined, use that instance; else, assign to object literal to MyApp
// if (!MyApp) {
//   MyApp = {};
// }

// // || Variables

// || Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// || Classes
//functionality for starting game

let myGame = new Game();

// //brick setup
let myBricks = new Bricks();
myBricks.setUp(); //initialize bricks on page load

// || Functions

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

//detect brick collision

//draw ball on canvas

//draw paddle on canvas

//display score above canvas

//display hearts to count lives

//display a screen
function displayScreen(name) {
  return Function(`${name}.classList.remove("hidden");`)();
}

//////////////////////////////////////////
function muteUmute() {
  let muteButton = document.createElement("button");
}
//////////////////////////////////////////

///draw

(function () {
  let message = "IIFE";
  console.log(message);
  console.log(Window);
})();

//display start screen on page load
displayScreen("startDisplay");
