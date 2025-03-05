const fibRecursion = (n) => {
  if (n <= 1) {
    return n;
  }

  return fibRecursion(n - 1) + fibRecursion(n - 2);
};

console.log(fibRecursion(4));

const memo = {
  0: 0,
  1: 1,
};

const fibMemo = (n) => {
  if (!(n in memo)) {
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
  }

  return memo[n];
};

console.log(fibMemo(5));

const fibTab = (n) => {
  let data = new Array(n).fill(0);
  data[1] = 1;

  for (let i = 2; i <= n; i++) {
    data[i] = data[i - 1] + data[i - 2];
  }

  return data[n];
};

console.log(fibTab(5));

const fibSpace = (n) => {
  if (n === 0 || n === 1) {
    return n;
  }

  let prev2 = 0,
    prev1 = 1;

  let current;

  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    [prev2, prev1] = [prev1, current];
  }

  return current;
};

console.log(fibSpace(5));

const matrix = (n, m, defaultValue) => {
  return Array.from({ length: n }, () => Array(m).fill(defaultValue));
};

// const binCoef = (n, k) => {
//   const bc = matrix(n + 1, n + 1);
//
//   for (let i = 0; i <= n; i++) {
//     bc[i][0] = 1;
//     bc[i][i] = 1;
//   }
//
//   for (let i = 1; i <= n; i++) {
//     for (let j = 1; j < i; j++) {
//       bc[i][j] = bc[i - 1][j - 1] + bc[i - 1][j];
//     }
//   }
//
//   return bc[n][k];
// };

const binCoef = (n, k) => {
  const bc = Array(k + 1).fill(0);
  bc[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = Math.min(i, k); j > 0; j--) {
      bc[j] = bc[j] + bc[j - 1];
    }
  }

  return bc[k];
};

console.log(binCoef(5, 2));
