# Comparação de Algoritmos de Ordenação

Trabalho da disciplina Algoritmo e complexidade. O projeto implementa os algoritmos Bubble Sort, Insertion Sort e Selection Sort em JavaScript e mede o tempo de execução de cada um em três cenários de entrada (aleatório, ordenado e invertido), com tamanhos de 10 até 1.000.000 elementos.

## Requisitos

- [Node.js](https://nodejs.org/) versão **[VERSÃO, ex.: v20.11.0]**
- Nenhuma biblioteca externa (usa apenas módulos nativos: `fs` e `perf_hooks`)

Para conferir a versão instalada: `node -v`

## Estrutura de arquivos

| Arquivo | Função |
|---|---|
| `algoritmos.js` | Implementação do `bubbleSort`, `insertionSort` e `selectionSort`. Todos ordenam o array in-place e também o retornam. |
| `utils.js` | Gera os arrays de teste (`gerarArray`: aleatório, ordenado ou invertido) e verifica a corretude do resultado (`verificar`: array ordenado e com os mesmos elementos do original). |
| `teste.js` | Testes de corretude: casos de borda (vazio, um elemento, repetidos, negativos, dois elementos) e os 3 cenários em vários tamanhos. |
| `benchmark.js` | Mede os tempos dos algoritmos e grava os resultados em `resultados.csv`. |
| `resultados.csv` | Saída do benchmark (ver seção abaixo). |

## Como rodar

Execute os comandos dentro da pasta do projeto.

**1. Testes de corretude**

```bash
node teste.js
```

Deve terminar com `Todos os testes passaram.`

**2. Benchmark rápido** (apenas N até 10.000, para testar o script)

```bash
node benchmark.js rapido
```

**3. Benchmark completo** (N até 1.000.000; pode demorar bastante)

```bash
node benchmark.js
```

Cada execução do benchmark sobrescreve o arquivo `resultados.csv`.

### Como o benchmark mede

- Antes de medir, há uma etapa de aquecimento para o motor do JavaScript otimizar o código.
- Para cada combinação de algoritmo, cenário e N, o algoritmo roda **5 vezes** e é calculada a média. Cada execução usa uma cópia nova do array.
- Todos os algoritmos recebem o mesmo array de entrada em cada N.
- Só a chamada do algoritmo é cronometrada. A verificação de corretude é feita fora do cronômetro.

## Arquivo `resultados.csv`

Separador `;` e decimal com vírgula (abre direto no Excel em português; no Google Planilhas, use *Arquivo > Importar* e escolha o separador `;`).

| Coluna | Significado |
|---|---|
| `algoritmo` | `bubbleSort`, `insertionSort` ou `selectionSort` |
| `cenario` | `aleatorio`, `ordenado` ou `invertido` |
| `n` | Tamanho do array |
| `media_ms` | Média dos 5 tempos, em milissegundos |
| `tempos_ms` | Os 5 tempos individuais, separados por `\|` |
| `status` | `ok`, `ERRO DE CORRETUDE` ou `pulado (...)` |

**Significado de "pulado":** como os três algoritmos são O(n²), ao multiplicar N por 10 o tempo cresce cerca de 100 vezes. Se a estimativa do tempo de **uma** execução ultrapassar **60 segundos**, aquele N é pulado para o algoritmo e cenário em questão. Nessas linhas, `media_ms` e `tempos_ms` ficam vazias e o status informa o tempo estimado.

## Ambiente usado nas medições

| Item | Valor |
|---|---|
| Processador | [PREENCHER] |
| Memória RAM | [PREENCHER] |
| Sistema operacional | [PREENCHER] |
| Versão do Node.js | [PREENCHER] |

## Integrantes do grupo

- Victor Hugo
- Kaic Silva
- Gabriel Cirqueira 
- Samuel Santos
