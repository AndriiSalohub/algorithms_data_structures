class Dinic {
  constructor(vertices) {
    this.V = vertices;
    this.graph = Array(vertices)
      .fill()
      .map(() => Array(vertices).fill(0));
    this.level = Array(vertices).fill(-1);
    this.ptr = Array(vertices).fill(0);
  }

  addEdge(from, to, capacity) {
    this.graph[from][to] = capacity;
  }

  bfs(source, sink) {
    this.level.fill(-1);
    const queue = [source];
    this.level[source] = 0;

    for (let i = 0; i < queue.length; i++) {
      const u = queue[i];
      for (let v = 0; v < this.V; v++) {
        if (this.level[v] === -1 && this.graph[u][v] > 0) {
          this.level[v] = this.level[u] + 1;
          queue.push(v);
        }
      }
    }
    return this.level[sink] !== -1;
  }

  dfs(u, sink, flow) {
    if (u === sink) return flow;
    for (; this.ptr[u] < this.V; this.ptr[u]++) {
      const v = this.ptr[u];
      if (this.level[v] === this.level[u] + 1 && this.graph[u][v] > 0) {
        const pushed = this.dfs(v, sink, Math.min(flow, this.graph[u][v]));
        if (pushed > 0) {
          this.graph[u][v] -= pushed;
          this.graph[v][u] += pushed;
          return pushed;
        }
      }
    }
    return 0;
  }

  dinicMaxFlow(source, sink) {
    let maxFlow = 0;

    while (this.bfs(source, sink)) {
      this.ptr.fill(0);
      let flow;
      while ((flow = this.dfs(source, sink, Infinity)) > 0) {
        maxFlow += flow;
      }
    }

    return maxFlow;
  }
}
