// Fatos do bangalô, todos tirados de clientes/malawi-muro-alto/dados.md. Os três estilos usam este arquivo.

export const NAME = "Bangalô Muro Alto"
export const MAX_GUESTS = 10
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Muro+Alto+Ipojuca+PE"

export interface Photo {
  id: string
  caption: string
  height: number
}

// Fotos inteiras da galeria (1600 px de largura), com a marca d'água do anúncio.
export const PHOTOS: Photo[] = [
  { id: "55-piscina-noite", caption: "Piscina à noite, com as redes e a varanda iluminada", height: 806 },
  { id: "52-casa-noite", caption: "O bangalô à noite, com espreguiçadeiras na piscina", height: 732 },
  { id: "05-piscina", caption: "Piscina privativa, mesa no deque e redes no jardim", height: 732 },
  { id: "08-bar-piscina", caption: "Bar da varanda de frente para a piscina", height: 732 },
  { id: "14-varanda", caption: "Varanda com mesa rústica, louça de barro e redes", height: 732 },
  { id: "07-bar", caption: "Bar externo com banquetas e mesa de madeira", height: 732 },
  { id: "21-jantar-sala", caption: "Sala de jantar e estar abertas para a piscina", height: 732 },
  { id: "16-sala", caption: "Sala de estar com a cozinha de azulejos ao fundo", height: 732 },
  { id: "24-jantar-cozinha", caption: "Mesa de jantar sob as vigas e cozinha com teto de azulejos", height: 732 },
  { id: "32-suite", caption: "Suíte com parede listrada em azul e verde", height: 732 },
]

export const SUITES: { n: number; beds: string }[] = [
  { n: 1, beds: "1 cama queen" },
  { n: 2, beds: "2 camas de solteiro" },
  { n: 3, beds: "1 cama queen" },
  { n: 4, beds: "1 cama queen" },
  { n: 5, beds: "5 camas de solteiro" },
]

export const HOUSE: string[] = [
  "Piscina privativa",
  "Empregada todos os dias, das 8h às 16h (limpeza e cozinha)",
  "Roupa de cama e toalhas",
  "Churrasqueira e utensílios",
  "Ar-condicionado nas suítes e na área comum",
  "3 redes",
  "Wi-Fi e TV a cabo",
  "Geladeira, cervejeira e freezer",
  "Cozinha com fogão e micro-ondas",
  "Lava e seca e ferro de passar",
  "Estacionamento privativo",
]

export const CONDO: string[] = [
  "Restaurante",
  "Serviço de praia",
  "Piscina",
  "Sauna",
  "Academia",
  "Conveniência",
  "Quadra de tênis",
  "Quadra esportiva",
  "Campo de futebol",
  "Salão de jogos",
  "Playground e brinquedoteca",
  "Recreação nos fins de semana e na alta temporada",
]

export const DISTANCES: { place: string; value: string }[] = [
  { place: "Até o mar, caminhando", value: "30 s" },
  { place: "Restaurante Beijupirá", value: "em frente" },
  { place: "Piscinas naturais do Pontal do Cupe", value: "800 m" },
  { place: "Piscinas naturais de Muro Alto", value: "1,5 km" },
  { place: "Centro de Porto de Galinhas", value: "8 km" },
  { place: "Pontal de Maracaípe", value: "20 km" },
  { place: "Aeroporto Internacional do Recife", value: "46,8 km" },
  { place: "Praia de Carneiros", value: "60,6 km" },
]

export const REVIEW = { name: "Sergio Dalmas", month: "Abril de 2019", text: "Excelente lugar, supero las expectativas" }

export const FAQ: [string, string][] = [
  ["Quais os horários de entrada e saída?", "Entrada a qualquer momento depois das 12h e saída às 12h. Self check-in com a equipe do condomínio."],
  ["O que a empregada faz?", "Limpeza e cozinha, todos os dias, das 8h às 16h."],
  ["A casa fica perto da praia?", "O condomínio Malawi fica em frente à praia de Muro Alto. Do bangalô até o mar são 30 segundos caminhando."],
  ["Posso levar meu animal de estimação?", "O anúncio não inclui animais. Pergunte pelo WhatsApp antes de reservar."],
  ["Festas são permitidas?", "Não. O anfitrião pede que cuidem da casa como se fosse sua."],
  ["A casa tem acessibilidade?", "Corredores com pelo menos 90 cm de largura, caminho iluminado e plano até a porta e vaga de estacionamento com pelo menos 2,4 m de largura."],
  ["Como faço a reserva?", "Escolha as datas e o número de hóspedes (até 10). A mensagem chega pronta no WhatsApp do anfitrião, que confirma a disponibilidade e o valor."],
]

export const photoSrc = (id: string) => `fotos/${id}.webp`
export const thumbSrc = (id: string) => `fotos/${id}-thumb.webp`
