let canvasEl;
let feedbackEl;
let W;
let H;

const SCALE = 16;

const SNAKE_COLORS = [
  'red',
  'green',
  'blue',
  'cyan',
  'magenta',
];
const FOOD_COLOR = 'brown';
const GRID_COLOR = 'black';

const CELL_EMPTY = 0;
const CELL_SNAKE = 1;
const CELL_FOOD = 2;

export function setup(move) {
  feedbackEl = document.body.querySelector(".feedback");

  document.body.addEventListener("keydown", (ev) => {
    const key = ev.key;

    let dir;
    if (key === 'ArrowLeft') dir = { x: -1, y: 0 };
    else if (key === 'ArrowRight') dir = { x: 1, y: 0 };
    else if (key === 'ArrowUp') dir = { x: 0, y: -1 };
    else if (key === 'ArrowDown') dir = { x: 0, y: 1 };

    if (dir) {
      //console.warn(key, dir);
      move(dir);
    }
  });
}

export function updateFeedback(text) {
  feedbackEl.innerHTML = text;
}

export function updateBoard(st) {
  if (!canvasEl) {
    canvasEl = document.body.querySelector("canvas");
    W = st.w * SCALE;
    H = st.h * SCALE;
    canvasEl.setAttribute('width', W);
    canvasEl.setAttribute('height', H);
  }

  const ctx = canvasEl.getContext('2d');

  // clean
  ctx.clearRect(0, 0, W, H);

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // draw grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = GRID_COLOR;
  ctx.strokeRect(0, 0, W, H);

  // draw items (food)
  for (let x = 0; x < st.board.length; ++x) {
    const row = st.board[x];
    for (let y = 0; y < row.length; ++y) {
      const v = row[y];
      //if (v === CELL_EMPTY) continue;
      if (v !== CELL_FOOD) continue;
      ctx.fillStyle = (v === CELL_FOOD) ? FOOD_COLOR : SNAKE_COLORS[0];
      ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
    }
  }

  // draw snakes
  for (let snI = 0; snI < st.snakes.length; ++snI) {
    const snake = st.snakes[snI];
    ctx.lineWidth = SCALE / 2;
    ctx.strokeStyle = SNAKE_COLORS[snI];

    ctx.beginPath();
    for (let snBI = 0; snBI < snake.body.length; ++snBI) {
      let { x, y } = snake.body[snBI];
      x = (x + 0.5) * SCALE;
      y = (y + 0.5) * SCALE;
      if (snBI === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}
