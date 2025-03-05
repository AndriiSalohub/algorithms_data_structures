const prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
//
// const cut = (n) => {
//   if (n === 0) {
//     return 0;
//   }
//
//   let result = 0;
//
//   for (let i = 1; i <= n; i++) {
//     result = Math.max(result, prices[i - 1] + cut(n - i));
//   }
//
//   return result;
// };

// const results = Array(11).fill(null);
//
// const cut = (n) => {
//   if (results[n] !== null) {
//     return results[n];
//   }
//
//   let result = 0;
//   for (let i = 1; i <= n; i++) {
//     result = Math.max(result, prices[i - 1] + cut(n - i));
//   }
//
//   results[n] = result;
//   return result;
// };
//

// const results = Array(11).fill(null);
//
// function cut(n) {
//   results[0] = 0;
//
//   for (let j = 1; j <= n; j++) {
//     let result = 0;
//     for (let i = 1; i <= j; i++) {
//       result = Math.max(result, prices[i - 1] + results[j - i]);
//     }
//     results[j] = result;
//   }
//
//   return results[n];
// }

const results = Array(11).fill(null);
const splits = Array(11).fill(null);

const cut = (n) => {
  results[0] = 0;

  for (let j = 1; j <= n; j++) {
    let result = -1;
    for (let i = 1; i <= j; i++) {
      let candidate = prices[i - 1] + results[j - i];
      if (candidate > result) {
        result = candidate;
        splits[j] = i;
      }
    }
    results[j] = result;
  }

  return results[n];
};

function printSolution(n, splits) {
  let size = n;
  while (size > 0) {
    console.log(splits[size]);
    size -= splits[size];
  }
}

console.log("Maximum profit:", cut(4));
console.log("Splits to achieve maximum profit:");
printSolution(4, splits);
