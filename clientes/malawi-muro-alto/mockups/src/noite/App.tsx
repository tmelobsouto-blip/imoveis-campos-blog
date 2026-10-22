import * as React from "react"
import { ArrowUpRight, CalendarDays, Check, MapPin, Quote, Star } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { BookingBar, BookingCard, BookingProvider, DateRangePicker, GuestsStepper, useBooking } from "../shared/booking"
import { CONDO, DISTANCES, HOUSE, MAP_URL, NAME, PHOTOS, REVIEW, SUITES, photoSrc } from "../shared/data"
import { Faq } from "../shared/faq"
import { PhotoViewer } from "../shared/gallery"
import { Nav } from "../shared/nav"
import { cn } from "../lib/utils"

const LINKS: [string, string][] = [
  ["#galeria", "Fotos"],
  ["#suites", "Suítes"],
  ["#condominio", "Condomínio"],
  ["#local", "Localização"],
]

const FACTS = [
  { value: 10, label: "pessoas" },
  { value: 5, label: "suítes" },
  { value: 6, label: "banheiros" },
  { value: 30, label: "segundos até o mar", suffix: " s" },
]

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.28em] text-amber uppercase", className)}>
      <span className="h-px w-8 bg-amber/60" aria-hidden="true" />
      {children}
    </p>
  )
}

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="text-[2.6rem] leading-[1] md:text-[3.6rem]">{title}</h2>
      {children && <p className="max-w-[56ch] text-[1.02rem] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

function Hero() {
  const { openBooking } = useBooking()
  return (
    <section id="topo" className="night-glow relative isolate grid min-h-[100svh] overflow-hidden md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      {/* Celular: a foto ocupa a capa inteira, com o texto por cima. */}
      <div className="absolute inset-0 -z-10 md:hidden">
        <img src={photoSrc("55a-piscina-noite")} alt="Redes e piscina iluminada à noite" width={860} height={1068} className="size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0f24_6%,rgb(10_15_36/.7)_45%,rgb(10_15_36/.15)_75%,rgb(10_15_36/.6))]" />
      </div>

      <div className="gutter grid content-end gap-6 pt-28 pb-36 md:content-center md:py-28 md:pr-10 md:pl-[max(20px,calc((100vw-72rem)/2))]">
        <Eyebrow className="text-white/85 md:text-amber">Muro Alto · Porto de Galinhas</Eyebrow>
        <h1 className="text-[clamp(3.4rem,11vw,6.6rem)] leading-[0.92]">
          Bangalô <em className="text-amber">Muro Alto</em>
        </h1>
        <p className="max-w-[36ch] text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-white/85">
          5 suítes para 10 pessoas, piscina privativa e empregada todos os dias, a 30 segundos do mar no condomínio
          Malawi, em Muro Alto.
        </p>
        <div className="mt-2 hidden w-full max-w-[32rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border bg-card/90 p-2 shadow-2xl backdrop-blur md:grid">
          <DateRangePicker />
          <GuestsStepper className="px-3" />
          <Button size="lg" className="col-span-2" data-booking-open onClick={openBooking}>
            <CalendarDays data-icon="inline-start" /> Consultar disponibilidade
          </Button>
        </div>
      </div>

      {/* Computador: duas fotos da noite, uma alta e outra menor por cima. */}
      <div className="relative hidden md:block">
        <img
          src={photoSrc("55a-piscina-noite")}
          alt="Redes e piscina iluminada à noite"
          width={860}
          height={1068}
          className="absolute top-24 right-[max(20px,calc((100vw-72rem)/2))] bottom-16 h-[calc(100%-10rem)] w-[min(78%,30rem)] rounded-[2rem] object-cover shadow-[0_40px_120px_-30px_rgb(47_91_255/.6)]"
        />
        <img
          src={photoSrc("52a-casa-noite")}
          alt="O bangalô iluminado à noite"
          width={860}
          height={1068}
          className="absolute bottom-10 left-0 aspect-[4/5] w-[min(38%,15rem)] rounded-[1.4rem] border-4 border-background object-cover shadow-2xl"
        />
      </div>
    </section>
  )
}

function Facts() {
  return (
    <div className="gutter">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 border-y py-10 md:grid-cols-4">
        {FACTS.map((fact) => (
          <div key={fact.label} className="grid gap-2">
            <dt className="order-2 text-sm text-muted-foreground">{fact.label}</dt>
            <dd className="order-1 font-display text-[3.4rem] leading-[0.85] text-foreground tabular-nums">
              {fact.value}
              {fact.suffix && <span className="text-[0.5em] text-amber">{fact.suffix}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section aria-labelledby="fotos" id="galeria" className="grid scroll-mt-24 gap-10">
      <SectionHead id="fotos" eyebrow="A casa" title={<>Dia de piscina, <em>noite de varanda</em></>}>
        Bangalô de frente para o mar, com piscina privativa, bar na varanda, redes no jardim e salas abertas para a
        piscina. Toque numa foto para ampliar.
      </SectionHead>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {PHOTOS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            data-gallery-item
            onClick={() => onOpen(i)}
            aria-label={`Ampliar: ${p.caption}`}
            className={cn(
              "group relative overflow-hidden rounded-xl bg-card",
              i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]",
            )}
          >
            <img
              src={photoSrc(p.id)}
              alt={p.caption}
              width={1600}
              height={p.height}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function Service() {
  return (
    <section aria-labelledby="servico" className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <img src={photoSrc("14b-varanda")} alt="Mesa rústica da varanda com louça de barro" width={872} height={970} loading="lazy" className="aspect-[4/5] w-full rounded-[1.6rem] object-cover" />
      <div className="grid gap-6">
        <SectionHead id="servico" eyebrow="Serviço" title={<>Empregada todos os dias, <em>das 8h às 16h</em></>}>
          Limpeza e cozinha incluídas, com roupa de cama e toalhas. A churrasqueira e o bar da varanda ficam a
          poucos passos da piscina.
        </SectionHead>
        <ul className="grid gap-3 text-[0.95rem]">
          {HOUSE.slice(0, 6).map((item) => (
            <li key={item} className="flex gap-3">
              <Check className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Suites() {
  return (
    <section aria-labelledby="suites-titulo" id="suites" className="grid scroll-mt-24 gap-10">
      <SectionHead id="suites-titulo" eyebrow="Suítes" title={<>Cinco suítes, <em>dez lugares</em></>}>
        Todos os quartos têm banheiro (6 banheiros no total) e ar-condicionado. Na área comum, 3 redes.
      </SectionHead>
      <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <img src={photoSrc("32a-suite")} alt="Suíte com parede listrada em azul e verde" width={860} height={1068} loading="lazy" className="aspect-[4/5] w-full rounded-[1.6rem] object-cover md:aspect-auto md:h-full" />
        <ul className="grid gap-3">
          {SUITES.map((s) => (
            <li key={s.n}>
              <Card className="gap-1 py-5">
                <CardHeader className="px-5">
                  <CardTitle className="text-3xl">Suíte {s.n}</CardTitle>
                  <CardDescription>{s.beds}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Condo() {
  return (
    <section aria-labelledby="condominio-titulo" id="condominio" className="grid scroll-mt-24 gap-10">
      <SectionHead id="condominio-titulo" eyebrow="Condomínio Malawi" title={<>Um condomínio <em>de frente para o mar</em></>}>
        Condomínio fechado na praia de Muro Alto, com restaurante, serviço de praia, quadras e recreação.
      </SectionHead>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CONDO.map((item) => (
          <li key={item}>
            <Card className="h-full gap-0 py-5">
              <CardContent className="flex items-start gap-3 px-5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                <span className="text-[0.95rem] leading-snug">{item}</span>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <Card className="gap-4">
        <CardHeader>
          <CardTitle>Na casa</CardTitle>
          <CardDescription>Tudo o que o anúncio lista para o bangalô.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-x-8 gap-y-3 text-[0.95rem] md:grid-cols-2">
            {HOUSE.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}

function Review() {
  return (
    <section aria-label="Avaliação" className="grid justify-items-start gap-6 border-y py-14">
      <Quote className="size-9 text-pool" aria-hidden="true" />
      <blockquote className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] italic">“{REVIEW.text}”</blockquote>
      <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex gap-0.5 text-amber" aria-label="5 de 5 estrelas">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </span>
        {REVIEW.name} · {REVIEW.month} · nota 5,0
      </p>
    </section>
  )
}

function Location() {
  return (
    <section aria-labelledby="local-titulo" id="local" className="grid scroll-mt-24 gap-10">
      <SectionHead id="local-titulo" eyebrow="Localização" title={<>Muro Alto, <em>a 30 segundos do mar</em></>}>
        No condomínio Malawi, em frente à praia de Muro Alto, em Porto de Galinhas. Distâncias segundo o anúncio; a
        localização exata vem pelo WhatsApp.
      </SectionHead>
      <ul className="grid gap-x-10 sm:grid-cols-2">
        {DISTANCES.map((d) => (
          <li key={d.place} className="flex items-baseline justify-between gap-4 border-b py-4">
            <span className="text-[0.95rem]">{d.place}</span>
            <span className="shrink-0 font-display text-2xl text-amber tabular-nums">{d.value}</span>
          </li>
        ))}
      </ul>
      <Button asChild variant="outline" className="justify-self-start">
        <a href={MAP_URL} target="_blank" rel="noopener">
          <MapPin data-icon="inline-start" /> Ver Muro Alto no mapa <ArrowUpRight data-icon="inline-end" />
        </a>
      </Button>
    </section>
  )
}

export function App() {
  const [zoom, setZoom] = React.useState<number | null>(null)
  return (
    <BookingProvider>
      <Nav links={LINKS} className="border-white/10 bg-background/70" />
      <Hero />
      <Facts />
      <div className="gutter">
        <main className="mx-auto grid max-w-6xl gap-28 py-24">
          <Gallery onOpen={setZoom} />
          <Service />
          <Suites />
          <Condo />
          <Review />
          <Location />
          <section aria-labelledby="perguntas" className="grid gap-6">
            <SectionHead id="perguntas" eyebrow="Bom saber" title="Antes de reservar" />
            <Faq />
          </section>
        </main>
      </div>

      <section id="reservar" aria-labelledby="fechamento" className="night-glow relative isolate overflow-hidden border-t">
        <img src={photoSrc("55c-piscina-noite")} alt="" width={1600} height={350} loading="lazy" className="absolute inset-x-0 top-0 -z-10 h-56 w-full object-cover opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="gutter">
          <div className="mx-auto grid max-w-6xl items-start gap-12 py-24 md:grid-cols-[minmax(0,1fr)_380px]">
            <div className="grid gap-6 pt-20">
              <Eyebrow>Reserva direta</Eyebrow>
              <h2 id="fechamento" className="max-w-[16ch] text-[2.8rem] leading-[1] md:text-[4rem]">
                Escolha as datas e <em className="text-amber">fale com o anfitrião</em>
              </h2>
              <p className="max-w-[44ch] text-muted-foreground">
                Até 10 hóspedes. A mensagem chega pronta no WhatsApp, com as datas, as noites e o número de pessoas.
              </p>
            </div>
            <BookingCard />
          </div>
        </div>
      </section>

      <footer className="gutter border-t">
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
