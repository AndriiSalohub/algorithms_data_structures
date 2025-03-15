const tree = [];
let visited, order, depths, first;

function dfs(v = 0, depth = 0) {
  visited[v] = true;
  order.push(v);
  depths.push(depth);
  for (const u of tree[v]) {
    if (!visited[u]) {
      dfs(u, depth + 1);
      order.push(v);
      depths.push(depth);
    }
  }
}

function prepare(n, edges) {
  visited = new Array(n).fill(false);
  order = [];
  depths = [];
  first = new Array(n).fill(null);

  for (let i = 0; i < n; i++) tree[i] = [];
  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  dfs();

  for (let i = 0; i < order.length; i++) {
    let v = order[i];
    if (first[v] === null) {
      first[v] = i;
    }
  }
}

function rmq(arr, left, right) {
  let minIndex = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] < arr[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

function lca(u, v) {
  let left = first[u],
    right = first[v];
  if (left > right) [left, right] = [right, left];
  let index = rmq(depths, left, right);
  return order[index];
}
