//rarely have code longer than 100 lines and instead break code into modules

//check for namespace existence: if already defined, use that instance; else, assign to object literal to MyApp
// if (!MyApp) {
//   MyApp = {};
// }

// // || Variables
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
    this.won = false;
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
    this.lives = 3;
  }
}
let myGame = new Game();

// //brick setup
// class Bricks {
//   constructor() {
//     this.brickRowCount = 2;
//     this.brickColumnCount = 2;
//     this.brickWidth = 30;
//     this.brickHeight = 12;
//     this.brickPadding = 5;
//     this.brickOffsetLeft = 80;
//     this.brickOffsetTop = 50;
//     this.bricks = [];
//   }
//   setUp() {
//     //set up brick rows and columns
//     for (let c = 0; c < this.brickColumnCount; c++) {
//       this.bricks[c] = [];
//       for (let r = 0; r < this.brickRowCount; r++) {
//         this.bricks[c][r] = {
//           x: 0,
//           y: 0,
//           health: 3,
//         };
//       }
//     }
//   }
//   updateStage(rows, cols) {
//     //change number of rows and columns
//     this.brickRowCount = rows;
//     this.brickColumnCount = cols;
//   }
//   drawBricks() {
//     //draw brick rows and colums on canvas
//     for (let c = 0; c < this.brickColumnCount; c++) {
//       for (let r = 0; r < this.brickRowCount; r++) {
//         if (this.bricks[c][r].health > 0) {
//           let brickX =
//             r * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
//           let brickY =
//             c * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
//           this.bricks[c][r].x = brickX;
//           this.bricks[c][r].y = brickY;
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
//           if (this.bricks[c][r].health === 3) {
//             ctx.fillStyle = itemColor;
//           } else if (this.bricks[c][r].health === 2) {
//             ctx.fillStyle = brokenColor1;
//           } else {
//             ctx.fillStyle = brokenColor2;
//           }
//           ctx.fill();
//           ctx.closePath();
//         }
//       }
//     }
//   }
// }
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

///////////////////////////////////////////////////

///////////////////////////////////////////////////

///////////////////////////////////////////////////
let myModule = {
  myProperty: 200,

  myConfig: {
    useCaching: true,
    lang: "en",
  },

  myMethod: function () {
    console.log(this);
  },

  reportConfig: function () {
    console.log(
      `Caching is ${this.myConfig.useCaching ? "enabled" : "disabled"}`
    );
  },

  updateConfig: function (newConfig) {
    if (typeof newConfig === "object") {
      this.myConfig = newConfig;
      console.log(`Updated to ${this.myConfig.lang}`);
    }
  },
};

//one can use also JSON for storing config data (simpler storage to send to backend), it is a subset of object literal notation
let myObjectLiteralApp = {
  //function
  getInfo: function () {
    console.log("getInfo");
  },
  //populate with more object namespaces
  models: {},
  views: {
    pages: {},
  },
  collections: {},

  myConfig: {
    language: "en-US",
    defaults: {
      enableSharing: false,
      maxNum: 20,
    },
    theme: {
      color: "red",
      toolbars: {
        index: "ui-nav-toolbar",
        pages: "ui-custom-toolbar",
      },
    },
  },
};

myModule.myMethod();
myModule.reportConfig();
myModule.updateConfig({
  useCaching: false,
  lang: "fr",
});
myModule.reportConfig();
var global = "global";
(function () {
  let message = "IIFE";
  console.log(message);
  console.log(Window);
})();
///////////////////////////////////////////////////

///////////////////////////////////////////////////

///////////////////////////////////////////////////

//display start screen on page load
displayScreen("startDisplay");
