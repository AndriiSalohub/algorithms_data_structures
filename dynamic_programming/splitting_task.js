function createMatrix(rows, cols, defaultValue) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = Array(cols).fill(defaultValue);
  }
  return matrix;
}

function findPartition(s, k) {
  const n = s.length;
  const values = createMatrix(n + 1, k + 1, 0);
  const delims = createMatrix(n + 1, k + 1, 0);
  const p = Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    p[i] = p[i - 1] + s[i - 1];
    values[i][1] = p[i];
  }

  for (let j = 1; j <= k; j++) {
    values[1][j] = s[0];
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 2; j <= k; j++) {
      values[i][j] = Infinity;
      for (let x = 1; x < i; x++) {
        const newValue = Math.max(values[x][j - 1], p[i] - p[x]);
        if (newValue < values[i][j]) {
          values[i][j] = newValue;
          delims[i][j] = x;
        }
      }
    }
  }

  return delims;
}

function reconstruct(delims, s, n, k) {
  if (k === 1) {
    console.log(s.slice(0, n).join(", "));
  } else {
    const delim = delims[n][k];
    reconstruct(delims, s, delim, k - 1);
    console.log(s.slice(delim, n).join(", "));
  }
}

const s = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const k = 3;
const delims = findPartition(s, k);
reconstruct(delims, s, s.length, k);
