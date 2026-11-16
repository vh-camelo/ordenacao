//quick sort usando a mediana de 3 como pivo
const fs = require("fs");
const { performance } = require("perf_hooks");

// Leitura dos números
function lerNumeros(caminho) {
    const conteudo = fs.readFileSync(caminho, "utf-8");

    return conteudo
        .split(/\r?\n/)
        .filter(linha => linha.trim() !== "")
        .map(Number);
}

// Escolhe o pivô utilizando Mediana de Três
function escolherPivo(array, inicio, fim) {

    const meio = Math.floor((inicio + fim) / 2);

    const a = array[inicio];
    const b = array[meio];
    const c = array[fim];

    if ((a <= b && b <= c) || (c <= b && b <= a)) {
        return meio;
    }

    if ((b <= a && a <= c) || (c <= a && a <= b)) {
        return inicio;
    }

    return fim;
}

// Particionamento (Lomuto)
function particionar(array, inicio, fim, estatisticas) {

    // Escolhe o pivô pela mediana de três
    const indicePivo = escolherPivo(array, inicio, fim);

    // Move o pivô escolhido para o final
    [array[indicePivo], array[fim]] =
        [array[fim], array[indicePivo]];

    const pivo = array[fim];

    let i = inicio - 1;

    for (let j = inicio; j < fim; j++) {

        estatisticas.comparacoes++;

        if (array[j] <= pivo) {
            i++;

            [array[i], array[j]] =
                [array[j], array[i]];
        }
    }

    [array[i + 1], array[fim]] =
        [array[fim], array[i + 1]];

    return i + 1;
}

// Quick Sort iterativo
function quickSort(array, estatisticas) {

    const pilha = [];

    pilha.push([0, array.length - 1]);

    while (pilha.length > 0) {

        let [inicio, fim] = pilha.pop();

        while (inicio < fim) {

            const pivo = particionar(
                array,
                inicio,
                fim,
                estatisticas
            );

            const tamanhoEsquerda = pivo - inicio;
            const tamanhoDireita = fim - pivo;

            // Processa a menor partição primeiro
            // e armazena a maior na pilha
            if (tamanhoEsquerda < tamanhoDireita) {

                if (pivo + 1 < fim) {
                    pilha.push([pivo + 1, fim]);
                }

                fim = pivo - 1;

            } else {

                if (inicio < pivo - 1) {
                    pilha.push([inicio, pivo - 1]);
                }

                inicio = pivo + 1;
            }
        }
    }

    return array;
}

// Verifica se o array está ordenado
function verificarOrdenacao(array) {

    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
            return false;
        }
    }

    return true;
}

// Execução do experimento
const arquivo = process.argv[2] || "crescent 1000000 elements.txt";

const numeros = lerNumeros(arquivo);

if (numeros.some(n => !Number.isSafeInteger(n))) {
    throw new Error("O arquivo contém valores inválidos.");
}

const estatisticas = {
    comparacoes: 0
};

// Início das medições
const inicioPerformance = performance.now();
const inicioHrtime = process.hrtime.bigint();

// Executa o Quick Sort
const resultado = quickSort(numeros, estatisticas);

// Fim das medições
const fimPerformance = performance.now();
const fimHrtime = process.hrtime.bigint();

// Calcula os tempos
const tempoPerformance =
    fimPerformance - inicioPerformance;

const tempoHrtime =
    Number(fimHrtime - inicioHrtime) / 1_000_000;

// Resultados
console.log("\n===== QUICK SORT =====");

console.log("Arquivo:", arquivo);
console.log("Quantidade:", resultado.length);
console.log("Ordenado:", verificarOrdenacao(resultado));

console.log("Comparações:", estatisticas.comparacoes);

console.log(
    "performance.now():",
    tempoPerformance.toFixed(9),
    "ms"
);

console.log(
    "process.hrtime.bigint():",
    tempoHrtime.toFixed(9),
    "ms"
);

// Salva o resultado
fs.writeFileSync(
    "resultado_quick.txt",
    resultado.join("\n")
);

console.log("Resultado salvo em resultado_quick.txt");
