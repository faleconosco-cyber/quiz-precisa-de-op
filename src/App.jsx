import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import { QUESTIONS, CAPTURA_APOS } from './data/quiz'
import { RESULTADOS, textoDoResultado } from './data/resultados'
import { calcularResultado } from './lib/pontuacao'
import { sendLead, capturarUtms, referenciaDeOrigem, salvarEstado, lerEstado, limparEstado } from './lib/lead'
import { track } from './lib/analytics'

import IntroScreen from './components/IntroScreen'
import QuestionScreen from './components/QuestionScreen'
import CaptureScreen from './components/CaptureScreen'
import ProcessingScreen from './components/ProcessingScreen'
import ResultScreen from './components/ResultScreen'

// Estados: intro → perguntas 1-3 → captura → perguntas 4-9 → processamento → resultado
const INICIAL = { screen: 'intro', index: 0, respostas: {}, lead: null, enviado: false }

export default function App() {
  const salvo = useRef(lerEstado()).current
  const [estado, setEstado] = useState(salvo || INICIAL)
  const utms = useRef(null)

  if (utms.current === null) utms.current = capturarUtms()

  const { screen, index, respostas, lead } = estado

  // Um refresh acidental no meio do quiz não pode mandar a pessoa pro começo.
  useEffect(() => { salvarEstado(estado) }, [estado])

  function atualizar(mudanca) {
    setEstado((e) => ({ ...e, ...mudanca }))
  }

  function comecar() {
    track('quiz_started')
    atualizar({ screen: 'questions', index: 0 })
  }

  function responder(answerId) {
    const questao = QUESTIONS[index]
    const novas = { ...respostas, [questao.id]: answerId }

    track(`question_${questao.id}_answered`, { resposta: answerId })

    // Captura no meio do caminho: quem já respondeu três perguntas investiu o
    // bastante para não abandonar, e ainda falta resultado para receber.
    if (index + 1 === CAPTURA_APOS && !lead) {
      setEstado((e) => ({ ...e, respostas: novas, screen: 'capture' }))
      return
    }

    if (index + 1 < QUESTIONS.length) {
      setEstado((e) => ({ ...e, respostas: novas, index: index + 1 }))
    } else {
      setEstado((e) => ({ ...e, respostas: novas, screen: 'processing' }))
    }
  }

  // A pontuação é sempre recalculada a partir das respostas, então voltar e
  // trocar uma alternativa não deixa peso antigo pendurado em lugar nenhum.
  function voltar() {
    if (index === 0) return
    atualizar({ index: index - 1 })
  }

  function capturar(dados) {
    track('lead_submitted')
    setEstado((e) => ({ ...e, lead: dados, index: CAPTURA_APOS, screen: 'questions' }))
  }

  function finalizar() {
    const { perfil, scores } = calcularResultado(respostas)
    const r = RESULTADOS[perfil]

    track('quiz_completed', { content_name: r.id })
    track(`result_${perfil}`)

    // Envio único: é ele que grava na planilha, entra no Brevo e abre o cartão
    // no CRM. A trava evita disparar de novo se a pessoa der refresh no
    // resultado.
    if (!estado.enviado) {
      sendLead({
        ...(lead || {}),
        status: 'completo',
        perfil: r.id,
        perfilChave: perfil,
        pontuacao: scores[perfil],
        pontuacoes: scores,
        resultadoTitulo: r.nome,
        resultadoTexto: textoDoResultado(r),
        respostas,
        ...utms.current,
        referrer: referenciaDeOrigem(),
        dataHora: new Date().toISOString(),
      })
    }

    setEstado((e) => ({ ...e, screen: 'results', enviado: true }))
  }

  function reiniciar() {
    limparEstado()
    setEstado(INICIAL)
  }

  const resultado = screen === 'results' ? RESULTADOS[calcularResultado(respostas).perfil] : null

  return (
    <AnimatePresence mode="wait">
      {screen === 'intro' && (
        <IntroScreen onStart={comecar} />
      )}

      {screen === 'questions' && (
        <QuestionScreen
          key={`q-${index}`}
          question={QUESTIONS[index]}
          index={index}
          total={QUESTIONS.length}
          respostaAtual={respostas[QUESTIONS[index].id]}
          onAnswer={responder}
          onBack={index > 0 ? voltar : null}
        />
      )}

      {screen === 'capture' && (
        <CaptureScreen onSubmit={capturar} />
      )}

      {screen === 'processing' && (
        <ProcessingScreen onDone={finalizar} />
      )}

      {screen === 'results' && resultado && (
        <ResultScreen
          resultado={resultado}
          lead={lead}
          onRestart={reiniciar}
          onWhatsApp={() => track('whatsapp_clicked', { content_name: resultado.id })}
        />
      )}
    </AnimatePresence>
  )
}
