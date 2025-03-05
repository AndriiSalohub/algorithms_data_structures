const graphReversed = {
  0: [],
  1: [0],
  2: [0, 1],
  3: [2],
};

const n = Object.keys(graphReversed).length;

const countPaths = (s, t) => {
  const d = Array(n).fill(null);
  d[s] = 1;
  return countRec(d, t);
};

const countRec = (d, v) => {
  if (d[v] !== null) {
    return d[v];
  }

  let result = 0;
  for (const u of graphReversed[v]) {
    result += countRec(d, u);
  }

  d[v] = result;
  return result;
};

console.log(countPaths(0, 2));
