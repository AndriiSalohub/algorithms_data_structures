const warshall = (matrix) => {
  let n = matrix.length;
  let res = matrix.map((row) => [...row]);

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        res[i][j] = res[i][j] || (res[i][k] && res[k][j]);
      }
    }
  }
  return res;
};

console.log(
  warshall([
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [1, 0, 1, 0],
  ]),
);

console.log(
  warshall([
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 1],
    [0, 0, 0, 0],
  ]),
);

console.log(
  warshall([
    [0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
  ]),
);
