class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.pathParent = null;
  }
}

function access(v) {
  if (!v) return;
  splay(v);
  if (v.right) {
    v.right.pathParent = v;
    v.right.parent = null;
    v.right = null;
  }
  let u = v;
  while (u.pathParent) {
    let w = u.pathParent;
    splay(w);
    w.right = u;
    u.parent = w;
    u.pathParent = null;
    splay(v);
    u = w;
  }
}

function splay(x) {
  while (x.parent) {
    let p = x.parent;
    let g = p.parent;
    if (!g) {
      rotate(x);
    } else if ((g.left === p) === (p.left === x)) {
      rotate(p);
      rotate(x);
    } else {
      rotate(x);
      rotate(x);
    }
  }
}

function rotate(x) {
  let p = x.parent;
  if (!p) return;
  let g = p.parent;
  if (p.left === x) {
    p.left = x.right;
    if (x.right) x.right.parent = p;
    x.right = p;
  } else {
    p.right = x.left;
    if (x.left) x.left.parent = p;
    x.left = p;
  }
  p.parent = x;
  x.parent = g;
  if (g) {
    if (g.left === p) g.left = x;
    else g.right = x;
  }
}

function link(v, u) {
  v.pathParent = u;
  access(v);
}

function cut(v, u) {
  access(u);
  if (v.pathParent === u) {
    v.pathParent = null;
  }
  access(v);
}

function findRoot(v) {
  access(v);
  while (v.left) {
    v = v.left;
  }
  return v;
}

function lca(v, u) {
  access(v);
  access(u);
  splay(v);
  return v.pathParent;
}
