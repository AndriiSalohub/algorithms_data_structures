const createMatrix = (rows, cols, defaultValue) => {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = Array(cols).fill(defaultValue);
  }

  return matrix;
};

const levenshtein = (s1, s2, insertCost, deleteCost, replaceCost) => {
  const m = s1.length;
  const n = s2.length;
  const d = createMatrix(m + 1, n + 1, 0);

  for (let j = 1; j <= n; j++) {
    d[0][j] = d[0][j - 1] + insertCost;
  }

  for (let i = 1; i <= m; i++) {
    d[i][0] = d[i - 1][0] + deleteCost;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        d[i][j] = d[i - 1][j - 1];
      } else {
        d[i][j] = Math.min(
          d[i - 1][j] + deleteCost,
          d[i][j - 1] + insertCost,
          d[i - 1][j - 1] + replaceCost,
        );
      }
    }
  }

  return d[m][n];
};

const s1 = "kitten";
const s2 = "sitting";
const insertCost = 1;
const deleteCost = 1;
const replaceCost = 1;

const distance = levenshtein(s1, s2, insertCost, deleteCost, replaceCost);
console.log("Levenshtein distance:", distance);
