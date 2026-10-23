import * as React from "react"
import { ArrowUpRight, BedDouble, BedSingle, CalendarDays, MapPin, Star } from "lucide-react"

import RotatingText from "../bits/RotatingText"
import ScrollVelocity from "../bits/ScrollVelocity"
import Stack from "../bits/Stack"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../components/ui/carousel"
import { BookingBar, BookingCard, BookingProvider, useBooking } from "../shared/booking"
import { CONDO, DISTANCES, HOUSE, MAP_URL, NAME, PHOTOS, REVIEW, SUITES, photoSrc, thumbSrc } from "../shared/data"
import { Faq } from "../shared/faq"
import { PhotoViewer } from "../shared/gallery"
import { useReducedMotion } from "../shared/motion"
import { Nav } from "../shared/nav"
import { cn } from "../lib/utils"

const LINKS: [string, string][] = [
  ["#galeria", "Fotos"],
  ["#suites", "Suítes"],
  ["#condominio", "Condomínio"],
  ["#local", "Localização"],
]

const PHRASES = ["piscina privativa", "empregada diária", "30 s do mar"]

// Recortes sem marca d'água para a pilha da capa.
const STACK: [string, string][] = [
  ["05a-piscina", "Piscina com mesa no deque"],
  ["14a-varanda", "Coqueiros, redes e piscina"],
  ["08a-bar-piscina", "Sofá de fibra de frente para a piscina"],
  ["55a-piscina-noite", "Redes e piscina iluminada à noite"],
]

