/**
 * app.js
 * -----------------------------------------------------------------------
 * Interação da página: botão Junja, áudio, painel de significado e
 * histórico da sessão.
 * -----------------------------------------------------------------------
 */

const wordText = document.getElementById('wordText');
const audioBtn = document.getElementById('audioBtn');
const junjaBtn = document.getElementById('junjaBtn');
const historySection = document.getElementById('historySection');
const historyChips = document.getElementById('historyChips');

const meaningWord = document.getElementById('meaningWord');
const meaningPronuncia = document.getElementById('meaningPronuncia');
const meaningTipo = document.getElementById('meaningTipo');
const meaningDefinicao = document.getElementById('meaningDefinicao');
const meaningExemploLabel = document.getElementById('meaningExemploLabel');
const meaningExemplo = document.getElementById('meaningExemplo');

const MAX_HISTORICO = 8;
let historico = [];
let palavraAtualExibida = null;

// --- Palavra principal + significado -----------------------------------

function exibirPalavra(palavra) {
  wordText.classList.add('fade');
  setTimeout(() => {
    wordText.textContent = palavra;
    wordText.classList.remove('fade');
  }, 120);

  palavraAtualExibida = palavra;
  audioBtn.disabled = false;

  adicionarAoHistorico(palavra);
  exibirSignificado(palavra);
}

function exibirSignificado(palavra) {
  const significado = gerarSignificado(palavra);

  meaningWord.textContent = `📖 ${palavra.toUpperCase()}`;
  meaningPronuncia.textContent = `Pronúncia: [${significado.pronuncia}]`;
  meaningTipo.textContent = `Tipo: ${significado.tipo}`;
  meaningDefinicao.textContent = significado.definicao;
  meaningExemploLabel.textContent = 'Exemplo:';
  meaningExemplo.textContent = `"${significado.exemplo}"`;
}

junjaBtn.addEventListener('click', () => {
  const palavra = gerarPalavra();
  exibirPalavra(palavra);
});

// --- Áudio (Web Speech API) -------------------------------------------

function falarPalavra(palavra) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(palavra);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.85;

  audioBtn.classList.add('playing');
  utterance.onend = () => audioBtn.classList.remove('playing');
  utterance.onerror = () => audioBtn.classList.remove('playing');

  window.speechSynthesis.speak(utterance);
}

audioBtn.addEventListener('click', () => {
  if (palavraAtualExibida) falarPalavra(palavraAtualExibida);
});

if (!('speechSynthesis' in window)) {
  audioBtn.title = 'Áudio não suportado neste navegador';
}

// --- Histórico da sessão ----------------------------------------------

function adicionarAoHistorico(palavra) {
  historico.unshift(palavra);
  historico = historico.slice(0, MAX_HISTORICO);
  renderizarHistorico();
}

function renderizarHistorico() {
  if (historico.length === 0) {
    historySection.hidden = true;
    return;
  }
  historySection.hidden = false;
  historyChips.innerHTML = '';
  for (const palavra of historico) {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = palavra;
    historyChips.appendChild(chip);
  }
}
