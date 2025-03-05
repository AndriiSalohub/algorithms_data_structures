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

const n = graph.length;

const dfs = (v, ts, visited, graph) => {
  visited[v] = true;

  for (const [u, w] of graph[v]) {
    if (!visited[u]) {
      dfs(u, ts, visited, graph);
    }
  }

  ts.push(v);
};

const topologicSort = (graph) => {
  let ts = [];
  let visited = new Array(n).fill(false);

  for (let v = 0; v < n; v++) {
    if (!visited[v]) {
      dfs(v, ts, visited, graph);
    }
  }

  ts.reverse();
  return ts;
};

const minDistance = (u, v) => {
  let d = new Array(n).fill(Infinity);
  d[u] = 0;

  let ts = topologicSort(graph);

  for (let i = 0; i < ts.length; i++) {
    for (let [v1, w] of graph[ts[i]]) {
      d[v1] = Math.min(d[v1], d[ts[i]] + w);
    }
  }

  return d[v];
};

console.log(minDistance(1, 3));
