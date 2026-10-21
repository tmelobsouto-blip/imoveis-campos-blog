export type TransitionKind = 'approach' | 'match' | 'cut';

export interface Point {
  x: number;
  y: number;
}

/** View centre in image UV (0–1, top-left origin) and zoom relative to "cover" fit. */
export interface Camera extends Point {
  z: number;
}

export interface Hotspot extends Point {
  label: string;
  target: string;
}

export interface Shot {
  id: string;
  /** Room label exactly as published in the listing gallery. */
  room: string;
  /** Position of the photo in the listing gallery ("n de 46"). */
  listingIndex: number;
  alt: string;
  from: Camera;
  to: Camera;
  /** How this shot hands over to the next one. Absent on the last shot. */
  next?: TransitionKind;
  /** approach: point in this photo where the next photo was taken from / looks at. */
  focus?: Point;
  /** match: lateral travel direction (1 = right, -1 = left). */
  dir?: 1 | -1;
  weight?: number;
  hotspots?: Hotspot[];
}

export const LISTING_TOTAL = 46;
export const IMAGE_ASPECT = 974 / 716;

export const photoSrc = (id: string) => `photos/${id}.webp`;
export const thumbSrc = (id: string) => `photos/${id}-thumb.webp`;

// Order and transition kinds are justified photo by photo in STORYBOARD.md.
export const SHOTS: Shot[] = [
  {
    id: '34-piscina',
    room: 'Piscina',
    listingIndex: 34,
    alt: 'Vista aérea: casa de dois pavimentos com telhado cinza, anexo com guarda-sóis, piscina de borda curva e coqueiros ao fundo.',
    from: { x: 0.52, y: 0.5, z: 1.04 },
    to: { x: 0.4, y: 0.62, z: 1.2 },
    next: 'approach',
    focus: { x: 0.27, y: 0.7 },
    weight: 1.3,
    hotspots: [
      { x: 0.27, y: 0.6, label: 'Anexo com guarda-sóis', target: '29-exterior' },
      { x: 0.78, y: 0.83, label: 'Área coberta térrea', target: '30-exterior' },
    ],
  },
  {
    id: '37-piscina',
    room: 'Piscina',
    listingIndex: 37,
    alt: 'Vista elevada da piscina, do deck com guarda-sóis e espreguiçadeiras e da lateral da casa principal.',
    from: { x: 0.45, y: 0.5, z: 1.06 },
    to: { x: 0.38, y: 0.42, z: 1.16 },
    next: 'approach',
    focus: { x: 0.3, y: 0.26 },
    hotspots: [{ x: 0.3, y: 0.22, label: 'Anexo com guarda-sóis', target: '29-exterior' }],
  },
  {
    id: '41-piscina',
    room: 'Piscina',
    listingIndex: 41,
    alt: 'Piscina em primeiro plano com jato d’água, anexo com guarda-sóis ao fundo e lateral da casa principal à direita.',
    from: { x: 0.5, y: 0.56, z: 1.06 },
    to: { x: 0.46, y: 0.5, z: 1.16 },
    next: 'match',
    dir: -1,
    hotspots: [{ x: 0.48, y: 0.55, label: 'Anexo com guarda-sóis', target: '29-exterior' }],
  },
  {
    id: '38-piscina',
    room: 'Piscina',
    listingIndex: 38,
    alt: 'Piscina de borda curva junto à cerca de bambu, com bica d’água e vasos com plantas.',
    from: { x: 0.56, y: 0.5, z: 1.06 },
    to: { x: 0.44, y: 0.54, z: 1.13 },
    next: 'match',
    dir: 1,
  },
  {
    id: '39-piscina',
    room: 'Piscina',
    listingIndex: 39,
    alt: 'Piscina vista do alto, com guarda-sol e espreguiçadeiras de fibra no deck.',
    from: { x: 0.38, y: 0.42, z: 1.06 },
    to: { x: 0.52, y: 0.52, z: 1.14 },
    next: 'match',
    dir: 1,
  },
  {
    id: '36-piscina',
    room: 'Piscina',
    listingIndex: 36,
    alt: 'Vista rente à água da piscina, com jato d’água e a casa principal ao fundo.',
    from: { x: 0.5, y: 0.52, z: 1.04 },
    to: { x: 0.44, y: 0.46, z: 1.16 },
    next: 'approach',
    focus: { x: 0.4, y: 0.42 },
  },
  {
    id: '35-piscina',
    room: 'Piscina',
    listingIndex: 35,
    alt: 'Fachada da casa vista da piscina: área coberta térrea com rede e mesa, varanda superior com guarda-corpo de vidro e bica d’água.',
    from: { x: 0.56, y: 0.55, z: 1.06 },
    to: { x: 0.4, y: 0.5, z: 1.15 },
    next: 'approach',
    focus: { x: 0.31, y: 0.52 },
    hotspots: [{ x: 0.31, y: 0.52, label: 'Área coberta com rede', target: '30-exterior' }],
  },
  {
    id: '30-exterior',
    room: 'Exterior',
    listingIndex: 30,
    alt: 'Área coberta térrea com rede, cadeiras e chaise de fibra; jardim e piscina à esquerda e anexo com guarda-sóis ao fundo.',
    from: { x: 0.46, y: 0.55, z: 1.06 },
    to: { x: 0.6, y: 0.57, z: 1.15 },
    next: 'approach',
    focus: { x: 0.74, y: 0.57 },
    hotspots: [
      { x: 0.61, y: 0.52, label: 'Anexo com guarda-sóis', target: '29-exterior' },
      { x: 0.74, y: 0.6, label: 'Estar externo', target: '31-exterior' },
    ],
  },
  {
    id: '31-exterior',
    room: 'Exterior',
    listingIndex: 31,
    alt: 'Estar externo coberto com sofás de fibra, vaso azul e branco e portas de vidro com cortinas azuis.',
    from: { x: 0.5, y: 0.55, z: 1.06 },
    to: { x: 0.44, y: 0.6, z: 1.14 },
    next: 'cut',
  },
  {
    id: '29-exterior',
    room: 'Exterior',
    listingIndex: 29,
    alt: 'Anexo de telhado cinza com fachada de vidro e cortinas azuis, guarda-sóis, espreguiçadeiras e mesa à beira da piscina.',
    from: { x: 0.5, y: 0.5, z: 1.04 },
    to: { x: 0.54, y: 0.56, z: 1.15 },
    next: 'cut',
    hotspots: [{ x: 0.2, y: 0.88, label: 'Piscina', target: '41-piscina' }],
  },
  {
    id: '01-sala',
    room: 'Sala de estar',
    listingIndex: 1,
    alt: 'Sala com piso de madeira, sofás de fibra natural, mesa de centro rústica e lustre de conchas; portas abertas para a piscina.',
    from: { x: 0.4, y: 0.55, z: 1.06 },
    to: { x: 0.6, y: 0.46, z: 1.13 },
    next: 'match',
    dir: 1,
    hotspots: [{ x: 0.82, y: 0.25, label: 'Piscina', target: '41-piscina' }],
  },
  {
    id: '02-sala',
    room: 'Sala de estar',
    listingIndex: 2,
    alt: 'Sala integrada à cozinha: sofás de fibra, mesa de jantar com cadeiras de fibra e bancada com banquetas de couro ao fundo.',
    from: { x: 0.6, y: 0.55, z: 1.06 },
    to: { x: 0.44, y: 0.5, z: 1.13 },
    next: 'match',
    dir: -1,
    hotspots: [{ x: 0.33, y: 0.34, label: 'Cozinha completa', target: '07-cozinha' }],
  },
  {
    id: '03-sala',
    room: 'Sala de estar',
    listingIndex: 3,
    alt: 'Sala com TV sobre parede de concreto, cozinha com bancada de madeira ao fundo e janelas triangulares sob o telhado de madeira.',
    from: { x: 0.4, y: 0.52, z: 1.06 },
    to: { x: 0.56, y: 0.5, z: 1.14 },
    next: 'approach',
    focus: { x: 0.62, y: 0.46 },
    hotspots: [{ x: 0.62, y: 0.44, label: 'Cozinha completa', target: '07-cozinha' }],
  },
  {
    id: '07-cozinha',
    room: 'Cozinha completa',
    listingIndex: 7,
    alt: 'Cozinha com cervejeira, geladeira inox, pia dupla e ilha com tampo de madeira e banquetas de couro.',
    from: { x: 0.42, y: 0.52, z: 1.06 },
    to: { x: 0.56, y: 0.52, z: 1.12 },
    next: 'match',
    dir: 1,
  },
  {
    id: '08-cozinha',
    room: 'Cozinha completa',
    listingIndex: 8,
    alt: 'Bancada de madeira com três banquetas de couro diante da pia e do fogão, com parede revestida de madeira.',
    from: { x: 0.5, y: 0.52, z: 1.04 },
    to: { x: 0.45, y: 0.46, z: 1.14 },
    next: 'approach',
    focus: { x: 0.42, y: 0.44 },
  },
  {
    id: '09-cozinha',
    room: 'Cozinha completa',
    listingIndex: 9,
    alt: 'Bancada de pedra com pia dupla, gaveteiro, nicho com utensílios, geladeira inox e cervejeira.',
    from: { x: 0.46, y: 0.5, z: 1.06 },
    to: { x: 0.56, y: 0.47, z: 1.14 },
    next: 'cut',
  },
  {
    id: '06-sala',
    room: 'Sala de estar',
    listingIndex: 6,
    alt: 'Sala de piso claro com sofás brancos, lustre de conchas, TV sobre parede texturizada, aparador de madeira e mesa de jantar ao fundo.',
    from: { x: 0.56, y: 0.55, z: 1.06 },
    to: { x: 0.44, y: 0.5, z: 1.14 },
    next: 'cut',
  },
  {
    id: '19-quarto4',
    room: 'Quarto 4',
    listingIndex: 19,
    alt: 'Quarto com cama de casal coberta por manta vermelha, criados-mudos espelhados, armário branco e cortinas.',
    from: { x: 0.5, y: 0.55, z: 1.04 },
    to: { x: 0.5, y: 0.62, z: 1.15 },
    next: 'match',
    dir: 1,
  },
  {
    id: '21-quarto4',
    room: 'Quarto 4',
    listingIndex: 21,
    alt: 'Estar do quarto com sofá capitonê cinza, duas poltronas e cortinas brancas do piso ao teto.',
    from: { x: 0.4, y: 0.56, z: 1.06 },
    to: { x: 0.6, y: 0.56, z: 1.12 },
    next: 'cut',
  },
  {
    id: '32-exterior',
    room: 'Exterior',
    listingIndex: 32,
    alt: 'Varanda superior com deck de madeira, chaise redonda branca e guarda-corpo de vidro voltado para a piscina.',
    from: { x: 0.56, y: 0.5, z: 1.04 },
    to: { x: 0.44, y: 0.6, z: 1.16 },
    weight: 1.4,
    hotspots: [{ x: 0.22, y: 0.84, label: 'Piscina', target: '41-piscina' }],
  },
];
