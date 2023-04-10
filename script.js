let canvas;
let tile = 10;
let headX = 50, headY = 50;
let snake = [];
let directionX = 0, directionY = 0;
let foodX, foodY;
let intervalUpdate;

window.onload = function () {
    board = document.getElementById("canvas");
    board.height = 300;
    board.width = 300;
    canvas = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    intervalUpdate = setInterval(updateBoard, 200);
}

function updateBoard() {
    //updateBoard
    canvas.fillStyle = "beige";
    canvas.fillRect(0, 0, board.width, board.height);   

    //update Food
    canvas.fillStyle = "red";
    canvas.fillRect(foodX, foodY, tile, tile);

    //updateSnake
    updateSnake();

    //check if snake eats food
    if (headX === foodX && headY === foodY) {
        snake.push([foodX,foodY]);
        updateSnake();
        placeFood();
    }

    //check if snake hits itself or wall
    checkCollision();   
}

function checkCollision() {
    if (headX < 0 || headY < 0 || headX > board.height || headY > board.height) {
        gameOver();
    }    
    for (let i = 2; i < snake.length; i++) {
        if (headX == snake[i][0] && headY == snake[i][1]) {
            gameOver();
        }    
    }        
}

function updateSnake() {
    canvas.fillStyle = "green";
    headX += directionX;
    headY += directionY;
    snake[0] = [headX, headY];
    for (let i = 0; i < snake.length; ++i) {
            canvas.fillRect(snake[i][0], snake[i][1], tile, tile);
    }  
    for (let i = snake.length - 1; i > 0; --i) {
        snake[i] = snake[i - 1]; 
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * 30) * 10;
    foodY = Math.floor(Math.random() * 30) * 10;   
    for(let i = 0; i < snake.length; ++i) {
        for (let j = 0; j < 2; ++j) {
            if(foodX == snake[i][j]) {
                foodX = Math.floor(Math.random() * 30) * 10;
            } else if (foodY == snake[i][j]) {
                foodY = Math.floor(Math.random() * 30) * 10;
            }
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && directionY != 10) {
        directionX = 0;
        directionY = -10;
    }
    else if (e.code == "ArrowDown" && directionY != -10) {
        directionX = 0;
        directionY = 10;
    }
    else if (e.code == "ArrowLeft" && directionX != 10) {
        directionX = -10;
        directionY = 0;
    }
    else if (e.code == "ArrowRight" && directionX != -10) {
        directionX = 10;
        directionY = 0;
    }
    updateBoard();
} 

function gameOver() {
    clearInterval(intervalUpdate);
    alert("GAME OVER");
    document.getElementById("end").innerHTML += `
    <button type="button" class="btn btn-dark" onclick="location.reload()">Play again</button>`;
}