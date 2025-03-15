const log2 = (x) => Math.floor(Math.log2(x));

let currTime = 0;
let timeIn, timeOut, parents;

function dfs(u = 0, parent = 0, tree) {
  currTime++;
  timeIn[u] = currTime;
  parents[u][0] = parent;

  const logN = log2(tree.length - 1);
  for (let k = 1; k <= logN; k++) {
    parents[u][k] = parents[parents[u][k - 1]][k - 1];
  }

  for (const v of tree[u]) {
    if (v !== parent) {
      dfs(v, u, tree);
    }
  }

  currTime++;
  timeOut[u] = currTime;
}

function isUpper(u, v) {
  return timeIn[u] <= timeIn[v] && timeOut[u] >= timeOut[v];
}

function lca(u, v) {
  if (isUpper(u, v)) return u;
  if (isUpper(v, u)) return v;

  const logN = log2(parents.length - 1);
  for (let k = logN; k >= 0; k--) {
    if (!isUpper(parents[u][k], v)) {
      u = parents[u][k];
    }
  }
  return parents[u][0];
}
