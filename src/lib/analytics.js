// Eventos do quiz.
//
// Um lugar só para disparar, para nenhum componente precisar saber se hoje
// existe GA4, Meta Pixel, os dois ou nenhum. Se a ferramenta não estiver na
// página, a chamada simplesmente não faz nada.

// Eventos padrão do Meta Pixel. O resto vai como evento personalizado, senão o
// Pixel descarta o nome e o dado se perde.
const PIXEL_PADRAO = {
  lead_submitted: 'Lead',
  quiz_completed: 'CompleteRegistration',
}

// 08/10/2026: os cinco quizzes passaram a usar o MESMO pixel do site e das
// landings, por recomendacao do curso de trafego: pixel espalhado em conta
// diferente nao alimenta o aprendizado da campanha nem vira publico de
// remarketing. A separacao dos funis agora e por EVENTO e por URL, nao por
// pixel. Esta constante e o que mantem cada quiz distinguivel dentro da
// gaveta comum: ela viaja em todo evento, para o Meta e para o GA4.
const QUIZ = 'quiz-precisa-de-op'

export function track(evento, params = {}) {
  params = { content_category: QUIZ, ...params }
  // GA4 e Tag Manager
  try {
    if (typeof window.gtag === 'function') window.gtag('event', evento, params)
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: evento, ...params })
  } catch (e) {
    // Medição nunca pode derrubar o quiz.
  }

  // Meta Pixel
  try {
    if (typeof window.fbq === 'function') {
      const padrao = PIXEL_PADRAO[evento]
      if (padrao) window.fbq('track', padrao, params)
      else window.fbq('trackCustom', evento, params)
    }
  } catch (e) {
    // Idem.
  }
}
