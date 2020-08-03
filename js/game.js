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

  constructor() {
    this.canvas = document.getElementById("game");
    this.gameContext = this.canvas.getContext("2d");
    this.tail = new SnakeNode(16, 20);
    this.head = this.tail;

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
    this.gameContext.fillStyle = "green";
    this.gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

  gameOver() {}

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
