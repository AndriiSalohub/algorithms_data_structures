function createMatrix(n, m, defaultValue = null) {
  return Array.from({ length: n }, () => Array(m).fill(defaultValue));
}

function buildSparse(arr) {
  const n = arr.length;
  const m = Math.floor(Math.log2(n)) + 1;
  const sparse = createMatrix(n, m);

  for (let i = 0; i < n; i++) {
    sparse[i][0] = arr[i];
  }

  for (let j = 1; j < m; j++) {
    for (let i = 0; i < n; i++) {
      let i2 = i + (1 << (j - 1));
      let prevValue1 = sparse[i][j - 1];

      if (i2 >= n) {
        sparse[i][j] = prevValue1;
        continue;
      }

      let prevValue2 = sparse[i2][j - 1];
      sparse[i][j] = Math.min(prevValue1, prevValue2);
    }
  }

  return sparse;
}
