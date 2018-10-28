import Snake from "./snake.js";
import Apple from "./apple.js";
import Drawing from "./drawing.js";

export default class Game {

    constructor() {

        this.canvasWidth = 900;
        this.canvasHeight = 600;
        this.blockSize = 30;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.widthInBlocks = this.canvasWidth / this.blockSize;
        this.heightInBlocks = this.canvasHeight / this.blockSize;
        this.centreX = this.canvasWidth / 2;
        this.centreY = this.canvasHeight / 2;
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.timeout;
    }

    init() {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "30px solid #554179";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "#2C132A";
        document.body.appendChild(this.canvas);
        this.launch();
    }

    launch() {

        this.snakee = new Snake("right", [6, 4], [5, 4], [4, 4]);
        this.applee = new Apple();
        this.score = 0;
        clearTimeout(this.timeout);
        this.delay = 200;
        this.refreshCanvas();

    }
    refreshCanvas() {

        this.snakee.advance();
        if (this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)) {
            Drawing.gameOver(this.ctx, this.centreX, this.centreY);
        } else {
            if (this.snakee.isEatingApple(this.applee)) {
                this.score++;
                this.snakee.eatApple = true;
                do {
                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);
                }
                while (this.applee.isOnSnake(this.snakee));

                if (this.score % 5 == 0) {
                    this.speedUp();
                }
            }
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            Drawing.drawScore(this.ctx, this.centreX, this.centreY, this.score);
            Drawing.drawSnake(this.ctx, this.blockSize, this.snakee);
            Drawing.drawApple(this.ctx, this.blockSize, this.applee);
            this.timeout = setTimeout(this.refreshCanvas.bind(this), this.delay);
        }

    }
    speedUp() {
        this.delay /= 2;
    }
}