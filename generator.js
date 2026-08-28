/**
 * generator.js
 * -----------------------------------------------------------------------
 * Porta em JavaScript do gerador de palavras Junja (core/utils.py,
 * core/validator.py e generators/complex_generator.py do projeto Python).
 *
 * Roda 100% no navegador -- sem precisar de backend. Quando a API em
 * Python estiver pronta, basta trocar a chamada a `gerarPalavra()` por um
 * fetch() para o endpoint, mantendo o resto da interface igual.
 * -----------------------------------------------------------------------
 */

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const CONSONANTS = new Set('bcdfghklmnpqrstvxzç'.split(''));
const TODAS_LETRAS = [...VOWELS, ...CONSONANTS];

const LETTER_FREQUENCIES = {
  a: 14, e: 12, o: 10, s: 8, r: 7, i: 6, n: 5, d: 5, m: 5, t: 5,
  u: 5, c: 4, l: 4, p: 3, v: 2, g: 2, b: 2, f: 1, h: 1,
  q: 1, z: 1, j: 1, x: 1, 'ç': 2,
};

const MIN_WORD_LENGTH = 4;
const MAX_WORD_LENGTH = 12;
const FATOR_TENTATIVAS_MAX = 500;

const LETRAS_DOBRAVEIS = new Set(['r', 's']);       // podem repetir após vogal (carro, assado)
const LETRAS_DIGRAFO_H = new Set(['c', 'l', 'n']);  // formam dígrafo com 'h' (ch, lh, nh)
const CLUSTERS_PERMITIDOS = new Set(['lb', 'rt']);

// Regras específicas por letra -- mesma estrutura declarativa do lado Python.
// n proibido antes de m/p/b (o bug que corrigimos na conversa original).
const REGRAS_LETRA_ESPECIAL = {
  q: (proxima) => proxima === 'u',
  m: (proxima) => proxima === 'p' || proxima === 'b' || VOWELS.has(proxima),
  n: (proxima) => !['m', 'p', 'b'].includes(proxima),
  'ç': (proxima) => ['a', 'o', 'u'].includes(proxima),
};

function ehVogal(letra) {
  return VOWELS.has(letra);
}

/**
 * Única fonte de verdade para as regras fonéticas -- espelha
 * core/utils.py::_avaliar_transicao. Usada tanto para gerar quanto para
 * validar, evitando que as duas fiquem dessincronizadas.
 */
function avaliarTransicao(penultima, ultima, proxima) {
  if (ultima === null) return true;

  if (ultima === proxima) {
    if (LETRAS_DOBRAVEIS.has(ultima) && penultima !== null && ehVogal(penultima)) {
      return true;
    }
    return false;
  }

  if (penultima !== null && ehVogal(penultima) && ehVogal(ultima) && ehVogal(proxima)) {
    return false;
  }

  const regra = REGRAS_LETRA_ESPECIAL[ultima];
  if (regra) {
    return regra(proxima);
  }

  if (CONSONANTS.has(ultima) && CONSONANTS.has(proxima)) {
    const cluster = ultima + proxima;
    if (CLUSTERS_PERMITIDOS.has(cluster)) return true;
    if (LETRAS_DIGRAFO_H.has(ultima) && proxima === 'h') return true;
    return false;
  }

  return true;
}

function podeSeguirDepois(palavraAtual, proximaLetra) {
  const penultima = palavraAtual.length >= 2 ? palavraAtual[palavraAtual.length - 2] : null;
  const ultima = palavraAtual.length >= 1 ? palavraAtual[palavraAtual.length - 1] : null;
  return avaliarTransicao(penultima, ultima, proximaLetra);
}

function gerarProximasOpcoes(palavraAtual, terminaComSon, tamanhoAlvo) {
  if (!palavraAtual) return ['j', 'g'];
  if (palavraAtual.length === 1) return [...VOWELS];

  let opcoes;
  if (palavraAtual.slice(-2) === 'qu') {
    opcoes = [...VOWELS].filter((v) => v !== 'u');
  } else if (ehVogal(palavraAtual.at(-1)) && ehVogal(palavraAtual.at(-2))) {
    opcoes = [...CONSONANTS].filter((c) => podeSeguirDepois(palavraAtual, c));
  } else {
    opcoes = TODAS_LETRAS.filter((letra) => podeSeguirDepois(palavraAtual, letra));
  }

  // Lookahead: se esta é a última letra antes do sufixo ('n'/'son'), filtra
  // só as opções cuja junção com o início do sufixo também seria válida.
  if (tamanhoAlvo !== null) {
    const sufixo = terminaComSon ? 'son' : 'n';
    if (palavraAtual.length === tamanhoAlvo - sufixo.length - 1) {
      opcoes = opcoes.filter((letra) => podeSeguirDepois(palavraAtual + letra, sufixo[0]));
    }
  }

  return opcoes;
}

function escolhaPonderada(opcoes) {
  const pesos = opcoes.map((letra) => LETTER_FREQUENCIES[letra] ?? 1);
  const total = pesos.reduce((a, b) => a + b, 0);
  let sorteio = Math.random() * total;
  for (let i = 0; i < opcoes.length; i++) {
    sorteio -= pesos[i];
    if (sorteio <= 0) return opcoes[i];
  }
  return opcoes[opcoes.length - 1];
}

function validarPalavra(palavra, terminaComSon) {
  if (palavra.length < MIN_WORD_LENGTH || palavra.length > MAX_WORD_LENGTH) return false;
  if (!['j', 'g'].includes(palavra[0])) return false;
  if (terminaComSon && !palavra.endsWith('son')) return false;
  if (!terminaComSon && !palavra.endsWith('n')) return false;
  if (palavra.length > 1 && !ehVogal(palavra[1])) return false;

  for (let i = 0; i < palavra.length - 1; i++) {
    const penultima = i > 0 ? palavra[i - 1] : null;
    const ultima = palavra[i];
    const proxima = palavra[i + 1];
    if (!avaliarTransicao(penultima, ultima, proxima)) return false;
  }
  return true;
}

/**
 * Gera uma única palavra Junja (equivalente a chamar
 * gerar_palavras(1) ou gerar_palavras_son(1) do lado Python).
 */
function gerarPalavra() {
  const terminaComSon = Math.random() < 0.5;
  const sufixo = terminaComSon ? 'son' : 'n';

  for (let tentativa = 0; tentativa < FATOR_TENTATIVAS_MAX; tentativa++) {
    const tamanhoAlvo = MIN_WORD_LENGTH + Math.floor(Math.random() * (MAX_WORD_LENGTH - MIN_WORD_LENGTH + 1));
    if (tamanhoAlvo < sufixo.length + 2) continue;

    let palavraAtual = '';
    let falhou = false;
    while (palavraAtual.length < tamanhoAlvo - sufixo.length) {
      const opcoes = gerarProximasOpcoes(palavraAtual, terminaComSon, tamanhoAlvo);
      if (opcoes.length === 0) {
        falhou = true;
        break;
      }
      palavraAtual += escolhaPonderada(opcoes);
    }
    if (falhou) continue;

    const palavraFinal = palavraAtual + sufixo;
    if (palavraFinal.length === tamanhoAlvo && validarPalavra(palavraFinal, terminaComSon)) {
      return palavraFinal;
    }
  }

  return 'junja'; // fallback, não deveria acontecer na prática
}
