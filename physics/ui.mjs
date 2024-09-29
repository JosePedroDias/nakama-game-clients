let canvasEl;
let W = 500 + 20;
let H = 400 + 20;

const SCALE = 10;

export function setup(move) {
  document.body.addEventListener("keydown", (ev) => {
    const key = ev.key;

    let dir = [0, 0];
    if (key === 'ArrowLeft') dir[0] = -1;
    if (key === 'ArrowRight') dir[0] = 1;
    else if (key === 'ArrowUp') dir[1] = -1;
    else if (key === 'ArrowDown') dir[1] = 1;

    if (dir) {
      //console.warn(key, dir);
      move({ b1: dir });
    }
  });
}

export function draw(bodies) {
  if (!canvasEl) {
    canvasEl = document.body.querySelector("canvas");
    canvasEl.setAttribute('width', W);
    canvasEl.setAttribute('height', H);
  }

  const ctx = canvasEl.getContext('2d');

  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(W/2, H/2);

  for (const b of Object.values(bodies)) {
    let x, y, w, h;
    w = b.d[0]*SCALE;
    h = b.d[1]*SCALE;
    x = b.p[0]*SCALE - w/2;
    y = b.p[1]*SCALE - h/2;
    //console.log(x, y, w, h, b.filled);
    if (b.filled) {
      ctx.fillRect(x, y, w, h);
    } else {
      ctx.strokeRect(x, y, w, h);
    }
  }

  ctx.restore();
}
