// Every published sentence lives here so a post can be edited without touching layout code.
// Legal text is quoted literally; anything that still needs checking is marked VALIDAR.

export const TEMA796 = {
  total: 7,
  coverA: {
    label: 'Dia da Jurisprudência · STF',
    kicker: 'Tema 796 · art. 156, § 2º, I, CF',
    lead: 'Integralizou R$ 1 milhão em imóvel.',
    hero: 'R$ 400 mil',
    tail: 'pagam ITBI.',
    sub: 'A imunidade na realização de capital tem teto. O STF definiu qual.',
    action: 'Arraste →',
  },
  coverB: {
    label: 'Dia da Jurisprudência · STF',
    line1: 'A Constituição não fala em limite.',
    line2: 'O STF falou.',
    sub: 'Imunidade do ITBI na integralização de capital: até onde ela vai.',
    action: 'Arraste →',
  },
  context: {
    label: 'A regra',
    title: 'O que a Constituição garante',
    source: 'CF/88 · art. 156, § 2º, I',
    lawBefore: 'não incide sobre a transmissão de bens ou direitos incorporados ao patrimônio de pessoa jurídica',
    lawMark: 'em realização de capital',
    lawAfter: '(...)',
    question: { a: 'E quando o imóvel', hl: 'vale mais', b: 'do que o capital subscrito?' },
    action: 'A resposta do STF →',
  },
  tese: {
    label: 'Tese literal',
    source: 'STF · Tema 796 · RE 796.376',
    before: '“A imunidade em relação ao ITBI, prevista no inciso I do § 2º do art. 156 da Constituição Federal,',
    mark: 'não alcança o valor dos bens que exceder o limite do capital social',
    after: 'a ser integralizado.”',
    plainLabel: 'Sem juridiquês · tradução direta',
    plainA: 'Só é imune a parte do imóvel que vira quotas sociais.',
    plainB: 'O valor que sobra (reserva de capital/ágio) paga ITBI.',
    action: 'Veja nos números →',
  },
  example: {
    label: 'Na prática',
    title: 'Imóvel de R$ 1 milhão. Capital subscrito de R$ 600 mil.',
    immune: { value: 'R$ 600 mil', label: 'Quotas · imune' },
    taxed: { value: 'R$ 400 mil', label: 'Reserva de capital (ágio) · incide ITBI' },
    scale: ['R$ 0', 'R$ 600 mil', 'R$ 1 milhão'],
    rule: 'Regra de leitura: compare o valor do bem com o capital subscrito. A diferença é o excedente.',
    action: 'O erro clássico →',
  },
  locks: {
    label: 'Erro clássico de prova',
    title: 'Não confunda as duas travas do inciso I.',
    value: {
      label: 'Trava de valor',
      q: 'Até quanto é imune?',
      a: 'Só até o capital integralizado. O excedente paga ITBI.',
      src: 'Tema 796 · STF',
    },
    activity: {
      label: 'Trava de atividade',
      q: 'Quem perde a imunidade?',
      a: 'O adquirente cuja atividade preponderante é compra e venda ou locação de imóveis, ou arrendamento mercantil.',
      src: 'CF, art. 156, § 2º, I, parte final · CTN, art. 37',
    },
    // VALIDAR: status do Tema 1.348 (STF) na data da publicação.
    note: 'Na integralização, o alcance da trava de atividade está em discussão no STF (Tema 1.348).',
    action: 'Checklist de prova →',
  },
  checklist: {
    label: 'O que isso muda na sua prova',
    title: '3 leituras antes de marcar.',
    items: [
      'Compare o valor do bem com o capital subscrito.',
      'Excedente foi para reserva de capital? Incide ITBI.',
      'Valor e atividade preponderante são travas diferentes.',
    ],
    action: 'Salve para a revisão →',
  },
  save: {
    label: 'Revisão de véspera',
    title: 'Salve para revisar antes da prova.',
    index: ['A regra da CF', 'A tese literal', 'O exemplo numérico', 'As duas travas', 'Checklist de prova'],
    action: 'Salvar',
  },
  product: {
    label: 'Por dentro do material',
    title: 'Mapas como este, para o edital inteiro.',
    kpis: [
      { value: '30', label: 'Mapas visuais de revisão' },
      { value: '112', label: 'Remissões traduzidas na linha' },
    ],
    offer: 'Amostra grátis de 20 páginas.',
    action: 'Link no perfil',
  },
};

