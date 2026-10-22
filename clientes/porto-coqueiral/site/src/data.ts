// Fatos de clientes/porto-coqueiral/dados.md. Não acrescentar nada que não esteja lá.

export const NAME = "Casa em Porto de Galinhas"
export const MAX_GUESTS = 17
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Porto+de+Galinhas+Ipojuca+PE"

export type Category = "Piscina" | "Terraço" | "Churrasqueira" | "Sala" | "Fachada e noite"

export interface Photo {
  id: string
  category: Category
  caption: string
  height: number // todas têm 1600 px de largura
}

// Galeria completa (fotos inteiras, com a marca d'água do anúncio), agrupada por ambiente.
export const PHOTOS: Photo[] = [
  { id: "04-piscina", category: "Piscina", caption: "Piscina com cascata e terraço com rede", height: 732 },
  { id: "12-piscina", category: "Piscina", caption: "Piscina, guarda-sóis e churrasqueira", height: 732 },
  { id: "02-piscina", category: "Piscina", caption: "Piscina com cascata e muro amadeirado", height: 732 },
  { id: "03-cascata", category: "Piscina", caption: "Cascata e piscina", height: 732 },
  { id: "05-piscina", category: "Piscina", caption: "Piscina, terraço e churrasqueira ao fundo", height: 732 },
  { id: "06-piscina", category: "Piscina", caption: "Piscina e gramado", height: 732 },
  { id: "09-piscina", category: "Piscina", caption: "Piscina, balanço e churrasqueira ao fundo", height: 732 },
  { id: "30-piscina", category: "Piscina", caption: "Piscina e terraço vistos de cima", height: 806 },
  { id: "07-piscina", category: "Piscina", caption: "Piscina e casa vistas de cima", height: 732 },
  { id: "31-terraco-redes", category: "Terraço", caption: "Terraço com duas redes", height: 806 },
  { id: "33-terraco-balanco", category: "Terraço", caption: "Terraço com balanço", height: 806 },
  { id: "35-terraco", category: "Terraço", caption: "Terraço", height: 806 },
  { id: "36-terraco", category: "Terraço", caption: "Terraço com poltronas", height: 806 },
  { id: "11-terraco-piscina", category: "Terraço", caption: "Terraço com poltronas e a piscina", height: 732 },
  { id: "10-lazer", category: "Terraço", caption: "Área de lazer com gramado", height: 732 },
  { id: "08-lazer", category: "Terraço", caption: "Área de lazer e casa vista de cima", height: 732 },
  { id: "34-churrasqueira", category: "Churrasqueira", caption: "Churrasqueira", height: 806 },
  { id: "26-churrasqueira-noite", category: "Churrasqueira", caption: "Churrasqueira à noite", height: 806 },
  { id: "17-sala", category: "Sala", caption: "Sala de estar", height: 806 },
  { id: "18-sala-estar", category: "Sala", caption: "Sala de estar", height: 806 },
  { id: "14-sala", category: "Sala", caption: "Sala de estar e jantar", height: 732 },
  { id: "15-sala", category: "Sala", caption: "Sala de estar e jantar", height: 732 },
  { id: "16-sala", category: "Sala", caption: "Sala de jantar e TV", height: 732 },
  { id: "19-sala-jantar", category: "Sala", caption: "Sala de jantar", height: 806 },
  { id: "20-sala-tv", category: "Sala", caption: "TV da sala", height: 806 },
  { id: "23-piscina-noite", category: "Fachada e noite", caption: "Piscina, terraço e churrasqueira à noite", height: 806 },
  { id: "22-fachada-noite", category: "Fachada e noite", caption: "Frente da casa à noite", height: 881 },
  { id: "32-fachada", category: "Fachada e noite", caption: "Frente da casa de dia", height: 806 },
]

export const CATEGORIES: Category[] = ["Piscina", "Terraço", "Churrasqueira", "Sala", "Fachada e noite"]

export interface Crop {
  id: string
  width: number
  height: number
  alt: string
}

// Recortes fora da marca d'água (fonte/recorte.json), para capa e destaques.
export const HERO: Crop[] = [
  { id: "04a-piscina", width: 860, height: 970, alt: "Cascata caindo na piscina, ao lado do muro amadeirado." },
  { id: "23c-piscina-noite", width: 880, height: 1068, alt: "Terraço com rede e poltronas amarelas e a piscina iluminada à noite." },
  { id: "33a-terraco-balanco", width: 890, height: 1068, alt: "Balanço suspenso em forma de ovo no terraço coberto, ao lado do gramado." },
]

export const MOSAIC: Crop[] = [
  { id: "12b-piscina", width: 880, height: 970, alt: "Churrasqueira de tijolos com azulejos, guarda-sóis azuis e mesas brancas no gramado, à beira da piscina." },
  { id: "10a-lazer", width: 861, height: 970, alt: "Piscina com cascata, muro amadeirado e coqueiros." },
  { id: "14b-sala", width: 874, height: 970, alt: "Sala com sofá azul, poltrona de madeira, pratos de palha e plantas na parede de tijolinho branco." },
  { id: "30a-piscina", width: 861, height: 1068, alt: "Terraço com rede e poltronas, visto de cima, ao lado da piscina." },
  { id: "26a-churrasqueira-noite", width: 880, height: 1068, alt: "Churrasqueira de tijolos acesa, com parede de azulejos estampados, à noite." },
  { id: "09a-piscina", width: 861, height: 970, alt: "Piscina com o balanço e guarda-sóis azuis ao fundo." },
]

