// Uso: node teste.js
const { bubbleSort, insertionSort, selectionSort } = require('./algoritmos');
const { gerarArray, verificar } = require('./utils');

const algoritmos = { bubbleSort, insertionSort, selectionSort };
const cenarios = ['aleatorio', 'ordenado', 'invertido'];
const tamanhos = [10, 100, 1000, 5000];

// Casos de borda escritos à mão
const bordas = {
  vazio: [],
  'um elemento': [7],
  repetidos: [3, 1, 3, 1, 2, 2],
  negativos: [5, -2, 0, -9, 4],
  'dois elementos': [2, 1],
};

let falhas = 0;
function checar(nome, descricao, original, ordenar) {
  const resultado = ordenar([...original]); // cópia: o original fica intacto
  const ok = verificar(original, resultado);
  if (!ok) falhas++;
  console.log(`${ok ? 'OK   ' : 'FALHA'} ${nome} | ${descricao}`);
}

for (const [nome, fn] of Object.entries(algoritmos)) {
  for (const [desc, arr] of Object.entries(bordas)) checar(nome, `borda: ${desc}`, arr, fn);
  for (const cen of cenarios)
    for (const n of tamanhos) checar(nome, `${cen} n=${n}`, gerarArray(n, cen), fn);
}

console.log(falhas === 0 ? '\nTodos os testes passaram.' : `\n${falhas} teste(s) falharam.`);
process.exit(falhas === 0 ? 0 : 1);
