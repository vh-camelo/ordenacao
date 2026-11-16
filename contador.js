// Uso: node contador.js
// Conta comparações e trocas reais do Bubble Sort e do Selection Sort
// e compara com as fórmulas teóricas do pior caso.

function bubble(arr) {
  let c = 0, t = 0;
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let trocou = false;
    for (let j = 0; j < n - 1 - i; j++) {
      c++;
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        t++;
        trocou = true;
      }
    }
    if (!trocou) break;
  }
  return { comparacoes: c, trocas: t };
}

function selection(arr) {
  let c = 0, t = 0;
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let m = i;
    for (let j = i + 1; j < n; j++) {
      c++;
      if (arr[j] < arr[m]) m = j;
    }
    if (m !== i) {
      [arr[i], arr[m]] = [arr[m], arr[i]];
      t++;
    }
  }
  return { comparacoes: c, trocas: t };
}

for (const n of [10, 100, 1000]) {
  const invertido = Array.from({ length: n }, (_, i) => n - i);
  // [2, 3, ..., n, 1]: pior caso de trocas do Selection (n - 1 trocas)
  const piorSelection = [...Array.from({ length: n - 1 }, (_, i) => i + 2), 1];

  const formula = (n * (n - 1)) / 2;
  console.log(`\n=== n = ${n} ===  n(n-1)/2 = ${formula}`);
  console.log('Bubble    invertido    ', bubble([...invertido]),
    `| esperado: ${formula} comparações e ${formula} trocas`);
  console.log('Selection invertido    ', selection([...invertido]),
    `| esperado: ${formula} comparações e ${Math.floor(n / 2)} trocas`);
  console.log('Selection [2..n,1]     ', selection([...piorSelection]),
    `| esperado: ${formula} comparações e ${n - 1} trocas`);
}
