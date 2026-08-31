import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PROCESSAMENTO } from '../data/quiz'
import { C, serif } from '../theme'

const POR_FRASE = 1100   // ms em cada frase
const PAUSA_FINAL = 900  // ms na frase "seu resultado está pronto"

// Tela de espera curta entre a última pergunta e o resultado. Ela existe pra
// dar peso ao diagnóstico: resultado que aparece no mesmo instante do clique
// parece tabela pronta, não leitura das respostas.
export default function ProcessingScreen({ onDone }) {
  const [i, setI] = useState(0)
  const [pronto, setPronto] = useState(false)

  // Guardado em ref para a animação não recomeçar do zero se o componente pai
  // renderizar de novo e recriar a função.
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const timers = []

    PROCESSAMENTO.frases.forEach((_, idx) => {
      if (idx === 0) return
      timers.push(setTimeout(() => setI(idx), POR_FRASE * idx))
    })

    const fim = POR_FRASE * PROCESSAMENTO.frases.length
    timers.push(setTimeout(() => setPronto(true), fim))
    timers.push(setTimeout(() => done.current(), fim + PAUSA_FINAL))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 28px',
        background: C.blush,
        textAlign: 'center',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        style={{
          width: 44, height: 44,
          borderRadius: '50%',
          border: `3px solid ${C.bordo}22`,
          borderTopColor: C.bordo,
          marginBottom: 28,
        }}
      />

      <h2 style={{
        fontFamily: serif,
        fontSize: 'clamp(1.2rem, 4.6vw, 1.4rem)',
        fontWeight: 700,
        color: C.preto,
        marginBottom: 18,
      }}>
        {pronto ? PROCESSAMENTO.fim : PROCESSAMENTO.titulo}
      </h2>

      <div style={{ minHeight: 48, maxWidth: 340 }}>
        <AnimatePresence mode="wait">
          {!pronto && (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 14, color: C.texto, lineHeight: 1.65, fontWeight: 500, margin: 0 }}
            >
              {PROCESSAMENTO.frases[i]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
