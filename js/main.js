// || Variables
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ballRadius = 15;

const itemColor = "#6c9950"; //green
const myFont = "2rem PressStart2P";

const myScore = document.querySelector("#score");
const myLives = document.querySelector("#hearts");
const livesDisplay = document.querySelector("#lives");

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

const brickWidth = 30;
const brickHeight = 12;
const brickPadding = 2;
const brickOffsetLeft = 40;

let score = 0;
let lives = 3;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
    };
  }
}

// || Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// || Functions

//move paddle left or right on arrow key press
function keyDownHandler(e) {
  e.preventDefault(); //prevent page from moving
  if (e.code === "ArrowRight") {
    rightPressed = true;
  } else if (e.code === "ArrowLeft") {
    leftPressed = true;
  }
}

//stop moving paddle when arrow key released
function keyUpHandler(e) {
  if (e.code === "ArrowRight") {
    rightPressed = false;
  } else if (e.code === "ArrowLeft") {
    leftPressed = false;
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
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          //handle brick collision
          randomBrick();
          dy = -dy;
          b.status = 0;
          score++;
          //level won when all bricks are smashed
          if (score === brickRowCount * brickColumnCount) {
            winSound.play();
            alert("You Win!");
            document.location.reload();
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
      if (bricks[c][r].status === 1) {
        let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = c * (brickHeight + brickPadding);
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = itemColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//display score above canvas
function drawScore() {
  myScore.innerHTML = `Score: ${score}`;
}

//display hearts to count lives
function drawLives() {
  let str = "";
  for (let i = 0; i < lives; i++) {
    str += '<img class="heart" src="img/heart.png" />';
  }
  myLives.innerHTML = str;
}

//master function
function draw() {
  canvas.width = 600;
  canvas.height = 350;
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
      lives--;
      if (!lives) {
        loseSound.play();
        alert("Game Over");
        document.location.reload();
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

//press space bar to start game
document.body.onkeyup = function (e) {
  if (e.keyCode === 32) {
    livesDisplay.classList.remove("hidden");
    startSound.play();
    draw();
  }
};
