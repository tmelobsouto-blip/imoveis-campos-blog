import * as React from "react"
import { addDays, differenceInCalendarDays, format, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import {
  Armchair,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  Copy,
  CookingPot,
  Fan,
  Flame,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  PawPrint,
  Plus,
  Shirt,
  Snowflake,
  Star,
  TreePalm,
  Tv,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import { Button } from "./components/ui/button"
import { Calendar } from "./components/ui/calendar"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
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
  DrawerTrigger,
} from "./components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Separator } from "./components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group"
import {
  AMENITY_GROUPS,
  CATEGORIES,
  DISTANCES,
  FAQ,
  HERO,
  MAP_URL,
  MAX_GUESTS,
  MOSAIC,
  NAME,
  PHOTOS,
  REVIEWS,
  SUITES,
  photoSrc,
  thumbSrc,
  type Crop,
} from "./data"
import { cn } from "./lib/utils"

const today = startOfDay(new Date())
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

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

function CropImage({ crop, className, eager }: { crop: Crop; className?: string; eager?: boolean }) {
  return (
    <img
      src={photoSrc(crop.id)}
      alt={crop.alt}
      width={crop.width}
      height={crop.height}
      loading={eager ? "eager" : "lazy"}
      className={cn("size-full bg-muted object-cover", className)}
    />
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
        <Button variant="ghost" className={cn("h-auto justify-start gap-3 px-3 py-2 text-left", className)}>
          <CalendarDays data-icon="inline-start" />
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
  const [copied, setCopied] = React.useState(false)
  const messageRef = React.useRef<HTMLParagraphElement>(null)
  const nights = nightsOf(range)
  if (!range?.from || !range.to || nights < 1) {
    return <p className="text-sm text-muted-foreground">Escolha a entrada e a saída no calendário.</p>
  }
  const message = bookingMessage(range, guests)

  // Alguns visualizadores recusam a área de transferência: aí a mensagem fica selecionada para copiar à mão.
  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      if (messageRef.current) window.getSelection()?.selectAllChildren(messageRef.current)
    }
  }

  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted-foreground">{plural(nights, "noite", "noites")} · até {MAX_GUESTS} pessoas</p>
      <p ref={messageRef} className="whitespace-pre-line rounded-md bg-secondary p-3 text-sm text-secondary-foreground">{message}</p>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <Button asChild size="lg">
          <a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener">
            <MessageCircle data-icon="inline-start" /> Enviar pelo WhatsApp
          </a>
        </Button>
        <Button size="lg" variant="outline" onClick={copyMessage} aria-live="polite">
          {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />} {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
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
            <DialogTitle>Consultar disponibilidade</DialogTitle>
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
          <DrawerTitle>Consultar disponibilidade</DrawerTitle>
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
    <Card className="gap-5">
      <CardHeader>
        <CardTitle>Consulte suas datas</CardTitle>
        <CardDescription>Reserva direta com o anfitrião, pelo WhatsApp.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RangeCalendar className="mx-auto rounded-lg border p-2 [--cell-size:--spacing(9)]" />
        <GuestsStepper />
        <Separator />
        <BookingSummary />
      </CardContent>
    </Card>
  )
}

function SectionHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-4">
      <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-wood">
        <span className="h-px w-8 bg-wood/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-[2.4rem] leading-[1.02] md:text-[3.2rem]">{title}</h2>
      {children && <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

/* Foto ampliada: Dialog do shadcn com Carousel, aberto na foto clicada (startIndex do Embla). */
function PhotoViewer({ index, onClose }: { index: number | null; onClose: () => void }) {
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
    <Dialog open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-[min(96vw,1200px)] max-w-none gap-3 border-0 bg-deep p-3 pt-12 text-white sm:max-w-none"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") api?.scrollPrev()
          if (e.key === "ArrowRight") api?.scrollNext()
        }}
      >
        <DialogTitle className="sr-only">Fotos da casa</DialogTitle>
        <DialogDescription className="sr-only">Use as setas ou deslize para passar as fotos.</DialogDescription>
        {index !== null && (
          <Carousel setApi={setApi} opts={{ loop: true, startIndex: index }}>
            <CarouselContent>
              {PHOTOS.map((p) => (
                <CarouselItem key={p.id} className="grid place-items-center">
                  <img src={photoSrc(p.id)} alt={p.caption} width={1600} height={p.height} className="max-h-[76svh] w-auto rounded-md" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant="secondary" className="left-2 size-10" />
            <CarouselNext variant="secondary" className="right-2 size-10" />
          </Carousel>
        )}
        <p className="flex items-baseline justify-between gap-4 px-1 text-sm text-white/80">
          <span>{PHOTOS[current].caption}</span>
          <span className="shrink-0 tabular-nums">
            {current + 1} de {PHOTOS.length}
          </span>
        </p>
      </DialogContent>
    </Dialog>
  )
}

/* Todas as fotos em grade, por ambiente (Dialog do shadcn). Tocar numa foto abre a foto ampliada por cima. */
function PhotoTour({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [zoom, setZoom] = React.useState<number | null>(null)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] w-[min(96vw,1100px)] max-w-none overflow-y-auto p-5 sm:max-w-none md:p-8">
        <DialogHeader>
          <DialogTitle>Todas as fotos</DialogTitle>
          <DialogDescription>
            {PHOTOS.length} fotos do anúncio, por ambiente. Toque numa foto para ampliar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8">
          {CATEGORIES.map((category) => (
            <section key={category} className="grid gap-3" aria-label={category}>
              <h3 className="text-xl">{category}</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {PHOTOS.map((p, i) =>
                  p.category === category ? (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setZoom(i)}
                      aria-label={`Ampliar: ${p.caption}`}
                      className="group overflow-hidden rounded-md"
                    >
                      <img src={photoSrc(p.id)} alt={p.caption} width={1600} height={p.height} loading="lazy" className="photo-zoom aspect-[3/2] w-full bg-muted object-cover" />
                    </button>
                  ) : null,
                )}
              </div>
            </section>
          ))}
        </div>
        <PhotoViewer index={zoom} onClose={() => setZoom(null)} />
      </DialogContent>
    </Dialog>
  )
}

/* Mosaico de abertura com recortes sem marca d'água; o último quadro abre a grade com todas as fotos. */
function Mosaic({ onShowAll }: { onShowAll: () => void }) {
  const [first, ...rest] = MOSAIC
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-3">
      <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-lg md:row-span-2 md:aspect-auto">
        <CropImage crop={first} className="photo-zoom" />
      </div>
      {rest.map((crop, i) => (
        <div key={crop.id} className={cn("relative aspect-square overflow-hidden rounded-lg", i >= 4 && "col-span-2 aspect-[2/1] md:hidden")}>
          <CropImage crop={crop} className="photo-zoom" />
          {i === 3 && (
            <button
              type="button"
              onClick={onShowAll}
              className="absolute inset-0 hidden place-content-center gap-1 bg-deep/55 text-center text-white backdrop-blur-[1px] transition-colors hover:bg-deep/70 md:grid"
            >
              <LayoutGrid className="mx-auto size-5" />
              <span className="font-display text-2xl">Ver as {PHOTOS.length} fotos</span>
            </button>
          )}
        </div>
      ))}
      <Button variant="outline" className="col-span-2 md:hidden" onClick={onShowAll}>
        <LayoutGrid data-icon="inline-start" /> Ver as {PHOTOS.length} fotos
      </Button>
    </div>
  )
}

