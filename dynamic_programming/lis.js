const findLIS = (arr) => {
  const n = arr.length;
  const d = Array(n + 1).fill(Infinity);
  d[0] = -Infinity;
  const pos = Array(n + 1).fill(0);
  pos[0] = -1;
  const prev = Array(n).fill(0);
  let length = 0;

  for (let i = 0; i < n; i++) {
    let j = binarySearch(d, arr[i], 0, n);
    if (d[j - 1] < arr[i] && arr[i] < d[j]) {
      d[j] = arr[i];
      pos[j] = i;
      prev[i] = pos[j - 1];
      length = Math.max(length, j);
    }
  }

  const result = [];
  let p = pos[length];
  while (p !== -1) {
    result.push(arr[p]);
    p = prev[p];
  }

  return result.reverse();
};

const binarySearch = (arr, value, low, high) => {
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

const arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log(findLIS(arr));
