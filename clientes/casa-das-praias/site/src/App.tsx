import * as React from "react"
import { addDays, differenceInCalendarDays, format, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import {
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Fence,
  Flame,
  MapPin,
  MessageCircle,
  Minus,
  PartyPopper,
  PawPrint,
  Plus,
  Refrigerator,
  ShowerHead,
  Snowflake,
  Tv,
  Umbrella,
  Users,
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
  AMENITY_GROUPS,
  BEDS,
  CATEGORIES,
  FAQ,
  MAP_URL,
  MAX_GUESTS,
  NAME,
  PHOTOS,
  SUITES,
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
    `• Entrada: ${format(range.from!, "dd/MM/yyyy")}`,
    `• Saída: ${format(range.to!, "dd/MM/yyyy")}`,
    `• ${plural(nights, "noite", "noites")} · ${plural(guests, "hóspede", "hóspedes")}`,
  ].join("\n")
}

function rangeLabel(range?: DateRange) {
  if (!range?.from) return "Escolha as datas"
  if (!range.to) return `${shortDate(range.from)} – saída?`
  return `${shortDate(range.from)} – ${shortDate(range.to)}`
}

function Plaque({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("plaque", className)}>
      <span className="plaque-line">{children}</span>
    </span>
  )
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
  return <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{children}</span>
}

/* shadcn Date Range Picker: Popover + Calendar em modo período. */
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
      <p className="text-sm text-muted-foreground">{plural(nights, "noite", "noites")} · até {MAX_GUESTS} pessoas em cama</p>
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

