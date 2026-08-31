import { motion } from 'framer-motion'
import { MessageCircle, RotateCcw } from 'lucide-react'
import LogoBadge from './LogoBadge'
import { BLOCO_COMUM, AVISO } from '../data/resultados'
import { C, serif } from '../theme'

const WA_PHONE = '5521990625330'

function mensagemWhatsApp(nomePerfil) {
  return `Olá! Fiz o quiz "Descubra se seu filho precisa de Orientação Profissional". Meu resultado foi: ${nomePerfil}. Gostaria de entender melhor como a Orientação Profissional pode ajudar meu filho.`
}

// Os textos dos resultados vêm em blocos tipados, para a tela conseguir montar
// qualquer perfil sem saber qual é.
function Blocos({ blocos }) {
  return blocos.map((b, i) => {
    if (b.tipo === 'p') {
      return (
        <p key={i} style={{
          fontSize: 14.5, color: C.texto, lineHeight: 1.8,
          fontWeight: 500, margin: '0 0 14px',
        }}>
          {b.texto}
        </p>
      )
    }

    if (b.tipo === 'citacoes') {
      return (
        <div key={i} style={{ margin: '0 0 16px', paddingLeft: 14, borderLeft: `3px solid ${C.coral}55` }}>
          {b.itens.map((c, j) => (
            <p key={j} style={{
              fontSize: 14.5, color: C.preto, lineHeight: 1.7,
              fontWeight: 600, fontStyle: 'italic', margin: '0 0 6px',
            }}>
              {c}
            </p>
          ))}
        </div>
      )
    }

    return (
      <ul key={i} style={{ margin: '0 0 16px', paddingLeft: 0, listStyle: 'none' }}>
        {b.itens.map((item, j) => (
          <li key={j} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            fontSize: 14, color: C.texto, lineHeight: 1.65,
            fontWeight: 500, marginBottom: 8,
          }}>
            <span style={{ color: C.coral, fontWeight: 900, flexShrink: 0, marginTop: -1 }}>•</span>
            {item}
          </li>
        ))}
      </ul>
    )
  })
}

