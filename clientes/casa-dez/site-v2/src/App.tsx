import * as React from "react"
import { addDays, differenceInCalendarDays, format, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  ConciergeBell,
  Flame,
  KeyRound,
  MapPin,
  MessageCircle,
  Minus,
  PawPrint,
  Plus,
  Snowflake,
  Star,
  Users,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import { Button } from "./components/ui/button"
import { Calendar } from "./components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Separator } from "./components/ui/separator"
import {
  AIRBNB_URL,
  AMENITY_GROUPS,
  CATEGORIES,
  FAQ,
  MAP_URL,
  MAX_GUESTS,
  NAME,
  PHOTOS,
  REVIEWS,
  ROOMS,
  photoSrc,
  thumbSrc,
} from "./data"
import { cn } from "./lib/utils"

const today = startOfDay(new Date())

interface Booking {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
  guests: number
  setGuests: (guests: number) => void
  openBooking: () => void
}

const BookingContext = React.createContext<Booking | null>(null)

function useBooking() {
  const booking = React.useContext(BookingContext)
  if (!booking) throw new Error("useBooking fora do BookingContext")
  return booking
}

// Mesmo hook do exemplo drawer-dialog do shadcn/ui.
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(() => window.matchMedia(query).matches)
  React.useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [query])
  return matches
}

const nightsOf = (range?: DateRange) =>
  range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0
const shortDate = (date: Date) => format(date, "d 'de' MMM", { locale: ptBR })
const plural = (n: number, one: string, many: string) => `${n} ${n > 1 ? many : one}`

function bookingMessage(range: DateRange, guests: number) {
  const nights = nightsOf(range)
  return [
    `Olá! Vi o site da ${NAME} e quero consultar disponibilidade:`,
    `• Entrada: ${format(range.from!, "dd/MM/yyyy")} (a partir das 12h)`,
    `• Saída: ${format(range.to!, "dd/MM/yyyy")} (até 12h)`,
    `• ${plural(nights, "noite", "noites")} · ${plural(guests, "hóspede", "hóspedes")}`,
  ].join("\n")
}

function rangeLabel(range?: DateRange) {
  if (!range?.from) return "Escolha as datas"
  if (!range.to) return `${shortDate(range.from)} – saída?`
  return `${shortDate(range.from)} – ${shortDate(range.to)}`
}

function RangeCalendar({ months = 1, className }: { months?: number; className?: string }) {
  const { range, setRange } = useBooking()
  return (
    <Calendar
      mode="range"
      locale={ptBR}
      numberOfMonths={months}
      defaultMonth={range?.from}
      selected={range}
      onSelect={setRange}
      disabled={{ before: today }}
      min={1}
      className={className}
    />
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">{children}</span>
}

/* Referência 1 — shadcn Date Range Picker: Popover + Calendar em modo período. */
function DateRangePicker({ className }: { className?: string }) {
  const { range } = useBooking()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className={cn("h-auto justify-start gap-3 px-3 py-2 text-left font-normal", className)}>
          <CalendarDays className="size-5 text-primary" />
          <span className="grid leading-tight">
            <FieldLabel>Entrada — saída</FieldLabel>
            <span className="text-base">{rangeLabel(range)}</span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <RangeCalendar months={2} />
      </PopoverContent>
    </Popover>
  )
}

function GuestsStepper({ className }: { className?: string }) {
  const { guests, setGuests } = useBooking()
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <span className="grid leading-tight">
        <FieldLabel>Hóspedes</FieldLabel>
        <span className="text-base tabular-nums">{plural(guests, "pessoa", "pessoas")}</span>
      </span>
      <span className="flex items-center gap-2">
        <Button size="icon" variant="outline" aria-label="Menos um hóspede" disabled={guests <= 1} onClick={() => setGuests(guests - 1)}>
          <Minus />
        </Button>
        <Button size="icon" variant="outline" aria-label="Mais um hóspede" disabled={guests >= MAX_GUESTS} onClick={() => setGuests(guests + 1)}>
          <Plus />
        </Button>
      </span>
    </div>
  )
}

