let scope = document.querySelector(".scope"); //地圖
let keydownL; //鍵盤監聽
let snake; //蛇頭
let snakeBody; //吃到worm後增加的蛇身
let snakeBodys = []; //蛇身div 每個座標會跟著前方
let worm; //吃的目標 蟲
let towards; //行走方向的執行
let toward = "right"; //行走方向
let speed = 50; //蛇行走速度
let moveEnd = true; //是否監聽到後移動完畢
//每個點的座標，預設初始三個座標

let position = [
  [8, 0],
  [4, 0],
  [0, 0],
];
//預設頭的座標
let x = 8,
  y = 0;

let init = () => {
  x = 8;
  y = 0;
  if (snake) {
    snake.remove();
  }
  if (snakeBody) {
    snakeBody.remove();
  }
  if (worm) {
    worm.remove();
  }
  if (snakeBodys) {
    for (let i = 0; i < snakeBodys.length; i++) {
      snakeBodys[i].remove();
    }
  }
  snakeBodys = [];
  clearInterval(towards);
  document.removeEventListener("keydown", keydownL);
  towards = null;
  toward = "right";
  speed = 50;
  position = [
    [8, 0],
    [4, 0],
    [0, 0],
  ];
};
let growUp = () => {
  snakeBody = document.createElement("div");
  snakeBody.classList.add("snakeBody");
  switch (toward) {
    case "right":
      position.push([
        position[position.length - 1][0] - 4,
        position[position.length - 1][1],
      ]);
      break;
    case "left":
      position.push([
        position[position.length - 1][0] + 4,
        position[position.length - 1][1],
      ]);
      break;
    case "up":
      position.push([
        position[position.length - 1][0],
        position[position.length - 1][1] + 4,
      ]);
      break;
    case "down":
      position.push([
        position[position.length - 1][0],
        position[position.length - 1][1] - 4,
      ]);
      break;
    default:
      break;
  }

  snakeBody.style.left = `${position[position.length - 1][0]}%`;
  snakeBody.style.top = `${position[position.length - 1][1]}%`;
  snakeBodys.push(snakeBody);
  scope.appendChild(snakeBody);
  console.log(position.length - 3);
};
let eat = () => {
  if (
    worm &&
    snake.style.left == worm.style.left &&
    snake.style.top == worm.style.top
  ) {
    worm.remove();
    newWorm();
    growUp();
    // speed -= 1;//加速
  }
};
let die = () => {
  let snakeX = Number(snake.style.left.slice(0, snake.style.left.length - 1));
  let snakeY = Number(snake.style.top.slice(0, snake.style.top.length - 1));

  for (let i = 1; i < position.length; i++) {
    if (snakeX == position[i][0] && snakeY == position[i][1]) {
      console.log("死亡");
      end();
    }
  }
};

let moveRight = () => {
  eat();
  if (x < 96) {
    x += 4;
  } else {
    x = 0;
  }
  snake.style.left = `${x}%`;
  for (let i = 0; i < snakeBodys.length; i++) {
    snakeBodys[i].style.left = `${position[i][0]}%`;
    snakeBodys[i].style.top = `${position[i][1]}%`;
  }
  for (let i = position.length - 1; i >= 0; i--) {
    if (i > 0) {
      position[i][0] = position[i - 1][0];
      position[i][1] = position[i - 1][1];
    } else {
      position[0][0] = x;
    }
  }
  die();
  moveEnd = true;
};
let moveLeft = () => {
  eat();
  if (x > 0) {
    x -= 4;
  } else {
    x = 96;
  }
  snake.style.left = `${x}%`;
  for (let i = 0; i < snakeBodys.length; i++) {
    snakeBodys[i].style.left = `${position[i][0]}%`;
    snakeBodys[i].style.top = `${position[i][1]}%`;
  }
  for (let i = position.length - 1; i >= 0; i--) {
    if (i > 0) {
      position[i][0] = position[i - 1][0];
      position[i][1] = position[i - 1][1];
    } else {
      position[0][0] = x;
    }
  }
  die();
  moveEnd = true;
};
let moveUp = () => {
  eat();
  if (y > 0) {
    y -= 4;
  } else {
    y = 96;
  }
  snake.style.top = `${y}%`;
  for (let i = 0; i < snakeBodys.length; i++) {
    snakeBodys[i].style.left = `${position[i][0]}%`;
    snakeBodys[i].style.top = `${position[i][1]}%`;
  }
  for (let i = position.length - 1; i >= 0; i--) {
    if (i > 0) {
      position[i][0] = position[i - 1][0];
      position[i][1] = position[i - 1][1];
    } else {
      position[0][1] = y;
    }
  }
  die();
  moveEnd = true;
};
let moveDown = () => {
  eat();
  if (y < 96) {
    y += 4;
  } else {
    y = 0;
  }
  snake.style.top = `${y}%`;
  for (let i = 0; i < snakeBodys.length; i++) {
    snakeBodys[i].style.left = `${position[i][0]}%`;
    snakeBodys[i].style.top = `${position[i][1]}%`;
  }
  for (let i = position.length - 1; i >= 0; i--) {
    if (i > 0) {
      position[i][0] = position[i - 1][0];
      position[i][1] = position[i - 1][1];
    } else {
      position[0][1] = y;
    }
  }
  die();
  moveEnd = true;
};

