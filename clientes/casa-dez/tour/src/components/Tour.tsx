'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LISTING_TOTAL, SHOTS } from '@/tour/data';
import { TourEngine, type FrameInfo } from '@/tour/engine';
import { buildTimeline, chapterOfShot, chaptersOf, projectPoint } from '@/tour/timeline';
import { EndCard } from './EndCard';
import { Icon } from './Icon';
import { Intro } from './Intro';
import { RoomMap } from './RoomMap';
import { RoomTitle } from './RoomTitle';

const TIMELINE = buildTimeline(SHOTS);
const CHAPTERS = chaptersOf(SHOTS);
const ROOM_COUNT = new Set(SHOTS.map((s) => s.room)).size;
const READY_AT = 2;
const CHROME_IDLE_MS = 2600;
const HINT_MS = 7000;

const pad = (n: number) => String(n).padStart(2, '0');

export function Tour() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<TourEngine | null>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const hotspotsRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<number | undefined>(undefined);

  const [loaded, setLoaded] = useState(0);
  const [started, setStarted] = useState(false);
  const [shot, setShot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [cinema, setCinema] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [chrome, setChrome] = useState(true);
  const [hint, setHint] = useState(false);
  const [title, setTitle] = useState<{ chapter: number; key: number } | null>(null);

  const chapter = chapterOfShot(CHAPTERS, shot);
  const current = SHOTS[shot];

  const onFrame = useCallback((info: FrameInfo) => {
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${info.t / info.total})`;
    if (info.t > 0.12) setHint(false);

    const layer = hotspotsRef.current;
    if (!layer) return;
    const visible = info.settled && Number(layer.dataset.shot) === info.frame.a.index;
    layer.dataset.visible = String(visible);
    if (!visible) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (const el of layer.querySelectorAll<HTMLElement>('[data-x]')) {
      const p = projectPoint(info.rectA, Number(el.dataset.x), Number(el.dataset.y));
      const inside = p.x > 0.04 && p.x < 0.96 && p.y > 0.1 && p.y < 0.86;
      el.dataset.inside = String(inside);
      el.style.transform = `translate3d(${p.x * w}px, ${p.y * h}px, 0)`;
    }
  }, []);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const engine = new TourEngine(
      canvasRef.current!,
      SHOTS,
      {
        onShot: setShot,
        onLoad: (n) => setLoaded(n),
        onAutoplay: (on) => {
          setPlaying(on);
          if (!on) setCinema(false);
        },
        onEnd: setAtEnd,
        onFrame,
      },
      {
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        finePointer: matchMedia('(pointer: fine)').matches,
      },
    );
    engineRef.current = engine;
    return () => engine.dispose();
  }, [onFrame]);

  useEffect(() => {
    document.documentElement.dataset.locked = String(!started);
  }, [started]);

  useEffect(() => {
    if (started) setTitle({ chapter, key: Date.now() });
  }, [chapter, started]);

  useEffect(() => {
    if (!started) return;
    setHint(true);
    const id = window.setTimeout(() => setHint(false), HINT_MS);
    return () => window.clearTimeout(id);
  }, [started]);

  const wake = useCallback(() => {
    setChrome(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setChrome(false), CHROME_IDLE_MS);
  }, []);

  useEffect(() => {
    if (!started) return;
    wake();
    window.addEventListener('pointermove', wake, { passive: true });
    window.addEventListener('touchstart', wake, { passive: true });
    window.addEventListener('keydown', wake);
    return () => {
      window.removeEventListener('pointermove', wake);
      window.removeEventListener('touchstart', wake);
      window.removeEventListener('keydown', wake);
      window.clearTimeout(idleTimer.current);
    };
  }, [started, wake]);

  const start = useCallback(() => {
    window.scrollTo(0, 0);
    setStarted(true);
    engineRef.current?.start();
  }, []);

  const goTo = useCallback((index: number) => {
    setMapOpen(false);
    engineRef.current?.goTo(index);
  }, []);

  const togglePlay = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (engine.isAutoplay) engine.pause();
    else engine.play();
  }, []);

  const enterCinema = useCallback(() => {
    setMapOpen(false);
    setCinema(true);
    engineRef.current?.play();
  }, []);

  const exitCinema = useCallback(() => {
    setCinema(false);
    engineRef.current?.pause();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const onButton = e.target instanceof HTMLElement && e.target.closest('button, a');
      if (!started) {
        if (e.key === 'Enter' && !onButton && loaded >= READY_AT) start();
        return;
      }
      const engine = engineRef.current;
      if (!engine) return;
      const actions: Record<string, () => void> = {
        ArrowDown: () => engine.next(),
        ArrowRight: () => engine.next(),
        PageDown: () => engine.next(),
        ' ': () => engine.next(),
        ArrowUp: () => engine.prev(),
        ArrowLeft: () => engine.prev(),
        PageUp: () => engine.prev(),
        Home: () => engine.goTo(0),
        End: () => engine.goTo(SHOTS.length - 1),
        k: togglePlay,
        p: togglePlay,
        c: () => (cinema ? exitCinema() : enterCinema()),
        m: () => setMapOpen((o) => !o),
        Escape: () => {
          if (cinema) exitCinema();
          setMapOpen(false);
        },
      };
      const action = actions[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (!action || (onButton && (e.key === ' ' || e.key === 'Enter'))) return;
      e.preventDefault();
      action();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, loaded, cinema, start, togglePlay, enterCinema, exitCinema]);

  const showChrome = started && !cinema && (chrome || mapOpen || atEnd);
  const ready = loaded >= READY_AT;

  return (
    <div
      className="tour"
      data-started={started}
      data-chrome={showChrome}
      data-cinema={cinema}
      data-map={mapOpen}
      data-end={started && atEnd}
    >
      <canvas ref={canvasRef} className="stage" aria-hidden />
      <div className="scrim" aria-hidden />
      <div className="letterbox letterbox-top" aria-hidden />
      <div className="letterbox letterbox-bottom" aria-hidden />

      <div
        className="track"
        style={{ '--units': TIMELINE.total } as React.CSSProperties}
        aria-hidden
      />

      <Intro
        hidden={started}
        progress={loaded / SHOTS.length}
        ready={ready}
        photoCount={SHOTS.length}
        roomCount={ROOM_COUNT}
        onStart={start}
      />

      {started && title && !atEnd && (
        <RoomTitle
          key={title.key}
          room={CHAPTERS[title.chapter].room}
          number={title.chapter + 1}
          count={CHAPTERS.length}
        />
      )}

      <div
        ref={hotspotsRef}
        className="hotspots"
        data-shot={shot}
        data-visible="false"
        data-hidden={!started || cinema || mapOpen || atEnd}
        data-ui
      >
        {(current.hotspots ?? []).map((h) => (
          <button
            key={`${current.id}-${h.target}-${h.x}`}
            type="button"
            className="hotspot"
            data-x={h.x}
            data-y={h.y}
            data-inside="false"
            onClick={() => goTo(SHOTS.findIndex((s) => s.id === h.target))}
          >
            <span className="hotspot-dot" aria-hidden />
            <span className="hotspot-label">{h.label}</span>
          </button>
        ))}
      </div>

      <p className="hint mono" data-visible={hint && !cinema} aria-hidden>
        <span className="hint-line" />
        <span className="hint-fine">Role para caminhar</span>
        <span className="hint-coarse">Deslize para caminhar</span>
      </p>

      <header className="chrome chrome-top" data-ui inert={!showChrome}>
        <p className="mono brand">Visita imersiva</p>
        <p className="mono counter">
          {pad(shot + 1)} <i>—</i> {pad(SHOTS.length)}
        </p>
        <button type="button" className="chip" onClick={() => setMapOpen((o) => !o)} aria-expanded={mapOpen}>
          <Icon name="grid" size={16} />
          <span>Ambientes</span>
        </button>
      </header>

      <div className="chrome chrome-bottom" data-ui inert={!showChrome}>
        <p className="caption mono">
          {current.room} <i>·</i> foto {current.listingIndex}/{LISTING_TOTAL}
        </p>
        <div className="controls" role="toolbar" aria-label="Controles da visita">
          <button type="button" className="icon-btn" onClick={() => engineRef.current?.prev()} aria-label="Anterior" title="Anterior (←)">
            <Icon name="prev" />
          </button>
          <button
            type="button"
            className="icon-btn icon-btn-main"
            onClick={togglePlay}
            aria-label={playing ? 'Pausar' : 'Reproduzir percurso'}
            title={playing ? 'Pausar (K)' : 'Reproduzir (K)'}
          >
            <Icon name={playing ? 'pause' : 'play'} />
          </button>
          <button type="button" className="icon-btn" onClick={() => engineRef.current?.next()} aria-label="Próximo" title="Próximo (→)">
            <Icon name="next" />
          </button>
          <span className="controls-sep" aria-hidden />
          <button type="button" className="icon-btn" onClick={enterCinema} aria-label="Modo cinema" title="Modo cinema (C)">
            <Icon name="film" />
          </button>
        </div>
      </div>

      <nav className="progress" data-ui aria-label="Percurso" data-hidden={!started || cinema}>
        <div className="progress-track">
          <div ref={fillRef} className="progress-fill" />
        </div>
        {CHAPTERS.map((c, i) => (
          <button
            key={c.number}
            type="button"
            className="progress-tick"
            data-active={i === chapter}
            style={{ left: `${(TIMELINE.starts[c.first] / TIMELINE.total) * 100}%` }}
            onClick={() => goTo(c.first)}
            aria-label={`Ir para ${c.room} (${pad(c.number)})`}
          >
            <span className="mono">{c.room}</span>
          </button>
        ))}
      </nav>

      {cinema && (
        <button type="button" className="cinema-exit" onClick={exitCinema} data-ui data-visible={chrome}>
          <span className="mono">Esc · sair do modo cinema</span>
        </button>
      )}

      <EndCard visible={started && atEnd && !mapOpen && !cinema} onRestart={() => engineRef.current?.restart()} onMap={() => setMapOpen(true)} />

      <RoomMap
        open={mapOpen}
        chapters={CHAPTERS}
        shots={SHOTS}
        current={shot}
        onSelect={goTo}
        onClose={() => setMapOpen(false)}
      />

      <p className="sr-only" aria-live="polite">
        {started ? `${CHAPTERS[chapter].room}. ${current.alt}` : ''}
      </p>
      <ol className="sr-only" aria-label="Fotografias do percurso">
        {SHOTS.map((s) => (
          <li key={s.id}>
            {s.room}, foto {s.listingIndex} de {LISTING_TOTAL}: {s.alt}
          </li>
        ))}
      </ol>
    </div>
  );
}
