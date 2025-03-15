const log2 = (x) => Math.floor(Math.log2(x));

function preprocess(n, edges) {
  const depth = new Array(n + 1).fill(0);
  const parent = new Array(n + 1).fill(0);
  const logN = log2(n);
  const parents = Array.from({ length: n + 1 }, () => Array(logN + 1).fill(0));

  function dfs(node, par, d, adj) {
    parent[node] = par;
    depth[node] = d;
    for (const neighbor of adj[node]) {
      if (neighbor !== par) {
        dfs(neighbor, node, d + 1, adj);
      }
    }
  }

  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  dfs(1, 0, 0, adj);

  for (let v = 1; v <= n; v++) {
    parents[v][0] = parent[v];
  }

  for (let i = 1; i <= logN; i++) {
    for (let v = 1; v <= n; v++) {
      if (parents[v][i - 1] !== 0) {
        parents[v][i] = parents[parents[v][i - 1]][i - 1];
      }
    }
  }

  return { depth, parents };
}

function lca(v, u, depth, parents) {
  if (depth[v] > depth[u]) {
    [v, u] = [u, v];
  }

  const logN = parents[0].length - 1;

  for (let k = logN; k >= 0; k--) {
    if (depth[u] - depth[v] >= 1 << k) {
      u = parents[u][k];
    }
  }

  if (v === u) return v;

  for (let k = logN; k >= 0; k--) {
    if (parents[v][k] !== parents[u][k]) {
      v = parents[v][k];
      u = parents[u][k];
    }
  }

  return parents[v][0];
}
