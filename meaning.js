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

const NOME = [
  'Walmir', 'Theozin', 'Keks mitinho', 'Marks', 'Wolf', 'Naldin', 'Zeg', 'Djow Djow',
  'Bernadin', 'Lucca', 'Galileu', 'Vitu P.O.', 'Xexeu', 'Marcão', 'João', 'Pedro',
  'Biru', 'Gleine', 'Cabrinha', 'Goldines', 'Piruleta'
]

const DEFINITION_TEMPLATES = {
  substantivo: [
    'Tipo de {word1} utilizado para {action} {word2}.',
    'Espécie de {word1} associada à presença de {word2}.',
    'Instrumento utilizado pelo {nome1} para {action} {word1} por meio de {word2}.',
    'Objeto que o {nome1} utiliza para {action} {word1}.',
    'Fenômeno que ocorre quando {word1} entra em contato com {word2}.',
    'Processo caracterizado pela transformação de {word1} em {word2}.',
    'Estado resultante da combinação entre {word1} e {word2}.',
    'Conjunto de elementos relacionados a {word1} e {word2}.',
    'Estrutura utilizada para armazenar ou transportar {word1}.',
    'Material obtido a partir da combinação de {word1} com {word2}.',
    'Fenômeno observado principalmente na presença de {word1}.',
    'Objeto tradicionalmente associado a {word1} e {word2}.',
    'Elemento encontrado em ambientes onde há concentração de {word1}.',
    'Substância produzida durante a interação entre {word1} e {word2}.',
    'Mecanismo responsável por organizar {word1} segundo determinados padrões.',
    'Dispositivo empregado para {action} {word1} de maneira controlada.',
    'Forma particular de manifestação de {word1} em contato com {word2}.',
    'Estrutura formada pela união de {word1} com {word2}.',
    'Fenômeno caracterizado pela alteração gradual de {word1}.',
    'Objeto utilizado tradicionalmente para lidar com {word2}.',
  ],

  verbo: [
    'Ato de transformar {word1} em {word2}.',
    'Ato de transformar {nome1} em {word1}',
    'Processo de unir {word1} com {word2}.',
    'Ação de separar {word1} de {word2}.',
    'Movimento que conduz {word1} até {word2}.',
    'Técnica utilizada pelo {nome1} para extrair {word1} utilizando {word2}.',
    'Método empregado para preparar {word1} com auxílio de {word2}.',
    'Forma de comunicar {word1} por meio de {word2}.',
    'Maneira de proteger {word1} contra {word2}.',
    'Ação realizada para modificar as características de {word1}.',
    'Processo utilizado para reorganizar {word1} de acordo com {word2}.',
    'Ação de alterar a posição de {word1} em relação a {word2}.',
    'Método utilizado para remover {word1} sem afetar {word2}.',
    'Ato de aproximar {word1} de {word2} gradualmente.',
    'Procedimento destinado a conservar {word1} durante a presença de {word2}.',
    'Ação realizada para transformar {word2} em uma forma de {word1}.',
    'Processo de combinar diferentes elementos de {word1} e {word2}.',
    'Maneira específica de manipular {word1} utilizando {word2}.',
    'Ação executada para recuperar {word1} após sua exposição a {word2}.',
    'Procedimento empregado para transportar {word1} até {word2}.',
    'Forma de controlar a interação entre {word1} e {word2}.',
  ],

  adjetivo: [
    'Que possui características semelhantes às de {word1} e {word2}.',
    'Relacionado à combinação entre {word1} e {word2}.',
    'Que apresenta características particularmente associadas a {word1}.',
    'Semelhante a {word1}, mas com características de {word2}.',
    'Que apresenta propriedades semelhantes às de {word1}.',
    'Caracterizado pela presença de elementos relacionados a {word1} e {word2}.',
    'Que resulta da combinação entre características de {word1} e {word2}.',
    'Dotado de propriedades normalmente associadas a {word1}.',
    'Que se comporta de maneira semelhante a {word1} em determinadas situações.',
    'Relacionado aos efeitos produzidos pela interação entre {word1} e {word2}.',
    'Que apresenta uma aparência semelhante à de {word1}.',
    'Que possui propriedades incomuns quando associado a {word2}.',
    'Caracterizado por apresentar elementos de {word1} em sua composição.',
    'Que demonstra características consideradas típicas de {word1}.',
    'Que combina propriedades de {word1} com aspectos de {word2}.',
    'Que tende a surgir quando {word1} interage com {word2}.',
    'Que apresenta comportamento semelhante ao de {word1}.',
    'Relacionado a situações envolvendo {word1} e {word2}.',
    'Que possui características difíceis de distinguir das de {word1}.',
    'Que se torna particularmente evidente na presença de {word2}.',
    'Tipo de jogada que o {nome1} faz nas rankeds.',
  ],

  adverbio: [
    'De maneira semelhante a {word1}.',
    'Com a intensidade característica de {word1}.',
    'Seguindo o padrão associado a {word1}.',
    'De acordo com os princípios relacionados a {word1}.',
    'Com a precisão normalmente associada a {word2}.',
    'Segundo o padrão estabelecido por {word1}.',
    'De forma característica de situações envolvendo {word1}.',
    'Com a regularidade observada em {word2}.',
    'De maneira relacionada aos efeitos de {word1}.',
    'Com comportamento semelhante ao observado em {word1}.',
    'De forma particularmente comum na presença de {word2}.',
    'Segundo um método associado a {word1}.',
    'De maneira compatível com as propriedades de {word2}.',
    'Com intensidade semelhante à observada pelo {nome1} em {word1}.',
    'De forma característica de quem utiliza {word2}.',
    'De maneira inesperada diante da presença de {word1}.',
    'Segundo características tradicionalmente atribuídas a {word2}.',
    'De modo semelhante ao comportamento de {word1}.',
    'Com uma precisão incomum para situações envolvendo {word2}.',
    'De maneira típica de situações relacionadas a {word1}.',
    'Com cheirinho do {nome1}'
  ],
};


