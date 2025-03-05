const getMaxValue = (a) => {
  const n = a.length;

  const d = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    d[i][i] = a[i];
  }

  console.log(d);

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      for (let k = i; k < j; k++) {
        d[i][j] = Math.max(
          d[i][j],
          d[i][k] + d[k + 1][j],
          d[i][k] * d[k + 1][j],
        );
      }
    }
  }

  console.log(d);

  return d[0][n - 1];
};

console.log(getMaxValue([1, 2, 3]));
