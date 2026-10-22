import * as React from "react"
import { Menu } from "lucide-react"

import { Button } from "../components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { cn } from "../lib/utils"
import { useBooking } from "./booking"
import { NAME } from "./data"

/* Menu do celular: Drawer lateral do shadcn. Cada item fecha a gaveta e só age no fim da animação, porque a
   gaveta trava a rolagem (e o foco) enquanto está aberta. */
function MobileMenu({ links }: { links: [string, string][] }) {
  const { openBooking } = useBooking()
  const target = React.useRef<string | null>(null)
  return (
    <Drawer
      direction="right"
      onAnimationEnd={(isOpen) => {
        if (isOpen || !target.current) return
        if (target.current === "reservar") openBooking()
        else document.querySelector(target.current)?.scrollIntoView({ behavior: "smooth" })
        target.current = null
      }}
    >
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir menu" className="-mr-2 md:hidden">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{NAME}</DrawerTitle>
          <DrawerDescription>Muro Alto · Porto de Galinhas</DrawerDescription>
        </DrawerHeader>
        <nav aria-label="Seções" className="grid px-4">
          {[...links, ["reservar", "Reservar"] as [string, string]].map(([href, label]) => (
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

/* Barra fixa no topo: nome, seções no computador e menu lateral no celular. As cores vêm do tema de cada estilo. */
export function Nav({ links, className }: { links: [string, string][]; className?: string }) {
  const { openBooking } = useBooking()
  return (
    <header className={cn("gutter fixed inset-x-0 top-0 z-40 border-b bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-md", className)}>
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6">
        <a href="#topo" className="mr-auto font-display text-xl leading-none no-underline">
          {NAME}
        </a>
        <nav className="hidden gap-7 text-sm md:flex" aria-label="Seções">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="no-underline opacity-75 hover:opacity-100">
              {label}
            </a>
          ))}
        </nav>
        <Button className="hidden md:inline-flex" data-booking-open onClick={openBooking}>
          Reservar
        </Button>
        <MobileMenu links={links} />
      </div>
    </header>
  )
}
