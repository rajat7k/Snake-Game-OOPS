function init() {
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 750;
    pen = canvas.getContext('2d');
    cs = 40;
    gameOver = false;


    food_img = new Image();
    food_img.src = "apple.png";

    food = getRandowmFood();
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "Right",
        createSnake: function() {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        drawSnake: function() {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3);
            }
        },
        updateSnake: function() {
            console.log("Updating snake");
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (food.x == headX && food.y == headY) {
                food = getRandowmFood();
            } else {
                this.cells.pop();
            }

            var X, Y;
            if (this.direction == "Up") {
                X = headX;
                Y = headY - 1;
            } else if (this.direction == "Down") {
                X = headX;
                Y = headY + 1;
            } else if (this.direction == "Left") {
                X = headX - 1;
                Y = headY;
            } else {
                X = headX + 1;
                Y = headY;
            }
            this.cells.unshift({ x: X, y: Y });
            var lastX = this.cells[0].x;
            var lastY = this.cells[0].y;
            if (lastX < 0 || lastY < 0 || lastX > W / cs || lastY > H / cs) {
                gameOver = true;
            }
        }
    };
    snake.createSnake();

    function keyPressed(e) {
        console.log("KEY pResend", e);
        if (e.key == "ArrowUp") {
            snake.direction = "Up";
        } else if (e.key == "ArrowDown") {
            snake.direction = "Down";
        } else if (e.key == "ArrowRight") {
            snake.direction = "Right";
        } else {
            snake.direction = "Left";
        }
    }

    document.addEventListener('keydown', keyPressed)
}

function draw() {
    // erase canvas
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
}

function update() {
    snake.updateSnake();
}

function getRandowmFood() {
    foodX = Math.round(Math.random() * (W - cs) / cs);
    foodY = Math.round(Math.random() * (H - cs) / cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }
    return food;
}

function gameloop() {
    if (gameOver == true) {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();

}
init();
var f = setInterval(gameloop, 200);