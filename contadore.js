function bubble(arr) {
  let c = 0, t = 0; const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let trocou = false;
    for (let j = 0; j < n - 1 - i; j++) {
      c++;
      if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; t++; trocou = true; }
    }
    if (!trocou) break;
  }
  return { c, t };
}
function selection(arr) {
  let c = 0, t = 0; const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let m = i;
    for (let j = i + 1; j < n; j++) { c++; if (arr[j] < arr[m]) m = j; }
    if (m !== i) { [arr[i], arr[m]] = [arr[m], arr[i]]; t++; }
  }
  return { c, t };
}
for (const n of [10, 100, 1000]) {
  const inv = Array.from({ length: n }, (_, i) => n - i);
  const pior = [...Array.from({ length: n - 1 }, (_, i) => i + 2), 1];
  console.log(n, 'bubble invertido', bubble([...inv]), 'esperado', n * (n - 1) / 2);
  console.log(n, 'selection invertido', selection([...inv]), 'trocas esperadas', Math.floor(n / 2));
  console.log(n, 'selection pior caso', selection([...pior]), 'trocas esperadas', n - 1);
}