/* shadcn Carousel com API: contador "Foto n de N", atalhos por ambiente, miniaturas e foto ampliada. */
function Gallery({ onShowAll }: { onShowAll: () => void }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [zoom, setZoom] = React.useState<number | null>(null)
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
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        spacing={2}
        value={photo.category}
        onValueChange={(category) => {
          // No modo único, tocar no ambiente ativo manda "": a galeria continua nele.
          if (category) api?.scrollTo(PHOTOS.findIndex((p) => p.category === category))
        }}
        aria-label="Ambientes"
        className="flex-wrap"
      >
        {CATEGORIES.map((category) => (
          <ToggleGroupItem key={category} value={category}>
            {category}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {PHOTOS.map((p, i) => (
            <CarouselItem key={p.id}>
              <button type="button" onClick={() => setZoom(i)} aria-label={`Ampliar foto ${i + 1}: ${p.caption}`} className="block w-full cursor-zoom-in overflow-hidden rounded-lg">
                <img
                  src={photoSrc(p.id)}
                  alt={p.caption}
                  width={1600}
                  height={p.height}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="aspect-[2/1] w-full bg-muted object-cover"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="secondary" className="left-3 size-10" />
        <CarouselNext variant="secondary" className="right-3 size-10" />
      </Carousel>
      <div className="flex items-baseline justify-between gap-4 text-sm text-muted-foreground">
        <span>{photo.caption} · toque para ampliar</span>
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
              "shrink-0 overflow-hidden rounded-md border-2 border-transparent opacity-55 transition-opacity hover:opacity-100",
              i === current && "border-primary opacity-100",
            )}
          >
            <img src={thumbSrc(p.id)} alt="" width={240} height={Math.round((240 * p.height) / 1600)} loading="lazy" className="h-14 w-[96px] object-cover" />
          </button>
        ))}
      </div>
      <Button variant="link" className="justify-self-start px-0" onClick={onShowAll}>
        <LayoutGrid data-icon="inline-start" /> Ver todas em grade
      </Button>
      <PhotoViewer index={zoom} onClose={() => setZoom(null)} />
    </section>
  )
}

