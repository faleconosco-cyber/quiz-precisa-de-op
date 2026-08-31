import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import LogoBadge from './LogoBadge'
import { INTRO } from '../data/quiz'
import { C, serif } from '../theme'

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        background: C.blush,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'fixed', top: -120, right: -80,
        width: 340, height: 340, borderRadius: '50%',
        background: 'rgba(253,116,93,0.12)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: -80, left: -70,
        width: 260, height: 260, borderRadius: '50%',
        background: 'rgba(59,80,63,0.09)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 400, width: '100%', textAlign: 'center' }}>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 30 }}
        >
          <LogoBadge />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.7rem, 5.8vw, 2.25rem)',
            fontWeight: 800,
            color: C.preto,
            lineHeight: 1.25,
            marginBottom: 22,
          }}
        >
          {INTRO.titulo}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          style={{
            fontSize: 15,
            color: C.texto,
            lineHeight: 1.75,
            marginBottom: 36,
            fontWeight: 500,
          }}
        >
          {INTRO.paragrafos.map((p, i) => (
            <p key={i} style={{ margin: i === INTRO.paragrafos.length - 1 ? 0 : '0 0 10px' }}>{p}</p>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.34 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            width: '100%',
            padding: '20px 32px',
            background: C.coral,
            color: '#fff',
            border: 'none',
            borderRadius: 18,
            fontSize: 15.5,
            fontWeight: 800,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            boxShadow: '0 10px 36px rgba(253,116,93,0.38)',
          }}
        >
          {INTRO.botao}
          <ArrowRight size={18} strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.div>
  )
}
