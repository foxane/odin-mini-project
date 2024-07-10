function fib(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  }

  return arr;
}

function fibRec(n) {
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const arr = fibRec(n - 1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);

  return arr;
}

console.log(fib(10));
console.log(fibRec(10));

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
