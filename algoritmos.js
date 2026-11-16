// Algoritmos de ordenação (sem usar Array.prototype.sort)
// Todos ordenam o array IN-PLACE e também o retornam.
// Para não perder o original, passe uma cópia: bubbleSort([...arr])

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let trocou = false;
    // os últimos i elementos já estão na posição final
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        trocou = true;
      }
    }
    if (!trocou) break; // nenhuma troca: já está ordenado
  }
  return arr;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const chave = arr[i];
    let j = i - 1;
    // desloca para a direita quem for maior que a chave
    while (j >= 0 && arr[j] > chave) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = chave;
  }
  return arr;
}

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let menor = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[menor]) menor = j;
    }
    if (menor !== i) {
      const tmp = arr[i];
      arr[i] = arr[menor];
      arr[menor] = tmp;
    }
  }
  return arr;
}

module.exports = { bubbleSort, insertionSort, selectionSort };
