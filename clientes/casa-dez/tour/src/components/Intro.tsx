interface IntroProps {
  hidden: boolean;
  progress: number;
  ready: boolean;
  photoCount: number;
  roomCount: number;
  onStart(): void;
}

export function Intro({ hidden, progress, ready, photoCount, roomCount, onStart }: IntroProps) {
  return (
    <section className="intro" data-hidden={hidden} inert={hidden} data-ui aria-labelledby="intro-title">
      <p className="intro-kicker mono">Visita imersiva</p>
      <h1 id="intro-title" className="intro-title">
        <span className="line"><span>Entre.</span></span>
        <span className="line"><span>Explore.</span></span>
        <span className="line"><span><em>Sinta-se em casa.</em></span></span>
      </h1>
      <div className="intro-foot">
        <button type="button" className="intro-start" onClick={onStart} disabled={!ready}>
          <span>{ready ? 'Iniciar experiência' : `Carregando ${Math.round(progress * 100)}%`}</span>
          <span className="intro-start-bar" style={{ transform: `scaleX(${progress})` }} aria-hidden />
        </button>
        <dl className="intro-facts mono">
          <div>
            <dt>Fotografias reais</dt>
            <dd>{photoCount}</dd>
          </div>
          <div>
            <dt>Ambientes</dt>
            <dd>{roomCount}</dd>
          </div>
        </dl>
      </div>
      <p className="intro-note mono">Role para caminhar · Pare para observar</p>
    </section>
  );
}
