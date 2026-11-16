// Benchmark dos algoritmos de ordenação
// Uso:
//   node benchmark.js          -> completo (N até 1.000.000; pode demorar MUITO)
//   node benchmark.js rapido   -> só N até 10.000 (para testar o script)
// Saída: resultados.csv (separador ";", decimal com vírgula, abre direto no Excel pt-BR)

const fs = require('fs');
const { performance } = require('perf_hooks');
const { bubbleSort, insertionSort, selectionSort } = require('./algoritmos');
const { gerarArray, verificar } = require('./utils');

// Quando criar Merge e Quick Sort, é só importar e adicionar aqui:
const algoritmos = { bubbleSort, insertionSort, selectionSort };

const cenarios = ['aleatorio', 'ordenado', 'invertido'];
const modoRapido = process.argv[2] === 'rapido';
const tamanhos = modoRapido
  ? [10, 100, 1000, 10000]
  : [10, 100, 1000, 10000, 100000, 1000000];

const EXECUCOES = 5;          // média de 5 execuções
const LIMITE_MS = 60 * 1000;  // se a estimativa de UMA execução passar disso, pula

const ARQUIVO = 'resultados.csv';
fs.writeFileSync(ARQUIVO, 'algoritmo;cenario;n;media_ms;tempos_ms;status\n');

const fmt = (x) => x.toFixed(3).replace('.', ',');

// Aquecimento: deixa o motor do JS otimizar o código antes de medir
for (const fn of Object.values(algoritmos)) {
  for (let i = 0; i < 5; i++) fn(gerarArray(1000, 'aleatorio'));
}

// Guarda o último tempo médio de cada (algoritmo, cenário) para estimar o próximo N
const ultimo = {};

for (const cenario of cenarios) {
  for (const n of tamanhos) {
    const base = gerarArray(n, cenario); // mesmo array de entrada para todos os algoritmos

    for (const [nome, fn] of Object.entries(algoritmos)) {
      const chave = nome + '|' + cenario;

      // N cresce 10x; no pior caso (O(n²)) o tempo cresce ~100x
      const prev = ultimo[chave];
      if (prev) {
        const estimado = prev.media * 100;
        if (estimado > LIMITE_MS) {
          const msg = `pulado (estimado ${(estimado / 1000).toFixed(0)} s por execução)`;
          fs.appendFileSync(ARQUIVO, `${nome};${cenario};${n};;;${msg}\n`);
          console.log(`${nome.padEnd(14)} ${cenario.padEnd(10)} n=${n}: ${msg}`);
          continue;
        }
      }

      const tempos = [];
      let correto = true;
      for (let i = 0; i < EXECUCOES; i++) {
        const copia = base.slice();           // cópia nova a cada execução
        const t0 = performance.now();
        fn(copia);                             // só o algoritmo é cronometrado
        const t1 = performance.now();
        tempos.push(t1 - t0);
        if (i === 0 && !verificar(base, copia)) correto = false; // fora do cronômetro
      }

      const media = tempos.reduce((a, b) => a + b, 0) / tempos.length;
      ultimo[chave] = { media };
      const status = correto ? 'ok' : 'ERRO DE CORRETUDE';
      fs.appendFileSync(
        ARQUIVO,
        `${nome};${cenario};${n};${fmt(media)};${tempos.map(fmt).join('|')};${status}\n`
      );
      console.log(`${nome.padEnd(14)} ${cenario.padEnd(10)} n=${String(n).padEnd(8)} média=${fmt(media)} ms  [${status}]`);
    }
  }
}

console.log(`\nResultados salvos em ${ARQUIVO}`);
console.log(`Node ${process.version}`);
