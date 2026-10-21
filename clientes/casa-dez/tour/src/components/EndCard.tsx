import { LISTING_URL } from '@/tour/config';
import { Icon } from './Icon';

interface EndCardProps {
  visible: boolean;
  onRestart(): void;
  onMap(): void;
}

export function EndCard({ visible, onRestart, onMap }: EndCardProps) {
  return (
    <div className="end" data-visible={visible} inert={!visible} data-ui>
      <p className="mono end-kicker">Fim do percurso</p>
      <h2 className="end-title">
        Até a próxima <em>visita.</em>
      </h2>
      <div className="end-actions">
        {LISTING_URL && (
          <a className="btn btn-solid" href={LISTING_URL} target="_blank" rel="noopener noreferrer">
            Ver disponibilidade <Icon name="external" size={16} />
          </a>
        )}
        <button type="button" className="btn" onClick={onRestart}>
          <Icon name="restart" size={16} /> Recomeçar visita
        </button>
        <button type="button" className="btn btn-ghost" onClick={onMap}>
          <Icon name="grid" size={16} /> Ambientes
        </button>
      </div>
    </div>
  );
}
