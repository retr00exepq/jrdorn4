//keep track of variables for canvas and canvas elements
export class Vars {
  constructor() {
    //score and lives
    this.myScore = document.querySelector("#score");
    this.myLives = document.querySelector("#hearts");

    //render canvas
    this.canvas = document.querySelector("canvas");
    this.canvas.width = 400;
    this.canvas.height = 250;
    this.ctx = this.canvas.getContext("2d");

    //color scheme
    this.itemColor = "#6c9950"; //green
    this.brokenColor1 = "#509199"; //xxxx to display when brick hit twice
    this.brokenColor2 = "#7D5099"; //xxxx to display when brick hit twice

    //paddle
    this.paddleHeight = 10;
    this.paddleWidth = 60;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2; // x coordinates of paddle
    this.rightPressed = false;
    this.leftPressed = false;

    //ball
    this.ballRadius = 15;
    this.x = this.canvas.width / 2; //x coordinates of ball
    this.y = this.canvas.height - 30; //y coordinates of ball
    this.dx = 3;
    this.dy = -3;
  }
}