/* shadcn Drawer/Dialog responsivo: Dialog no computador, Drawer no celular. */
function BookingFlow({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const description = "Escolha as datas e o número de hóspedes. A mensagem segue pronta para o WhatsApp do anfitrião."

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92svh] overflow-y-auto sm:max-w-[680px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">Consultar disponibilidade</DialogTitle>
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
          <DrawerTitle className="text-2xl">Consultar disponibilidade</DrawerTitle>
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
        <CardTitle className="text-2xl">Consulte suas datas</CardTitle>
        <CardDescription>Reserva direta com o anfitrião, pelo WhatsApp.</CardDescription>
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
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 id={id} className="text-[2.6rem] leading-[0.95] md:text-[3.4rem]">{title}</h2>
      {children && <p className="max-w-[60ch] text-[1.05rem] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

/* shadcn Carousel com API: contador "Foto n de N", atalhos por ambiente e miniaturas. */
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
      <SectionHead id="fotos" eyebrow="Galeria" title="Piscina, varandas e suítes" />
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
                width={1300}
                height={746}
                loading={i < 2 ? "eager" : "lazy"}
                className="aspect-[1300/746] w-full rounded-md bg-muted object-cover"
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
            <img src={thumbSrc(p.id)} alt="" width={240} height={138} loading="lazy" className="h-14 w-[86px] object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}

function Suites() {
  return (
    <section aria-labelledby="suites" className="grid grid-cols-1 gap-8 scroll-mt-24" id="suites-secao">
      <SectionHead id="suites" eyebrow="Onde dormir" title="Suítes com nome de praia">
        São 6 suítes, todas com ar-condicionado split, ventilador, TV e camas box. Nas portas, placas com nomes de
        praias da região, como Serrambi e Maracaípe.
      </SectionHead>
      <ul className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2">
        {SUITES.map((suite) => (
          <li key={suite.name} className="relative">
            <img
              src={photoSrc(suite.photo)}
              alt={suite.alt}
              width={624}
              height={397}
              loading="lazy"
              className="aspect-[3/2] w-full rounded-md bg-muted object-cover"
            />
            <Plaque className="absolute -bottom-5 left-4 text-[1.3rem]">{suite.name}</Plaque>
          </li>
        ))}
      </ul>
      <div className="grid gap-4 rounded-md border bg-card p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8">
        <p className="font-display text-[3.4rem] font-semibold leading-[0.85] text-primary">
          21<span className="block text-base font-medium uppercase tracking-[0.12em] text-muted-foreground">em cama</span>
        </p>
        <div className="grid gap-3">
          <dl className="grid gap-2">
            {BEDS.map((row) => (
              <div key={row.beds} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b pb-2">
                <dt className="font-semibold">{row.suites}</dt>
                <dd className="text-muted-foreground">{row.beds}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted-foreground">
            Uma das suítes fica no térreo, para pessoas com dificuldades de mobilidade. A casa tem ainda 8 banheiros,
            chuveiro quente, roupa de cama, 2 colchões e 1 suíte com ventilador para secretária.
          </p>
        </div>
      </div>
    </section>
  )
}

const GROUP = [
  { icon: Users, label: "Sala ampla para mais de 20 pessoas" },
  { icon: Flame, label: "2 churrasqueiras, 1 no terraço gourmet" },
  { icon: Waves, label: "Varandas cobertas de frente para a piscina" },
  { icon: PartyPopper, label: "Festas permitidas" },
]

function Leisure() {
  return (
    <section aria-labelledby="lazer" className="grid grid-cols-1 gap-8 scroll-mt-24" id="lazer-secao">
      <SectionHead id="lazer" eyebrow="Para o grupo todo" title="Churrasco, piscina e lugar para todo mundo">
        Varandas de frente para a piscina, peças de barro penduradas no teto e mesas grandes de madeira.
      </SectionHead>
      <div className="grid grid-cols-5 gap-3">
        <img
          src={photoSrc("08-churrasqueira")}
          alt="Churrasqueira de tijolos, bancada de granito e mesa de madeira maciça com cocos, ao lado do jardim."
          width={1300}
          height={746}
          loading="lazy"
          className="col-span-3 aspect-[4/5] h-full w-full rounded-md bg-muted object-cover object-[62%_50%]"
        />
        <div className="col-span-2 grid gap-3">
          <img
            src={photoSrc("03-varanda")}
            alt="Peça de barro em forma de argola pendurada na varanda, com a piscina ao fundo."
            width={1300}
            height={746}
            loading="lazy"
            className="aspect-square w-full rounded-md bg-muted object-cover object-[30%_50%]"
          />
          <img
            src={photoSrc("06-varanda")}
            alt="Varanda com poltronas de fibra e mesa redonda ao lado da piscina."
            width={1300}
            height={746}
            loading="lazy"
            className="aspect-square w-full rounded-md bg-muted object-cover object-[45%_50%]"
          />
        </div>
      </div>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {GROUP.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b pb-3">
            <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

const TOP_AMENITIES = [
  { icon: Waves, label: "Piscina" },
  { icon: Flame, label: "2 churrasqueiras" },
  { icon: Snowflake, label: "Ar split nas 6 suítes" },
  { icon: Tv, label: "TV em todas as suítes" },
  { icon: ShowerHead, label: "Chuveiro quente" },
  { icon: BedDouble, label: "Roupa de cama" },
  { icon: Refrigerator, label: "2 geladeiras, freezer e gelágua" },
  { icon: WashingMachine, label: "Máquina de lavar e tanque" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Umbrella, label: "6 cadeiras de praia" },
  { icon: Fence, label: "Condomínio fechado" },
  { icon: PawPrint, label: "Aceita animais" },
]

function Amenities() {
  return (
    <section aria-labelledby="comodidades" className="grid grid-cols-1 gap-6 scroll-mt-24" id="comodidades-secao">
      <SectionHead id="comodidades" eyebrow="Comodidades" title="O que a casa oferece" />
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {TOP_AMENITIES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b pb-3">
            <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.75} />
            {label}
          </li>
        ))}
      </ul>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="justify-self-start">
            Ver a lista completa
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl">Tudo o que a casa tem</DialogTitle>
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

const FACTS = [
  { value: "21", label: "pessoas em cama" },
  { value: "6", label: "suítes" },
  { value: "8", label: "banheiros" },
  { value: "2ª", label: "quadra da praia" },
]

export function App() {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: addDays(today, 30), to: addDays(today, 34) })
  const [guests, setGuests] = React.useState(15)
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
          solid ? "border-b bg-background/95 text-foreground backdrop-blur" : "text-white",
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-8">
          <a href="#topo" className="mr-auto font-display text-lg font-bold uppercase tracking-[0.08em] no-underline">
            {NAME}
          </a>
          <nav className="hidden gap-7 text-sm font-medium md:flex" aria-label="Seções">
            {[
              ["#galeria", "Fotos"],
              ["#suites-secao", "Suítes"],
              ["#lazer-secao", "Lazer"],
              ["#comodidades-secao", "Comodidades"],
              ["#local-secao", "Localização"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="no-underline opacity-80 hover:opacity-100">
                {label}
              </a>
            ))}
          </nav>
          <Button
            variant={solid ? "default" : "outline"}
            className={cn(!solid && "border-white/70 bg-transparent text-white hover:bg-white hover:text-foreground")}
            onClick={booking.openBooking}
          >
            Reservar
          </Button>
        </div>
      </header>

      <section ref={cover} id="topo" className="relative grid min-h-[86svh] items-end overflow-hidden bg-deep text-white md:min-h-[92svh]">
        <img
          src={photoSrc("01-piscina")}
          alt="Piscina com degraus vista do andar de cima, deck de pedra, gramado, espreguiçadeiras e a área coberta da churrasqueira, entre coqueiros."
          width={1300}
          height={746}
          className="animate-settle absolute inset-0 size-full max-w-none object-cover object-[18%_60%] md:object-[42%_60%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(13_24_56/.9)_0%,rgb(13_24_56/.45)_45%,rgb(13_24_56/.05)_70%,rgb(13_24_56/.5)_100%)]" />
        <div className="gutter relative mx-auto grid w-full max-w-6xl justify-items-start gap-5 pt-36 pb-28 md:pb-[max(3rem,calc(2rem+env(safe-area-inset-bottom)))]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-white/90">
            Porto de Galinhas · Pernambuco
          </p>
          <h1 className="animate-hang text-[clamp(2.3rem,10vw,6.2rem)]">
            <Plaque>{NAME}</Plaque>
          </h1>
          <p className="max-w-[30ch] text-[clamp(1.15rem,2.6vw,1.6rem)] leading-snug text-white/95">
            Seis suítes, piscina e duas churrasqueiras num condomínio fechado, na 2ª quadra da praia.
          </p>

          <div className="mt-3 hidden w-fit items-center gap-2 rounded-md bg-card p-2 text-foreground shadow-xl md:flex">
            <DateRangePicker />
            <Separator orientation="vertical" className="h-10" />
            <GuestsStepper className="px-3" />
            <Button size="lg" className="h-12 px-6" onClick={booking.openBooking}>
              Consultar disponibilidade
            </Button>
          </div>
        </div>
      </section>

      <div className="gutter tiles text-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.label} className="grid gap-1">
              <dt className="order-2 text-sm font-medium uppercase tracking-[0.12em] text-water">{fact.label}</dt>
              <dd className="order-1 font-display text-[3.2rem] font-semibold leading-[0.85] tabular-nums">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="gutter">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-20 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-24">
          <main className="grid min-w-0 grid-cols-1 gap-20">
            <Gallery />
            <Suites />
            <Leisure />
            <Amenities />

            <section aria-labelledby="local" className="grid grid-cols-1 gap-6 scroll-mt-24" id="local-secao">
              <SectionHead id="local" eyebrow="Localização" title="Condomínio fechado, perto da praia">
                Na 2ª quadra da praia, em Porto de Galinhas, Pernambuco. Peça a localização exata ao anfitrião pelo
                WhatsApp.
              </SectionHead>
              <Button asChild variant="outline" className="justify-self-start">
                <a href={MAP_URL} target="_blank" rel="noopener">
                  <MapPin /> Ver Porto de Galinhas no mapa <ArrowUpRight />
                </a>
              </Button>
            </section>

            <section aria-labelledby="regras" className="grid grid-cols-1 gap-4">
              <SectionHead id="regras" eyebrow="Bom saber" title="Antes de reservar" />
              <Accordion type="single" collapsible defaultValue="item-0">
                {FAQ.map(([question, answer], i) => (
                  <AccordionItem key={question} value={`item-${i}`}>
                    <AccordionTrigger className="font-sans text-base font-semibold">{question}</AccordionTrigger>
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

      <section className="gutter tiles text-white" aria-labelledby="fechamento">
        <div className="mx-auto grid max-w-6xl justify-items-start gap-5 py-14">
          <Plaque className="text-[1.15rem]">Reserva direta</Plaque>
          <h2 id="fechamento" className="max-w-[18ch] text-[2.6rem] leading-[0.95] md:text-[3.4rem]">
            Escolha as datas e fale com o anfitrião
          </h2>
          <Button size="lg" variant="secondary" className="h-12 px-6" onClick={booking.openBooking}>
            <CalendarDays /> Consultar disponibilidade
          </Button>
        </div>
      </section>

      <footer className="gutter bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-10 pb-28 text-sm text-muted-foreground lg:pb-10">
          <span className="font-display text-base font-bold uppercase tracking-[0.08em] text-foreground">{NAME}</span>
          <span>Porto de Galinhas · Pernambuco</span>
          <span>Versão de apresentação · Site por NEXO Websites</span>
        </div>
      </footer>

      <div className="gutter fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <p className="grid text-sm leading-tight">
            <span className="font-medium">{rangeLabel(range)}</span>
            <span className="text-muted-foreground">{plural(guests, "hóspede", "hóspedes")} · até {MAX_GUESTS}</span>
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