function Suites() {
  return (
    <section aria-labelledby="suites" className="grid grid-cols-1 gap-8 scroll-mt-24" id="suites-secao">
      <SectionHead id="suites" eyebrow="Onde dormir" title={<>Cinco suítes, <em>todas com banheiro</em></>}>
        Os 5 quartos são suítes e cada um tem uma cama de casal. A casa tem ainda 2 lavabos: 7 banheiros ao todo.
      </SectionHead>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SUITES.map((suite) => (
          <li key={suite.n}>
            <Card className="h-full gap-0 py-5">
              <CardHeader className="px-5">
                <CardTitle>Suíte {suite.n}</CardTitle>
                {/* Ícones só na linha do título: a descrição ocupa a largura toda do cartão. */}
                <CardDescription className="col-span-2">{suite.label}</CardDescription>
                <CardAction className="row-span-1 flex items-end gap-1.5 text-primary" aria-hidden="true">
                  {suite.beds.map(({ icon: Icon, name }, i) => (
                    <Icon key={i} className={cn(name === "casal" ? "size-6" : "size-5", name === "bicama" && "opacity-60")} strokeWidth={1.6} />
                  ))}
                </CardAction>
              </CardHeader>
            </Card>
          </li>
        ))}
        <li className="grid content-center gap-1 rounded-xl bg-primary p-5 text-primary-foreground">
          <p className="font-display text-[3rem] leading-[0.9]">17</p>
          <p className="text-sm text-primary-foreground/75">pessoas · 5 camas de casal e 7 de solteiro, duas delas bicamas</p>
        </li>
      </ul>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {[
          { icon: Snowflake, label: "5 ar-condicionados" },
          { icon: Fan, label: "3 ventiladores" },
          { icon: BedDouble, label: "Roupa de cama" },
          { icon: Shirt, label: "Ferro de passar" },
        ].map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b pb-3">
            <Icon className="size-5 shrink-0 text-wood" strokeWidth={1.6} />
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

const LEISURE = [
  { icon: Waves, label: "Piscina privativa com cascata" },
  { icon: Flame, label: "Churrasqueira com pia, bancada e utensílios" },
  { icon: Armchair, label: "Terraço coberto com redes, poltronas e balanço" },
  { icon: TreePalm, label: "Gramado com guarda-sóis e mesas" },
  { icon: Moon, label: "Piscina e jardim iluminados à noite" },
]

function Leisure() {
  return (
    <section aria-labelledby="lazer" className="grid grid-cols-1 gap-8 scroll-mt-24" id="lazer-secao">
      <SectionHead id="lazer" eyebrow="Área de lazer" title={<>Piscina, terraço e <em>churrasqueira</em></>}>
        Tudo no quintal: a piscina com cascata, o terraço coberto com redes e a churrasqueira com parede de azulejos.
      </SectionHead>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        <div className="col-span-2 overflow-hidden rounded-lg md:col-span-3">
          <img src={photoSrc("31a-terraco-redes")} alt="Rede verde atravessando o terraço, poltronas de fibra com almofadas amarelas e a piscina ao fundo." width={1600} height={406} loading="lazy" className="photo-zoom aspect-[2.4/1] w-full bg-muted object-cover" />
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-lg">
          <img src={photoSrc("08b-lazer")} alt="Churrasqueira coberta com azulejos estampados, gramado e o balanço do terraço, de dia." width={874} height={970} loading="lazy" className="photo-zoom size-full bg-muted object-cover" />
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-lg">
          <img src={photoSrc("26a-churrasqueira-noite")} alt="Churrasqueira de tijolos acesa, pia e bancada com parede de azulejos, à noite." width={880} height={1068} loading="lazy" className="photo-zoom size-full bg-muted object-cover" />
        </div>
        <div className="col-span-2 aspect-[2/1] overflow-hidden rounded-lg md:col-span-1 md:aspect-[4/5]">
          <img src={photoSrc("35a-terraco")} alt="Poltronas de fibra com almofadas amarelas no terraço coberto." width={880} height={1068} loading="lazy" className="photo-zoom size-full bg-muted object-cover object-[40%_70%]" />
        </div>
      </div>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {LEISURE.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b pb-3">
            <Icon className="size-5 shrink-0 text-wood" strokeWidth={1.6} />
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

function Living() {
  return (
    <section aria-labelledby="sala" className="grid grid-cols-1 gap-8 scroll-mt-24" id="sala-secao">
      <SectionHead id="sala" eyebrow="Por dentro" title={<>Sala de estar <em>e jantar</em></>}>
        Integradas, com tijolinho branco, pratos de palha na parede, sofá azul, mesa de jantar com cadeiras de madeira e TV.
      </SectionHead>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-[0.8fr_1.2fr] md:gap-3">
        <div className="row-span-2 overflow-hidden rounded-lg">
          <img src={photoSrc("18b-sala-estar")} alt="Pratos de palha na parede de tijolinho branco e poltrona de madeira da sala." width={870} height={1068} loading="lazy" className="photo-zoom size-full bg-muted object-cover" />
        </div>
        <div className="aspect-square overflow-hidden rounded-lg md:aspect-[2.2/1]">
          <img src={photoSrc("17a-sala")} alt="Sofá azul com almofadas amarelas e laranja e poltronas de madeira na sala de estar." width={1600} height={398} loading="lazy" className="photo-zoom size-full bg-muted object-cover object-[25%_50%]" />
        </div>
        <div className="aspect-square overflow-hidden rounded-lg md:aspect-[2.2/1]">
          <img src={photoSrc("19a-sala-jantar")} alt="Mesa de jantar branca com cadeiras de madeira e um vaso de palha com planta." width={1600} height={406} loading="lazy" className="photo-zoom size-full bg-muted object-cover object-[30%_50%]" />
        </div>
      </div>
      <figure className="grid gap-2">
        <div className="overflow-hidden rounded-lg">
          <img src={photoSrc("20a-sala-tv")} alt="Rack de madeira com bonecas de barro coloridas, vaso de cerâmica e a TV da sala." width={1600} height={406} loading="lazy" className="photo-zoom aspect-[3.2/1] w-full bg-muted object-cover" />
        </div>
        <figcaption className="text-sm text-muted-foreground">O rack da TV, com bonecas de barro coloridas.</figcaption>
      </figure>
    </section>
  )
}

function Night() {
  return (
    <section aria-labelledby="noite" className="grid gap-6 overflow-hidden rounded-xl bg-deep p-5 text-white md:p-8">
      <div className="grid gap-3">
        <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-water">
          <span className="h-px w-8 bg-water/60" aria-hidden="true" />À noite
        </p>
        <h2 id="noite" className="text-[2.2rem] leading-[1.02] md:text-[2.8rem]">
          A piscina <em>acende</em>
        </h2>
        <p className="max-w-[52ch] text-white/75">A piscina e o jardim ficam iluminados, e a frente da casa ganha luz no muro amadeirado.</p>
      </div>
      <img src={photoSrc("23b-piscina-noite")} alt="Piscina iluminada de azul à noite, com o deck de madeira e o terraço ao fundo." width={1600} height={331} loading="lazy" className="aspect-[3/1] w-full rounded-lg object-cover object-[50%_60%] md:aspect-[4.8/1]" />
      <img src={photoSrc("22a-fachada-noite")} alt="Muro amadeirado da frente da casa com luminárias acesas e plantas, à noite." width={1600} height={451} loading="lazy" className="aspect-[3/1] w-full rounded-lg object-cover md:aspect-[3.5/1]" />
    </section>
  )
}

function Reviews() {
  return (
    <section aria-labelledby="avaliacoes" className="grid grid-cols-1 gap-8 scroll-mt-24" id="avaliacoes-secao">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead id="avaliacoes" eyebrow="Avaliações" title="Quem já se hospedou" />
        <p className="flex items-center gap-3">
          <Star className="size-7 fill-wood text-wood" />
          <span className="font-display text-[3rem] leading-none">4,8</span>
          <span className="text-sm leading-tight text-muted-foreground">
            de 5<br />12 avaliações
          </span>
        </p>
      </div>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {REVIEWS.map((review) => (
            <CarouselItem key={review.name} className="basis-[88%] sm:basis-1/2">
              <Card className="h-full justify-between">
                <CardContent>
                  <blockquote className="font-display text-[1.15rem] leading-snug">“{review.text}”</blockquote>
                </CardContent>
                <CardFooter className="flex-col items-start text-sm">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-muted-foreground">{review.month}</span>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </section>
  )
}

const TOP_AMENITIES = [
  { icon: Waves, label: "Piscina privativa" },
  { icon: Flame, label: "Churrasqueira e utensílios" },
  { icon: Snowflake, label: "5 ar-condicionados" },
  { icon: Fan, label: "3 ventiladores" },
  { icon: CookingPot, label: "Fogão, geladeira, micro-ondas e liquidificador" },
  { icon: WashingMachine, label: "Máquina de lavar" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Tv, label: "TV" },
  { icon: Car, label: "3 vagas cobertas" },
  { icon: PawPrint, label: "Aceita animais" },
]

function Amenities() {
  return (
    <section aria-labelledby="comodidades" className="grid grid-cols-1 gap-6 scroll-mt-24" id="comodidades-secao">
      <SectionHead id="comodidades" eyebrow="Comodidades" title="O que a casa oferece" />
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {TOP_AMENITIES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3 border-b pb-3">
            <Icon className="size-5 shrink-0 text-wood" strokeWidth={1.6} />
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
            <DialogTitle>Tudo o que a casa tem</DialogTitle>
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

const SECTIONS: [string, string][] = [
  ["#galeria", "Fotos"],
  ["#suites-secao", "Suítes"],
  ["#lazer-secao", "Lazer"],
  ["#sala-secao", "Sala"],
  ["#local-secao", "Localização"],
]

/* Menu do celular: Drawer lateral do shadcn (vaul, direction="right"). Cada item fecha a gaveta pelo
   DrawerClose e só rola até a seção no fim da animação, porque a gaveta trava a rolagem enquanto aberta. */
function MobileMenu({ className }: { className?: string }) {
  const target = React.useRef<string | null>(null)
  return (
    <Drawer
      direction="right"
      onAnimationEnd={(isOpen) => {
        if (isOpen || !target.current) return
        document.querySelector(target.current)?.scrollIntoView({ behavior: "smooth" })
        target.current = null
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu" className={className}>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{NAME}</DrawerTitle>
          <DrawerDescription>Porto de Galinhas · Pernambuco</DrawerDescription>
        </DrawerHeader>
        <nav aria-label="Seções" className="grid px-4">
          {SECTIONS.map(([href, label]) => (
            <DrawerClose asChild key={href}>
              <button type="button" onClick={() => (target.current = href)} className="border-b py-4 text-left font-display text-2xl">
                {label}
              </button>
            </DrawerClose>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
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

/* Capa: três recortes sem marca d'água trocam devagar; os traços escolhem a foto e param a troca. */
function HeroPhotos() {
  const [index, setIndex] = React.useState(0)
  const [auto, setAuto] = React.useState(() => !prefersReducedMotion())
  React.useEffect(() => {
    if (!auto) return
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % HERO.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [auto])

  return (
    <>
      {HERO.map((crop, i) => (
        <img
          key={crop.id}
          src={photoSrc(crop.id)}
          alt={crop.alt}
          width={crop.width}
          height={crop.height}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 size-full max-w-none object-cover transition-opacity duration-[1600ms]",
            i === index ? "opacity-100" : "opacity-0",
            i === 0 && "animate-settle",
          )}
        />
      ))}
      <div className="absolute top-20 right-[max(14px,env(safe-area-inset-right,0px))] z-10 flex gap-1.5 md:top-auto md:right-6 md:bottom-6" role="group" aria-label="Fotos da capa">
        {HERO.map((crop, i) => (
          <button
            key={crop.id}
            type="button"
            aria-label={`Foto ${i + 1} da capa`}
            aria-pressed={i === index}
            onClick={() => {
              setAuto(false)
              setIndex(i)
            }}
            className="grid h-8 w-9 place-items-center"
          >
            <span className={cn("h-[3px] w-full rounded-full bg-white/45 transition-colors", i === index && "bg-white")} />
          </button>
        ))}
      </div>
    </>
  )
}

const FACTS = [
  { value: "17", label: "pessoas" },
  { value: "5", label: "suítes" },
  { value: "7", label: "banheiros" },
  { value: "4,8", label: "nota em 12 avaliações" },
]

export function App() {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: addDays(today, 30), to: addDays(today, 34) })
  const [guests, setGuests] = React.useState(8)
  const [bookingOpen, setBookingOpen] = React.useState(false)
  const [tourOpen, setTourOpen] = React.useState(false)
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
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 lg:gap-8">
          <a href="#topo" className="mr-auto font-display text-[1.15rem] leading-tight no-underline md:text-xl">
            Casa em <em>Porto de Galinhas</em>
          </a>
          <nav className="hidden gap-7 text-sm font-medium lg:flex" aria-label="Seções">
            {SECTIONS.map(([href, label]) => (
              <a key={href} href={href} className="no-underline opacity-80 hover:opacity-100">
                {label}
              </a>
            ))}
          </nav>
          <Button variant={solid ? "default" : "inverse"} className="hidden sm:inline-flex" onClick={booking.openBooking}>
            Reservar
          </Button>
          <MobileMenu className="-mr-2 lg:hidden" />
        </div>
      </header>

      <section
        ref={cover}
        id="topo"
        className="relative grid overflow-hidden bg-deep text-white md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div className="absolute inset-0 md:relative md:order-2 md:min-h-[88svh]">
          <HeroPhotos />
          {/* Escurece o topo da foto para o menu continuar legível no computador. */}
          <div className="absolute inset-x-0 top-0 hidden h-36 bg-gradient-to-b from-deep/70 to-transparent md:block" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(18_24_38/.94)_0%,rgb(18_24_38/.55)_42%,rgb(18_24_38/.05)_68%,rgb(18_24_38/.5)_100%)] md:hidden" />
        </div>
        <div className="relative grid min-h-[88svh] content-end justify-items-start gap-6 pt-36 pb-32 pl-[max(20px,env(safe-area-inset-left,0px))] pr-[max(20px,env(safe-area-inset-right,0px))] md:content-center md:bg-[radial-gradient(120%_80%_at_0%_100%,#1f2f5c_0%,transparent_60%)] md:pb-16 md:pl-[max(20px,calc((100vw-72rem)/2))] md:pr-12">
          <p className="animate-rise flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-white/85">
            <span className="h-px w-8 bg-white/50" aria-hidden="true" />
            Porto de Galinhas · Pernambuco
          </p>
          <h1 className="animate-rise text-[clamp(3rem,10vw,5.8rem)] leading-[0.95] [animation-delay:120ms]">
            Casa em <em className="text-water">Porto de Galinhas</em>
          </h1>
          <p className="animate-rise max-w-[34ch] text-[clamp(1.08rem,1.9vw,1.3rem)] leading-snug text-white/90 [animation-delay:240ms]">
            Cinco suítes, piscina privativa com cascata e churrasqueira para até 17 pessoas, a 5 minutos de carro das
            praias de Porto e Maracaípe.
          </p>

          <div className="mt-2 hidden w-full max-w-[34rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-card p-2 text-foreground shadow-2xl md:grid">
            <DateRangePicker />
            <GuestsStepper className="px-3" />
            <Button size="lg" className="col-span-2" onClick={booking.openBooking}>
              Consultar disponibilidade
            </Button>
          </div>
        </div>
      </section>

      <div className="gutter bg-deep text-white">
        <Separator className="mx-auto max-w-6xl bg-primary-foreground/15" />
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-6 py-9 md:grid-cols-4">
          {FACTS.map((fact) => (
            <div key={fact.label} className="grid gap-1.5">
              <dt className="order-2 text-sm text-white/65">{fact.label}</dt>
              <dd className="order-1 font-display text-[3rem] leading-[0.9] tabular-nums">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="gutter">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-20 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-24">
          <main className="grid min-w-0 grid-cols-1 gap-24">
            <section aria-labelledby="casa" className="grid grid-cols-1 gap-8 scroll-mt-24" id="a-casa">
              <SectionHead id="casa" eyebrow="A casa" title={<>Cal, madeira e <em>água azul</em></>}>
                Casa com 5 suítes no Loteamento Porto Coqueiral, a 1.800 m do centro de Porto de Galinhas. Piscina
                privativa com cascata, terraço com redes e balanço, churrasqueira com parede de azulejos e sala de
                tijolinho branco.
              </SectionHead>
              <Mosaic onShowAll={() => setTourOpen(true)} />
            </section>
            <Gallery onShowAll={() => setTourOpen(true)} />
            <Suites />
            <Leisure />
            <Living />
            <Night />
            <Reviews />
            <Amenities />

            <section aria-labelledby="local" className="grid grid-cols-1 gap-6 scroll-mt-24" id="local-secao">
              <SectionHead id="local" eyebrow="Localização" title={<>A 5 minutos das praias, <em>de carro</em></>}>
                No Loteamento Porto Coqueiral, em Porto de Galinhas. Tempos de carro segundo o anúncio; a localização
                exata vem pelo WhatsApp.
              </SectionHead>
              <ul className="grid gap-3 sm:grid-cols-2">
                {DISTANCES.map((d) => (
                  <li key={d.place}>
                    <Card className="h-full gap-0 py-4">
                      <CardHeader className="px-4">
                        <CardTitle>{d.time}</CardTitle>
                        <CardDescription className="col-span-2">{d.place}</CardDescription>
                        <CardAction className="row-span-1">
                          <Car className="size-5 text-wood" strokeWidth={1.6} aria-hidden="true" />
                        </CardAction>
                      </CardHeader>
                    </Card>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="justify-self-start">
                <a href={MAP_URL} target="_blank" rel="noopener">
                  <MapPin data-icon="inline-start" /> Ver Porto de Galinhas no mapa <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </section>

            <section aria-labelledby="regras" className="grid grid-cols-1 gap-4">
              <SectionHead id="regras" eyebrow="Bom saber" title="Antes de reservar" />
              <Accordion type="single" collapsible defaultValue="item-0">
                {FAQ.map(([question, answer], i) => (
                  <AccordionItem key={question} value={`item-${i}`}>
                    <AccordionTrigger>{question}</AccordionTrigger>
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

      <section id="reservar" className="relative isolate overflow-hidden bg-deep text-white" aria-labelledby="fechamento">
        <img src={photoSrc("22a-fachada-noite")} alt="" width={1600} height={451} loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(18_24_38/.95),rgb(18_24_38/.55))]" />
        <div className="gutter">
          <div className="mx-auto grid max-w-6xl justify-items-start gap-6 py-20">
            <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-water">
              <span className="h-px w-8 bg-water/60" aria-hidden="true" />
              Reserva direta
            </p>
            <h2 id="fechamento" className="max-w-[18ch] text-[2.6rem] leading-[1.02] md:text-[3.4rem]">
              Escolha as datas e <em>fale com o anfitrião</em>
            </h2>
            <Button size="lg" variant="secondary" onClick={booking.openBooking}>
              <CalendarDays data-icon="inline-start" /> Consultar disponibilidade
            </Button>
          </div>
        </div>
      </section>

      <footer className="gutter bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 py-10 pb-28 text-sm text-muted-foreground lg:pb-10">
          <span className="font-display text-lg text-foreground">
            Casa em <em>Porto de Galinhas</em>
          </span>
          <span>Loteamento Porto Coqueiral · Porto de Galinhas · Pernambuco</span>
          <span>Nome provisório · versão de apresentação · Site por NEXO Websites</span>
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

      <PhotoTour open={tourOpen} onOpenChange={setTourOpen} />
      <BookingFlow open={bookingOpen} onOpenChange={setBookingOpen} />
    </BookingContext.Provider>
  )
}
