// Conteúdo do quiz: perguntas, alternativas e pesos.
//
// Fica separado da lógica de propósito. Trocar uma pergunta, reescrever uma
// alternativa ou ajustar um peso não deve exigir mexer em componente nenhum.
//
// Os pesos são cumulativos por perfil. Uma alternativa pode pontuar em mais de
// um perfil ao mesmo tempo, e a alternativa "D" de quase todas não pontua em
// nada: ela descreve a escolha já construída, que é justamente a ausência de
// ponto de atenção.
//
// Os textos foram apertados sem mexer no que cada alternativa pergunta: a
// mesma resposta continua valendo o mesmo peso e apontando o mesmo perfil.

export const QUIZ_SLUG = 'precisa-de-op'

export const INTRO = {
  titulo: 'Descubra se seu filho precisa de Orientação Profissional',
  paragrafos: [
    'Seu filho pode até já ter uma profissão ou curso em mente.',
    'Mas será que essa escolha está realmente madura?',
    'Responda algumas perguntas rápidas e descubra qual ponto da decisão profissional dele merece mais atenção antes da faculdade.',
  ],
  botao: 'Começar o quiz',
}

export const CAPTURA = {
  paragrafos: [
    'Já encontramos alguns sinais importantes sobre a escolha do seu filho.',
    'Agora vamos cruzar suas respostas para identificar qual ponto dessa decisão merece mais atenção neste momento.',
    'Preencha seus dados para continuar e receber seu diagnóstico ao final.',
  ],
  consentimento:
    'Concordo em receber meu resultado e conteúdos relacionados à escolha profissional pelos dados informados.',
  botao: 'Continuar meu diagnóstico',
  microtexto:
    'Seus dados serão utilizados para enviar informações relacionadas ao resultado deste quiz. Você poderá solicitar a saída da lista quando quiser.',
}

export const PROCESSAMENTO = {
  titulo: 'Analisando suas respostas...',
  frases: [
    'Observando como essa escolha está sendo construída...',
    'Cruzando autoconhecimento, pesquisa e critérios de decisão...',
    'Identificando o principal ponto de atenção...',
  ],
  fim: 'Seu resultado está pronto.',
}

// A captura entra depois desta pergunta e não conta como etapa da barra.
export const CAPTURA_APOS = 3

