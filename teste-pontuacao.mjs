// Conferência da pontuação. Roda com `npm test`.
//
// Não é teste unitário: é força bruta. Percorre todas as combinações possíveis
// de resposta e verifica que nenhuma delas cai fora dos perfis, e que o perfil
// 5, o único que manda não contratar nada, só sai para quem realmente não
// apontou problema nenhum.

import { QUESTIONS } from './src/data/quiz.js'
import { calcularResultado } from './src/lib/pontuacao.js'
import { RESULTADOS, textoDoResultado } from './src/data/resultados.js'

const r = (o) => { const m = {}; Object.entries(o).forEach(([k, v]) => m[Number(k)] = v); return m }
const todas = (letra) => Object.fromEntries(QUESTIONS.map(q => [q.id, letra]))
const peso = (a) => Object.values(a.scores).reduce((s, v) => s + v, 0)

const casos = [
  ['tudo A',                todas('A')],
  ['tudo B',                todas('B')],
  ['tudo C',                todas('C')],
  ['tudo D (filho resolvido)', todas('D')],
  ['pesquisa zero (P2)',    r({ 1:'D',2:'D',3:'A',4:'A',5:'C',6:'D',7:'D',8:'D',9:'B' })],
  ['idealizada (P3)',       r({ 1:'D',2:'B',3:'D',4:'D',5:'D',6:'B',7:'B',8:'D',9:'C' })],
  ['destino (P4)',          r({ 1:'D',2:'D',3:'D',4:'D',5:'A',6:'A',7:'A',8:'D',9:'D' })],
  ['quase tudo D, mas "não faz ideia" na 1', r({ 1:'A',2:'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'A' })],
  ['quase tudo D, um deslize de 1 ponto',    r({ 1:'C',2:'D',3:'D',4:'D',5:'D',6:'D',7:'D',8:'D',9:'A' })],
]

console.log('cenários de exemplo\n')
for (const [nome, resp] of casos) {
  const { perfil, scores } = calcularResultado(resp)
  console.log(nome.padEnd(42), '->', RESULTADOS[perfil].id, RESULTADOS[perfil].nome)
}

// ─── Força bruta ─────────────────────────────────────────────────────────────

let combos = 0
let semPerfil = 0
let p5 = 0
let p5Indevido = 0
const porPerfil = {}

function anda(i, acc) {
  if (i === QUESTIONS.length) {
    combos++
    const { perfil } = calcularResultado(acc)
    if (!RESULTADOS[perfil]) { semPerfil++; return }
    porPerfil[perfil] = (porPerfil[perfil] || 0) + 1

    if (perfil === 'profile5') {
      p5++
      // Nenhuma resposta das oito primeiras pode valer 3 pontos, e a soma
      // delas não pode passar de 3. Se passar, o perfil 5 estaria dizendo
      // "está tudo certo" para um pai que apontou problema.
      let base = 0
      let maior = 0
      for (const q of QUESTIONS) {
        if (q.id === 9) continue
        const p = peso(q.answers.find(a => a.id === acc[q.id]))
        base += p
        if (p > maior) maior = p
      }
      if (base > 3 || maior >= 3) p5Indevido++
    }
    return
  }
  for (const a of QUESTIONS[i].answers) anda(i + 1, { ...acc, [QUESTIONS[i].id]: a.id })
}
anda(0, {})

console.log('\nforça bruta')
console.log('  combinações testadas:  ', combos)
console.log('  sem perfil válido:     ', semPerfil)
console.log('  perfil 5 indevido:     ', p5Indevido)

console.log('\ndistribuição')
for (const k of Object.keys(RESULTADOS)) {
  const n = porPerfil[k] || 0
  console.log(' ', RESULTADOS[k].id, String(n).padStart(7), (n / combos * 100).toFixed(3).padStart(8) + '%', ' ', RESULTADOS[k].nome)
}

console.log('\ntamanho do texto de cada resultado (chars)')
for (const k of Object.keys(RESULTADOS)) {
  console.log(' ', RESULTADOS[k].id, String(textoDoResultado(RESULTADOS[k]).length).padStart(5))
}

if (semPerfil || p5Indevido) {
  console.error('\nFALHOU')
  process.exit(1)
}
console.log('\nok')
