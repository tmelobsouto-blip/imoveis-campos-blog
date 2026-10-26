import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SLIDE1, SLIDE2, SLIDE3, SLIDE4, SV31 } from './content';
import { Footer, HighlightRun, Kicker, LinkCta, LiteralCard, MapDiagram, Mark, MaterialPages, Mono, PlainCard, PlainTese, TeseQuote } from './parts';
import { F, K } from './theme';

const PAD = 96;

const Frame: React.FC<{ kicker: string; page: string; dark?: boolean; dots?: boolean; footer?: React.ReactNode; children: React.ReactNode }> = ({
  kicker,
  page,
  dark,
  dots,
  footer,
  children,
}) => (
  <AbsoluteFill
    style={{
      background: dark ? K.black : K.paper,
      backgroundImage: dots ? 'radial-gradient(rgba(17,20,18,0.07) 1.5px, transparent 1.5px)' : undefined,
      backgroundSize: dots ? '26px 26px' : undefined,
      padding: `96px ${PAD}px 84px`,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Kicker text={kicker} dark={dark} />
      <Mono color={dark ? '#8C9A93' : K.muted} size={18} style={{ letterSpacing: 2, marginTop: 6 }}>
        {page}
      </Mono>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
    {footer !== undefined && <Footer dark={dark} cta={footer} />}
  </AbsoluteFill>
);

export const Slide1: React.FC = () => (
  <Frame
    kicker={SLIDE1.kicker}
    page={SLIDE1.page}
    footer={
      <span style={{ background: K.black, color: '#fff', borderRadius: 40, padding: '18px 28px', fontFamily: F.sans, fontWeight: 700, fontSize: 21 }}>
        {SLIDE1.cta} <span style={{ color: K.mint, marginLeft: 8 }}>→</span>
      </span>
    }
  >
    <div style={{ marginTop: -40 }}>
      <span style={{ display: 'inline-block', border: `2px solid ${K.green}`, borderRadius: 40, padding: '12px 22px' }}>
        <Mono size={18} style={{ fontWeight: 700, letterSpacing: 2 }}>
          {SLIDE1.pill}
        </Mono>
      </span>
      <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 74, lineHeight: 1.14, letterSpacing: -2.8, color: K.ink, marginTop: 50, isolation: 'isolate' }}>
        {SLIDE1.title.a}
        <br />
        <Mark tone="green">{SLIDE1.title.green}</Mark> {SLIDE1.title.b} <Mark tone="red">{SLIDE1.title.red}</Mark>
      </div>
    </div>
  </Frame>
);

export const Slide2: React.FC = () => (
  <Frame kicker={SLIDE2.kicker} page={SLIDE2.page} footer={<LinkCta text={SLIDE2.cta} />}>
    <LiteralCard label={SLIDE2.label}>
      <TeseQuote />
    </LiteralCard>
    <PlainCard label={SLIDE2.plainLabel} style={{ marginTop: 40 }}>
      <PlainTese />
    </PlainCard>
  </Frame>
);

export const Slide3: React.FC = () => (
  <Frame kicker={SLIDE3.kicker} page={SLIDE3.page} dots footer={<LinkCta text={SLIDE3.cta} />}>
    <MapDiagram width={1080 - PAD * 2} />
  </Frame>
);

export const Slide4: React.FC = () => (
  <Frame kicker={SLIDE4.kicker} page={SLIDE4.page} dark>
    <div style={{ marginTop: -30 }}>
      <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 50, lineHeight: 1.12, letterSpacing: -1.6, color: '#fff' }}>
        {SLIDE4.title.a} <span style={{ color: K.mint }}>{SLIDE4.title.green}</span>
        <br />
        {SLIDE4.title.b}
      </div>
      <div style={{ marginTop: 70, height: 600 }}>
        <MaterialPages scale={(1080 - PAD * 2) / 920} />
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: PAD,
        right: PAD,
        bottom: 84,
        background: K.mint,
        borderRadius: 50,
        padding: '24px 0',
        textAlign: 'center',
        fontFamily: F.sans,
        fontWeight: 800,
        fontSize: 24,
        color: K.black,
        boxShadow: '0 0 50px rgba(43,199,127,0.35)',
      }}
    >
      {SLIDE4.cta}
    </div>
  </Frame>
);

export const SlideSV31: React.FC = () => (
  <Frame kicker={SV31.kicker} page={SV31.page} footer={<LinkCta text={SV31.cta} />}>
    <LiteralCard label={SV31.label}>
      {SV31.quote.map((q, i) => (q.hl ? <HighlightRun key={i} text={q.t} /> : <React.Fragment key={i}>{q.t}</React.Fragment>))}
    </LiteralCard>
    <PlainCard label={SV31.plainLabel} style={{ marginTop: 40 }}>
      {SV31.plain.a}
      <span style={{ color: K.mint }}>{SV31.plain.green}</span>
      {SV31.plain.b}
    </PlainCard>
  </Frame>
);

export const CAROUSEL_SLIDES = [
  { id: 'C01-Slide1', component: Slide1 },
  { id: 'C01-Slide2', component: Slide2 },
  { id: 'C01-Slide3', component: Slide3 },
  { id: 'C01-Slide4', component: Slide4 },
  { id: 'SV31-Slide2', component: SlideSV31 },
];
