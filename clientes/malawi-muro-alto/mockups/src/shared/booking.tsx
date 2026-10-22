import * as React from "react"
import { addDays, differenceInCalendarDays, format, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { DateRange } from "react-day-picker"
import { CalendarDays, Check, Copy, MessageCircle, Minus, Plus } from "lucide-react"

import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Separator } from "../components/ui/separator"
import { cn } from "../lib/utils"
import { MAX_GUESTS, NAME } from "./data"
import { useMediaQuery } from "./motion"

const today = startOfDay(new Date())

interface Booking {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
  guests: number
  setGuests: (guests: number) => void
  open: boolean
  setOpen: (open: boolean) => void
  openBooking: () => void
}

const BookingContext = React.createContext<Booking | null>(null)

export function useBooking() {
  const booking = React.useContext(BookingContext)
  if (!booking) throw new Error("useBooking fora do BookingProvider")
  return booking
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: addDays(today, 30), to: addDays(today, 34) })
  const [guests, setGuests] = React.useState(6)
  const [open, setOpen] = React.useState(false)
  const booking = React.useMemo<Booking>(
    () => ({ range, setRange, guests, setGuests, open, setOpen, openBooking: () => setOpen(true) }),
    [range, guests, open],
  )
  return (
    <BookingContext.Provider value={booking}>
      {children}
      <BookingFlow />
    </BookingContext.Provider>
  )
}

const nightsOf = (range?: DateRange) =>
  range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0
const shortDate = (date: Date) => format(date, "d 'de' MMM", { locale: ptBR })
export const plural = (n: number, one: string, many: string) => `${n} ${n > 1 ? many : one}`

export function bookingMessage(range: DateRange, guests: number) {
  return [
    `Olá! Vi o site do ${NAME} e quero consultar disponibilidade:`,
    `• Entrada: ${format(range.from!, "dd/MM/yyyy")}`,
    `• Saída: ${format(range.to!, "dd/MM/yyyy")}`,
    `• ${plural(nightsOf(range), "noite", "noites")} · ${plural(guests, "hóspede", "hóspedes")}`,
  ].join("\n")
}

export function rangeLabel(range?: DateRange) {
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
  return <span className="text-[0.68rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">{children}</span>
}

/* shadcn Date Range Picker: Popover + Calendar em modo período. */
export function DateRangePicker({ className }: { className?: string }) {
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

export function GuestsStepper({ className }: { className?: string }) {
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
      <p ref={messageRef} className="rounded-md bg-secondary p-3 text-sm whitespace-pre-line text-secondary-foreground">{message}</p>
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
      <p className="text-xs text-muted-foreground">Versão de apresentação: na publicação, a mensagem vai direto para o WhatsApp do anfitrião.</p>
    </div>
  )
}

/* shadcn Drawer/Dialog responsivo: Dialog no computador, Drawer no celular. */
export function BookingFlow() {
  const { open, setOpen } = useBooking()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const description = "Escolha as datas e o número de hóspedes. A mensagem segue pronta para o WhatsApp do anfitrião."

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
    <Drawer open={open} onOpenChange={setOpen}>
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

export function BookingCard({ className }: { className?: string }) {
  return (
    <Card className={cn("gap-5", className)}>
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

/* Barra fixa do celular com as datas escolhidas e o botão de reserva. */
export function BookingBar() {
  const { range, guests, openBooking } = useBooking()
  return (
    <div className="gutter fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-4">
        <p className="grid text-sm leading-tight">
          <span className="font-medium">{rangeLabel(range)}</span>
          <span className="text-muted-foreground">
            {plural(guests, "hóspede", "hóspedes")} · até {MAX_GUESTS}
          </span>
        </p>
        <Button size="lg" data-booking-open onClick={openBooking}>
          Consultar datas
        </Button>
      </div>
    </div>
  )
}
