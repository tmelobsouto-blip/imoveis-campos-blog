import { LISTING_TOTAL, thumbSrc, type Shot } from '@/tour/data';
import type { Chapter } from '@/tour/timeline';
import { Icon } from './Icon';

const pad = (n: number) => String(n).padStart(2, '0');

interface RoomMapProps {
  open: boolean;
  chapters: readonly Chapter[];
  shots: readonly Shot[];
  current: number;
  onSelect(index: number): void;
  onClose(): void;
}

export function RoomMap({ open, chapters, shots, current, onSelect, onClose }: RoomMapProps) {
  return (
    <aside className="map" data-open={open} inert={!open} data-ui role="dialog" aria-label="Mapa de ambientes">
      <header className="map-head">
        <p className="mono">Ambientes</p>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar mapa (Esc)">
          <Icon name="close" />
        </button>
      </header>
      <ol className="map-list">
        {chapters.map((c) => {
          const count = c.last - c.first + 1;
          const indices = Array.from({ length: count }, (_, k) => c.first + k);
          return (
            <li key={c.number} className="map-item" data-active={current >= c.first && current <= c.last}>
              <button type="button" className="map-room" onClick={() => onSelect(c.first)}>
                <span className="mono">{pad(c.number)}</span>
                <span className="map-room-name">{c.room}</span>
                <span className="mono map-room-count">
                  {count} {count > 1 ? 'fotos' : 'foto'}
                </span>
              </button>
              <div className="map-thumbs">
                {indices.map((i) => (
                  <button
                    key={shots[i].id}
                    type="button"
                    className="map-thumb"
                    data-active={i === current}
                    onClick={() => onSelect(i)}
                    aria-label={`${shots[i].room}, foto ${shots[i].listingIndex} de ${LISTING_TOTAL} do anúncio`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbSrc(shots[i].id)} alt="" width={240} height={176} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
      <footer className="map-note">
        <p className="mono">Sobre as imagens</p>
        <p>
          As {shots.length} fotografias são as do anúncio, sem retoque e sem geração por IA — apenas recortadas da
          moldura da galeria. O movimento é uma câmera virtual sobre cada foto. Quando as fotos não mostram a ligação
          física entre dois ambientes, a passagem é um corte, e não um caminho inventado.
        </p>
      </footer>
    </aside>
  );
}
