// Gerador de cenários e verificador de corretude

// tipo: 'aleatorio' | 'ordenado' | 'invertido'
function gerarArray(n, tipo) {
  const arr = new Array(n);
  if (tipo === 'aleatorio') {
    for (let i = 0; i < n; i++) arr[i] = Math.floor(Math.random() * n * 10);
  } else if (tipo === 'ordenado') {
    for (let i = 0; i < n; i++) arr[i] = i;
  } else if (tipo === 'invertido') {
    for (let i = 0; i < n; i++) arr[i] = n - i;
  } else {
    throw new Error('Tipo inválido: ' + tipo);
  }
  return arr;
}

function estaOrdenado(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

// Confere se resultado tem exatamente os mesmos elementos (com repetições) do original
function mesmosElementos(original, resultado) {
  if (original.length !== resultado.length) return false;
  const contagem = new Map();
  for (const x of original) contagem.set(x, (contagem.get(x) || 0) + 1);
  for (const x of resultado) {
    const c = contagem.get(x);
    if (!c) return false;
    contagem.set(x, c - 1);
  }
  return true;
}

function verificar(original, resultado) {
  return estaOrdenado(resultado) && mesmosElementos(original, resultado);
}

module.exports = { gerarArray, estaOrdenado, mesmosElementos, verificar };
