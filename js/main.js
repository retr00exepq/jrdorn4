//< 100 lines per module

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

// let myGame = new Game();

// //brick setup
// let myBricks = new Bricks();
// myBricks.setUp(); //initialize bricks on page load

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

//draw ball on canvas
let img = new Image();
img.src = "img/ball.png";

function drawBall() {
  ctx.drawImage(img, x, y);
}

//draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = itemColor;
  ctx.fill();
  ctx.closePath();
}

//display score above canvas
function drawScore() {
  myScore.innerHTML = `SCORE: ${myGame.score}`;
}

//display hearts to count lives
function drawLives() {
  let str = "";
  for (let i = 0; i < myGame.lives; i++) {
    str += '<img class="heart" src="img/heart.png" />';
  }
  myLives.innerHTML = str;
}

//display a screen
function displayScreen(name) {
  return Function(`${name}.classList.remove("hidden");`)();
}

//////////////////////////////////////////
function muteUmute() {
  let muteButton = document.createElement("button");
}
//////////////////////////////////////////

//master function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.width);
  myBricks.drawBricks();
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

(function () {
  let message = "IIFE";
  console.log(message);
  console.log(Window);
})();

//display start screen on page load
displayScreen("startDisplay");
