import { Bricks } from "./modules/bricks.mjs";
import * as m from "./modules/index.mjs";

(function main() {
  // || Variables

  const myScore = document.querySelector("#score");
  const myLives = document.querySelector("#hearts");
  const canvas = document.querySelector("canvas");
  canvas.width = 400;
  canvas.height = 250;
  const ctx = canvas.getContext("2d");
  const ballRadius = 15;

  const itemColor = "#6c9950"; //green
  const brokenColor1 = "#509199"; //xxxx to display when brick hit twice
  const brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

  const paddleHeight = 10;
  const paddleWidth = 60;
  let paddleX = (canvas.width - paddleWidth) / 2; // x coordinates of paddle

  let x = canvas.width / 2; //x coordinates of ball
  let y = canvas.height - 30; //y coordinates of ball

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
      //start game
      m.start(Game, Displays, canvas, Sfx);
      myLives.innerHTML = m.drawLives(
        Game.lives,
        '<img class="heart" src="img/heart.png" />'
      );
    }
  }

  //////////////////////////////////////////
  // function muteUmute() {
  //   let muteButton = document.createElement("button");
  // }
  //////////////////////////////////////////

  // || Run game

  //init classes to run game
  let Bricks = new m.Bricks();
  let Displays = new m.Displays();
  let Game = new m.Game();
  let Sfx = new m.Sfx();

  //initialize bricks on page load
  Bricks.init();

  //display start screen on page load
  m.displayScreen(Displays.startDisplay);

  //play start sound and draw components when user presses space
  // while (Game.state === 1) {
  //   console.log(1);
  //   Game.state = 0;
  // }

  // Sfx.startSound.play();
  // m.drawBricks();
  //draw ball
  //draw paddle
  //draw lives
  //draw score

  //
  //
  //
  //Draw game components
  function draw() {
    //

    startSound.play();
    //
    ctx.clearRect(0, 0, canvas.width, canvas.width);
    // myBricks.drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    //ball bounces off side wall
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      wallSound.play();
      dx = -dx;
    }
    //ball bounces off top wall
    if (y + dy < 1) {
      wallSound.play();
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        //paddle collision
        paddleSound.play();
        dy = -dy;
      } else {
        //ball hit ground
        dropSound.play();
        myGame.lives--;
        if (!myGame.lives) {
          //display lose screen, exit game and hide canvas/ score/ lives
          loseSound.play();
          myBricks.setUp();
          displayScreen("loseDisplay");
          canvas.classList.add("hidden");
          slDisplay.classList.add("hidden");
          myGame.stop();
          myGame.lives = 4;
          return;
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 2;
          dy = -2;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    //move paddle back and forth
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 5;
    }

    x += dx;
    y += dy;

    //exit when game won
    if (myGame.won === true) {
      myGame.won = false;
      return;
    }

    requestAnimationFrame(draw);
  }
  //
  //
  //
  function collisionDetection() {
    for (let c = 0; c < myBricks.brickColumnCount; c++) {
      for (let r = 0; r < myBricks.brickRowCount; r++) {
        let b = myBricks.bricks[c][r];
        if (b.health > 0) {
          if (
            x > b.x &&
            x < b.x + myBricks.brickWidth &&
            y > b.y &&
            y < b.y + myBricks.brickHeight
          ) {
            //handle brick collision
            randomBrick();
            dy = -dy;
            b.health--;
            if (b.health === 0) {
              myGame.score++;
            }
            //level won when all bricks are smashed
            if (
              myGame.score ===
              myBricks.brickRowCount * myBricks.brickColumnCount
            ) {
              winSound.play();
              myBricks.setUp();
              displayScreen("winDisplay");
              canvas.classList.add("hidden");
              slDisplay.classList.add("hidden");
              myGame.stop();
              myGame.won = true;
            }
          }
        }
      }
    }
  }
})();
