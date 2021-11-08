let width = screen.width;
let height = screen.height;

let size = 17;

// let rows = Math.floor(width / size);
// let cols = Math.floor(height / size);

let rows=200;
let cols=200;
let grid;
let nextgrid;

function setup() {
  createCanvas(width, height);
  grid = make2DArray(rows, cols);
//   nextgrid = make2DArray(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

function draw() {
  background(6, 215, 85);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == 1) {
        fill(255);
        stroke(255, 255, 255);
        let x = i * size;
        let y = j * size;
        rect(x, y, size -2, size-2);
      }
    }
  }

  nextgrid = make2DArray(rows, cols);
  calculation(rows, cols);
  grid = nextgrid;
  
}

function make2DArray(rows, cols) {
  var arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function calculation(rows, cols) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let neighBour = countNeighbour(i, j);
      if (grid[i][j] == 1) {
        if (neighBour == 2 || neighBour == 3) {
          nextgrid[i][j] = 1;
        } else {
          nextgrid[i][j] = 0;
        }
      } else {
        if (neighBour == 3) {
          nextgrid[i][j] = 1;
        } else {
          nextgrid[i][j] = 0;
        }
      }
    }
  }
}

function countNeighbour(x, y) {
  let cnt = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let row = (rows + x + i) % rows;
      let col = (cols + y + j) % rows;

      if (grid[row][col] == 1) {
        cnt++;
      }
    }
  }
  cnt -= grid[x][y];
  return cnt;
}
