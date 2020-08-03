class SnakeNode {
  next;
  x;
  y;

  constructor(x, y, next = null) {
    this.next = next;
    this.x = x;
    this.y = y;
  }
}

class Game {
  snakeLength = 4;
  canvasSize = 40;
  direction = "right";
  head;
  tail;
  gameContext;
  time;
  food;

  constructor() {
    this.canvas = document.getElementById("game");
    this.gameContext = this.canvas.getContext("2d");
    this.tail = new SnakeNode(16, 20);
    this.head = this.tail;
    this.food = { x: 4, y: 6 };

    for (let i = 0; i < this.snakeLength; i++) {
      let nHead = new SnakeNode(this.head.x + 1, this.head.y);
      this.head.next = nHead;
      this.head = nHead;
    }
  }

  increaseDirection() {
    let newHead;
    switch (this.direction) {
      case "up":
        newHead = new SnakeNode(this.head.x, this.head.y - 1);
        break;
      case "down":
        newHead = new SnakeNode(this.head.x, this.head.y + 1);
        break;
      case "left":
        newHead = new SnakeNode(this.head.x - 1, this.head.y);
        break;
      case "right":
        newHead = new SnakeNode(this.head.x + 1, this.head.y);
        break;
      default:
        break;
    }
    this.tail = this.tail.next;
    this.head.next = newHead;
    this.head = newHead;
  }

  drawSnake() {
    this.gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.gameContext.fillStyle = "red";
    this.gameContext.fillRect(this.food.x * 10, this.food.y * 10, 10, 10);

    this.gameContext.fillStyle = "green";

    this.gameContext.fillRect(0, 0, 10, 400);
    this.gameContext.fillRect(390, 0, 10, 400);
    this.gameContext.fillRect(0, 0, 400, 10);
    this.gameContext.fillRect(0, 390, 400, 10);

    this.gameContext.fillRect(this.tail.x * 10, this.tail.y * 10, 10, 10);
    let next = this.tail.next;
    while (next) {
      this.gameContext.fillRect(next.x * 10, next.y * 10, 10, 10);
      next = next.next;
    }
  }

  controlator = () => {
    const controller = (event) => {
      let active;
      switch (event.keyCode) {
        case 38:
          if (this.direction != "down") {
            this.direction = "up";
            active = true;
          }
          break;
        case 37:
          if (this.direction != "right") {
            this.direction = "left";
            active = true;
          }
          break;
        case 39:
          if (this.direction != "left") {
            this.direction = "right";
            active = true;
          }
          break;
        case 40:
          if (this.direction != "up") {
            this.direction = "down";
            active = true;
          }
          break;
        default:
          break;
      }

      if (active) {
        document.removeEventListener("keydown", controller, false);
      }
    };

    document.addEventListener("keydown", controller, false);
  };

  gameOver() {
    clearInterval(this.time);
    alert("game over");
  }

  calcColitions() {
    const colition =
      this.head.x === 0 ||
      this.head.x === 39 ||
      this.head.y === 0 ||
      this.head.y === 39;
    if (colition) {
      this.gameOver();
    }

    const eaten = this.head.x === this.food.x && this.head.y === this.food.y;
    if (eaten) {
      this.snakeLength++;
      this.generateFood();
    }
  }

  generateFood() {
    this.food.x = Math.floor(Math.random() * 37) + 1;
    this.food.y = Math.floor(Math.random() * 37) + 1;
  }

  init() {
    this.time = setInterval(() => {
      this.controlator();
      this.increaseDirection();
      this.calcColitions();
      this.drawSnake();
    }, 300);
  }
}

const game = new Game();
game.init();