function BookingSummary() {
  const { range, guests } = useBooking()
  const nights = nightsOf(range)
  if (!range?.from || !range.to || nights < 1) {
    return <p className="text-sm text-muted-foreground">Escolha a entrada e a saída no calendário.</p>
  }
  const message = bookingMessage(range, guests)
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted-foreground">
        {plural(nights, "noite", "noites")} · entrada a partir das 12h, saída até 12h
      </p>
      <p className="whitespace-pre-line rounded-md bg-secondary p-3 text-sm text-secondary-foreground">{message}</p>
      <Button asChild size="lg" className="w-full">
        <a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener">
          <MessageCircle /> Enviar pelo WhatsApp
        </a>
      </Button>
      <p className="text-xs text-muted-foreground">
        Versão de apresentação: na publicação, a mensagem vai direto para o WhatsApp do anfitrião.
      </p>
    </div>
  )
}

/* Referência 3 — shadcn Drawer/Dialog responsivo: Dialog no computador, Drawer no celular. */
function BookingFlow({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const description = "Escolha as datas e o número de hóspedes. A mensagem segue pronta para o WhatsApp do anfitrião."

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92svh] overflow-y-auto sm:max-w-[680px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-light">Consultar disponibilidade</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <RangeCalendar months={2} className="mx-auto p-0 [--cell-size:--spacing(10)]" />
          <GuestsStepper />
          <Separator />
          <BookingSummary />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[92svh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-serif text-2xl font-light">Consultar disponibilidade</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 overflow-y-auto px-4">
          <RangeCalendar className="mx-auto p-0 [--cell-size:--spacing(10)]" />
          <GuestsStepper />
          <Separator />
          <BookingSummary />
        </div>
        <DrawerFooter className="pt-3">
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function BookingCard() {
  return (
    <Card className="gap-5 shadow-sm">
      <CardHeader>
        <CardTitle className="font-serif text-2xl font-light">Consulte suas datas</CardTitle>
        <CardDescription>Reserva direta com o anfitrião, sem intermediários.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RangeCalendar className="mx-auto rounded-md border p-2 [--cell-size:--spacing(9)]" />
        <GuestsStepper />
        <Separator />
        <BookingSummary />
      </CardContent>
    </Card>
  )
}

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="grid gap-3">
      <p className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-muted-foreground">
        <span className="h-px w-7 bg-primary" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-4xl leading-tight md:text-5xl">{title}</h2>
      {children && <p className="max-w-[60ch] text-muted-foreground">{children}</p>}
    </div>
  )
}

/* Referência 2 — shadcn Carousel com API: contador "Foto n de N", atalhos por ambiente e miniaturas. */
function Gallery() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const thumbs = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api])

  // Centraliza a miniatura ativa rolando só a faixa; scrollIntoView rolaria a página inteira.
  React.useEffect(() => {
    const strip = thumbs.current
    const thumb = strip?.children[current] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({ left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2, behavior: "smooth" })
  }, [current])

  const photo = PHOTOS[current]
  return (
    <section aria-labelledby="fotos" className="grid grid-cols-1 gap-5 scroll-mt-24" id="galeria">
      <SectionHead id="fotos" eyebrow="Galeria" title="Cada canto da casa" />
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            size="sm"
            variant={photo.category === category ? "default" : "outline"}
            onClick={() => api?.scrollTo(PHOTOS.findIndex((p) => p.category === category))}
          >
            {category}
          </Button>
        ))}
      </div>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {PHOTOS.map((p, i) => (
            <CarouselItem key={p.id}>
              <img
                src={photoSrc(p.id)}
                alt={p.caption}
                width={974}
                height={716}
                loading={i < 2 ? "eager" : "lazy"}
                className="aspect-[4/3] w-full rounded-md object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 size-10 border-0 bg-card/90 shadow" />
        <CarouselNext className="right-3 size-10 border-0 bg-card/90 shadow" />
      </Carousel>
      <div className="flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
        <span>{photo.caption}</span>
        <span className="shrink-0 tabular-nums">
          Foto {current + 1} de {PHOTOS.length}
        </span>
      </div>
      <div ref={thumbs} className="relative flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {PHOTOS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Ver foto ${i + 1}: ${p.caption}`}
            aria-current={i === current}
            className={cn(
              "shrink-0 overflow-hidden rounded-sm border-2 border-transparent opacity-55 transition-opacity hover:opacity-100",
              i === current && "border-primary opacity-100",
            )}
          >
            <img src={thumbSrc(p.id)} alt="" width={240} height={176} loading="lazy" className="h-14 w-[76px] object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}

const HIGHLIGHTS = [
  { icon: Users, label: "Até 26 hóspedes" },
  { icon: BedDouble, label: "10 quartos · 20 camas" },
  { icon: Bath, label: "11 banheiros" },
  { icon: Waves, label: "Piscina privativa" },
  { icon: MapPin, label: "~100 m da praia" },
  { icon: Star, label: "4,96 · 23 avaliações" },
]

const TOP_AMENITIES = [
  { icon: Waves, label: "Piscina privativa" },
  { icon: Flame, label: "Churrasqueira" },
  { icon: Snowflake, label: "Área gourmet climatizada" },
  { icon: Utensils, label: "Cozinha completa" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: WashingMachine, label: "Máquina de lavar e secadora" },
  { icon: Car, label: "Estacionamento gratuito" },
  { icon: ConciergeBell, label: "Equipe 24 h para receber" },
  { icon: KeyRound, label: "Self check-in" },
  { icon: PawPrint, label: "Aceita pets" },
]

function Amenities() {
  return (
    <section aria-labelledby="comodidades" className="grid grid-cols-1 gap-6 scroll-mt-24" id="comodidades-secao">
      <SectionHead id="comodidades" eyebrow="Comodidades" title="É só chegar">
        Roupa de cama e banho, cozinha completa e equipe disponível 24 horas para receber o grupo.
      </SectionHead>
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {TOP_AMENITIES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b pb-4">
            <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
            {label}
          </li>
        ))}
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="justify-self-start">
            Ver todas as comodidades
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl font-light">O que a casa oferece</DialogTitle>
            <DialogDescription>Lista completa do anúncio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6">
            {AMENITY_GROUPS.map((group) => (
              <div key={group.title} className="grid gap-2">
                <h3 className="text-xl">{group.title}</h3>
                <ul className="grid gap-1.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function Reviews() {
  return (
    <section aria-labelledby="avaliacoes" className="grid grid-cols-1 gap-6 scroll-mt-24" id="avaliacoes-secao">
      <SectionHead id="avaliacoes" eyebrow="Hóspedes" title="“Melhor do que imaginava”" />
      <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
        <span className="font-serif text-7xl font-light leading-none text-primary">4,96</span>
        <dl className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <dt className="text-muted-foreground">Limpeza</dt>
            <dd className="font-serif text-2xl">5,0</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Exatidão</dt>
            <dd className="font-serif text-2xl">4,8</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Avaliações</dt>
            <dd className="font-serif text-2xl">23</dd>
          </div>
        </dl>
      </div>
      <p className="text-sm text-muted-foreground">Selo Preferido dos hóspedes no Airbnb · mais citado: hospitalidade (12)</p>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {REVIEWS.map((review) => (
            <CarouselItem key={review.name} className="md:basis-1/2">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4">
                  <span className="flex gap-0.5 text-primary" aria-label="5 estrelas">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                  <blockquote className="font-serif text-xl leading-snug">“{review.text}”</blockquote>
                  <p className="mt-auto text-sm text-muted-foreground">
                    {review.name} · {review.when}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex justify-end gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  )
}

function useSolidHeader(target: React.RefObject<HTMLElement | null>) {
  const [solid, setSolid] = React.useState(false)
  React.useEffect(() => {
    if (!target.current) return
    const observer = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting), { rootMargin: "-80px 0px 0px 0px" })
    observer.observe(target.current)
    return () => observer.disconnect()
  }, [target])
  return solid
}

export function App() {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: addDays(today, 30), to: addDays(today, 34) })
  const [guests, setGuests] = React.useState(16)
  const [bookingOpen, setBookingOpen] = React.useState(false)
  const cover = React.useRef<HTMLElement>(null)
  const solid = useSolidHeader(cover)
  const booking = React.useMemo<Booking>(
    () => ({ range, setRange, guests, setGuests, openBooking: () => setBookingOpen(true) }),
    [range, guests],
  )

  return (
    <BookingContext.Provider value={booking}>
      <header
        className={cn(
          "gutter fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300",
          solid ? "border-b bg-background/95 text-foreground backdrop-blur" : "text-bone",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-8">
          <a href="#topo" className="mr-auto text-sm font-medium uppercase tracking-[0.42em] no-underline">
            {NAME}
          </a>
          <nav className="hidden gap-7 text-sm md:flex" aria-label="Seções">
            {[
              ["#galeria", "Fotos"],
              ["#quartos-secao", "Quartos"],
              ["#comodidades-secao", "Comodidades"],
              ["#avaliacoes-secao", "Avaliações"],
              ["#local-secao", "Localização"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="no-underline opacity-80 hover:opacity-100">
                {label}
              </a>
            ))}
          </nav>
          <Button
            variant={solid ? "default" : "outline"}
            className={cn(!solid && "border-bone/70 bg-transparent text-bone hover:bg-bone hover:text-foreground")}
            onClick={booking.openBooking}
          >
            Reservar
          </Button>
        </div>
      </header>

      <section ref={cover} id="topo" className="relative grid min-h-[100svh] items-end overflow-hidden bg-night text-bone">
        <img
          src={photoSrc("34-piscina")}
          alt="Vista aérea da casa de dois pavimentos, do anexo com guarda-sóis e da piscina, com coqueiros ao fundo."
          width={974}
          height={716}
          className="animate-settle absolute inset-0 size-full max-w-none object-cover object-[30%_60%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_17_22/.92)_0%,rgb(11_17_22/.45)_42%,rgb(11_17_22/.1)_68%,rgb(11_17_22/.55)_100%)]" />
        <div className="gutter relative mx-auto grid w-full max-w-6xl gap-5 pt-36 pb-32 md:pb-[max(3rem,calc(2rem+env(safe-area-inset-bottom)))]">
          <p className="animate-rise flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.26em] text-bone/85">
            <span className="h-px w-7 bg-bone" />
            Porto de Galinhas · Pernambuco
          </p>
          <h1 className="animate-rise text-[clamp(4.2rem,15vw,12rem)] leading-[0.9] tracking-[-0.035em]">{NAME}</h1>
          <p className="animate-rise font-serif text-[clamp(1.5rem,3.4vw,2.6rem)] italic leading-tight [animation-delay:.3s]">
            Dez quartos. Cem metros do mar.
          </p>

          <div className="animate-rise mt-4 hidden w-fit items-center gap-2 rounded-md bg-card p-2 text-foreground shadow-xl [animation-delay:.6s] md:flex">
            <DateRangePicker />
            <Separator orientation="vertical" className="h-10" />
            <GuestsStepper className="px-3" />
            <Button size="lg" className="h-12 px-6" onClick={booking.openBooking}>
              Consultar disponibilidade
            </Button>
          </div>
          <p className="animate-rise text-xs uppercase tracking-[0.16em] text-bone/85 [animation-delay:.8s]">
            4,96 ★ · Preferido dos hóspedes · 23 avaliações
          </p>
        </div>
      </section>

      <div className="gutter border-b bg-card">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 py-5 text-sm sm:grid-cols-3 lg:grid-cols-6">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5">
              <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="gutter">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-20 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-24">
          <main className="grid min-w-0 grid-cols-1 gap-20">
            <Gallery />

            <section aria-labelledby="a-casa" className="grid grid-cols-1 gap-6">
              <SectionHead id="a-casa" eyebrow="A casa" title="Uma casa inteira para até 26 pessoas">
                Recém-construída, com móveis importados dos Estados Unidos, piscina privativa, churrasqueira e área
                gourmet climatizada, na melhor região de Porto de Galinhas.
              </SectionHead>
              <div className="grid grid-cols-2 gap-3">
                <img src={photoSrc("02-sala")} alt="Sala integrada à área gourmet com sofás de fibra e bancada com banquetas." width={974} height={716} loading="lazy" className="aspect-[4/5] w-full rounded-md object-cover" />
                <img src={photoSrc("32-exterior")} alt="Varanda superior com chaise redonda branca voltada para a piscina." width={974} height={716} loading="lazy" className="mt-10 aspect-[4/5] w-full rounded-md object-cover object-[72%_50%]" />
              </div>
            </section>

            <section aria-labelledby="quartos" className="grid grid-cols-1 gap-6 scroll-mt-24" id="quartos-secao">
              <SectionHead id="quartos" eyebrow="Onde dormir" title="Dez quartos, vinte camas">
                Roupa de cama e banho incluídas. O Quarto 4 tem cama king; o Quarto 5, sete camas de solteiro.
              </SectionHead>
              <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {ROOMS.map(([room, beds], i) => (
                  <li key={room}>
                    <Card className="h-full gap-2 py-4">
                      <CardContent className="grid gap-1 px-4">
                        <span className="text-xs tabular-nums tracking-[0.14em] text-primary">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-serif text-xl">{room}</span>
                        <span className="text-sm text-muted-foreground">{beds}</span>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ol>
            </section>

            <Amenities />
            <Reviews />

            <section aria-labelledby="local" className="grid grid-cols-1 gap-6 scroll-mt-24" id="local-secao">
              <SectionHead id="local" eyebrow="Localização" title="Na melhor região de Porto de Galinhas">
                Ao lado do Enotel, a cerca de 100 m da praia, em Ipojuca. O endereço exato é enviado após a confirmação.
              </SectionHead>
              <Button asChild variant="outline" className="justify-self-start">
                <a href={MAP_URL} target="_blank" rel="noopener">
                  Ver a região no mapa <ArrowUpRight />
                </a>
              </Button>
            </section>

            <section aria-labelledby="regras" className="grid grid-cols-1 gap-4">
              <SectionHead id="regras" eyebrow="Bom saber" title="Antes de reservar" />
              <Accordion type="single" collapsible defaultValue="item-0">
                {FAQ.map(([question, answer], i) => (
                  <AccordionItem key={question} value={`item-${i}`}>
                    <AccordionTrigger className="text-base">{question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </main>

          <aside className="hidden lg:block" aria-label="Reserva">
            <div className="sticky top-24">
              <BookingCard />
            </div>
          </aside>
        </div>
      </div>

      <footer className="gutter border-t bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-10 pb-28 text-sm text-muted-foreground lg:pb-10">
          <span className="text-xs font-medium uppercase tracking-[0.42em] text-foreground">{NAME}</span>
          <span>
            Porto de Galinhas · Ipojuca · PE · Também no{" "}
            <a href={AIRBNB_URL} target="_blank" rel="noopener" className="underline underline-offset-4">
              Airbnb
            </a>
          </span>
          <span>Versão de apresentação · Site por NEXO Websites</span>
        </div>
      </footer>

      <div className="gutter fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="grid text-sm leading-tight">
            <span className="font-medium">{rangeLabel(range)}</span>
            <span className="text-muted-foreground">{plural(guests, "hóspede", "hóspedes")} · 4,96 ★</span>
          </p>
          <Button size="lg" onClick={booking.openBooking}>
            Consultar datas
          </Button>
        </div>
      </div>

      <BookingFlow open={bookingOpen} onOpenChange={setBookingOpen} />
    </BookingContext.Provider>
  )
}
