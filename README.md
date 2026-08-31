# Quiz: Descubra se seu filho precisa de Orientação Profissional

Porta 1.2 da bio (`links.institutorumo.com`). Encaminha para o processo de
Primeira Escolha.

Nove perguntas, captura de lead depois da terceira, quatro perfis de resultado.
A pessoa nunca vê pontuação nem sabe qual perfil está sendo formado.

## O que falta pra subir

1. **URL do Apps Script** em `src/lib/lead.js`, linha 12 (`APPS_SCRIPT_URL`).
   Enquanto estiver `'COLE_A_URL_AQUI'`, o quiz funciona inteiro mas o lead não
   sai do navegador: não vai pra planilha, nem pro Brevo, nem pro CRM.
   O script fica em `../quizzes-bio/apps-script-quizzes.js` e atende os quatro
   quizzes da bio.
2. **Migration `012_quiz_multiplos_funis.sql`** aplicada no Supabase do CRM.
   Sem ela a RPC `criar_lead_quiz` ignora o campo `quiz` e todo lead cai como
   funil de adolescente com origem genérica.
3. **Repo no GitHub** e Pages a partir de `main` / `(root)`, com Enforce HTTPS.
4. **Card ativado na bio**, trocando o `<div class="cartao n1 breve">` por
   `<a href>` com a UTM `utm_content=quiz_precisa_de_op`.

## Como rodar

```bash
npm install
npm run dev
```

`npm test` roda a conferência da pontuação: os sete cenários de exemplo mais as
262.144 combinações possíveis de resposta, garantindo que toda combinação cai
num perfil válido.

## Estrutura

Conteúdo, lógica e integrações ficam separados de propósito, para reescrever
uma pergunta ou um resultado sem encostar em componente nenhum.

```
src/
  data/quiz.js         perguntas, alternativas, pesos, textos de tela
  data/resultados.js   os quatro perfis, o bloco comum e o aviso
  lib/pontuacao.js     soma dos perfis e as três regras de desempate
  lib/lead.js          envio, UTMs e persistência contra refresh
  lib/analytics.js     eventos (Meta Pixel, GA4, dataLayer)
  components/          uma tela por arquivo
  App.jsx              a máquina de estados
```

## Pontuação

Quatro variáveis somam em paralelo. Uma alternativa pode pontuar em mais de um
perfil. A alternativa "D" de quase todas as perguntas não pontua em nada: ela
descreve a escolha já construída.

A pontuação é **sempre recalculada do zero** a partir das respostas guardadas.
É isso que faz o botão "voltar" funcionar sem contabilidade nenhuma: trocar uma
alternativa não precisa subtrair peso, porque nada foi acumulado.

Desempate, nesta ordem:

1. o perfil apontado pela pergunta 9, se estiver entre os empatados;
2. quem somou mais nas perguntas que são a casa dele (`MAPA_PERFIL_PERGUNTAS`);
3. prioridade fixa P1 → P2 → P3 → P4.

## Decisões que fogem da especificação

- **Seletor de DDI.** A spec pedia só máscara brasileira `(XX) XXXXX-XXXX`.
  Família expatriada é público recorrente do Rumo, então existe o seletor de
  país e a máscara brasileira é aplicada **apenas** quando o DDI é `+55`.
  Aplicá-la a um número de Portugal transformaria telefone válido em erro.
- **Envio por POST.** O quiz 1.1 manda o payload na URL, por GET. Aqui o
  `resultadoTexto` tem cerca de 1.400 caracteres e o Apps Script chamado por GET
  morre calado quando a URL passa de ~12 KB. `text/plain` no POST evita o
  preflight que o modo `no-cors` não sobreviveria.
- **Sem interceptador de `fetch` no `index.html`.** No quiz 1.1 o Pixel lê o
  payload da URL para disparar `CompleteRegistration`. Aqui os eventos saem de
  `src/lib/analytics.js`, que é o lugar certo. Manter os dois dispararia o
  evento duas vezes.

## Eventos

`quiz_started`, `question_1..9_answered`, `lead_submitted`, `quiz_completed`,
`result_profile_1..4`, `whatsapp_clicked`.

No Meta Pixel, `lead_submitted` vira `Lead` e `quiz_completed` vira
`CompleteRegistration`. O resto vai como evento personalizado. O GA4 está
comentado no `index.html`: descomentar e trocar o ID quando ela decidir medir
este quiz no GA além do Pixel.
