import * as React from "react"
import { ArrowUpRight, CalendarDays, Images, MapPin } from "lucide-react"

import Masonry from "../bits/Masonry"
import ScrollReveal from "../bits/ScrollReveal"
import TiltedCard from "../bits/TiltedCard"
import { Button } from "../components/ui/button"
import { BookingBar, BookingCard, BookingProvider, useBooking } from "../shared/booking"
import { CONDO, DISTANCES, HOUSE, MAP_URL, NAME, PHOTOS, REVIEW, SUITES, photoSrc } from "../shared/data"
import { Faq } from "../shared/faq"
import { PhotoViewer } from "../shared/gallery"
import { Nav } from "../shared/nav"

const LINKS: [string, string][] = [
  ["#galeria", "Fotos"],
  ["#suites", "Suítes"],
  ["#condominio", "Condomínio"],
  ["#local", "Localização"],
]

const FACTS = [
  ["10", "pessoas"],
  ["5", "suítes"],
  ["6", "banheiros"],
  ["30 s", "até o mar"],
]

// Mosaico com um recorte limpo de cada foto (alturas variadas); o toque abre a foto inteira no visualizador.
const MOSAIC: [string, number, number][] = [
  ["55a-piscina-noite", 860, 1068],
  ["52-casa-noite", 1600, 732],
  ["05a-piscina", 860, 1068],
  ["08b-bar-piscina", 872, 970],
  ["14b-varanda", 872, 970],
  ["21a-jantar-sala", 872, 970],
  ["07-bar", 1600, 732],
  ["16a-sala", 860, 1068],
  ["24b-jantar-cozinha", 860, 1068],
  ["32b-suite", 872, 970],
]
const photoIndex = (id: string) => PHOTOS.findIndex((p) => p.id.slice(0, 2) === id.slice(0, 2))
const MASONRY_ITEMS = MOSAIC.map(([id, width, height]) => {
  const caption = PHOTOS[photoIndex(id)].caption
  return { id, img: photoSrc(id), width, height, title: caption, alt: caption }
})

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-wood uppercase">{children}</p>
}

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-[2.4rem] leading-[1.02] text-cobalt md:text-[3.4rem]">{title}</h2>
      {children && <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

function Hero() {
  const { openBooking } = useBooking()
  return (
    <section id="topo" className="gutter pt-24 md:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-16">
        <div className="grid justify-items-start gap-6 md:order-1">
          <Eyebrow>Condomínio Malawi · Muro Alto · Porto de Galinhas</Eyebrow>
          <h1 className="text-[clamp(3.2rem,9vw,6.2rem)] leading-[0.95] text-cobalt">{NAME}</h1>
          <p className="max-w-[38ch] text-[1.12rem] leading-relaxed">
            5 suítes para 10 pessoas, piscina privativa e empregada todos os dias, a 30 segundos do mar em Muro Alto.
            Teto de azulejo, vigas de madeira e a sala aberta para a piscina.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" data-booking-open onClick={openBooking}>
              <CalendarDays data-icon="inline-start" /> Consultar disponibilidade
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#galeria">
                <Images data-icon="inline-start" /> Ver as fotos
              </a>
            </Button>
          </div>
        </div>
        <div className="relative md:order-2">
          <div className="azulejo absolute -inset-3 rounded-[1.4rem] md:-inset-4" aria-hidden="true" />
          <img
            src={photoSrc("24a-jantar-cozinha")}
            alt="Cozinha com teto e parede de azulejo azul e branco"
            width={872}
            height={970}
            className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
          />
          <img
            src={photoSrc("21a-jantar-sala")}
            alt="Sala aberta para a piscina"
            width={872}
            height={970}
            className="absolute -bottom-8 -left-6 hidden aspect-square w-44 rounded-xl border-[6px] border-background object-cover shadow-xl md:block lg:-left-16 lg:w-56"
          />
        </div>
      </div>
      <dl className="mx-auto mt-16 grid max-w-6xl grid-cols-2 border-y md:mt-24 md:grid-cols-4">
        {FACTS.map(([value, label]) => (
          <div key={label} className="grid gap-1 py-6">
            <dt className="order-2 text-sm text-muted-foreground">{label}</dt>
            <dd className="order-1 font-display text-[2.8rem] leading-none text-cobalt">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Service() {
  return (
    <section aria-label="Serviço" className="grid gap-6">
      <Eyebrow>Serviço incluído</Eyebrow>
      <ScrollReveal
        mode="enter"
        baseOpacity={0.12}
        enableBlur
        blurStrength={3}
        baseRotation={0}
        containerClassName="my-0!"
        textClassName="font-display font-normal! text-[clamp(2rem,4.6vw,3.6rem)]! leading-[1.12]! text-foreground"
      >
        Empregada todos os dias, das 8h às 16h, cuidando da limpeza e da cozinha. Roupa de cama e toalhas incluídas. O mar fica a 30 segundos.
      </ScrollReveal>
    </section>
  )
}

function Suites() {
  return (
    <section aria-labelledby="suites-titulo" id="suites" className="grid scroll-mt-24 gap-10">
      <SectionHead id="suites-titulo" eyebrow="Suítes" title="Cinco suítes, dez lugares">
        Todos os quartos têm banheiro (6 banheiros no total) e ar-condicionado. A foto mostra uma das suítes.
      </SectionHead>
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <TiltedCard
          imageSrc={photoSrc("32a-suite")}
          altText="Suíte com parede listrada em azul e verde"
          containerHeight="460px"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={8}
          scaleOnHover={1.03}
          showTooltip={false}
          flipOnClick={false}
          gyroscope={false}
          radius={16}
        />
        <ul className="grid gap-4 sm:grid-cols-2">
          {SUITES.map((s) => (
            <li key={s.n} className={s.n === 5 ? "sm:col-span-2" : ""}>
              <TiltedCard
                containerHeight="128px"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.03}
                showTooltip={false}
                flipOnClick={false}
                gyroscope={false}
                glare={0.25}
                shadow={0.25}
                radius={12}
              >
                <div className="absolute inset-0 grid content-between border border-border bg-card p-5">
                  <span className="text-xs font-semibold tracking-[0.2em] text-wood uppercase">Suíte {s.n}</span>
                  <span className="font-display text-2xl text-cobalt">{s.beds}</span>
                </div>
              </TiltedCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Lists() {
  return (
    <section aria-labelledby="condominio-titulo" id="condominio" className="grid scroll-mt-24 gap-10">
      <SectionHead id="condominio-titulo" eyebrow="Casa e condomínio" title="Tudo à mão, no Malawi">
        Condomínio fechado de frente para o mar, na praia de Muro Alto. Listas do anúncio.
      </SectionHead>
      <div className="grid gap-10 md:grid-cols-2">
        {[
          ["Na casa", HOUSE],
          ["No condomínio", CONDO],
        ].map(([title, items]) => (
          <div key={title as string} className="grid content-start gap-4">
            <h3 className="text-2xl text-cobalt">{title as string}</h3>
            <ul className="grid">
              {(items as string[]).map((item) => (
                <li key={item} className="flex gap-3 border-b border-border py-3 text-[0.98rem]">
                  <span className="mt-1.5 size-2.5 shrink-0 rotate-45 border-2 border-cobalt" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
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
      <div className="gutter">
        <main className="mx-auto grid max-w-6xl gap-28 py-24">
          <Service />

          <section aria-labelledby="fotos" id="galeria" className="grid scroll-mt-24 gap-10">
            <SectionHead id="fotos" eyebrow="A casa" title="Azulejo, madeira e piscina">
              Dez fotos do anúncio, da piscina à suíte. Toque numa foto para ampliar.
            </SectionHead>
            <Masonry
              items={MASONRY_ITEMS}
              columns="auto"
              columnWidth={300}
              gap={12}
              radius={10}
              animateFrom="bottom"
              stagger={0.06}
              hoverEffect="zoom"
              captions="hover"
              lightbox={false}
              draggable={false}
              onItemClick={(item) => setZoom(photoIndex(String(item.id)))}
            />
          </section>

          <Suites />

          <div className="azulejo h-14 rounded-lg" aria-hidden="true" />

          <Lists />

          <section aria-label="Avaliação" className="grid gap-6 rounded-2xl bg-cobalt px-6 py-14 text-white md:px-14">
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] text-white/70 uppercase">Avaliação · nota 5,0</p>
            <blockquote className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.08]">“{REVIEW.text}”</blockquote>
            <p className="text-sm text-white/75">
              {REVIEW.name} · {REVIEW.month}
            </p>
          </section>

          <section aria-labelledby="local-titulo" id="local" className="grid scroll-mt-24 gap-10">
            <SectionHead id="local-titulo" eyebrow="Localização" title="Em frente à praia de Muro Alto">
              No condomínio Malawi, em Porto de Galinhas. Distâncias segundo o anúncio; a localização exata vem pelo
              WhatsApp.
            </SectionHead>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {DISTANCES.map((d) => (
                <div key={d.place} className="flex items-baseline justify-between gap-4 border-b border-border py-4">
                  <dt className="text-[0.98rem]">{d.place}</dt>
                  <dd className="shrink-0 font-display text-2xl text-cobalt">{d.value}</dd>
                </div>
              ))}
            </dl>
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

      <section id="reservar" aria-labelledby="fechamento" className="azulejo gutter border-t">
        <div className="mx-auto grid max-w-6xl items-start gap-10 py-20 md:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-5 rounded-2xl bg-background p-8 shadow-sm">
            <Eyebrow>Reserva direta</Eyebrow>
            <h2 id="fechamento" className="text-[2.6rem] leading-[1.02] text-cobalt md:text-[3.4rem]">
              Escolha as datas e fale com o anfitrião
            </h2>
            <p className="max-w-[44ch] text-muted-foreground">
              Até 10 hóspedes. A mensagem chega pronta no WhatsApp, com as datas, as noites e o número de pessoas.
            </p>
          </div>
          <BookingCard />
        </div>
      </section>

      <footer className="gutter">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-10 pb-28 text-sm text-muted-foreground md:pb-10">
          <span className="font-display text-xl text-cobalt">{NAME}</span>
          <span>Condomínio Malawi · Muro Alto · Porto de Galinhas</span>
          <span>Nome provisório · versão de apresentação · Site por NEXO Websites</span>
        </div>
      </footer>

      <BookingBar />
      <PhotoViewer index={zoom} onClose={() => setZoom(null)} />
    </BookingProvider>
  )
}
