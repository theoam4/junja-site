# Junja — gerador de palavras sem sentido

## Desenvolvimento local (sem commit)

Cada membro do time pode visualizar e testar as alterações no próprio
computador, sem fazer commit nem enviar código para o GitHub. Para iniciar a
prévia local:

```bash
git checkout develop
git pull origin develop
./scripts/dev.sh
```

Abra [http://127.0.0.1:8000](http://127.0.0.1:8000) no navegador. Edite
qualquer arquivo do site e recarregue a página para ver o resultado na hora.
Nada dessa etapa é publicado: o servidor lê diretamente os arquivos da sua
máquina. Encerre-o com `Ctrl+C`.

Se a porta 8000 já estiver ocupada, escolha outra porta:

```bash
./scripts/dev.sh 8001
```

Também é possível abrir `index.html` diretamente, mas o servidor local é a
forma recomendada para testar o comportamento real de scripts e áudio.

## Fluxo de branches e deploy

1. Faça as alterações e os testes locais em `develop`, sem necessidade de
   commit para enxergá-las no navegador.
2. Quando quiser compartilhar o trabalho com o time, crie um commit e envie a
   branch com `git push origin develop`. A Vercel cria um **preview**; ele não
   altera o site público.
3. Depois de validar o preview, abra um pull request de `develop` para `main`.
4. Ao fazer merge (ou push) na `main`, a Vercel faz o deploy de **produção** e
   atualiza https://junja-site.vercel.app.

Não faça deploy manual pela CLI para publicar mudanças normais: a `main` é a
fonte de verdade da produção. Outras branches também recebem previews, nunca o
alias público.

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
