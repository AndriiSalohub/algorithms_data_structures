const n = 8;
const graph = [
  [[4, 2]],
  [
    [0, 1],
    [2, 1],
    [4, 4],
    [5, 3],
  ],
  [[5, 1]],
  [],
  [
    [3, 3],
    [7, 1],
  ],
  [
    [3, 5],
    [6, 2],
  ],
  [[3, 2]],
  [[3, 1]],
];

const shortestReliablePaths = (s, t, k) => {
  const d = Array.from({ length: n }, () => Array(k + 1).fill(Infinity));
  d[s][0] = 0;

  for (let m = 0; m < k; m++) {
    for (let v1 = 0; v1 < n; v1++) {
      for (const [v2, w] of graph[v1]) {
        d[v2][m + 1] = Math.min(d[v2][m + 1], d[v1][m] + w);
      }
    }
  }

  return Math.min(...d[t]);
};

console.log(shortestReliablePaths(0, 4, 3));
