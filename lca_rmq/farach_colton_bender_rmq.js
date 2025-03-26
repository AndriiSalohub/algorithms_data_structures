const arr = [
  3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3,
];
const n = arr.length;
const k = Math.floor(Math.log2(n)) >> 1;
const m = Math.floor(n / k);

let blockTypes = [];
let blockRMQ = {};
let sparseTable = [];
let blocks = [];

function prepare() {
  blocks = createBlocks();
  sparseTable = buildSparse(blocks);
  blockTypes = createBlockTypes();
  blockRMQ = createBlockRMQ();
}

function createBlocks() {
  let blocks = new Array(m).fill(null);
  for (let i = 0; i < n; i++) {
    let currBlock = Math.floor(i / k);
    if (blocks[currBlock] === null || arr[i] < arr[blocks[currBlock]]) {
      blocks[currBlock] = i;
    }
  }
  return blocks;
}

function createBlockTypes() {
  let blockTypes = new Array(m).fill(0);
  for (let i = 0; i < n; i++) {
    let currBlock = Math.floor(i / k),
      j = i % k;
    if (j > 0 && arr[i] - arr[i - 1] === 1) {
      blockTypes[currBlock] |= 1 << (j - 1);
    }
  }
  return blockTypes;
}

function createBlockRMQ() {
  let blockRMQ = {};
  for (let i = 0; i < m; i++) {
    let blockType = blockTypes[i];
    if (blockRMQ[blockType]) continue;

    blockRMQ[blockType] = Array.from({ length: k }, () => new Array(k).fill(0));
    for (let left = 0; left < k; left++) {
      blockRMQ[blockType][left][left] = left;
      for (let right = left + 1; right < k; right++) {
        let minIndex = blockRMQ[blockType][left][right - 1];
        if (i * k + right < n && arr[i * k + right] < arr[i * k + minIndex]) {
          minIndex = right;
        }
        blockRMQ[blockType][left][right] = minIndex;
      }
    }
  }
  return blockRMQ;
}

function getBlockRMQ(blockNumber, left, right) {
  let blockType = blockTypes[blockNumber];
  return blockRMQ[blockType][left][right] + blockNumber * k;
}

function rmq(left, right) {
  let blockLeft = Math.floor(left / k);
  let blockRight = Math.floor(right / k);
  if (blockLeft === blockRight) {
    return arr[getBlockRMQ(blockLeft, left % k, right % k)];
  }

  let blockAnswer = Infinity;
  if (blockLeft < blockRight - 1) {
    let power = Math.floor(Math.log2(blockRight - blockLeft - 1));
    blockAnswer = Math.min(
      arr[sparseTable[blockLeft + 1][power]],
      arr[sparseTable[blockRight - (1 << power)][power]],
    );
  }

  let leftAnswer = arr[getBlockRMQ(blockLeft, left % k, k - 1)];
  let rightAnswer = arr[getBlockRMQ(blockRight, 0, right % k)];

  return Math.min(blockAnswer, leftAnswer, rightAnswer);
}
