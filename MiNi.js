const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{x: 9*box, y: 10*box}];
let direction;
let food = {
  x: Math.floor(Math.random()*19+1) * box,
  y: Math.floor(Math.random()*19+1) * box
};

document.addEventListener("keydown", setDirection);
function setDirection(event) {
  if(event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
  else if(event.keyCode == 38 && direction != "DOWN") direction = "UP";
  else if(event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
  else if(event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 400, 400);

  for(let i=0; i<snake.length; i++) {
    ctx.fillStyle = (i==0) ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == "LEFT") snakeX -= box;
  if(direction == "UP") snakeY -= box;
  if(direction == "RIGHT") snakeX += box;
  if(direction == "DOWN") snakeY += box;

  if(snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random()*19+1) * box,
      y: Math.floor(Math.random()*19+1) * box
    };
  } else {
    snake.pop();
  }

  let newHead = {x: snakeX, y: snakeY};
  snake.unshift(newHead);
}

setInterval(draw, 100);

// Searchable list
document.getElementById("searchBox").addEventListener("keyup", function() {
  let filter = this.value.toLowerCase();
  let items = document.querySelectorAll("#list li");
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(filter) ? "" : "none";
  });
});