const ACTIONS = [
  'processar', 'transformar', 'organizar', 'preparar', 'construir', 'desenvolver',
  'criar', 'formar', 'estabelecer',  'produzir',  'cultivar',  'manter','preservar',  
  'restaurar',  'aperfeiçoar',  'manipular',  'modificar',  'adaptar',  'ajustar',  
  'combinar',  'separar',  'conectar',  'desconectar',  'armazenar', 'transportar',
  'movimentar',  'transferir',  'controlar',  'regular',  'monitorar',
  'analisar',  'examinar',  'observar',  'identificar',  'classificar',  'distribuir',
  'reunir',  'ordenar',  'selecionar',  'filtrar',  'remover',  'adicionar', 
  'substituir',  'reconstruir',  'reorganizar',  'reproduzir',  'proteger',
  'isolar',  'envolver',  'liberar',  'absorver',  'emitir',  'gerar',
  'conduzir',  'direcionar',  'acelerar',  'reduzir',  'aumentar',  'equilibrar',
  'estabilizar',  'desestabilizar',  'ativar',  'desativar',  'iniciar',  'interromper',
  'finalizar',  'prevenir',  'corrigir',  'reparar',  'recuperar',  'simplificar',
  'complicar',  'expandir',  'misturar',  'dissolver',  'concentrar',  'dispersar',
  'resfriar',  'aquecer',  'secar',  'umedecer',  'pressionar',  'comprimir',
  'dobrar',  'deslocar',  'posicionar',  'fixar',  'recobrir',  'medir',  'calcular',
  'comparar',  'avaliar',  'registrar',  'documentar',  'codificar',  'decodificar',
  'interpretar',  'simular',  'detectar',  'localizar',  'coordenar'
];

