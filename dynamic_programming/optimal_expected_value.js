const createMatrix = (rows, cols, defaultValue) => {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = Array(cols).fill(defaultValue);
  }

  return matrix;
};

const optimalExpectedValue = (p, q) => {
  const n = p.length;
  const e = createMatrix(n + 2, n + 1, 0.0);
  const w = createMatrix(n + 2, n + 1, 0.0);
  const root = createMatrix(n + 1, n + 1, 0.0);

  for (let i = 1; i <= n + 1; i++) {
    e[i][i - 1] = q[i - 1];
    w[i][i - 1] = q[i - 1];
  }

  for (let l = 1; l <= n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      const j = i + l - 1;
      e[i][j] = Infinity;
      w[i][j] = w[i][j - 1] + p[j - 1] + q[j];
      for (let r = i; r <= j; r++) {
        const eNew = e[i][r - 1] + e[r + 1][j] + w[i][j];
        if (eNew < e[i][j]) {
          e[i][j] = eNew;
          root[i][j] = r;
        }
      }
    }
  }

  return e[1][n];
};

const p = [0.15, 0.1, 0.05];
const q = [0.05, 0.1, 0.2, 0.05];

const expectedValue = optimalExpectedValue(p, q);
console.log("Optimal Expected Value:", expectedValue);
