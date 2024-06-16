//Selction & Declaring variables for each task
let canvas = document.getElementById("gameCanvas");
let scoreNum = document.querySelector("#score");
let context = canvas.getContext("2d");
let snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
let food;
let direction = "right";
let gameState = true;
let score = 1;
let snakeSpeed = 200; //millisecond
let lastMoveTime = 0;
const img = new Image();
img.src = "start.png";

img.onload = function () {
  context.drawImage(img, 150, 150, 100, 100);
};

//Randomly placing food
function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
  };
}

//Snake Body
function snakeBody() {
  context.fillStyle = "green";
  snake.forEach((segment) => {
    context.fillRect(segment.x, segment.y, 10, 10);
  });
}

//Food Drawing
function foodDraw() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, 10, 10);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snakeBody();
  foodDraw();
}

// Snake Move
function moveSnake() {
  let head = { ...snake[0] };

  //updating the head position
  if (direction === "right") head.x += 10;
  else if (direction === "left") head.x -= 10;
  else if (direction === "up") head.y -= 10;
  else if (direction === "down") head.y += 10;

  //Adding the new head to snake
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    placeFood();
    scoreNum.innerHTML = score++;
    console.log(score);
  } else {
    snake.pop();
  }
}

function handleUserInput(event) {
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
  else if (event.key === "ArrowLeft" && direction !== "right")
    direction = "left";
  else if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  else if (event.key === "ArrowDown" && direction !== "up") direction = "down";
}

//Game Over Function
function checkCollision() {
  let head = snake[0];

  //check collison with the walls
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    gameState = false;
  }

  //checking collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameState = false;
    }
  }
}

function gameLoop(timeStamp) {
  console.log(timeStamp);
  if (gameState) {
    if (timeStamp - lastMoveTime > snakeSpeed) {
      moveSnake();
      draw();
      checkCollision();
      lastMoveTime = timeStamp;
    }
    requestAnimationFrame(gameLoop);
  } else {
    alert("Game over!!");
  }
}

//Start the Game Loop when canvas is clicked
canvas.addEventListener("click", () => {
  if (gameState) {
    requestAnimationFrame(gameLoop);
  }
});

placeFood();
document.addEventListener("keydown", handleUserInput);
