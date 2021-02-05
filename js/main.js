// || Variables
const canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 250;
const ctx = canvas.getContext("2d");
const ballRadius = 15;

const itemColor = "#6c9950"; //green
const brokenColor1 = "#509199"; //xxxx to display when brick hit twice
const brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

const myScore = document.querySelector("#score");
const myLives = document.querySelector("#hearts");
const livesDisplay = document.querySelector("#lives");
const slDisplay = document.querySelector("#scorelives");

const startDisplay = document.querySelector("#start");
const winDisplay = document.querySelector("#win");
const loseDisplay = document.querySelector("#lose");

//sound effects
const startSound = new Audio("audio/start.wav");
const winSound = new Audio("audio/win.wav");
const loseSound = new Audio("audio/lose.wav");
const dropSound = new Audio("audio/drop.wav");
const wallSound = new Audio("audio/wall.wav");
const paddleSound = new Audio("audio/paddle.wav");

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

const paddleHeight = 10;
const paddleWidth = 60;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let brickRowCount = 1;
let brickColumnCount = 1;
// let brickRowCount = 7;
// let brickColumnCount = 7;

const brickWidth = 30;
const brickHeight = 12;
const brickPadding = 5;
const brickOffsetLeft = 80;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 3,
    };
  }
}

// || Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// || Classes
//functionality for starting game
class Game {
  constructor() {
    this.state = 0;
    this.score = 0;
    this.lives = 3;
  }
  start() {
    //only start game if no game is currently running
    if (this.state === 0) {
      //hide start/ win/ lose screens before starting game
      if (!startDisplay.classList.contains("hidden")) {
        startDisplay.classList.add("hidden");
      } else if (!winDisplay.classList.contains("hidden")) {
        winDisplay.classList.add("hidden");
      } else if (!loseDisplay.classList.contains("hidden")) {
        loseDisplay.classList.add("hidden");
      }

      //display canvas, lives and score
      canvas.classList.remove("hidden");
      slDisplay.classList.remove("hidden");
      startSound.play();
      draw();
      this.state = 1; //game running
    }
  }
  stop() {
    //mark game as stopped and reset score/ lives
    this.state = 0;
    this.score = 0;
    this.lives = 4;
  }
}
let myGame = new Game();

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

//////////////////////////////////////////////////////

//play a random sound on brick collision
function randomBrick() {
  let random = Math.floor(Math.random() * (6 - 1)) + 1;
  random = random.toString();
  return Function(`brickSound${random}.play();`)();
}

//detect brick collision
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status > 0) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          //handle brick collision
          randomBrick();
          dy = -dy;
          b.status--;
          if (b.status === 0) {
            myGame.score++;
          }
          //level won when all bricks are smashed
          if (myGame.score === brickRowCount * brickColumnCount) {
            winSound.play();
            displayScreen("winDisplay");
            canvas.classList.add("hidden");
            slDisplay.classList.add("hidden");
            myGame.stop();
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

//draw brick rows and colums on canvas
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status > 0) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding);
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (bricks[c][r].status === 3) {
          ctx.fillStyle = itemColor;
        } else if (bricks[c][r].status === 2) {
          ctx.fillStyle = brokenColor1;
        } else {
          ctx.fillStyle = brokenColor2;
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
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

//master function
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.width);
  drawBricks();
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
        displayScreen("loseDisplay");
        canvas.classList.add("hidden");
        slDisplay.classList.add("hidden");
        myGame.stop();
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
  requestAnimationFrame(draw);
}

//display start screen on page load
displayScreen("startDisplay");
