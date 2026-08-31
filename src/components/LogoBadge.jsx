import { C } from '../theme'

export default function LogoBadge() {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: C.bordo,
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '6px 18px 6px 10px',
      borderRadius: 100,
    }}>
      {/* BASE_URL resolve tanto na raiz de um domínio quanto na subpasta do
          GitHub Pages, que é onde o quiz vai ficar. */}
      <img src={`${import.meta.env.BASE_URL}logo-rumo.png`} alt="" style={{ height: 16, width: 'auto' }} />
      Instituto Rumo
    </div>
  )
}
