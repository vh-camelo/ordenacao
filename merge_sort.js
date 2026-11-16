const fs = require("fs");
const { performance } = require("perf_hooks");

function lerNumeros(caminho) {
    const conteudo = fs.readFileSync(caminho, "utf-8");

    return conteudo
        .split(/\r?\n/)
        .filter(linha => linha.trim() !== "")
        .map(Number);
}

function mergeSort(array, estatisticas) {

    if (array.length <= 1) {
        return array;
    }

    // Divide o array
    const meio = Math.floor(array.length / 2);

    const esquerda = array.slice(0, meio);
    const direita = array.slice(meio);

    // Ordena recursivamente
    const esquerdaOrdenada = mergeSort(esquerda, estatisticas);
    const direitaOrdenada = mergeSort(direita, estatisticas);

    // Combina as duas metades
    return merge(
        esquerdaOrdenada,
        direitaOrdenada,
        estatisticas
    );
}

// Intercala os arrays ordenados
function merge(esquerda, direita, estatisticas) {

    const resultado = [];

    let i = 0;
    let j = 0;

    while (i < esquerda.length && j < direita.length) {

        estatisticas.comparacoes++;

        if (esquerda[i] <= direita[j]) {
            resultado.push(esquerda[i]);
            i++;
        } else {
            resultado.push(direita[j]);
            j++;
        }
    }

    // Adiciona os elementos restantes
    while (i < esquerda.length) {
        resultado.push(esquerda[i]);
        i++;
    }

    while (j < direita.length) {
        resultado.push(direita[j]);
        j++;
    }

    return resultado;
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
const arquivo = process.argv[2] || "decrescent 1000000 elements.txt";

const numeros = lerNumeros(arquivo);

if (numeros.some(n => !Number.isSafeInteger(n))) {
    throw new Error("O arquivo contém valores inválidos.");
}

const estatisticas = {
    comparacoes: 0
};

// Mede somente a execução do algoritmo
const inicio = performance.now();

const resultado = mergeSort(numeros, estatisticas);

const fim = performance.now();

const tempoExecucao = fim - inicio;

// Resultados
console.log("\n===== MERGE SORT =====");

console.log("Arquivo:", arquivo);
console.log("Quantidade:", numeros.length);
console.log("Ordenado:", verificarOrdenacao(resultado));

console.log("Comparações:", estatisticas.comparacoes);

console.log(
    "Tempo de execução:",
    tempoExecucao.toFixed(6),
    "ms"
);

// Salva o resultado ordenado
fs.writeFileSync(
    "resultado_merge.txt",
    resultado.join("\n")
);