export const QUESTIONS = [
  {
    id: 1,
    question: 'Quando vocês conversam sobre faculdade e profissão, seu filho...',
    answers: [
      { id: 'A', text: 'Ainda não faz ideia do que quer fazer.', scores: { profile1: 3 } },
      { id: 'B', text: 'Tem algumas opções, mas muda de ideia com frequência.', scores: { profile1: 2 } },
      { id: 'C', text: 'Já tem uma opção preferida, mas ainda demonstra dúvidas.', scores: { profile1: 1 } },
      { id: 'D', text: 'Parece bastante decidido sobre o que quer.', scores: {} },
    ],
  },
  {
    id: 2,
    question:
      'Se você perguntasse hoje por que ele quer esse curso ou essa profissão, qual resposta chegaria mais perto?',
    answers: [
      { id: 'A', text: '"Não sei direito. Só acho que combina comigo."', scores: { profile1: 2, profile3: 1 } },
      { id: 'B', text: '"Porque eu gosto dessa área ou dessa matéria."', scores: { profile3: 2 } },
      { id: 'C', text: 'Explicaria alguns motivos, mas de forma genérica.', scores: { profile1: 1 } },
      { id: 'D', text: 'Explicaria com clareza o que considera importante nessa escolha.', scores: {} },
    ],
  },
  {
    id: 3,
    question: 'Quanto seu filho já pesquisou sobre o curso ou as profissões que considera?',
    answers: [
      { id: 'A', text: 'Quase nada.', scores: { profile2: 3 } },
      { id: 'B', text: 'Viu vídeos e redes sociais, conversou informalmente.', scores: { profile2: 2 } },
      { id: 'C', text: 'Pesquisou faculdades, mercado e características da profissão.', scores: { profile2: 1 } },
      { id: 'D', text: 'Comparou cursos e grades, viu áreas de atuação e conversou com profissionais.', scores: {} },
    ],
  },
  {
    id: 4,
    question: 'Seu filho conhece a rotina REAL da profissão que pensa em seguir?',
    apoio: 'Não o salário, mas como são os dias, o ambiente de trabalho e os desafios da carreira.',
    answers: [
      { id: 'A', text: 'Não.', scores: { profile2: 3 } },
      { id: 'B', text: 'Muito superficialmente.', scores: { profile2: 2 } },
      { id: 'C', text: 'Conhece algumas coisas, nunca investigou a fundo.', scores: { profile2: 1 } },
      { id: 'D', text: 'Sim, pesquisou bastante ou conversou com gente da área.', scores: {} },
    ],
  },
  {
    id: 5,
    question: 'E sobre a faculdade: quanto ele sabe sobre o caminho até se formar?',
    answers: [
      { id: 'A', text: 'Pouco ou praticamente nada.', scores: { profile4: 3, profile2: 1 } },
      { id: 'B', text: 'Sabe quanto tempo dura e conhece algumas matérias.', scores: { profile4: 2 } },
      { id: 'C', text: 'Já olhou a grade curricular e pesquisou como funciona o curso.', scores: { profile4: 1 } },
      { id: 'D', text: 'Conhece a formação e já avaliou se toparia viver esse processo por anos.', scores: {} },
    ],
  },
  {
    id: 6,
    question:
      'Se ele descobrisse que várias matérias do curso são bem diferentes do que imaginava, qual seria a reação?',
    answers: [
      { id: 'A', text: 'Ficaria frustrado e talvez pensasse em desistir.', scores: { profile4: 2, profile2: 1 } },
      { id: 'B', text: 'Ficaria surpreso, porque ele ainda idealiza bastante o curso.', scores: { profile3: 2, profile2: 1 } },
      { id: 'C', text: 'Estranharia, mas tentaria entender melhor antes de decidir.', scores: { profile4: 1 } },
      { id: 'D', text: 'Não seria grande surpresa, ele já pesquisou bem a formação.', scores: {} },
    ],
  },
  {
    id: 7,
    question: 'O que parece pesar MAIS na escolha profissional dele hoje?',
    answers: [
      { id: 'A', text: 'O resultado: salário, reconhecimento, estabilidade ou estilo de vida.', scores: { profile4: 3 } },
      { id: 'B', text: 'A imagem da profissão: "sempre me imaginei fazendo isso".', scores: { profile3: 3 } },
      { id: 'C', text: 'Gostar de determinadas matérias, assuntos ou atividades.', scores: { profile3: 1, profile1: 1 } },
      { id: 'D', text: 'Uma combinação de interesses, habilidades, valores, rotina e possibilidades reais.', scores: {} },
    ],
  },
  {
    id: 8,
    question: 'Quanto seu filho conhece sobre si mesmo para sustentar essa escolha?',
    apoio: 'Interesses, habilidades, valores e o tipo de vida que ele quer construir.',
    answers: [
      { id: 'A', text: 'Muito pouco. Nunca parou pra pensar nisso a fundo.', scores: { profile1: 3 } },
      { id: 'B', text: 'Sabe dizer do que gosta, mas não vai além disso.', scores: { profile1: 2 } },
      { id: 'C', text: 'Reconhece algumas características e critérios importantes.', scores: { profile1: 1 } },
      { id: 'D', text: 'Tem clareza sobre si e relaciona isso com a escolha.', scores: {} },
    ],
  },
  {
    id: 9,
    question: 'Qual dessas situações mais preocuparia você hoje?',
    answers: [
      { id: 'A', text: 'Ele entrar na faculdade e perceber depois que escolheu sem pensar o suficiente.', scores: { profile1: 3 } },
      { id: 'B', text: 'Descobrir, já dentro do curso, que a formação é bem diferente do que imaginava.', scores: { profile2: 3 } },
      { id: 'C', text: 'Perceber que a profissão que idealizou não combina tanto com quem ele é.', scores: { profile3: 3 } },
      { id: 'D', text: 'Passar anos perseguindo um resultado sem gostar do caminho até ele.', scores: { profile4: 3 } },
    ],
  },
]

// Perguntas mais diretamente ligadas a cada perfil. Serve para o segundo
// critério de desempate: entre perfis empatados, ganha quem pontuou mais nas
// perguntas que são a casa dele.
export const MAPA_PERFIL_PERGUNTAS = {
  profile1: [1, 2, 8, 9],
  profile2: [3, 4, 6, 9],
  profile3: [2, 6, 7, 9],
  profile4: [5, 6, 7, 9],
}

// A pergunta 9 é a única em que a pessoa aponta o perfil diretamente, ao dizer
// o que mais a preocupa. Por isso ela é o primeiro critério de desempate.
export const Q9_MAP = {
  A: 'profile1',
  B: 'profile2',
  C: 'profile3',
  D: 'profile4',
}
