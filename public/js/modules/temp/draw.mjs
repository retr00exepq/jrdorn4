//Draw game components (paddle, ball, lives, score)
export function draw(myBricks, myGame, canvas, ctx, x, y, itemColor) {
  //local variables
  const paddleHeight = 10;
  const paddleWidth = 60;
  let paddleX = (canvas.width - paddleWidth) / 2;
  const myScore = document.querySelector("#score");
  const myLives = document.querySelector("#hearts");

  //draw ball on canvas
  function drawBall() {
    let img = new Image();
    img.src = "img/ball.png";
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

  //
  //sound effects
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