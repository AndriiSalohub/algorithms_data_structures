// Реалізація за допомогою масиву
const initDSU = (n) => {
  const dsu = [];

  for (let i = 0; i < n; i++) {
    dsu[i] = i;
  }

  return dsu;
};

const find = (dsu, a) => {
  return dsu[a];
};

const union = (dsu, n, a, b) => {
  if (dsu[a] === dsu[b]) {
    return;
  }

  for (let i = 0; i < n; i++) {
    if (dsu[i] === dsu[a]) {
      dsu[i] = dsu[b];
    }
  }
};

// Реалізація за допомогоб пов'язаних списків
class Item {
  constructor(id) {
    this.id = id;
    this.head = this;
    this.tail = this;
    this.next = null;

    this.count = 1;
  }
}

const initDSULL = (n) => {
  const dsu = [];

  for (let i = 0; i < n; i++) {
    dsu.push(new Item(i));
  }

  return dsu;
};

const findLL = (a) => {
  return a.head.id;
};

const unionList = (a, b) => {
  a = a.head;
  b = b.head;

  if (a === b) {
    return;
  }

  if (b.count > a.count) {
    [a, b] = [b, a];
  }

  a.tail.next = b;
  a.tail = b.tail;

  a.count += b.count;

  while (b) {
    b.head = a;
    b = b.next;
  }
};
