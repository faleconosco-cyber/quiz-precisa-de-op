// Integrações e dados do lead: UTMs, persistência contra refresh e envio.
//
// Tudo que fala com o mundo de fora mora aqui. Componente nenhum deve chamar
// fetch nem mexer em localStorage por conta própria.

import { QUIZ_SLUG } from '../data/quiz'

// ─── Envio ───────────────────────────────────────────────────────────────────
// Apps Script único dos quatro quizzes da bio. Ele grava na planilha, manda pro
// Brevo e chama a RPC criar_lead_quiz do CRM, que abre o cartão no funil.
// Substituir pela URL gerada em Implantar → Nova implantação → App da Web.
export const APPS_SCRIPT_URL = 'COLE_A_URL_AQUI'

export function sendLead(data) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'COLE_A_URL_AQUI') return

  // POST, não GET com payload na URL. O resultado deste quiz é texto longo, e o
  // Apps Script chamado por GET morre calado quando a URL passa de ~12 KB:
  // ninguém recebe erro, o lead simplesmente não chega. text/plain evita o
  // preflight que o modo no-cors não sobreviveria.
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ quiz: QUIZ_SLUG, ...data }),
  }).catch(() => {})
}

// ─── UTMs ────────────────────────────────────────────────────────────────────
// Lidos uma vez, na primeira visita, e guardados. Sem isso o parâmetro se
// perde no primeiro clique e todo lead vira "origem desconhecida".

const CHAVE_UTM = 'rumo.quiz.precisa-de-op.utm'
const CAMPOS_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export function capturarUtms() {
  let guardadas = {}
  try {
    guardadas = JSON.parse(localStorage.getItem(CHAVE_UTM) || '{}')
  } catch (e) {
    guardadas = {}
  }

  const daUrl = {}
  try {
    const params = new URLSearchParams(window.location.search)
    CAMPOS_UTM.forEach((c) => {
      const v = params.get(c)
      if (v) daUrl[c] = v
    })
  } catch (e) {
    // URL sem query ou ambiente sem window: segue com o que já estava guardado.
  }

  // A visita nova só sobrescreve se realmente trouxe UTM. Assim um refresh sem
  // parâmetro não apaga a origem de quem chegou pelo anúncio.
  const utms = Object.keys(daUrl).length ? daUrl : guardadas

  try {
    localStorage.setItem(CHAVE_UTM, JSON.stringify(utms))
  } catch (e) {
    // Navegador com armazenamento bloqueado: o quiz funciona, só perde a UTM.
  }

  return utms
}

export function referenciaDeOrigem() {
  try {
    return document.referrer || ''
  } catch (e) {
    return ''
  }
}

// ─── Persistência contra refresh ─────────────────────────────────────────────
// Um refresh acidental no meio do quiz não pode mandar a pessoa pro começo.
// Guarda tela, índice, respostas e lead. Some quando o quiz é reiniciado.

const CHAVE_ESTADO = 'rumo.quiz.precisa-de-op.estado'

export function salvarEstado(estado) {
  try {
    localStorage.setItem(CHAVE_ESTADO, JSON.stringify(estado))
  } catch (e) {
    // Sem armazenamento o quiz continua funcionando, só não sobrevive a refresh.
  }
}

export function lerEstado() {
  try {
    const bruto = localStorage.getItem(CHAVE_ESTADO)
    if (!bruto) return null
    const e = JSON.parse(bruto)
    if (!e || typeof e !== 'object') return null

    // A tela de processamento é passageira: quem der refresh nela volta pra
    // última pergunta, senão fica preso numa animação que já terminou.
    if (e.screen === 'processing') e.screen = 'questions'
    return e
  } catch (err) {
    return null
  }
}

export function limparEstado() {
  try {
    localStorage.removeItem(CHAVE_ESTADO)
  } catch (e) {
    // Nada a fazer.
  }
}
