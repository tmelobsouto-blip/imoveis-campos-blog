import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { MATERIAL, STORIES } from './copy';
import { C, FONT, GRID } from './tokens';
import { Br, Canvas, Fill, Hl, Icon, Label, Law, Mark, MotionOn, Reveal, SplitBar, Text, TopBar, useProgress } from './ui';

const TOTAL = 5;
const PAD_TOP = GRID.storySafeTop;
const PAD_BOTTOM = 1920 - GRID.storySafeBottom;

type Sticker = { kind: 'quiz' | 'link'; top: number; height: number };

const Guide: React.FC<{ sticker?: Sticker }> = ({ sticker }) => {
  const hatch = 'repeating-linear-gradient(45deg, rgba(180,68,26,0.18) 0 14px, transparent 14px 28px)';
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {[
        { top: 0, height: PAD_TOP, text: 'Interface · perfil e barra de progresso' },
        { top: GRID.storySafeBottom, height: PAD_BOTTOM, text: 'Interface · campo de resposta' },
      ].map((z) => (
        <div key={z.top} style={{ position: 'absolute', left: 0, right: 0, top: z.top, height: z.height, background: hatch, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT.mono, fontSize: 20, letterSpacing: 2, color: C.alert, background: 'rgba(255,255,255,0.85)', padding: '6px 12px', textTransform: 'uppercase' }}>{z.text}</span>
        </div>
      ))}
      {sticker ? (
        <div
          style={{
            position: 'absolute',
            left: sticker.kind === 'link' ? 220 : 150,
            right: sticker.kind === 'link' ? 220 : 150,
            top: sticker.top,
            height: sticker.height,
            border: `4px dashed ${C.alert}`,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 24,
            boxSizing: 'border-box',
          }}
        >
          <span style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: 2, color: C.alert, textTransform: 'uppercase' }}>
            {sticker.kind === 'quiz' ? 'Figurinha Quiz (nativa)' : 'Figurinha Link (nativa)'}
          </span>
          {sticker.kind === 'quiz' ? (
            <>
              <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 34, color: C.ink }}>{STORIES.s2.sticker.q}</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
                {STORIES.s2.sticker.options.map((o, i) => (
                  <span key={o} style={{ border: `2px solid ${C.line}`, borderRadius: 30, padding: '12px 0', textAlign: 'center', fontFamily: FONT.sans, fontWeight: 700, fontSize: 26, color: C.ink, background: i === 2 ? C.surface : C.white }}>
                    {o}
                    {i === 2 ? ' ✓' : ''}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: '#2563EB' }}>
              {Icon.link('#2563EB', 34)} {MATERIAL.url.toUpperCase()}
            </span>
          )}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const Story: React.FC<{ mode: 'light' | 'dark'; label: string; index: number; guide?: boolean; sticker?: Sticker; children: React.ReactNode }> = ({
  mode,
  label,
  index,
  guide,
  sticker,
  children,
}) => (
  <MotionOn>
    <Canvas mode={mode} padTop={PAD_TOP} padBottom={PAD_BOTTOM}>
      <TopBar label={label} index={index} total={TOTAL} />
      {children}
    </Canvas>
    {guide ? <Guide sticker={sticker} /> : null}
  </MotionOn>
);

const Words: React.FC<{ text: string; at: number; step?: number }> = ({ text, at, step = 3 }) => (
  <>
    {text.split(' ').map((w, i) => (
      <Reveal key={i} at={at + i * step} y={40} style={{ display: 'inline-block', marginRight: '0.24em' }}>
        {w}
      </Reveal>
    ))}
  </>
);

export const S1: React.FC<{ guide?: boolean }> = ({ guide }) => {
  const frame = useCurrentFrame();
  const s = STORIES.s1;
  return (
    <Story mode="dark" label={s.label} index={1} guide={guide}>
      <Fill justify="center">
        <Reveal at={2}>
          <Text kind="h1" style={{ fontSize: 70, fontWeight: 700, letterSpacing: -2.6 }}>
            {s.lead}
          </Text>
        </Reveal>
        <Text kind="display" color={C.mint} style={{ fontSize: 196, letterSpacing: -9.5, marginTop: 64 }}>
          <Words text={s.hero} at={16} step={5} />
        </Text>
        <Reveal at={40} style={{ marginTop: 80 }}>
          <Label color={C.mint} size={24}>
            {s.hint} <span style={{ display: 'inline-block', transform: `translateX(${Math.max(0, Math.sin(frame / 6)) * 12}px)` }}>→</span>
          </Label>
        </Reveal>
      </Fill>
    </Story>
  );
};

