import * as React from "react"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "../components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../components/ui/dialog"
import { PHOTOS, photoSrc } from "./data"

/* Foto ampliada: Dialog do shadcn com Carousel, aberto na foto clicada (startIndex do Embla). */
export function PhotoViewer({ index, onClose }: { index: number | null; onClose: () => void }) {
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
        className="w-[min(96vw,1200px)] max-w-none gap-3 border-0 bg-[#05070d] p-3 pt-12 text-white sm:max-w-none"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") api?.scrollPrev()
          if (e.key === "ArrowRight") api?.scrollNext()
        }}
      >
        <DialogTitle className="sr-only">Fotos do bangalô</DialogTitle>
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
        <p data-viewer-caption className="flex items-baseline justify-between gap-4 px-1 text-sm text-white/80">
          <span>{PHOTOS[current].caption}</span>
          <span className="shrink-0 tabular-nums">
            {current + 1} de {PHOTOS.length}
          </span>
        </p>
      </DialogContent>
    </Dialog>
  )
}
