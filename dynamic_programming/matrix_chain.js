const createMatrix = (height, width, defaultValue = null) => {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(defaultValue));
};

const matrixMultiply = (a, b) => {
  if (!a || !b || a.length === 0 || b.length === 0) {
    console.log("Error: one of the matrices is empty");
    return;
  }

  const aHeight = a.length,
    aWidth = a[0].length;
  const bHeight = b.length,
    bWidth = b[0].length;

  if (aWidth !== bHeight) {
    console.log("Error: incompatible matrix dimensions");
    return;
  }

  const result = createMatrix(aHeight, bWidth, 0);

  for (let i = 0; i < aHeight; i++) {
    for (let j = 0; j < bWidth; j++) {
      for (let k = 0; k < aWidth; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
};

const matrixChainOrder = (count, sizes) => {
  const m = createMatrix(count, count);
  const s = createMatrix(count, count);

  for (let i = 0; i < count; i++) {
    m[i][i] = 0;
  }

  for (let chainLength = 2; chainLength <= count; chainLength++) {
    for (let i = 0; i < count - chainLength + 1; i++) {
      const j = i + chainLength - 1;
      m[i][j] = Infinity;

      for (let k = i; k < j; k++) {
        const q =
          m[i][k] + m[k + 1][j] + sizes[i] * sizes[k + 1] * sizes[j + 1];

        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }

  return [m, s];
};

const printOptimalBrackets = (s, i, j) => {
  if (i === j) {
    console.log(` A${i} `);
  } else {
    console.log("(");
    printOptimalBrackets(s, i, s[i][j]);
    printOptimalBrackets(s, s[i][j] + 1, j);
    console.log(")");
  }
};