export const S2: React.FC<{ guide?: boolean }> = ({ guide }) => {
  const s = STORIES.s2;
  const bar = useProgress(14, 44);
  return (
    <Story mode="light" label={s.label} index={2} guide={guide} sticker={{ kind: 'quiz', top: 1110, height: 400 }}>
      <div style={{ marginTop: 90 }}>
        <Reveal at={2}>
          <Label>Imóvel integralizado · R$ 2 milhões</Label>
        </Reveal>
        <Reveal at={6}>
          <Text kind="h1" style={{ fontSize: 84, marginTop: 22 }}>
            {s.title}
          </Text>
        </Reveal>
        <div style={{ marginTop: 70 }}>
          <SplitBar
            height={120}
            p={bar}
            parts={[
              { value: 500, label: '', caption: '', tone: 'neutral' },
              { value: 1500, label: '', caption: '', tone: 'neutral' },
            ]}
          />
          <div style={{ marginTop: 30 }}>
            {s.parts.map((x, i) => (
              <div key={x.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0', borderTop: `${i ? 1.5 : 3}px solid ${i ? C.line : C.ink}` }}>
                <Text kind="h2" style={{ fontSize: 58, letterSpacing: -2 }}>
                  {x.label}
                </Text>
                <Label size={20}>{x.caption}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Fill justify="flex-end">
        <Reveal at={50}>
          <Label color={C.green} size={22} style={{ textAlign: 'center' }}>
            Responda no quiz ↓
          </Label>
        </Reveal>
        <div style={{ height: 500 }} />
      </Fill>
    </Story>
  );
};

export const S3: React.FC<{ guide?: boolean }> = ({ guide }) => {
  const s = STORIES.s3;
  const bar = useProgress(20, 56);
  const hl = useProgress(60, 110);
  return (
    <Story mode="dark" label={s.label} index={3} guide={guide}>
      <Fill justify="space-evenly">
        <div>
          <Text kind="display" color={C.mint} style={{ fontSize: 160, letterSpacing: -8 }}>
            <Words text={s.hero} at={2} step={4} />
          </Text>
          <Reveal at={14}>
            <Text kind="h2" style={{ fontSize: 56, marginTop: 30, fontWeight: 700 }}>
              {s.lead}
            </Text>
          </Reveal>
        </div>
        <div>
          <SplitBar
            height={96}
            p={bar}
            scale={['R$ 0', 'R$ 500 mil', 'R$ 2 milhões']}
            parts={[
              { value: 500, label: '', caption: '', tone: 'green' },
              { value: 1500, label: '', caption: '', tone: 'alert' },
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
            <Label color={C.mint}>Imune · capital</Label>
            <Label color={C.alertSoft}>Incide ITBI · reserva</Label>
          </div>
        </div>
        <Reveal at={40}>
          <Law source={s.source} size={42}>
            <Mark p={hl}>{s.quote}</Mark>
          </Law>
        </Reveal>
      </Fill>
    </Story>
  );
};

export const S4: React.FC<{ guide?: boolean }> = ({ guide }) => {
  const s = STORIES.s4;
  const b1 = useProgress(34, 44);
  const b2 = useProgress(70, 80);
  return (
    <Story mode="light" label={s.label} index={4} guide={guide}>
      <Fill justify="space-evenly">
        <Reveal at={2}>
          <Law source={s.lawRef} size={42}>
            {s.lawA}{' '}
            <span style={{ opacity: b1, display: 'inline' }}>
              <Br>{s.br1}</Br>
            </span>{' '}
            {s.lawB}{' '}
            <span style={{ opacity: b2 }}>
              <Br>{s.br2}</Br>
            </span>
          </Law>
        </Reveal>
        <Reveal at={96}>
          <div style={{ borderTop: `3px solid ${C.ink}`, paddingTop: 40 }}>
            <Text kind="h1" style={{ fontSize: 66, letterSpacing: -2.4 }}>
              Explicação <Hl marker>na mesma linha.</Hl> Sem abrir outro código.
            </Text>
          </div>
        </Reveal>
      </Fill>
    </Story>
  );
};

const Kpi: React.FC<{ value: string; unit: string; label: string; at: number }> = ({ value, unit, label, at }) => {
  const p = useProgress(at, at + 30);
  const n = Math.round(Number(value) * p);
  return (
    <div style={{ borderTop: `3px solid ${C.mint}`, paddingTop: 22 }}>
      <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 120, lineHeight: 0.9, letterSpacing: -5, color: C.white, fontVariantNumeric: 'tabular-nums' }}>
        {n}
        <span style={{ fontSize: 44, letterSpacing: -1, color: C.mint }}>{unit ? ` ${unit}` : ''}</span>
      </div>
      <Label style={{ marginTop: 14 }}>{label}</Label>
    </div>
  );
};

export const S5: React.FC<{ guide?: boolean }> = ({ guide }) => {
  const frame = useCurrentFrame();
  const s = STORIES.s5;
  const bob = interpolate(Math.sin(frame / 7), [-1, 1], [0, 14]);
  return (
    <Story mode="dark" label={s.label} index={5} guide={guide} sticker={{ kind: 'link', top: 1360, height: 150 }}>
      <div style={{ marginTop: 80 }}>
        <Reveal at={2}>
          <Text kind="display" style={{ fontSize: 112 }}>
            20 páginas <Hl>reais</Hl> do material.
          </Text>
        </Reveal>
        <Reveal at={8}>
          <Label style={{ marginTop: 30 }} size={22}>
            {MATERIAL.name}
          </Label>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 56, rowGap: 50, marginTop: 70 }}>
          {MATERIAL.kpis.map((k, i) => (
            <Kpi key={k.label} {...k} at={14 + i * 6} />
          ))}
        </div>
      </div>
      <Fill justify="flex-end">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 190, transform: `translateY(${bob}px)` }}>
          <Label color={C.mint} size={24}>
            {s.hint}
          </Label>
          <div style={{ transform: 'rotate(180deg)' }}>{Icon.arrowUp(C.mint, 56)}</div>
        </div>
      </Fill>
    </Story>
  );
};

export const STORY_FRAMES = { S1: 150, S2: 180, S3: 210, S4: 210, S5: 180 };

export const STORY_LIST = [
  { id: 'DS-STORY-1-interrupcao', component: S1, frames: STORY_FRAMES.S1, sticker: false },
  { id: 'DS-STORY-2-quiz', component: S2, frames: STORY_FRAMES.S2, sticker: true },
  { id: 'DS-STORY-3-autoridade', component: S3, frames: STORY_FRAMES.S3, sticker: false },
  { id: 'DS-STORY-4-desejo', component: S4, frames: STORY_FRAMES.S4, sticker: false },
  { id: 'DS-STORY-5-conversao', component: S5, frames: STORY_FRAMES.S5, sticker: true },
];
