const parents = Array.from({ length: n }, (_, i) => i);
const ranks = Array(n).fill(0);

const find = (a) => {
  let root = a;

  while (parents[root] !== root) {
    root = parents[root];
  }

  let node = a;
  while (parents[node] !== node) {
    let next = parents[node];
    parents[node] = root;
    node = next;
  }

  return root;
};

const union = (a, b) => {
  a = find(a);
  b = find(b);

  if (a === b) return;

  if (ranks[a] === ranks[b]) {
    ranks[a]++;
  }

  if (ranks[a] < ranks[b]) {
    parents[a] = b;
  } else {
    parents[b] = a;
  }
};
