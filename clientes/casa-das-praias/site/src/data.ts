// Fatos de clientes/casa-das-praias/dados.md. Não acrescentar nada que não esteja lá.

export const NAME = "Casa das Praias"
export const MAX_GUESTS = 21
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Porto+de+Galinhas+Ipojuca+PE"

export type Category = "Piscina" | "Varandas" | "Churrasqueira" | "Fachada" | "Suítes"

export interface Photo {
  id: string
  category: Category
  caption: string
}

// Ordem da galeria do anúncio, agrupada por ambiente.
export const PHOTOS: Photo[] = [
  { id: "01-piscina", category: "Piscina", caption: "Piscina vista do andar de cima, com a área coberta da churrasqueira" },
  { id: "02-piscina", category: "Piscina", caption: "Piscina com degraus e espreguiçadeiras" },
  { id: "07-piscina", category: "Piscina", caption: "Piscina e fundos da casa" },
  { id: "03-varanda", category: "Varandas", caption: "Varanda com peças de barro e a piscina ao fundo" },
  { id: "05-varanda", category: "Varandas", caption: "Mesa redonda na varanda, de frente para a piscina" },
  { id: "06-varanda", category: "Varandas", caption: "Varanda com poltronas de fibra" },
  { id: "04-varanda", category: "Varandas", caption: "Varanda coberta com mesa de madeira" },
  { id: "08-churrasqueira", category: "Churrasqueira", caption: "Churrasqueira de tijolos e mesa de madeira maciça" },
  { id: "09-fachada", category: "Fachada", caption: "Fachada ao entardecer" },
  { id: "15-quarto", category: "Suítes", caption: "Suíte Praia do Cupe" },
  { id: "14-quarto", category: "Suítes", caption: "Suíte Praia do Cupe, entrada com armários" },
  { id: "10-suite-cupe", category: "Suítes", caption: "Suíte Praia do Cupe" },
  { id: "11-suite-serrambi", category: "Suítes", caption: "Suíte Praia de Serrambi" },
  { id: "12-suite-maracaipe", category: "Suítes", caption: "Suíte Maracaípe" },
  { id: "13-suite-porto", category: "Suítes", caption: "Suíte Porto de Galinhas e banheiro" },
]

export const CATEGORIES: Category[] = ["Piscina", "Varandas", "Churrasqueira", "Fachada", "Suítes"]

// Placas que aparecem nas portas (fotos 10 a 13). As outras 2 suítes não aparecem com placa.
export const SUITES: { name: string; photo: string; alt: string }[] = [
  { name: "Praia do Cupe", photo: "15-quarto", alt: "Suíte com duas camas de colcha preta e branca, TV na parede e ventilador." },
  { name: "Praia de Serrambi", photo: "11a-suite-serrambi", alt: "Suíte com duas camas de colcha rosa, TV na parede e ventilador." },
  { name: "Maracaípe", photo: "12a-suite-maracaipe", alt: "Suíte com duas camas de colcha verde, janela e ar-condicionado split." },
  { name: "Porto de Galinhas", photo: "13a-suite-porto", alt: "Suíte com duas camas de colcha vermelha e branca e armários brancos." },
]

export const BEDS: { suites: string; beds: string }[] = [
  { suites: "3 suítes", beds: "2 camas de casal cada" },
  { suites: "3 suítes", beds: "1 cama de casal + 1 de solteiro" },
]

export const AMENITY_GROUPS: { title: string; items: string[] }[] = [
  { title: "Lazer", items: ["Piscina", "2 churrasqueiras, 1 no terraço gourmet", "Utensílios para churrasqueira", "Sala ampla para mais de 20 pessoas", "6 cadeiras de praia"] },
  { title: "Suítes", items: ["6 suítes com ar-condicionado split e ventilador", "TV em todas as suítes", "Camas tipo box", "Chuveiro quente", "Roupa de cama", "8 banheiros, contando os das suítes", "2 colchões", "1 suíte no térreo para pessoas com dificuldades de mobilidade", "1 suíte com ventilador para secretária"] },
  { title: "Cozinha", items: ["2 geladeiras", "Freezer vertical", "Gelágua", "Micro-ondas", "Fogão", "Liquidificador", "Pratos, talheres e travessas"] },
  { title: "Casa", items: ["Wi-Fi", "Máquina de lavar roupa e tanque", "Condomínio fechado", "2ª quadra da praia", "Voltagem 220 V"] },
  { title: "Regras", items: ["Aceita animais", "Permite festas"] },
]

export const FAQ: [string, string][] = [
  ["Quantas pessoas a casa recebe?", "21 pessoas em cama: 3 suítes com 2 camas de casal cada e 3 suítes com 1 cama de casal e 1 de solteiro. A casa tem ainda 2 colchões."],
  ["Pode fazer festa?", "Pode. O anúncio permite festas, e a sala acomoda mais de 20 pessoas."],
  ["Posso levar meu pet?", "Pode. A casa aceita animais."],
  ["Tem suíte no térreo?", "Tem. Uma das suítes fica no térreo, para pessoas com dificuldades de mobilidade."],
  ["Tem quarto para secretária?", "Tem. Além das 6 suítes, há 1 suíte com ventilador para secretária."],
  ["Qual a voltagem?", "220 volts."],
]

export const photoSrc = (id: string) => `fotos/${id}.webp`
export const thumbSrc = (id: string) => `fotos/${id}-thumb.webp`
