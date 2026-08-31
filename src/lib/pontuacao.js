// Pontuação e classificação em perfis.
//
// As respostas são guardadas por id de pergunta, e a pontuação é sempre
// recalculada do zero a partir delas. É isso que faz o botão "voltar"
// funcionar sem contabilidade: trocar uma resposta não precisa subtrair peso
// nenhum, porque nada foi acumulado em lugar nenhum.

import { QUESTIONS, MAPA_PERFIL_PERGUNTAS, Q9_MAP } from '../data/quiz'

export const PERFIS = ['profile1', 'profile2', 'profile3', 'profile4']

function zerado() {
  return { profile1: 0, profile2: 0, profile3: 0, profile4: 0 }
}

function alternativa(questionId, answerId) {
  const q = QUESTIONS.find((x) => x.id === questionId)
  if (!q) return null
  return q.answers.find((a) => a.id === answerId) || null
}

// respostas: { [questionId]: answerId }
export function calcularPontuacao(respostas) {
  const scores = zerado()

  Object.entries(respostas).forEach(([questionId, answerId]) => {
    const alt = alternativa(Number(questionId), answerId)
    if (!alt) return
    Object.entries(alt.scores).forEach(([perfil, pontos]) => {
      scores[perfil] += pontos
    })
  })

  return scores
}

// Quanto um perfil somou apenas nas perguntas que são a casa dele. Segundo
// critério de desempate.
function pontosNasPerguntasDoPerfil(perfil, respostas) {
  const casa = MAPA_PERFIL_PERGUNTAS[perfil] || []
  let total = 0

  casa.forEach((questionId) => {
    const alt = alternativa(questionId, respostas[questionId])
    if (alt && alt.scores[perfil]) total += alt.scores[perfil]
  })

  return total
}

// Ordem de desempate final. Ausência de critérios e de elaboração pessoal é a
// questão mais estrutural da escolha, então ela vem primeiro.
const PRIORIDADE = ['profile1', 'profile2', 'profile3', 'profile4']

// ─── Escolha construída ──────────────────────────────────────────────────────
// O quinto resultado, e o único que não encaminha pra processo nenhum.
//
// Sem ele o quiz não tem piso: a pergunta 9 sempre dá 3 pontos pra alguém, e o
// pai cujo filho já resolveu receberia um dos quatro pontos de atenção,
// escolhido só pelo que ele marcou na última pergunta. Ele leria o diagnóstico
// contradizendo as próprias respostas.
//
// Por isso a conta ignora a pergunta 9 e olha só as oito primeiras, que são as
// que descrevem o filho.
const Q_SEM_9 = QUESTIONS.filter((q) => q.id !== 9)

const BASE_MAXIMA = 3   // soma máxima nas oito primeiras
const PESO_MAXIMO = 3   // nenhuma resposta pode valer isto

function escolhaConstruida(respostas) {
  let base = 0
  let maior = 0

  for (const q of Q_SEM_9) {
    const alt = alternativa(q.id, respostas[q.id])
    // Quiz incompleto não pode cair aqui: sem resposta a soma seria zero e
    // qualquer um receberia "está tudo certo".
    if (!alt) return false

    const peso = Object.values(alt.scores).reduce((s, v) => s + v, 0)
    base += peso
    if (peso > maior) maior = peso
  }

  // As duas travas juntas. A soma sozinha deixaria passar quem marcou uma
  // resposta de 3 pontos, tipo "ainda não faz ideia do que quer fazer", e D no
  // resto. Esse pai apontou um problema grande e não pode receber que está
  // tudo certo.
  return base <= BASE_MAXIMA && maior < PESO_MAXIMO
}

export function calcularResultado(respostas) {
  const scores = calcularPontuacao(respostas)

  if (escolhaConstruida(respostas)) {
    return { perfil: 'profile5', scores }
  }
  const maior = Math.max(...PERFIS.map((p) => scores[p]))
  const empatados = PERFIS.filter((p) => scores[p] === maior)

  if (empatados.length === 1) {
    return { perfil: empatados[0], scores }
  }

  // 1) A pergunta 9 é a única em que a própria pessoa aponta o perfil, ao dizer
  //    o que mais a preocupa. Se o perfil dela está entre os empatados, ganha.
  const doQ9 = Q9_MAP[respostas[9]]
  if (doQ9 && empatados.includes(doQ9)) {
    return { perfil: doQ9, scores }
  }

  // 2) Entre os que sobraram, ganha quem pontuou mais nas perguntas que são a
  //    casa dele.
  let melhores = empatados
  const porCasa = empatados.map((p) => pontosNasPerguntasDoPerfil(p, respostas))
  const maiorCasa = Math.max(...porCasa)
  melhores = empatados.filter((_, i) => porCasa[i] === maiorCasa)

  if (melhores.length === 1) {
    return { perfil: melhores[0], scores }
  }

  // 3) Prioridade fixa.
  return { perfil: PRIORIDADE.find((p) => melhores.includes(p)), scores }
}
