class snakeNode {
  next;
  x;
  y;

  constructor(next, x, y) {
    this.next = next;
    this.x = x;
    this.y = y;
  }
}

class Game {
  matriz;
  snakeLength = 5;
  canvasSize = 40;
  direction = "right";
  head = { x, y };
  tail = { x, y };
  gameContext;
  snake;

  constructor() {
    this.canvas = document.getElementById("game");
    this.gameContext = this.canvas.getContext("2d");
    let arr = [];
    for (let i = 0; i < this.canvasSize; i++) {
      arr[i] = [false];
    }
    this.matriz = arr;
    for (let i = 0; i < this.snakeLength; i++) {
      this.matriz[this.coordX - i][this.coordY] = true;
    }
    console.log(this.matriz);
  }

  snakeNode = {};

  increaseDirection() {
    switch (this.direction) {
      case "up":
        this.coordY--;
        break;
      case "down":
        this.coordY++;
        break;
      case "left":
        this.coordX--;
        break;
      case "right":
        this.coordX++;
        break;
      default:
        break;
    }
  }

  drawSnake() {
    this.gameContext.fillStyle = "green";
    this.matriz[this.tailX][this.tailY] = false;
    this.matriz[this.coordX][this.coordY] = true;

    this.gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.matriz.length; i++) {
      for (let j = 0; j < this.matriz[i].length; j++) {
        if (this.matriz[i][j]) {
          this.gameContext.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }
  }

  controlator = () => {
    document.addEventListener("keyup", (event) => {
      console.log();
      switch (event.keyCode) {
        case 38:
          this.direction = "up";
          break;
        case 37:
          this.direction = "left";
          break;
        case 39:
          this.direction = "right";
          break;
        case 40:
          this.direction = "down";
          break;
        default:
          break;
      }
    });
  };

  init() {
    this.controlator();
    setInterval(() => {
      this.increaseDirection();
      this.drawSnake();
    }, 1000);
  }
}

const game = new Game();
game.init();
