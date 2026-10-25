export const BRAND = {
  handle: '@nexofiscalbr',
  name: 'NEXO Fiscal',
  url: 'nexofiscalbr.com.br/amostra',
  badge: 'DESAFIO 10S · STF / STJ & CTN',
};

export const ACT1_TEXT = {
  actLabel: 'ATO 01/03 · DESAFIO DE PROVA REAL',
  tag: 'DESAFIO DE AUDITOR FISCAL · 10 SEGUNDOS',
  title: [
    { word: 'Integralizou' },
    { word: 'Imóvel', highlight: true },
    { word: 'Acima' },
    { word: 'do' },
    { word: 'Capital:' },
    { word: 'Incide' },
    { word: 'ITBI', highlight: true },
    { word: 'no' },
    { word: 'Excedente?' },
  ],
  context:
    'Confronto clássico entre o art. 156, § 2º, I, da CF/88 [imunidade do ITBI na realização de capital], o art. 36 do CTN [não incidência na incorporação ao patrimônio] e o Tema 796 do STF [limite no capital subscrito].',
  chips: [
    'CF/88, art. 156, § 2º, I [limite da imunidade]',
    'CTN, arts. 36 e 37 [regra de preponderância]',
    'STF, Tema 796 [RE 796.376 — Repercussão Geral]',
    'ISS / ITBI / IPTU [Núcleo de Provas Fiscais]',
  ],
  warningLabel: 'PEGADINHA CAMPEÃ DE REPROVAÇÃO',
  warning:
    'Mais de 70% dos candidatos confundem o limite da reserva de capital (1ª parte do dispositivo) com a exceção da atividade imobiliária preponderante (2ª parte)!',
};

export const ACT2_TEXT = {
  actLabel: 'ATO 02/03 · QUESTÃO INÉDITA PADRÃO AUDITOR',
  sourceLabel: 'QUESTÃO INÉDITA NEXO · PADRÃO FGV / CEBRASPE / FCC',
  sourceTitle: 'CF/88, Art. 156, § 2º, I + CTN, Arts. 36 e 37 + Tema 796 STF',
  timerLabel: 'TEMPO DE RESPOSTA',
  revealLabel: 'GABARITO REVELADO',
  revealValue: 'ALTERNATIVA B',
  question:
    'Sócio integraliza imóvel de R$ 2 milhões em holding operacional não imobiliária: R$ 500 mil realizam o capital subscrito e R$ 1,5 milhão vai à reserva de capital [ágio na subscrição]. Segundo o art. 156, § 2º, I, da CF/88 [imunidade do ITBI na realização de capital] e o Tema 796 do STF, o ITBI:',
  options: [
    {
      letter: 'A',
      text: 'Não incide sobre nenhum valor, pois a empresa não tem atividade imobiliária preponderante [art. 37 do CTN].',
    },
    {
      letter: 'B',
      text: 'Incide sobre R$ 1,5 milhão [reserva de capital], pois a imunidade limita-se ao valor do capital social subscrito.',
    },
    {
      letter: 'C',
      text: 'Incide sobre o total de R$ 2 milhões, pois a reserva de capital contamina integralmente a operação societária.',
    },
    {
      letter: 'D',
      text: 'Depende de apuração trienal da receita operacional [art. 37, § 1º, do CTN] para tributar o excedente.',
    },
  ],
  correct: 'B',
  correctBadge: '✓ CORRETA',
  hintLabel: 'DESAFIO VALENDO · PAUSE OU RESPONDA EM 10 SEGUNDOS',
  hint: 'Dica de leitura: separe a 1ª parte do art. 156, § 2º, I, da CF/88 [limite quantitativo do capital realizado] da 2ª parte [exceção da atividade imobiliária].',
  answerLabel: '✓ GABARITO B · TEMA 796 DO STF (RE 796.376)',
  answerSide: 'REMISSÃO NA LINHA NEXO',
  answer:
    'Pelo art. 156, § 2º, I, da CF/88 [imunidade do ITBI até o limite do capital realizado], a imunidade alcança apenas os R$ 500 mil do capital subscrito. O excedente de R$ 1,5 milhão destinado à reserva de capital sofre incidência imediata de ITBI, independentemente da atividade preponderante.',
};

export const ACT3_TEXT = {
  actLabel: 'ATO 03/03 · ENGENHARIA REVERSA NEXO FISCAL',
  titleA: 'Lei Seca Traduzida na Linha +',
  titleB: 'Jurisprudência Cirúrgica.',
  sampleTag: 'AMOSTRA REAL · PÁGINAS DO MATERIAL',
  cover: { top: 'Reta Final', bottom: 'ISS Curitiba' },
  kpis: [
    { label: 'Manuais Temáticos', value: 279, suffix: ' pág.' },
    { label: 'Remissões na Linha', value: 112, suffix: '' },
    { label: 'Questões Inéditas', value: 273, suffix: '' },
    { label: 'Mapas Visuais', value: 30, suffix: '' },
  ],
  bullets: [
    { n: '01', text: 'Cada artigo vem com a explicação entre colchetes [...] na mesma linha, sem abrir outro código.' },
    { n: '02', text: 'Quadros de armadilhas de banca e gabarito comentado item a item para revisão de reta final.' },
  ],
  ctaLabel: "ACERTOU EM 10S? COMENTE 'B' E BAIXE A AMOSTRA GRATUITA",
  ctaButton: 'BAIXAR AMOSTRA',
};
