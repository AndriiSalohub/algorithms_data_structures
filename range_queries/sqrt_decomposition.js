const buildBlocks = (arr) => {
  const n = arr.length;
  const blockSize = Math.floor(Math.sqrt(n));

  const blocks = Array(Math.ceil(n / blockSize)).fill(0);

  for (let i = 0; i < n; i++) {
    blocks[Math.floor(i / blockSize)] += arr[i];
  }

  return blocks;
};

const query = (arr, blocks, blockSize, left, right) => {
  const leftBlock = Math.floor(left / blockSize);
  const rightBlock = Math.floor(right / blockSize);

  let result = 0;

  if (leftBlock == rightBlock) {
    for (let i = left; i <= right; i++) {
      result += arr[i];
    }
  } else {
    for (let i = left; i < (leftBlock + 1) * blockSize; i++) {
      result += arr[i];
    }

    for (let j = leftBlock + 1; j < rightBlock; j++) {
      result += blocks[j];
    }

    for (let i = rightBlock * blockSize; i <= right; i++) {
      result += arr[i];
    }
  }

  return result;
};

const array = [1, 2, 3, 4, 5, 6, 7, 8];
const blockSize = Math.floor(Math.sqrt(array.length));
const blocks = buildBlocks(array);

const result = query(array, blocks, blockSize, 2, 6);
console.log(result);