export const SUITES: { n: number; beds: ("casal" | "solteiro" | "bicama")[]; label: string }[] = [
  { n: 1, beds: ["casal", "solteiro", "bicama"], label: "1 cama de casal, 1 de solteiro e 1 bicama" },
  { n: 2, beds: ["casal", "solteiro", "solteiro"], label: "1 cama de casal e 2 de solteiro" },
  { n: 3, beds: ["casal", "solteiro", "solteiro"], label: "1 cama de casal e 2 de solteiro" },
  { n: 4, beds: ["casal", "bicama"], label: "1 cama de casal e 1 bicama" },
  { n: 5, beds: ["casal"], label: "1 cama de casal" },
]

export const AMENITY_GROUPS: { title: string; items: string[] }[] = [
  { title: "Lazer", items: ["Piscina privativa", "Churrasqueira", "Utensílios para churrasqueira"] },
  { title: "Suítes", items: ["5 suítes", "7 banheiros: 5 nas suítes e 2 lavabos", "5 camas de casal e 7 de solteiro", "5 ar-condicionados", "3 ventiladores", "Roupa de cama"] },
  { title: "Cozinha", items: ["Fogão", "Geladeira", "Micro-ondas", "Liquidificador", "Utensílios de cozinha"] },
  { title: "Casa", items: ["Wi-Fi", "TV", "Máquina de lavar", "Ferro de passar", "3 vagas cobertas", "Voltagem 220 V"] },
  { title: "Regras", items: ["Aceita animais", "Festas não permitidas"] },
]

export const DISTANCES: { time: string; place: string }[] = [
  { time: "3 min", place: "Centro de Porto de Galinhas (1.800 m)" },
  { time: "5 min", place: "Praias de Porto de Galinhas e Maracaípe" },
  { time: "7 min", place: "Praia de Serrambi" },
  { time: "12 min", place: "Praias de Muro Alto e Cupe" },
]

// Citações literais; trecho cortado vira […].
export const REVIEWS: { name: string; month: string; text: string }[] = [
  { name: "Regina Ferreira", month: "Fevereiro de 2026", text: "Imóvel muito bom. Fácil localização. Casa de amplo conforto e acomodação. Atendeu nossas expectativas. Espaço adequado para família com crianças e animais de estimação. […] Sr. Paiva muito atencioso e prestativo." },
  { name: "Rejane", month: "Janeiro de 2023", text: "Otima casa. Bem arrejada, com todos os equipamentos e utensilios que se precisa em uma cozinha. Sossego pleno. Super indico. Se tiver oportunidade Voltaire..." },
  { name: "Elizandra", month: "Dezembro de 2022", text: "Casa super fiel às descrições e fotos do anúncio! Piscina limpa e com áreas para crianças. Casa ampla e todos os quartos são suítes. Local seguro e muito tranquilo. Quando voltarmos à Porto de Galinhas, com certeza será nossa hospedagem novamente!" },
  { name: "Georgia", month: "Janeiro de 2022", text: "Casa muito boa! Espaçosa, área de lazer excelente! Tudo completo de cama, mesa e banho! Nossa estadia foi maravilhosa!" },
  { name: "Henrique Dias", month: "Janeiro de 2022", text: "Muito boa minha estadia na casa do Seu Paiva !!!As fotos retratam exatamente como ela é!! Otima estrutura, muito espaçosa e limpa, com tudo que necessitamos. Um elogio especial para a piscina novinha, perfeita para crianças e adultos!! Voltaremos em breve" },
  { name: "Guilherme Tenorio", month: "Janeiro de 2022", text: "Excelente casa! O senhor Francisco \"Proprietário\", muito atencioso, local super ac[…] breve retornamos para curtir nesse paraíso PORTO DE GALINHA!" },
]

export const FAQ: [string, string][] = [
  ["Quantas pessoas a casa recebe?", "Até 17 pessoas, em 5 suítes: 5 camas de casal e 7 de solteiro, duas delas bicamas."],
  ["A piscina é só da casa?", "É. A piscina é privativa, com cascata, e à noite fica iluminada."],
  ["Posso levar meu pet?", "Pode. A casa aceita animais."],
  ["Pode fazer festa?", "Não. A casa não permite festas."],
  ["Tem garagem?", "Tem 3 vagas cobertas."],
  ["Qual a voltagem?", "220 volts."],
  ["Onde fica?", "No Loteamento Porto Coqueiral, em Porto de Galinhas, a 1.800 m do centro. Peça a localização exata ao anfitrião pelo WhatsApp."],
]

export const photoSrc = (id: string) => `fotos/${id}.webp`
export const thumbSrc = (id: string) => `fotos/${id}-thumb.webp`
