// Textos dos quatro resultados, do bloco comum e do aviso.
//
// Separado da lógica: reescrever um resultado inteiro não deve encostar em
// componente nem em pontuação.
//
// Versão enxuta. As listas longas viraram frase corrida, porque a tela de
// resultado é lida no celular, depois de nove perguntas, e texto demais nesse
// ponto cansa mais do que convence.
//
// Os blocos de cada perfil seguem sempre a mesma forma, para a tela poder
// montar qualquer um deles sem saber qual é:
//   headline    frase de abertura, destacada
//   corpo       lista de parágrafos e falas
//   indicador   o rótulo do ponto de atenção
//   atencao     o que merece atenção agora
//   fechamento  o parágrafo final
//   cta         o texto do botão

export const RESULTADOS = {
  profile1: {
    id: 'P1',
    nome: 'Escolha ainda pouco sustentada',
    indicador: 'Ponto de atenção: importante',
    headline:
      'Seu filho pode estar tentando decidir antes de construir critérios suficientes para escolher.',
    corpo: [
      {
        tipo: 'p',
        texto:
          'Isso não quer dizer que ele esteja escolhendo errado. Quer dizer que a decisão pode estar vindo antes de ele entender o que busca para si.',
      },
      {
        tipo: 'p',
        texto:
          'Escolha feita porque parece uma boa opção, ou porque chegou a hora do vestibular, fica frágil diante da realidade. A conta vem depois: mudança de curso, desgaste, tempo e dinheiro num caminho que não fazia tanto sentido.',
      },
    ],
    atencao: {
      titulo: 'O que merece atenção agora',
      corpo: [
        {
          tipo: 'p',
          texto:
            'Antes de achar um curso, ele precisa de critério próprio: o que desperta o interesse dele, quais habilidades ele reconhece em si, quais valores pesam, que rotina ele imagina para a vida e do que não abre mão.',
        },
        {
          tipo: 'p',
          texto:
            'A escolha fica firme quando ele consegue dizer não só o que quer, mas por que aquilo faz sentido.',
        },
      ],
    },
    fechamento:
      'Isso dá para investigar antes da matrícula. É mais simples aprofundar uma escolha em construção do que descobrir a fragilidade dela depois de dois anos de faculdade.',
    cta: 'Quero entender como a Orientação Profissional pode ajudar',
  },

  profile2: {
    id: 'P2',
    nome: 'Pouca exploração da realidade',
    indicador: 'Ponto de atenção: importante',
    headline:
      'O maior risco hoje pode não estar na escolha do curso, mas no quanto seu filho realmente conhece sobre ele.',
    corpo: [
      {
        tipo: 'p',
        texto:
          'Ele pode ter uma boa hipótese profissional. Só que conhecer o nome de uma profissão e entender o que significa escolher aquele caminho são coisas diferentes.',
      },
      {
        tipo: 'p',
        texto:
          'Vídeo, rede social e salário médio são o começo. Falta a grade curricular, as áreas de atuação, a rotina de quem trabalha nisso, os desafios, o que vem depois da graduação e a parte menos atraente da carreira.',
      },
      {
        tipo: 'p',
        texto:
          'Sem essa investigação existe um risco concreto: entrar na faculdade e descobrir só depois que não era aquilo que ele imaginava.',
      },
    ],
    atencao: {
      titulo: 'O que merece atenção agora',
      corpo: [
        {
          tipo: 'p',
          texto:
            'Transformar pesquisa superficial em exploração de verdade: comparar formações, conhecer trajetórias diferentes e confrontar expectativa com realidade.',
        },
        {
          tipo: 'p',
          texto:
            'A pesquisa não existe para acabar com o entusiasmo. Existe para checar se aquilo continua fazendo sentido visto de perto.',
        },
      ],
    },
    fechamento:
      'Pesquisar antes custa algum tempo. Descobrir depois de um ano de faculdade custa muito mais, emocional e financeiramente.',
    cta: 'Quero entender como a Orientação Profissional pode ajudar',
  },

  profile3: {
    id: 'P3',
    nome: 'Escolha idealizada',
    indicador: 'Ponto de atenção: moderado a importante',
    headline:
      'Seu filho pode estar muito conectado à imagem de uma profissão, mas ainda pouco conectado à realidade que existe por trás dela.',
    corpo: [
      {
        tipo: 'p',
        texto:
          'Ter uma imagem de futuro é importante. O problema começa quando a imagem ocupa o lugar da investigação.',
      },
      {
        tipo: 'citacoes',
        itens: ['"Eu sempre quis isso."', '"Eu me vejo fazendo isso."'],
      },
      {
        tipo: 'p',
        texto:
          'Essas falas podem carregar um desejo legítimo e ao mesmo tempo se apoiar numa imagem parcial da profissão, feita de reconhecimento, liberdade, prestígio ou um certo estilo de vida.',
      },
      {
        tipo: 'p',
        texto:
          'O ponto não é eliminar esse desejo. É entender o que exatamente aquela profissão representa para ele.',
      },
    ],
    atencao: {
      titulo: 'O que merece atenção agora',
      corpo: [
        {
          tipo: 'p',
          texto:
            'Sair da pergunta "qual profissão eu quero" e chegar em três outras: o que exatamente me atrai nela, que parte dessa carreira eu ainda não conheço, e existe outro caminho capaz de me dar aquilo que estou buscando.',
        },
      ],
    },
    fechamento:
      'Não precisa destruir o sonho para escolher com consciência. Precisa tirar a profissão do pedestal, aproximar da realidade e ver o que continua de pé.',
    cta: 'Quero entender como a Orientação Profissional pode ajudar',
  },

  profile4: {
    id: 'P4',
    nome: 'Foco no destino, pouca atenção ao caminho',
    indicador: 'Ponto de atenção: moderado a importante',
    headline:
      'Seu filho parece saber onde gostaria de chegar. A pergunta é: ele gostaria de viver o caminho necessário para chegar lá?',
    corpo: [
      {
        tipo: 'p',
        texto:
          'O adolescente olha para o profissional formado e imagina o salário, o reconhecimento, a liberdade. Entre ele e esse profissional existe um percurso, e o percurso também entra na decisão.',
      },
      {
        tipo: 'p',
        texto:
          'São anos de formação, disciplinas, avaliações, estágios, atividades repetitivas e as partes menos interessantes da profissão. Gostar do destino não garante gostar do caminho.',
      },
    ],
    atencao: {
      titulo: 'O que merece atenção agora',
      corpo: [
        {
          tipo: 'p',
          texto:
            'Aproximar o futuro imaginado do cotidiano real. Além de "eu gostaria de ser esse profissional", cabe perguntar se ele gostaria de estudar aquelas matérias, se consegue se imaginar naquela rotina, e se o interesse é pela profissão ou pelo que ele imagina conseguir através dela.',
        },
      ],
    },
    fechamento:
      'Escolha que se sustenta considera onde se quer chegar e também o caminho até lá.',
    cta: 'Quero entender como a Orientação Profissional pode ajudar',
  },

  // O piso do quiz. É o único resultado que diz para não contratar nada agora,
  // e é isso que dá credibilidade aos outros quatro: um diagnóstico que só
  // sabe encaminhar para a venda não está diagnosticando.
  //
  // Por coerência ele não leva botão de WhatsApp nem o bloco comum. Dizer "este
  // não é o momento" e emendar a lista do que a Orientação Profissional faz
  // desmentiria o próprio texto.
  profile5: {
    id: 'P5',
    nome: 'Escolha construída',
    indicador: 'Ponto de atenção: baixo',
    semWhatsapp: true,
    semBlocoComum: true,
    headline: 'Pelo que você respondeu, essa escolha já vem sendo construída com cuidado.',
    corpo: [
      {
        tipo: 'p',
        texto:
          'Seu filho sabe explicar por que aquele caminho faz sentido, pesquisou além do nome do curso e consegue olhar o percurso, não só o resultado. É menos comum nessa idade do que parece.',
      },
      {
        tipo: 'p',
        texto:
          'Este não é o momento de contratar Orientação Profissional. O processo serve para construir critério em quem ainda não tem, e ele já construiu boa parte sozinho.',
      },
      {
        tipo: 'p',
        texto:
          'Perto da inscrição, com a pressão da prova e a opinião de todo mundo em cima, uma escolha bem construída às vezes balança. Balançar não significa que estava errada.',
      },
    ],
    atencao: {
      titulo: 'O que merece atenção agora',
      corpo: [
        {
          tipo: 'p',
          texto:
            'Menos investigar, mais preservar. Deixem registrado por escrito o que sustenta a primeira opção dele, para ele reler quando alguém o fizer duvidar. E confiram se sobrou alguma possibilidade que ninguém pôs na mesa.',
        },
      ],
    },
    fechamento:
      'Se essa decisão travar em algum momento, e às vezes trava, você sabe onde me encontrar. Até lá, não mexa no que está funcionando.',
    cta: null,
  },
}

