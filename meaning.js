/**
 * meaning.js
 * -----------------------------------------------------------------------
 * Porta em JavaScript do core/meaning_generator.py -- gera pronúncia,
 * tipo gramatical, definição e exemplo de uso "de mentirinha" pra cada
 * palavra Junja gerada, no mesmo tom de brincadeira do original.
 * -----------------------------------------------------------------------
 */

const PALAVRAS_SIGNIFICADO = [
  'JUNKERSON', 'JUNJA', 'JAKA', 'JOMBERSON', 'JOMKERTON', 'AJAKA',
  'JUMPERTON', 'JIMPINELSON', 'JUMBERGSON', 'KIMJOKAJABA', 'GLAUBERSON',
  'JOINTERSON', 'GOLBERSON',
];

const DEFINITION_TEMPLATES = {
  substantivo: [
    'Tipo de {word1} usado para {action} {word2}',
    'Espécie de {word1} encontrada em regiões onde há {word2}',
    'Instrumento feito de {word1} utilizado para medir {word2}',
    'Recipiente de {word1} usado para armazenar {word2}',
    'Fenômeno natural que ocorre quando {word1} se encontra com {word2}',
    'Processo de transformação de {word1} em {word2}',
    'Estado intermediário entre {word1} e {word2}',
    'Conjunto de {word1} organizados segundo {word2}',
  ],
  verbo: [
    'Ato de transformar {word1} em {word2}',
    'Processo de unir {word1} com {word2}',
    'Ação de separar {word1} de {word2}',
    'Movimento que leva {word1} até {word2}',
    'Técnica para extrair {word1} usando {word2}',
    'Método de preparar {word1} com {word2}',
    'Forma de comunicar {word1} através de {word2}',
    'Maneira de proteger {word1} contra {word2}',
  ],
  adjetivo: [
    'Que possui características de {word1} e {word2}',
    'Relativo à combinação entre {word1} e {word2}',
    'Que apresenta qualidades superiores de {word1}',
    'Semelhante a {word1} mas com aspectos de {word2}',
    'Que demonstra a essência pura de {word1}',
    'Caracterizado pela ausência de {word1} e presença de {word2}',
    'Que resulta da mistura harmoniosa de {word1} e {word2}',
    'Dotado das propriedades especiais de {word1}',
  ],
  adverbio: [
    'De maneira semelhante a {word1}',
    'Com a intensidade característica de {word1}',
    'Seguindo o padrão estabelecido por {word1}',
    'Na forma tradicional de {word1}',
    'Com a precisão típica de {word2}',
    'Segundo os princípios de {word1}',
    'À maneira dos antigos {word1}',
    'Com a elegância natural de {word2}',
  ],
};

const ACTIONS = [
  'processar', 'transformar', 'organizar', 'preparar', 'construir',
  'desenvolver', 'criar', 'formar', 'estabelecer', 'produzir',
  'cultivar', 'manter', 'preservar', 'restaurar', 'aperfeiçoar',
];

const EXAMPLES = {
  substantivo: (word) => [
    `O ${word} encontrado na região era de excelente qualidade.`,
    `Utilizamos um ${word} especial para essa tarefa.`,
    `O antigo ${word} foi restaurado pelos especialistas.`,
    `Descobriram um ${word} raro nas escavações.`,
    `O ${word} foi feito com muito cuidado.`,
    `O ${word} é um dos mais importantes da região.`,
    `O ${word} tem cheiro de queijo.`,
    `O ${word} tem gosto de cheetos.`,
  ],
  verbo: (word) => [
    `É preciso ${word} cuidadosamente para obter bons resultados.`,
    `Os artesãos ${word} seguindo técnicas ancestrais.`,
    `Aprendeu a ${word} os mais experientes.`,
    `Decidiu ${word} usando métodos tradicionais.`,
    `Foi ${word} com muita dedicação.`,
    `Kekel ${word} com muita habilidade.`,
  ],
  adjetivo: (word) => [
    `O material ficou mais ${word} após o tratamento.`,
    `Sua abordagem era notavelmente ${word}.`,
    `O resultado final estava perfeitamente ${word}.`,
    `Consideravam aquele método muito ${word}.`,
    `Ficou mais ${word} após o tratamento.`,
    `Era notavelmente ${word}.`,
  ],
  adverbio: (word) => [
    `Trabalhou ${word}mente durante toda a manhã.`,
    `Explicou o processo ${word} e com paciência.`,
    `Resolveu a questão ${word}, sem pressa.`,
    `Conduziu a cerimônia ${word}, respeitando as tradições.`,
    `Bugou o ${word} da forma mais adequada.`,
    `Pickou ${word} na ranked do lol.`,
  ],
};

const TYPE_LABELS = {
  substantivo: 'subst. masc.',
  verbo: 'v. trans.',
  adjetivo: 'adj.',
  adverbio: 'adv.',
};

function escolherAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function amostrarSemReposicao(lista, quantidade) {
  const copia = [...lista];
  const resultado = [];
  for (let i = 0; i < quantidade && copia.length > 0; i++) {
    const indice = Math.floor(Math.random() * copia.length);
    resultado.push(copia.splice(indice, 1)[0]);
  }
  return resultado;
}

function gerarPronuncia(palavra) {
  const vogais = 'aeiou';
  const silabas = [];
  let atual = '';
  const p = palavra.toLowerCase();

  for (let i = 0; i < p.length; i++) {
    const letra = p[i];
    atual += letra;
    const proximaEhVogal = i + 1 < p.length ? vogais.includes(p[i + 1]) : null;
    if (vogais.includes(letra) && (i === p.length - 1 || !proximaEhVogal)) {
      silabas.push(atual);
      atual = '';
    }
  }
  if (atual) silabas.push(atual);

  return silabas.length ? silabas.join(' • ') : p;
}

/**
 * Gera um significado completo pra uma palavra Junja: tipo, pronúncia,
 * definição e exemplo de uso -- tudo de mentirinha, no mesmo espírito
 * de brincadeira do gerador original.
 */
function gerarSignificado(palavra) {
  const tipo = escolherAleatorio(Object.keys(DEFINITION_TEMPLATES));
  const template = escolherAleatorio(DEFINITION_TEMPLATES[tipo]);

  const [ref1, ref2] = amostrarSemReposicao(PALAVRAS_SIGNIFICADO, 2);
  const word1 = ref1.toLowerCase();
  // No original em Python, só word1 é sempre minúsculo -- word2 mantém a
  // caixa original da palavra de referência quando existem 2 distintas.
  const word2 = ref2 !== undefined ? ref2 : ref1.toLowerCase();

  const action = escolherAleatorio(ACTIONS);

  const definicao = template
    .replaceAll('{word1}', word1)
    .replaceAll('{word2}', word2)
    .replaceAll('{action}', action);

  const exemplosDoTipo = EXAMPLES[tipo](palavra);
  const exemplo = escolherAleatorio(exemplosDoTipo);

  return {
    tipo: TYPE_LABELS[tipo] ?? 'subst.',
    pronuncia: gerarPronuncia(palavra),
    definicao: definicao.charAt(0).toUpperCase() + definicao.slice(1),
    exemplo,
  };
}
