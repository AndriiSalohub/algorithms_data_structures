class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.graph = Array(vertices)
      .fill()
      .map(() => Array(vertices).fill(0));
  }

  bfs(s, t, parent) {
    const visited = Array(this.V).fill(false);
    const queue = [];

    queue.push(s);
    visited[s] = true;
    parent[s] = -1;

    while (queue.length > 0) {
      const u = queue.shift();

      for (let v = 0; v < this.V; v++) {
        if (!visited[v] && this.graph[u][v] > 0) {
          if (v === t) {
            parent[v] = u;
            return true;
          }
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }
    return false;
  }

  fordFulkerson(source, sink) {
    let u, v;
    const parent = Array(this.V).fill(-1);
    let max_flow = 0;

    const rGraph = Array(this.V)
      .fill()
      .map((_, i) =>
        Array(this.V)
          .fill()
          .map((_, j) => this.graph[i][j]),
      );

    while (this.bfs(source, sink, parent)) {
      let path_flow = Infinity;

      for (v = sink; v !== source; v = parent[v]) {
        u = parent[v];
        path_flow = Math.min(path_flow, rGraph[u][v]);
      }

      for (v = sink; v !== source; v = parent[v]) {
        u = parent[v];
        rGraph[u][v] -= path_flow;
        rGraph[v][u] += path_flow;
      }

      max_flow += path_flow;
    }

    return max_flow;
  }

  addEdge(u, v, capacity) {
    this.graph[u][v] = capacity;
  }
}