// Bloco que fecha os quatro resultados com ponto de atenção. Não aparece no
// perfil 5, que diz para não contratar nada.
//
// A lista caiu de oito itens para cinco. Os três que saíram repetiam os que
// ficaram: reconhecer interesses e valores já está em compreender quem é, e
// pesquisar com profundidade já está em ampliar o repertório.
export const BLOCO_COMUM = {
  abertura: [
    'Seu filho não precisa descobrir agora aquilo que fará pelo resto da vida. Precisa aprender a tomar uma decisão mais consciente neste momento.',
  ],
  listaTitulo: 'A Orientação Profissional ajuda o adolescente a:',
  lista: [
    'compreender melhor quem é;',
    'descobrir seus próprios critérios de escolha;',
    'ampliar seu repertório de cursos e profissões;',
    'confrontar expectativas com a realidade;',
    'construir próximos passos possíveis.',
  ],
  fechamento: [
    'O objetivo não é entregar uma resposta pronta. É ajudar o adolescente a construir uma escolha que ele consiga compreender, sustentar e revisar quando precisar.',
  ],
  pergunta: 'Como esse adolescente está aprendendo a escolher o próprio caminho?',
  cta: 'Quero conversar sobre meu filho',
}

export const AVISO =
  'Este quiz é uma ferramenta informativa e não constitui avaliação psicológica, diagnóstico ou indicação de uma profissão específica. O resultado aponta aspectos do processo de escolha que podem merecer maior investigação.'

// Texto corrido do resultado, para viajar no payload e alimentar o primeiro
// e-mail da sequência. A tela monta o mesmo conteúdo em blocos; aqui ele vira
// texto puro.
export function textoDoResultado(r) {
  const linhas = [r.headline]

  function despejar(blocos) {
    blocos.forEach((b) => {
      if (b.tipo === 'p') linhas.push(b.texto)
      else b.itens.forEach((i) => linhas.push(`- ${i}`))
    })
  }

  despejar(r.corpo)
  linhas.push(r.atencao.titulo)
  despejar(r.atencao.corpo)
  linhas.push(r.fechamento)

  return linhas.join('\n\n')
}
