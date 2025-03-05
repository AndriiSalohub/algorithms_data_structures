const floyd = (matrix) => {
  let n = matrix.length;
  let res = matrix.map((row) => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        res[i][j] = Math.min(res[i][j], res[i][k] + res[k][j]);
      }
    }
  }
  return res;
};

console.log(
  floyd([
    [0, Infinity, 3, Infinity],
    [2, 0, Infinity, Infinity],
    [Infinity, 7, 0, 1],
    [6, Infinity, Infinity, 0],
  ]),
);