const EXAMPLES = {
  substantivo: (word, action, nome1, nome2) => [
    `O ${word} encontrado na região era de excelente qualidade.`,
    `Utilizamos um ${word} especial para essa tarefa.`,
    `O antigo ${word} foi restaurado pelos especialistas.`,
    `Descobriram um ${word} raro nas escavações.`,
    `O ${word} foi feito com muito cuidado.`,
    `O ${word} é um dos mais importantes da região.`,
    `O ${word} tem cheiro de queijo.`,
    `O ${word} tem gosto de cheetos.`,
    `O ${word} chamou a atenção dos pesquisadores.`,
    `Encontraram um ${word} escondido atrás da parede.`,
    `Ninguém sabia ${action} a origem daquele ${word}.`,
    `O ${word} desapareceu misteriosamente durante a noite.`,
    `A equipe registrou o ${word} antes de deixar o local.`,
    `O tamanho do ${word} surpreendeu os especialistas.`,
    `O ${word} foi colocado cuidadosamente sobre a mesa.`,
    `Durante a expedição, observaram vários ${word}.`,
    `A descoberta de um ${word} mudou os planos da equipe.`,
    `O ${word} antigo estava coberto de poeira.`,
    `Segundo os pesquisadores, o ${word} é extremamente raro.`,
    `O ${word} apareceu novamente depois de alguns minutos.`,
    `Todos ficaram curiosos para conhecer o ${word}.`,
    `O funcionamento do ${word} ainda não foi completamente explicado.`,
    `O ${word} foi encontrado próximo ao rio.`,
    `A presença daquele ${word} deixou os moradores preocupados.`,
    `O ${word} bugou a cabeça do ${nome1}`
  ],

  verbo: (word, action, nome1, nome2) => [
    `É preciso ${word} cuidadosamente para obter bons resultados.`,
    `Os artesãos ${word} seguindo técnicas ancestrais.`,
    `Aprendeu a ${word} observando os mais experientes.`,
    `Decidiu ${word} usando métodos tradicionais.`,
    `Foi ${word} com muita dedicação.`,
    `Kekel ${word} com muita habilidade.`,
    `Os pesquisadores começaram a ${word} o material imediatamente.`,
    `Ninguém sabia como ${word} corretamente naquela situação.`,
    `A equipe precisou ${word} antes do início do experimento.`,
    `Eles conseguiram ${word} sem nenhuma dificuldade.`,
    `O especialista ensinou os alunos a ${word}.`,
    `Depois de alguns minutos, todos começaram a ${word}.`,
    `Foi necessário ${word} o equipamento antes do uso.`,
    `Os trabalhadores costumavam ${word} durante a madrugada.`,
    `Ela aprendeu a ${word} ainda durante a infância.`,
    `O técnico conseguiu ${word} o sistema sem interromper o trabalho.`,
    `Tentaram ${word} várias vezes, mas não obtiveram sucesso.`,
    `Ninguém conseguiu ${word} aquela estrutura sozinho.`,
    `Os estudantes foram orientados a ${word} com cuidado.`,
    `Ele decidiu ${word} antes que fosse tarde demais.`,
    `A equipe precisava ${word} rapidamente para concluir a tarefa.`,
    `Todos aprenderam a ${word} seguindo o mesmo procedimento.`,
    `Foi difícil ${word}, mas o resultado compensou o esforço.`,
    `Os especialistas voltaram ao local para ${word} novamente.`,
  ],

  adjetivo: (word, action, nome1, nome2) => [
    `O material ficou mais ${word} após o tratamento.`,
    `Sua abordagem era notavelmente ${word}.`,
    `O resultado final estava perfeitamente ${word}.`,
    `Consideravam aquele método muito ${word}.`,
    `Ficou mais ${word} após o tratamento.`,
    `Era notavelmente ${word}.`,
    `O comportamento daquele animal parecia bastante ${word}.`,
    `A superfície tornou-se extremamente ${word} com o tempo.`,
    `O novo equipamento era surpreendentemente ${word}.`,
    `A solução encontrada foi considerada ${word} pelos especialistas.`,
    `O ambiente ficou completamente ${word} depois da mudança.`,
    `Seu trabalho era reconhecido por ser excepcionalmente ${word}.`,
    `A estrutura permaneceu ${word} mesmo depois do impacto.`,
    `O resultado parecia pouco ${word} para os pesquisadores.`,
    `A técnica produziu um efeito muito ${word}.`,
    `O objeto apresentava um aspecto incomum e ${word}.`,
    `A região tornou-se cada vez mais ${word} durante o inverno.`,
    `O mecanismo continuou ${word} mesmo após anos de uso.`,
    `A explicação parecia estranhamente ${word}.`,
    `O comportamento do paciente foi considerado ${word} pela equipe.`,
    `A nova versão ficou mais ${word} que a anterior.`,
    `O método revelou-se bastante ${word} na prática.`,
    `A situação tornou-se especialmente ${word} durante a noite.`,
    `O resultado foi tão ${word} que ninguém esperava.`,
    `O posicionamento do ${nome1} na TF foi ${word}`,
  ],

  adverbio: (word, action, nome1, nome2) => [
    `Trabalhou ${word}mente durante toda a manhã.`,
    `Explicou o processo ${word} e com paciência.`,
    `Resolveu a questão ${word}, sem pressa.`,
    `Conduziu a cerimônia ${word}, respeitando as tradições.`,
    `Bugou o ${word} da forma mais adequada.`,
    `O ${nome1} pickou ${word} na ranked do lol.`,
    `O técnico ajustou o equipamento ${word}.`,
    `A equipe do ${nome1} avançou ${word} pelo corredor.`,
    `Ele respondeu ${word} à pergunta.`,
    `Os pesquisadores analisaram os dados ${word}.`,
    `A máquina funcionou ${word} durante o experimento.`,
    `Ela organizou os documentos ${word}.`,
    `O grupo trabalhou ${word} até o fim da tarde.`,
    `O atleta executou o movimento ${word}.`,
    `O professor explicou a questão ${word}.`,
    `A equipe resolveu o problema ${word}.`,
    `Ele conduziu o veículo ${word} pela estrada.`,
    `Os músicos tocaram ${word} durante a apresentação.`,
    `A criança caminhou ${word} pelo jardim.`,
    `O pesquisador examinou a amostra ${word}.`,
    `Eles concluíram o experimento ${word}.`,
    `O operador controlou o sistema ${word}.`,
    `A cerimônia terminou ${word}.`,
    `O jogador reagiu ${word} à situação.`,
    `O ${nome1} feedou de maneira ${word}. `,
  ],
};

