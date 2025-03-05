const createMatrix = (rows, cols, defaultValue) => {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = Array(cols).fill(defaultValue);
  }

  return matrix;
};

const lcsLength = (x, y) => {
  const n = x.length;
  const m = y.length;

  const length = createMatrix(n + 1, m + 1, 0);
  const arrows = createMatrix(n + 1, m + 1, "top");

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (x[i - 1] === y[j - 1]) {
        length[i][j] = length[i - 1][j - 1] + 1;
        arrows[i][j] = "diag";
      } else if (length[i - 1][j] >= length[i][j - 1]) {
        length[i][j] = length[i - 1][j];
        arrows[i][j] = "top";
      } else {
        length[i][j] = length[i][j - 1];
        arrows[i][j] = "left";
      }
    }
  }

  return length[n][m];
};

const x = "ABCBDAB";
const y = "BDCAB";
const length = lcsLength(x, y);
console.log("Length of LCS:", length);