export const QUESTAO = {
  label: 'Questão inédita NEXO',
  bank: 'Padrão FGV / Cebraspe / FCC',
  source: 'CF/88, art. 156, § 2º, I + CTN, arts. 36 e 37 + Tema 796 STF',
  stem:
    'Sócio integraliza imóvel de R$ 2 milhões em holding operacional não imobiliária: R$ 500 mil realizam o capital subscrito e R$ 1,5 milhão vai à reserva de capital [ágio na subscrição]. Segundo o art. 156, § 2º, I, da CF/88 [imunidade do ITBI na realização de capital] e o Tema 796 do STF, o ITBI:',
  options: [
    { letter: 'A', text: 'Não incide sobre nenhum valor, pois a empresa não tem atividade imobiliária preponderante [art. 37 do CTN].' },
    { letter: 'B', text: 'Incide sobre R$ 1,5 milhão [reserva de capital], pois a imunidade limita-se ao valor do capital social subscrito.' },
    { letter: 'C', text: 'Incide sobre o total de R$ 2 milhões, pois a reserva de capital contamina integralmente a operação societária.' },
    { letter: 'D', text: 'Depende de apuração trienal da receita operacional [art. 37, § 1º, do CTN] para tributar o excedente.' },
  ],
  correct: 'B',
  answerLabel: 'Gabarito B · Tema 796 do STF (RE 796.376)',
  answer:
    'Pelo art. 156, § 2º, I, da CF/88 [imunidade do ITBI até o limite do capital realizado], a imunidade alcança apenas os R$ 500 mil do capital subscrito. O excedente de R$ 1,5 milhão destinado à reserva de capital sofre incidência imediata de ITBI, independentemente da atividade preponderante.',
  trap: 'a alternativa A usa a trava de atividade para esconder a trava de valor.',
  actionQ: 'Responda antes de arrastar →',
  actionA: 'Salve para revisar',
};

export const SV31 = {
  label: 'Erro clássico · SV 31 do STF',
  title: { a: 'Locação de bem móvel', hl: 'não é serviço.' },
  source: 'Súmula Vinculante 31 · texto literal',
  law: [
    { t: '“É ' },
    { t: 'inconstitucional a incidência do imposto sobre serviços', mark: true },
    { t: ' de qualquer natureza – ISS sobre operações de ' },
    { t: 'locação de bens móveis', mark: true },
    { t: '.”' },
  ],
  plainLabel: 'Sem juridiquês · tradução direta',
  plain: { a: 'Alugar um bem (', hl: 'obrigação de dar', b: ') não é prestar serviço (obrigação de fazer). Sem operador, não existe ISS.' },
  action: 'Veja o Mapa Visual →',
};

export const MATERIAL = {
  name: 'Reta Final ISS Curitiba',
  url: 'nexofiscalbr.com.br/amostra',
  sample: '20 páginas reais do material',
  // VALIDAR: V01 mostra 273 questões inéditas; V03 mostra 272 no 1º quadro e 273 no seguinte.
  kpis: [
    { value: '279', unit: 'pág.', label: 'Manuais temáticos' },
    { value: '112', unit: '', label: 'Remissões na linha' },
    { value: '273', unit: '', label: 'Questões inéditas' },
    { value: '30', unit: '', label: 'Mapas visuais' },
  ],
  bracketPromise: 'Cada artigo vem com a explicação entre colchetes [...] na mesma linha, sem abrir outro código.',
};

export const STORIES = {
  s1: { label: 'Tema 796 · STF', lead: 'Um imóvel de R$ 2 milhões entra no capital social.', hero: 'Quanto paga ITBI?', hint: 'Responda no próximo story' },
  s2: {
    label: 'Quiz · 10 segundos',
    title: 'Holding operacional, não imobiliária.',
    parts: [
      { value: 500, label: 'R$ 500 mil', caption: 'Capital subscrito' },
      { value: 1500, label: 'R$ 1,5 milhão', caption: 'Reserva de capital (ágio)' },
    ],
    sticker: { q: 'Incide ITBI sobre:', options: ['Nada', 'R$ 500 mil', 'R$ 1,5 milhão', 'R$ 2 milhões'] },
  },
  s3: {
    label: 'Gabarito',
    hero: 'R$ 1,5 milhão',
    lead: 'paga ITBI. Só os R$ 500 mil do capital são imunes.',
    source: 'STF · Tema 796 · RE 796.376',
    quote: '“(...) não alcança o valor dos bens que exceder o limite do capital social a ser integralizado.”',
  },
  s4: {
    label: 'Como a lei seca aparece no material',
    lawRef: 'CF, art. 156, § 2º, I',
    lawA: 'não incide sobre a transmissão de bens ou direitos incorporados ao patrimônio de pessoa jurídica em realização de capital',
    br1: 'imune só até o capital subscrito · Tema 796',
    lawB: '(...) salvo se, nesses casos, a atividade preponderante do adquirente for a compra e venda desses bens ou direitos, locação de bens imóveis ou arrendamento mercantil',
    br2: 'preponderância: CTN, art. 37',
  },
  s5: { label: 'Amostra grátis', title: '20 páginas reais do material.', hint: 'Toque no link' },
};
