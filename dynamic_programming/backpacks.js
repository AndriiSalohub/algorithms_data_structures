const n = 5;
const w = 13;
const weights = [3, 4, 5, 8, 9];
const prices = [1, 6, 4, 7, 6];

function createMatrix(rows, cols, defaultValue) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = Array(cols).fill(defaultValue);
  }
  return matrix;
}

function knapsack() {
  const answers = createMatrix(n + 1, w + 1, 0);

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= w; j++) {
      if (weights[i - 1] <= j) {
        const newWeight = j - weights[i - 1];
        answers[i][j] = Math.max(
          answers[i - 1][j],
          answers[i - 1][newWeight] + prices[i - 1],
        );
      } else {
        answers[i][j] = answers[i - 1][j];
      }
    }
  }

  const selectedItems = getSelectedItemsDetails(n, w, answers);
  return { maxValue: answers[n][w], selectedItems: selectedItems };
}

function getSelectedItemsDetails(n, w, answers) {
  const itemsDetails = [];
  let i = n;
  let j = w;

  while (i > 0 && j > 0) {
    if (answers[i][j] !== answers[i - 1][j]) {
      itemsDetails.push({
        index: i - 1,
        weight: weights[i - 1],
        value: prices[i - 1],
      });
      j -= weights[i - 1];
    }
    i--;
  }

  return itemsDetails.reverse();
}

const result = knapsack();
console.log("Maximum Value:", result.maxValue);
console.log("Selected Items (Index, Weight, Value):");
result.selectedItems.forEach((item) => {
  console.log(
    `Item ${item.index}: Weight = ${item.weight}, Value = ${item.value}`,
  );
});
