import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { CAPTURA } from '../data/quiz'
import { C, serif } from '../theme'

// Família expatriada é público recorrente do Rumo: o filho estuda fora e presta
// vestibular no Brasil. Sem o seletor, esse lead escreve o número torto ou
// desiste na validação.
const DDI_OPTIONS = [
  { code: '+55', label: 'Brasil +55' },
  { code: '+351', label: 'Portugal +351' },
  { code: '+1', label: 'EUA/Canadá +1' },
  { code: '+34', label: 'Espanha +34' },
  { code: '+44', label: 'Reino Unido +44' },
  { code: '+49', label: 'Alemanha +49' },
  { code: '+33', label: 'França +33' },
  { code: '+39', label: 'Itália +39' },
  { code: '+54', label: 'Argentina +54' },
  { code: '+598', label: 'Uruguai +598' },
  { code: '+595', label: 'Paraguai +595' },
]

// A máscara (XX) XXXXX-XXXX só faz sentido em número brasileiro. Aplicá-la a um
// número de Portugal transformaria um telefone válido em erro de validação.
function formatar(valor, ddi) {
  const d = valor.replace(/\D/g, '')
  if (ddi !== '+55') return d.slice(0, 15)

  const n = d.slice(0, 11)
  if (n.length <= 2) return n
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
}

function telefoneValido(valor, ddi) {
  const d = valor.replace(/\D/g, '')
  return ddi === '+55' ? d.length === 10 || d.length === 11 : d.length >= 8
}

export default function CaptureScreen({ onSubmit }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [ddi, setDdi] = useState('+55')
  const [whatsapp, setWhatsapp] = useState('')
  const [consentimento, setConsentimento] = useState(false)

  const valido =
    nome.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(email) &&
    telefoneValido(whatsapp, ddi) &&
    consentimento

  function handleDdi(novo) {
    setDdi(novo)
    // Reformata o que já foi digitado: quem troca o país depois de digitar não
    // pode ficar com a máscara do país anterior grudada no número.
    setWhatsapp((atual) => formatar(atual, novo))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!valido) return
    onSubmit({
      nome: nome.trim(),
      email: email.trim(),
      ddi,
      whatsapp: `${ddi} ${whatsapp.trim()}`,
      consentimento: true,
    })
  }

  const inputStyle = {
    width: '100%',
    padding: '16px',
    fontSize: 15,
    fontWeight: 500,
    color: C.preto,
    background: '#fff',
    border: '2px solid rgba(0,0,0,0.08)',
    borderRadius: 14,
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <motion.div
      key="capture"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: C.blush,
      }}
    >
      {/* A barra fica parada nos 33% da pergunta 3: a captura não é etapa
          numerada do quiz e não pode dar a sensação de que atrasou o progresso. */}
      <div style={{ background: 'rgba(0,0,0,0.08)', height: 5 }}>
        <div style={{ height: '100%', width: '33%', background: C.bordo, borderRadius: '0 4px 4px 0' }} />
      </div>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '36px 24px 48px',
      }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <div style={{ marginBottom: 26 }}>
            <h2 style={{
              fontFamily: serif,
              fontSize: 'clamp(1.25rem, 4.8vw, 1.5rem)',
              fontWeight: 700,
              color: C.preto,
              lineHeight: 1.35,
              marginBottom: 14,
            }}>
              {CAPTURA.paragrafos[0]}
            </h2>
            {CAPTURA.paragrafos.slice(1).map((p, i) => (
              <p key={i} style={{
                fontSize: 14, color: C.texto, lineHeight: 1.7,
                fontWeight: 500, margin: '0 0 10px',
              }}>
                {p}
              </p>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              style={inputStyle}
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              style={inputStyle}
              type="email"
              autoComplete="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <select
                value={ddi}
                onChange={(e) => handleDdi(e.target.value)}
                style={{ ...inputStyle, width: 'auto', flexShrink: 0, paddingRight: 8 }}
              >
                {DDI_OPTIONS.map((d) => (
                  <option key={d.code} value={d.code}>{d.label}</option>
                ))}
              </select>
              <input
                style={inputStyle}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder={ddi === '+55' ? '(21) 99999-9999' : 'WhatsApp'}
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatar(e.target.value, ddi))}
              />
            </div>

            <label style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              cursor: 'pointer', marginTop: 4,
            }}>
              <input
                type="checkbox"
                checked={consentimento}
                onChange={(e) => setConsentimento(e.target.checked)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                width: 22, height: 22, flexShrink: 0, marginTop: 1,
                borderRadius: 6,
                border: `2px solid ${consentimento ? C.verde : 'rgba(0,0,0,0.18)'}`,
                background: consentimento ? C.verde : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}>
                {consentimento && <Check size={14} color="#fff" strokeWidth={3} />}
              </span>
              <span style={{ fontSize: 12.5, color: C.texto, lineHeight: 1.55, fontWeight: 500 }}>
                {CAPTURA.consentimento}
              </span>
            </label>

            <motion.button
              type="submit"
              whileHover={valido ? { scale: 1.02 } : {}}
              whileTap={valido ? { scale: 0.97 } : {}}
              disabled={!valido}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: '100%',
                padding: '19px 28px',
                background: valido ? C.coral : 'rgba(0,0,0,0.15)',
                color: '#fff',
                border: 'none',
                borderRadius: 18,
                fontSize: 15,
                fontWeight: 800,
                cursor: valido ? 'pointer' : 'not-allowed',
                boxShadow: valido ? '0 10px 36px rgba(253,116,93,0.38)' : 'none',
                marginTop: 8,
              }}
            >
              {CAPTURA.botao}
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
          </form>

          <p style={{ fontSize: 11, color: '#aaa', marginTop: 16, fontWeight: 500, lineHeight: 1.6 }}>
            {CAPTURA.microtexto}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