export default function ResultScreen({ resultado, lead, onRestart, onWhatsApp }) {
  const primeiroNome = lead?.nome?.trim().split(' ')[0]

  function abrirWhatsApp() {
    if (onWhatsApp) onWhatsApp()
    window.open(
      `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(mensagemWhatsApp(resultado.nome))}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const botaoWhatsApp = (texto, chave) => (
    <motion.button
      key={chave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={abrirWhatsApp}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        padding: '20px',
        background: '#25D366',
        border: 'none',
        borderRadius: 18,
        fontSize: 14.5,
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1.35,
        cursor: 'pointer',
        boxShadow: '0 10px 28px rgba(37,211,102,0.34)',
        marginBottom: 14,
      }}
    >
      <MessageCircle size={20} strokeWidth={2.5} style={{ flexShrink: 0 }} />
      {texto}
    </motion.button>
  )

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      style={{
        minHeight: '100vh',
        background: C.blush,
        padding: '32px 20px 52px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'fixed', bottom: -80, right: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: 'rgba(59,80,63,0.08)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 440, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <LogoBadge />
          {primeiroNome && (
            <p style={{ marginTop: 12, fontSize: 14, color: C.texto, fontWeight: 600 }}>
              {primeiroNome}, seu resultado ficou pronto
            </p>
          )}
        </div>

        {/* Cartão do perfil */}
        <div style={{
          background: '#fff',
          borderRadius: 24,
          padding: '32px 26px',
          marginBottom: 14,
          boxShadow: '0 6px 32px rgba(0,0,0,0.07)',
        }}>
          <div style={{
            display: 'inline-block',
            background: `${C.coral}1F`,
            color: C.bordo,
            fontSize: 10, fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '6px 14px', borderRadius: 100,
            marginBottom: 16,
          }}>
            {resultado.indicador}
          </div>

          <p style={{
            fontSize: 11, fontWeight: 800, color: C.verde,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            margin: '0 0 8px',
          }}>
            {resultado.nome}
          </p>

          <h1 style={{
            fontFamily: serif,
            fontSize: 'clamp(1.3rem, 5vw, 1.6rem)',
            fontWeight: 800,
            color: C.preto,
            lineHeight: 1.35,
            margin: '0 0 22px',
          }}>
            {resultado.headline}
          </h1>

          <Blocos blocos={resultado.corpo} />
        </div>

        {/* O que merece atenção agora */}
        <div style={{
          background: '#fff',
          borderRadius: 24,
          padding: '30px 26px',
          marginBottom: 14,
          borderLeft: `5px solid ${C.coral}`,
          boxShadow: '0 6px 32px rgba(0,0,0,0.07)',
        }}>
          <h2 style={{
            fontFamily: serif,
            fontSize: 'clamp(1.1rem, 4.2vw, 1.3rem)',
            fontWeight: 700,
            color: C.preto,
            margin: '0 0 16px',
          }}>
            {resultado.atencao.titulo}
          </h2>
          <Blocos blocos={resultado.atencao.corpo} />
        </div>

        {/* Fechamento do perfil */}
        <div style={{
          background: C.verde,
          borderRadius: 24,
          padding: '28px 26px',
          marginBottom: 16,
        }}>
          <p style={{
            fontSize: 14.5, color: '#fff', lineHeight: 1.8,
            fontWeight: 500, margin: 0,
          }}>
            {resultado.fechamento}
          </p>
        </div>

        {/* O perfil 5 diz para não contratar nada agora. Botão de venda embaixo
            desse texto desmentiria o diagnóstico, então ele não aparece. */}
        {!resultado.semWhatsapp && botaoWhatsApp(resultado.cta, 'cta-perfil')}

        {/* Bloco comum, depois dos quatro resultados com ponto de atenção */}
        {!resultado.semBlocoComum && (
        <div style={{
          background: '#fff',
          borderRadius: 24,
          padding: '32px 26px',
          margin: '18px 0 14px',
          boxShadow: '0 6px 32px rgba(0,0,0,0.07)',
        }}>
          {BLOCO_COMUM.abertura.map((p, i) => (
            <p key={i} style={{
              fontSize: 14.5, color: C.texto, lineHeight: 1.8,
              fontWeight: 500, margin: '0 0 14px',
            }}>
              {p}
            </p>
          ))}

          <p style={{
            fontSize: 14.5, color: C.preto, lineHeight: 1.7,
            fontWeight: 700, margin: '0 0 14px',
          }}>
            {BLOCO_COMUM.listaTitulo}
          </p>

          <Blocos blocos={[{ tipo: 'lista', itens: BLOCO_COMUM.lista }]} />

          {BLOCO_COMUM.fechamento.map((p, i) => (
            <p key={i} style={{
              fontSize: 14.5, color: C.texto, lineHeight: 1.8,
              fontWeight: 500, margin: '0 0 14px',
            }}>
              {p}
            </p>
          ))}

          <p style={{
            fontFamily: serif,
            fontSize: 'clamp(1.1rem, 4.2vw, 1.28rem)',
            fontWeight: 700,
            color: C.bordo,
            lineHeight: 1.45,
            margin: 0,
          }}>
            {BLOCO_COMUM.pergunta}
          </p>
        </div>
        )}

        {!resultado.semWhatsapp && botaoWhatsApp(BLOCO_COMUM.cta, 'cta-comum')}

        <button
          onClick={onRestart}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '15px',
            background: 'transparent',
            border: '2px solid rgba(0,0,0,0.10)',
            borderRadius: 16,
            fontSize: 13,
            fontWeight: 700,
            color: '#aaa',
            cursor: 'pointer',
            marginBottom: 20,
          }}
        >
          <RotateCcw size={14} strokeWidth={2.5} />
          Refazer o quiz
        </button>

        <p style={{
          fontSize: 11, color: '#a89a95', lineHeight: 1.65,
          fontWeight: 500, textAlign: 'left', margin: '0 0 18px',
        }}>
          {AVISO}
        </p>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#c6b4ae', fontWeight: 500 }}>
          © Instituto Rumo · Orientação Profissional
        </p>
      </div>
    </motion.div>
  )
}
