# Junja — gerador de palavras sem sentido

## Como abrir
Não precisa instalar nada. Descompacte a pasta e dê duplo clique em
**`index.html`** — abre direto no navegador.

(Se o navegador bloquear alguma coisa por segurança ao abrir como arquivo
local, rode um servidor bem simples dentro da pasta:
`python3 -m http.server 8000` e acesse `http://localhost:8000`.)

## O que tem nessa versão
- **Botão Junja** — gera uma palavra nova a cada clique
- **🔊 Ouvir** — lê a palavra em voz alta (usa a Web Speech API do navegador;
  funciona melhor no Chrome/Edge, pode não ter voz em português em todos
  os navegadores/sistemas)
- **Painel de significado** — pronúncia, tipo gramatical, definição e
  exemplo de uso "de mentirinha" pra cada palavra, no mesmo espírito de
  brincadeira do `main.py` original
- **Regras** — lista as regras que toda palavra gerada segue
- **Histórico** — mostra as últimas palavras geradas nesta visita
  (some ao recarregar a página)

## Estrutura dos arquivos
```
junja-site/
├── index.html      # estrutura da página (duas colunas: gerador + significado)
├── style.css        # visual (tema escuro, roxo, fonte com serifa na palavra)
├── generator.js      # motor de geração de palavras (porta do projeto Python)
├── meaning.js         # gerador de significado/definição/exemplo (porta de core/meaning_generator.py)
└── app.js             # interação: áudio, significado, histórico
```

## Sobre o gerador (`generator.js`)
É uma porta fiel para JavaScript da versão em Python já corrigida
(`core/utils.py`, `core/validator.py`, `generators/complex_generator.py`),
incluindo:
- a regra do `n` (proibido antes de `m`/`p`/`b`)
- o lookahead antes do sufixo (`n`/`son`), pra desperdiçar menos tentativas
- a mesma função central de regras fonéticas usada tanto pra gerar quanto
  pra validar, então as duas nunca ficam dessincronizadas

Se um dia vocês criarem a API em Python, o `generator.js` (e o
`meaning.js`) podem ser substituídos por uma chamada `fetch()` ao
endpoint, sem precisar mudar o resto da interface.
