// Fatos de clientes/casa-dez/dados.md. Não acrescentar nada que não esteja lá.

export const NAME = "Casa Dez"
export const MAX_GUESTS = 26
export const AIRBNB_URL = "https://www.airbnb.com/l/4AhFnWmJ"
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Enotel+Porto+de+Galinhas"

export type Category = "Piscina" | "Área externa" | "Salas e gourmet" | "Quartos"

export interface Photo {
  id: string
  category: Category
  caption: string
}

export const PHOTOS: Photo[] = [
  { id: "41-piscina", category: "Piscina", caption: "Piscina com jato d’água e o anexo ao fundo" },
  { id: "35-piscina", category: "Piscina", caption: "Fachada vista da piscina" },
  { id: "36-piscina", category: "Piscina", caption: "Rente à água, com a casa ao fundo" },
  { id: "37-piscina", category: "Piscina", caption: "Piscina e deck com guarda-sóis" },
  { id: "39-piscina", category: "Piscina", caption: "Guarda-sol e espreguiçadeiras" },
  { id: "38-piscina", category: "Piscina", caption: "Piscina junto à cerca de bambu" },
  { id: "29-exterior", category: "Área externa", caption: "Anexo com guarda-sóis" },
  { id: "30-exterior", category: "Área externa", caption: "Área coberta com rede" },
  { id: "31-exterior", category: "Área externa", caption: "Estar externo coberto" },
  { id: "32-exterior", category: "Área externa", caption: "Varanda superior com chaise" },
  { id: "01-sala", category: "Salas e gourmet", caption: "Sala aberta para a piscina" },
  { id: "02-sala", category: "Salas e gourmet", caption: "Sala integrada à área gourmet" },
  { id: "03-sala", category: "Salas e gourmet", caption: "Área gourmet com bar" },
  { id: "07-cozinha", category: "Salas e gourmet", caption: "Cozinha completa com ilha" },
  { id: "08-cozinha", category: "Salas e gourmet", caption: "Bancada com banquetas de couro" },
  { id: "09-cozinha", category: "Salas e gourmet", caption: "Bancada de pedra com pia dupla" },
  { id: "06-sala", category: "Salas e gourmet", caption: "Sala de estar" },
  { id: "19-quarto4", category: "Quartos", caption: "Quarto 4, com cama king" },
  { id: "21-quarto4", category: "Quartos", caption: "Estar do Quarto 4" },
  { id: "34-piscina", category: "Área externa", caption: "Vista aérea da casa, do anexo e da piscina" },
]

export const CATEGORIES: Category[] = ["Piscina", "Área externa", "Salas e gourmet", "Quartos"]

export const ROOMS: [string, string][] = [
  ["Quarto 1", "1 cama queen"],
  ["Quarto 2", "1 queen e 1 solteiro"],
  ["Quarto 3", "1 cama queen"],
  ["Quarto 4", "1 cama king"],
  ["Quarto 5", "7 camas de solteiro"],
  ["Quarto 6", "1 cama queen"],
  ["Quarto 7", "1 queen e 1 solteiro"],
  ["Quarto 8", "1 cama queen"],
  ["Quarto 9", "1 queen e 1 solteiro"],
  ["Quarto 10", "1 beliche"],
]

export const AMENITY_GROUPS: { title: string; items: string[] }[] = [
  { title: "Lazer", items: ["Piscina privativa", "Churrasqueira", "Área gourmet climatizada", "Vista para o jardim", "Vista para a praia", "Acesso à praia"] },
  { title: "Conforto", items: ["Ar-condicionado", "Aquecedor", "Wi-Fi", "TV", "Água quente", "Itens básicos: toalhas, lençóis, sabonete e papel higiênico", "Cabides", "Ferro de passar"] },
  { title: "Praticidade", items: ["Cozinha", "Máquina de lavar", "Secadora", "Estacionamento gratuito no local", "Entrada privada", "Self check-in", "Funcionários disponíveis 24 h para receber", "Permitido animais", "Permitido fumar"] },
  { title: "Segurança", items: ["Detector de fumaça", "Detector de monóxido de carbono", "Extintor de incêndio", "Kit de primeiros socorros"] },
]

export const REVIEWS: { name: string; when: string; text: string }[] = [
  { name: "Hugo", when: "outubro de 2025", text: "Cada detalhe da casa superou as expectativas — estrutura impecável, conforto, limpeza e um ambiente acolhedor que tornou o fim de semana um dos mais bonitos que já vivemos juntos." },
  { name: "Elma", when: "janeiro de 2026", text: "Este lugar realmente parecia umas férias de sonho. […] A casa é linda, espaçosa, extremamente confortável e exatamente como descrita." },
  { name: "Luis", when: "julho de 2024", text: "A casa é um espetáculo, lugar extremamente confortável e perfeito para lazer/descanso." },
  { name: "Victor", when: "março de 2024", text: "A casa tem tudo para acomodar 26 pessoas. Camas confortaveis, espaço interno impecável, otimo piscina e cozinha completa." },
  { name: "Tito", when: "maio de 2023", text: "Excelente casa, o caseiro Manoel fez toda a diferença. Muito prestativo e educado." },
  { name: "Clodoaldo", when: "março de 2025", text: "Melhor do que Imaginava, Recomendo!" },
]

export const FAQ: [string, string][] = [
  ["Qual o horário de entrada e saída?", "Entrada a partir das 12h e saída até 12h. Entrada antecipada ou saída tardia custam meia diária cada, estendem o horário em até 4 horas e dependem de disponibilidade."],
  ["Como funciona a energia elétrica?", "É cobrada à parte, a R$ 1,03 por kWh. Na chegada fica um depósito caução conforme o número de diárias; na saída, o consumo é conferido no medidor da casa junto com o hóspede, e a diferença é devolvida ou cobrada."],
  ["Posso levar meu pet?", "Sim, animais são permitidos."],
  ["Pode som alto?", "O volume deve seguir a legislação local. Quem descumprir está sujeito a multa dos órgãos competentes e do proprietário."],
  ["Onde fica exatamente?", "Na melhor região de Porto de Galinhas, ao lado do Enotel e a cerca de 100 m da praia. O endereço exato é enviado após a confirmação, porque a rua não tem numeração."],
]

export const photoSrc = (id: string) => `fotos/${id}.webp`
export const thumbSrc = (id: string) => `fotos/${id}-thumb.webp`