const TYPE_LABELS = {
  substantivo: 'subst.',
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
  const p = palavra.toLowerCase();
  const vogais = 'aeiou';
  let indice = 0;
  let inicioDaSilaba = '';

  // Guarda o ataque (as consoantes antes da primeira vogal) na primeira
  // sílaba. As palavras Junja sempre começam com uma consoante, mas esta
  // regra também torna a função segura para palavras externas.
  while (indice < p.length && !vogais.includes(p[indice])) {
    inicioDaSilaba += p[indice];
    indice += 1;
  }

  const resultado = [];

  while (indice < p.length) {
    let nucleo = '';
    while (indice < p.length && vogais.includes(p[indice])) nucleo += p[indice++];

    let consoantes = '';
    while (indice < p.length && !vogais.includes(p[indice])) consoantes += p[indice++];

    // No fim da palavra, a consoante fecha a última sílaba: "jun", "son".
    // Entre vogais, a última consoante abre a próxima sílaba; as anteriores
    // fecham a atual: "jun-ja", "jom-ber-son".
    if (indice === p.length) {
      resultado.push(inicioDaSilaba + nucleo + consoantes);
      break;
    }

    resultado.push(inicioDaSilaba + nucleo + consoantes.slice(0, -1));
    inicioDaSilaba = consoantes.slice(-1);
  }

  return resultado.filter(Boolean).join(' • ') || p;
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
  const [ref3, ref4] = amostrarSemReposicao(NOME, 2);
  const nome1 = ref3;
  const nome2 = ref4 !== undefined ? ref4 : ref3;
  // No original em Python, só word1 é sempre minúsculo -- word2 mantém a
  // caixa original da palavra de referência quando existem 2 distintas.
  const word2 = ref2.toLowerCase() !== undefined ? ref2.toLowerCase() : ref1.toLowerCase();

  const action = escolherAleatorio(ACTIONS);

  const definicao = template
    .replaceAll('{word1}', word1)
    .replaceAll('{word2}', word2)
    .replaceAll('{action}', action)
    .replaceAll('{nome1}', nome1)
    .replaceAll('{nome2}', nome2)

  const exemplosDoTipo = EXAMPLES[tipo](palavra, action, nome1, nome2);
  const exemplo = escolherAleatorio(exemplosDoTipo);

  return {
    tipo: TYPE_LABELS[tipo] ?? 'subst.',
    pronuncia: gerarPronuncia(palavra),
    definicao: definicao.charAt(0).toUpperCase() + definicao.slice(1),
    exemplo,
  };
}

if (typeof module !== 'undefined') {
  module.exports = { gerarPronuncia };
}