let newWorm = () => {
  let overlapping = true;
  let wormX = Math.floor(Math.random() * 25) * 4;
  let wormY = Math.floor(Math.random() * 25) * 4;

  while (overlapping) {
    overlapping = false;
    for (let i = 0; i < position.length; i++) {
      if (position[i][0] == wormX && position[i][1] == wormY) {
        overlapping = true;
        // console.log("重複");
        // clearInterval(towards);
        // document.removeEventListener("keydown", keydownL);
        // console.log(wormX, wormY);
        // console.log(position);
      }
    }
    if (overlapping) {
      wormX = Math.floor(Math.random() * 25) * 4;
      wormY = Math.floor(Math.random() * 25) * 4;
    }
  }
  let newWorm = document.createElement("div");
  newWorm.classList.add("worm");
  //   newWorm.style.top = 0;
  newWorm.style.top = `${wormY}%`;
  newWorm.style.left = `${wormX}%`;
  scope.appendChild(newWorm);
  worm = document.querySelector(".worm");
};
let newSnack = () => {
  snake = document.createElement("div");
  snake.classList.add("snake");
  snake.style.left = "8%";
  scope.appendChild(snake);
  snakeBody = document.createElement("div");
  snakeBody.classList.add("snakeBody");
  snakeBody.style.left = `${position[0][0]}%`;
  snakeBody.style.top = "0";
  snakeBodys.push(snakeBody);
  scope.appendChild(snakeBody);
  snakeBody = document.createElement("div");
  snakeBody.classList.add("snakeBody");
  snakeBody.style.left = `${position[1][0]}%`;
  snakeBody.style.top = "0";
  snakeBodys.push(snakeBody);
  scope.appendChild(snakeBody);
};
keydownL = (e) => {
  switch (e.key) {
    case "ArrowRight":
      if (!moveEnd) {
        break;
      }
      moveEnd = false;
      if (toward == "left") {
        break;
      }
      toward = "right";
      clearInterval(towards);
      towards = setInterval(moveRight, speed);
      break;
    case "ArrowLeft":
      if (!moveEnd) {
        break;
      }
      moveEnd = false;
      if (toward == "right") {
        break;
      }
      toward = "left";
      clearInterval(towards);
      towards = setInterval(moveLeft, speed);
      break;
    case "ArrowUp":
      if (!moveEnd) {
        break;
      }
      moveEnd = false;
      if (toward == "down") {
        break;
      }
      toward = "up";
      clearInterval(towards);
      towards = setInterval(moveUp, speed);
      break;
    case "ArrowDown":
      if (!moveEnd) {
        break;
      }
      moveEnd = false;
      if (toward == "up") {
        break;
      }
      toward = "down";
      clearInterval(towards);
      towards = setInterval(moveDown, speed);
      break;
    default:
      break;
  }
};
let start = () => {
  init();
  newWorm();
  newSnack();
  document.addEventListener("keydown", keydownL);
  towards = setInterval(moveRight, speed);
  document.querySelector(".game1 .start").style.display = "none";
  document.querySelector(".game1 .pause").style.display = "block";
};
let pause = () => {
  clearInterval(towards);
  document.removeEventListener("keydown", keydownL);
  document.querySelector(".game1 .pause").style.display = "none";
  document.querySelector(".game1 .pause_cancel").style.display = "block";
};
let pauseCancel = () => {
  document.addEventListener("keydown", keydownL);
  switch (toward) {
    case "right":
      towards = setInterval(moveRight, speed);
      break;
    case "left":
      towards = setInterval(moveLeft, speed);
      break;
    case "up":
      towards = setInterval(moveUp, speed);
      break;
    case "down":
      towards = setInterval(moveDown, speed);
      break;
    default:
      break;
  }
  document.querySelector(".game1 .pause_cancel").style.display = "none";
  document.querySelector(".game1 .pause").style.display = "block";
};
let end = () => {
  clearInterval(towards);
  snake.style.backgroundColor = "red";
  document.removeEventListener("keydown", keydownL);
  document.querySelector(".game1 .pause_cancel").style.display = "none";
  document.querySelector(".game1 .pause").style.display = "none";
  document.querySelector(".game1 .start").style.display = "block";
};
