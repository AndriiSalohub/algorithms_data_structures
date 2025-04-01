class BlossomAlgorithm {
  constructor(n, graph) {
    this.n = n;
    this.graph = graph;
    this.match = Array(n).fill(null);
    this.parents = Array(n).fill(null);
    this.base = Array.from({ length: n }, (_, i) => i);
  }

  lca(v, u) {
    const visited = Array(this.n).fill(false);
    while (true) {
      v = this.base[v];
      visited[v] = true;
      if (this.match[v] === null) break;
      v = this.parents[this.match[v]];
    }
    while (true) {
      u = this.base[u];
      if (visited[u]) return u;
      u = this.parents[this.match[u]];
    }
  }

  markPath(v, b, children, blossom) {
    while (this.base[v] !== b) {
      const w = this.match[v];
      blossom[this.base[v]] = blossom[this.base[w]] = true;
      this.parents[v] = children;
      children = w;
      v = this.parents[w];
    }
  }

  findPath(root) {
    this.parents.fill(null);
    this.base = Array.from({ length: this.n }, (_, i) => i);
    const used = Array(this.n).fill(false);
    const queue = [root];
    used[root] = true;

    while (queue.length > 0) {
      const v = queue.shift();
      for (const u of this.graph[v]) {
        if (this.base[v] === this.base[u] || this.match[v] === u) continue;

        if (
          u === root ||
          (this.match[u] !== null && this.parents[this.match[u]] !== null)
        ) {
          const curBase = this.lca(v, u);
          const blossom = Array(this.n).fill(false);
          this.markPath(v, curBase, u, blossom);
          this.markPath(u, curBase, v, blossom);

          for (let i = 0; i < this.n; i++) {
            if (blossom[this.base[i]]) {
              this.base[i] = curBase;
              if (!used[i]) {
                used[i] = true;
                queue.push(i);
              }
            }
          }
        } else if (this.parents[u] === null) {
          this.parents[u] = v;
          if (this.match[u] === null) return u;
          used[this.match[u]] = true;
          queue.push(this.match[u]);
        }
      }
    }
    return null;
  }

  edmonds() {
    for (let r = 0; r < this.n; r++) {
      if (this.match[r] === null) {
        let v = this.findPath(r);
        while (v !== null) {
          const parent = this.parents[v];
          const nextV = this.match[parent];
          this.match[v] = parent;
          this.match[parent] = v;
          v = nextV;
        }
      }
    }
    return this.match;
  }
}

const graph = [
  [1, 2],
  [0, 2, 3],
  [0, 1, 3],
  [1, 2, 4, 5],
  [3, 5],
  [3, 4],
];
const blossom = new BlossomAlgorithm(6, graph);
console.log(blossom.edmonds());