const FACTS = [
  ["10", "pessoas"],
  ["5", "suítes"],
  ["6", "banheiros"],
  ["30 s", "até o mar"],
]

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.74rem] font-medium tracking-[0.26em] text-coral uppercase">{children}</p>
}

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-[2.4rem] leading-[1.05] md:text-[3.2rem]">{title}</h2>
      {children && <p className="max-w-[56ch] text-[1.06rem] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

function Hero() {
  const { openBooking } = useBooking()
  const reduced = useReducedMotion()
  return (
    <section id="topo" className="gutter pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="grid justify-items-start gap-6">
          <Eyebrow>Muro Alto · Porto de Galinhas</Eyebrow>
          <h1 className="text-[clamp(3.1rem,9vw,5.8rem)] leading-[0.98]">{NAME}</h1>
          <p className="flex flex-wrap items-baseline gap-x-2 text-[clamp(1.3rem,2.6vw,1.8rem)] leading-snug">
            <span>Pé na areia, com</span>
            {reduced ? (
              <span className="text-sea">{PHRASES.join(" · ")}</span>
            ) : (
              <RotatingText
                texts={PHRASES}
                effect="slide"
                rotationInterval={2600}
                staggerDuration={0.02}
                mainClassName="rounded-full bg-sea px-3 text-white"
              />
            )}
          </p>
          <p className="max-w-[40ch] text-[1.06rem] leading-relaxed text-muted-foreground">
            5 suítes para 10 pessoas no condomínio Malawi, em Muro Alto, de frente para o mar. Empregada todos os dias,
            das 8h às 16h, e roupa de cama e toalhas incluídas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" data-booking-open onClick={openBooking}>
              <CalendarDays data-icon="inline-start" /> Consultar disponibilidade
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#galeria">Ver as fotos</a>
            </Button>
          </div>
        </div>
        <div className="grid justify-items-center gap-4">
          <div className="aspect-[4/5] w-[min(68vw,24rem)]">
            <Stack
              layout="fan"
              visible={4}
              radius={22}
              frame={8}
              frameColor="#fbf6ec"
              autoplay={!reduced}
              autoplayDelay={3800}
              pauseOnHover
              sendToBackOnClick
              cards={STACK.map(([id, alt]) => (
                <img key={id} src={photoSrc(id)} alt={alt} width={860} height={1068} />
              ))}
            />
          </div>
          <p className="text-sm text-muted-foreground">Arraste ou toque para passar as fotos</p>
        </div>
      </div>
    </section>
  )
}

/* Galeria: Carousel do shadcn com as 10 fotos; tocar na foto amplia, as miniaturas trocam a foto. */
function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  React.useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api])

  return (
    <section aria-labelledby="fotos" id="galeria" className="grid scroll-mt-24 gap-8">
      <SectionHead id="fotos" eyebrow="A casa" title="Do deque à rede, sem pressa">
        Piscina, bar na varanda, redes no jardim e salas abertas para a piscina. Toque na foto para ampliar.
      </SectionHead>
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {PHOTOS.map((p, i) => (
            <CarouselItem key={p.id}>
              <button type="button" data-gallery-item onClick={() => onOpen(i)} aria-label={`Ampliar: ${p.caption}`} className="block w-full overflow-hidden rounded-[1.4rem]">
                <img src={photoSrc(p.id)} alt={p.caption} width={1600} height={p.height} loading={i ? "lazy" : "eager"} className="aspect-[4/3] w-full object-cover md:aspect-[16/8]" />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="secondary" className="left-3 size-10" />
        <CarouselNext variant="secondary" className="right-3 size-10" />
      </Carousel>
      <p className="flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
        <span>{PHOTOS[current].caption}</span>
        <span className="shrink-0 tabular-nums">
          {current + 1} de {PHOTOS.length}
        </span>
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Miniaturas">
        {PHOTOS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Mostrar: ${p.caption}`}
            aria-pressed={i === current}
            className={cn("shrink-0 overflow-hidden rounded-xl border-2 border-transparent opacity-70 transition", i === current && "border-sea opacity-100")}
          >
            <img src={thumbSrc(p.id)} alt="" width={240} height={110} loading="lazy" className="h-14 w-24 object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}

function Suites() {
  return (
    <section aria-labelledby="suites-titulo" id="suites" className="grid scroll-mt-24 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
      <img src={photoSrc("32b-suite")} alt="Janela da suíte e toalhas dobradas em cisnes" width={872} height={970} loading="lazy" className="aspect-[4/5] w-full rounded-[1.6rem] object-cover" />
      <div className="grid gap-8">
        <SectionHead id="suites-titulo" eyebrow="Suítes" title="Cinco suítes, dez lugares">
          Todos os quartos têm banheiro (6 banheiros no total) e ar-condicionado. Na área comum, 3 redes.
        </SectionHead>
        <ul className="grid">
          {SUITES.map((s) => {
            const Icon = s.beds.includes("queen") ? BedDouble : BedSingle
            return (
              <li key={s.n} className="flex items-center justify-between gap-4 border-b py-4">
                <span className="font-display text-2xl">Suíte {s.n}</span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="size-5 text-sea" aria-hidden="true" />
                  {s.beds}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function App() {
  const [zoom, setZoom] = React.useState<number | null>(null)
  return (
    <BookingProvider>
      <Nav links={LINKS} />
      <Hero />

      <div className="border-y bg-sea py-5 text-white">
        <ScrollVelocity
          texts={["Muro Alto · Porto de Galinhas", "Condomínio Malawi · de frente para o mar"]}
          velocity={36}
          numCopies={6}
          separator={<span className="px-6 text-coral">✦</span>}
          scrollerClassName="font-display font-normal! text-3xl! md:text-5xl! leading-tight! drop-shadow-none!"
        />
      </div>

      <div className="gutter">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-3 pt-16 md:grid-cols-4">
          {FACTS.map(([value, label]) => (
            <div key={label} className="grid gap-1 rounded-[1.2rem] bg-card px-5 py-5">
              <dt className="order-2 text-sm text-muted-foreground">{label}</dt>
              <dd className="order-1 font-display text-4xl text-sea">{value}</dd>
            </div>
          ))}
        </dl>

        <main className="mx-auto grid max-w-6xl gap-28 py-20">
          <Gallery onOpen={setZoom} />

          <section aria-labelledby="servico" className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <div className="grid gap-6 md:order-2">
              <SectionHead id="servico" eyebrow="Serviço" title="Empregada todos os dias, das 8h às 16h">
                Limpeza e cozinha incluídas, com roupa de cama e toalhas. A churrasqueira e o bar ficam na varanda, a
                poucos passos da piscina.
              </SectionHead>
            </div>
            <img src={photoSrc("08b-bar-piscina")} alt="Bar da varanda com banquetas e redes ao fundo" width={872} height={970} loading="lazy" className="aspect-[4/5] w-full rounded-[1.6rem] object-cover md:order-1" />
          </section>

          <Suites />

          <section aria-labelledby="condominio-titulo" id="condominio" className="grid scroll-mt-24 gap-10">
            <SectionHead id="condominio-titulo" eyebrow="Casa e condomínio" title="Casa completa, condomínio de praia">
              Condomínio fechado de frente para o mar, na praia de Muro Alto. Listas do anúncio.
            </SectionHead>
            <div className="flex flex-wrap gap-2" aria-label="No condomínio">
              {CONDO.map((item) => (
                <Badge key={item} variant="outline" className="bg-card px-3.5 py-1.5 text-sm whitespace-normal!">
                  {item}
                </Badge>
              ))}
            </div>
            <ul className="grid gap-x-10 rounded-[1.4rem] bg-card p-6 md:grid-cols-2 md:p-8">
              {HOUSE.map((item) => (
                <li key={item} className="flex gap-3 border-b py-3 text-[0.98rem] last:border-0 md:[&:nth-last-child(2)]:border-0">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="Avaliação" className="grid justify-items-center gap-5 text-center">
            <span className="flex gap-1 text-coral" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-5 fill-current" aria-hidden="true" />
              ))}
            </span>
            <blockquote className="max-w-[20ch] font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1]">“{REVIEW.text}”</blockquote>
            <p className="text-sm text-muted-foreground">
              {REVIEW.name} · {REVIEW.month} · nota 5,0
            </p>
          </section>

          <section aria-labelledby="local-titulo" id="local" className="grid scroll-mt-24 gap-10">
            <SectionHead id="local-titulo" eyebrow="Localização" title="30 segundos até o mar">
              No condomínio Malawi, em frente à praia de Muro Alto, em Porto de Galinhas. Distâncias segundo o anúncio; a
              localização exata vem pelo WhatsApp.
            </SectionHead>
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {DISTANCES.map((d) => (
                <li key={d.place} className="grid gap-1 rounded-[1.2rem] bg-card p-5">
                  <span className="font-display text-3xl text-sea">{d.value}</span>
                  <span className="text-sm text-muted-foreground">{d.place}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="justify-self-start">
              <a href={MAP_URL} target="_blank" rel="noopener">
                <MapPin data-icon="inline-start" /> Ver Muro Alto no mapa <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </section>

          <section aria-labelledby="perguntas" className="grid gap-6">
            <SectionHead id="perguntas" eyebrow="Bom saber" title="Antes de reservar" />
            <Faq />
          </section>
        </main>
      </div>

      <section id="reservar" aria-labelledby="fechamento" className="gutter bg-sea text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 py-20 md:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-6">
            <p className="text-[0.74rem] font-medium tracking-[0.26em] text-white/75 uppercase">Reserva direta</p>
            <h2 id="fechamento" className="max-w-[16ch] text-[2.6rem] leading-[1.05] md:text-[3.4rem]">
              Escolha as datas e fale com o anfitrião
            </h2>
            <img src={photoSrc("55b-piscina-noite")} alt="Varanda iluminada e piscina à noite" width={872} height={1068} loading="lazy" className="hidden aspect-[16/9] w-full max-w-md rounded-[1.4rem] object-cover md:block" />
          </div>
          <BookingCard className="text-card-foreground" />
        </div>
      </section>

      <footer className="gutter">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-10 pb-28 text-sm text-muted-foreground md:pb-10">
          <span className="font-display text-xl text-foreground">{NAME}</span>
          <span>Condomínio Malawi · Muro Alto · Porto de Galinhas</span>
          <span>Nome provisório · versão de apresentação · Site por NEXO Websites</span>
        </div>
      </footer>

      <BookingBar />
      <PhotoViewer index={zoom} onClose={() => setZoom(null)} />
    </BookingProvider>
  )
}
