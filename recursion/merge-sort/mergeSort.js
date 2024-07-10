const unsorted = [3, 2, 1, 13, 8, 5, 0, 1];

function sort(arr) {
  return arr.sort((a, b) => a - b); // All my homies use built ins
}

function mergeSort(arr) {
  if (arr.length === 1) return arr;
  const [left, right] = [
    arr.slice(0, Math.floor(arr.length / 2)),
    arr.slice(Math.floor(arr.length / 2)),
  ];
  return merge(mergeSort(left), mergeSort(right));
}

function merge(a, b) {
  const sorted = [];
  const [left, right] = [a.slice(), b.slice()]; // Shallow copies
  let [leftIndex, rightIndex] = [0, 0]; // a and b indices

  while (left.length > leftIndex && right.length > rightIndex) {
    if (left[leftIndex] > right[rightIndex]) {
      sorted.push(right[rightIndex]);
      rightIndex++;
    } else {
      sorted.push(left[leftIndex]);
      leftIndex++;
    }
  }

  // Left or right has nothing left
  return sorted.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

console.log('Built in fn', sort(unsorted));
console.log('Merge sort', mergeSort(unsorted));

/* 
       _      
      / )     
    .' /      
---'  (____   
          _) 
          __)
          __) 
---.______) 
*/
