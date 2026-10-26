export const HANDLE = '@nexofiscalbr';

export const SLIDE1 = {
  kicker: 'DIA DA JURISPRUDÊNCIA · STF',
  page: '01 / 04',
  pill: 'TEMA 796 STF · ART. 156, § 2º, I CF',
  title: { a: 'Imóvel integralizado no', green: 'capital social', b: 'paga', red: 'ITBI?' },
  cta: 'Veja a Súmula e o Mapa',
};

export const SLIDE2 = {
  kicker: 'TESE LITERAL · TEMA 796 DO STF',
  page: '02 / 04',
  label: 'TEXTO LITERAL DA TESE (STF · RE 796.376)',
  quote: {
    before: '“A imunidade em relação ao ITBI, prevista no inciso I do § 2º do art. 156 da Constituição Federal,',
    highlight: 'não alcança o valor dos bens que exceder o limite do capital social',
    after: 'a ser integralizado.”',
  },
  plainLabel: 'SEM JURIDIQUÊS · TRADUÇÃO DIRETA',
  plain: { a: 'Só é imune a parte do imóvel que vira', green: 'quotas sociais', b: '. O valor que sobra (reserva de capital/ágio) paga ITBI.' },
  cta: 'Veja o Mapa Visual',
};

export const SLIDE3 = {
  kicker: 'MAPA VISUAL · TEMA 796 STF',
  page: '03 / 04',
  rootLabel: 'ART. 156, § 2º, I DA CF',
  rootTitle: 'Integralização de Imóvel',
  rootExample: 'Ex.: Imóvel de R$ 1 mi p/ R$ 600 mil em quotas',
  left: { label: 'ATÉ AS QUOTAS (R$ 600 MIL)', title: 'IMUNE AO ITBI', chip: 'Regra Incondicionada' },
  right: { label: 'VALOR EXCEDENTE (R$ 400 MIL)', title: 'INCIDE ITBI', chip: 'Reserva de Capital / Ágio' },
  cta: 'Salve este Mapa',
};

export const SLIDE4 = {
  kicker: 'POR DENTRO DO MATERIAL · NEXO FISCAL',
  page: '04 / 04',
  title: { a: 'Mapas Visuais +', green: 'Lei Seca traduzida', b: 'na linha.' },
  badgeTop: '30 Mapas Visuais de Revisão',
  badgeBottom: '112 Remissões Traduzidas na Linha',
  pageA: { title: '1.3 Painel de alíquotas do ISS', rates: ['5%', '4%', '2,5%', '2%', '2%'] },
  pageB: { title: '1.6 Substituição tributária e MEI' },
  cta: 'Baixe 20 págs grátis no link da bio → @nexofiscalbr',
};

export const SV31 = {
  kicker: 'SÚMULA LITERAL · SV 31 DO STF',
  page: '02 / 04',
  label: 'TEXTO LITERAL DA SÚMULA VINCULANTE 31',
  quote: [
    { t: '“É ' },
    { t: 'inconstitucional a incidência do imposto sobre serviços', hl: true },
    { t: ' de qualquer natureza – ISS sobre operações de ' },
    { t: 'locação de bens móveis', hl: true },
    { t: '.”' },
  ],
  plainLabel: 'SEM JURIDIQUÊS · TRADUÇÃO DIRETA',
  plain: { a: 'Alugar um bem (', green: 'obrigação de dar', b: ') não é prestar serviço (obrigação de fazer). Sem operador, não existe ISS.' },
  cta: 'Veja o Mapa Visual',
};
