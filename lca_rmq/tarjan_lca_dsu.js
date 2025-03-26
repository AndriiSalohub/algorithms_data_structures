const dsu = [];
const ancestor = [];
const visited = [];
const tree = [];
const queries = [];

function dsuGet(v) {
  if (dsu[v] !== v) {
    dsu[v] = dsuGet(dsu[v]);
  }
  return dsu[v];
}

function dsuUnion(v, u) {
  v = dsuGet(v);
  u = dsuGet(u);
  if (Math.random() < 0.5) {
    [v, u] = [u, v];
  }
  dsu[v] = u;
  return u; // new representative
}

function dfs(v = 0) {
  visited[v] = true;
  dsu[v] = ancestor[v] = v;
  for (const w of tree[v]) {
    if (!visited[w]) {
      dfs(w);
      let leader = dsuUnion(v, w);
      ancestor[leader] = v;
    }
  }
  for (const u of queries[v]) {
    if (visited[u]) {
      console.log(v, u, "->", ancestor[dsuGet(u)]);
    }
  }
}
