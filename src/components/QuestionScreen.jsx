import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { C, serif } from '../theme'

// A barra mostra a pergunta atual sobre o total. A captura não é etapa
// numerada: ela congela o número em 33% e não mexe na conta.
function porcentagem(index, total) {
  return index + 1 === total ? 100 : Math.floor(((index + 1) / total) * 100)
}

export default function QuestionScreen({ question, index, total, respostaAtual, onAnswer, onBack }) {
  const [selected, setSelected] = useState(respostaAtual || null)

  // Ao voltar e avançar de novo, a tela precisa mostrar a resposta que já
  // estava marcada, em vez de nascer em branco.
  useEffect(() => { setSelected(respostaAtual || null) }, [question.id, respostaAtual])

  const progress = porcentagem(index, total)

  function handleSelect(answerId) {
    if (selected !== null && selected === answerId) return
    setSelected(answerId)
    // Pausa curta pra pessoa ver o que marcou antes da tela virar.
    setTimeout(() => onAnswer(answerId), 320)
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: C.blush,
      }}
    >
      <div style={{ background: 'rgba(0,0,0,0.08)', height: 5 }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: C.bordo, borderRadius: '0 4px 4px 0' }}
        />
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px 0', minHeight: 48,
      }}>
        {onBack ? (
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'transparent', border: 'none',
              color: C.bordo, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', padding: '8px 8px 8px 0',
            }}
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            Voltar
          </button>
        ) : <span />}

        <div style={{ fontSize: 11, color: '#aaa', fontWeight: 700 }}>
          {index + 1} de {total}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 20px 36px' }}>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: '28px 24px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
          borderLeft: `5px solid ${C.bordo}`,
          marginBottom: 20,
        }}>
          <p style={{
            fontFamily: serif,
            fontSize: 'clamp(1.15rem, 4.6vw, 1.35rem)',
            fontWeight: 700,
            color: C.preto,
            lineHeight: 1.4,
            margin: 0,
          }}>
            {question.question}
          </p>
          {question.apoio && (
            <p style={{
              margin: '12px 0 0',
              fontSize: 13,
              color: C.texto,
              lineHeight: 1.6,
              fontWeight: 500,
            }}>
              {question.apoio}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.answers.map((opt, i) => {
            const isSelected = selected === opt.id
            const isOther = selected !== null && !isSelected

            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: isOther ? 0.4 : 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.22 }}
                whileHover={{ scale: 1.012 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleSelect(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  // Altura confortável para toque, e as quatro alternativas
                  // nunca comprimidas: cada uma é um cartão.
                  minHeight: 62,
                  padding: '16px 18px',
                  background: isSelected ? C.coral : '#fff',
                  border: `2px solid ${isSelected ? C.coral : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 14,
                  textAlign: 'left',
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 6px 20px ${C.coral}40` : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: isSelected ? 'rgba(255,255,255,0.25)' : `${C.bordo}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800,
                  color: isSelected ? '#fff' : C.bordo,
                }}>
                  {opt.id}
                </div>
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: isSelected ? '#fff' : C.preto,
                  lineHeight: 1.45,
                }}>
                  {opt.text}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
