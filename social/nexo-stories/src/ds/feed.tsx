import React from 'react';
import { AbsoluteFill } from 'remotion';
import { QUESTAO, SV31, TEMA796 } from './copy';
import { C, FONT, GRID } from './tokens';
import { Br, Canvas, Fill, Footer, Hl, Icon, Label, Law, Mark, Rule, SplitBar, Stat, Tag, TemplateBadge, Text, TopBar, Warn } from './ui';

const N = TEMA796.total;

/** 01A · Capa editorial (prioritária): número dominante. */
export const CoverImpact: React.FC = () => {
  const c = TEMA796.coverA;
  return (
    <Canvas mode="dark">
      <TopBar label={c.label} index={1} total={N} />
      <Fill justify="flex-end">
        <Tag>{c.kicker}</Tag>
        <Text kind="h2" style={{ marginTop: 56, fontWeight: 700 }}>
          {c.lead}
        </Text>
        <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 194, lineHeight: 0.86, letterSpacing: -9, color: C.mint, marginTop: 26, whiteSpace: 'nowrap' }}>
          {c.hero}
        </div>
        <Text kind="display" style={{ fontSize: 128, letterSpacing: -6, marginTop: 6 }}>
          {c.tail}
        </Text>
        <Rule style={{ marginTop: 56 }} />
        <Text kind="lead" color={C.mutedDark} style={{ marginTop: 30, fontWeight: 500, maxWidth: 820 }}>
          {c.sub}
        </Text>
      </Fill>
      <div style={{ height: 56 }} />
      <Footer action={c.action} />
    </Canvas>
  );
};

/** 01B · Capa de curiosidade (variante A/B). */
export const CoverCuriosity: React.FC = () => {
  const c = TEMA796.coverB;
  return (
    <Canvas mode="light">
      <TopBar label={c.label} index={1} total={N} />
      <Fill>
        <Text kind="display" style={{ fontSize: 118, letterSpacing: -5.4 }}>
          A Constituição não fala em <span style={{ textDecoration: `underline ${C.mint} 12px`, textUnderlineOffset: 14 }}>limite.</span>
        </Text>
        <Text kind="display" color={C.green} style={{ fontSize: 118, letterSpacing: -5.4, marginTop: 26 }}>
          {c.line2}
        </Text>
        <Text kind="lead" color={C.muted} style={{ marginTop: 60, fontWeight: 500, maxWidth: 800 }}>
          {c.sub}
        </Text>
      </Fill>
      <Footer action={c.action} />
    </Canvas>
  );
};

/** 02 · Contextualização: a regra literal e a pergunta de prova. */
export const Context: React.FC = () => {
  const c = TEMA796.context;
  return (
    <Canvas mode="light">
      <TopBar label={c.label} index={2} total={N} />
      <Fill justify="space-evenly">
        <Text kind="h1">{c.title}</Text>
        <Law source={c.source} size={38}>
          <Br>o ITBI</Br> {c.lawBefore} <Mark>{c.lawMark}</Mark> {c.lawAfter}
        </Law>
        <div>
          <Rule strong />
          <Text kind="h2" style={{ marginTop: 36, fontSize: 62, letterSpacing: -2.4 }}>
            {c.question.a} <Hl marker>{c.question.hl}</Hl> {c.question.b}
          </Text>
        </div>
      </Fill>
      <Footer action={c.action} />
    </Canvas>
  );
};

/** 03 · Tese literal + tradução: split claro/escuro. */
export const Tese: React.FC = () => {
  const c = TEMA796.tese;
  return (
    <AbsoluteFill>
      <Canvas mode="light" padBottom={0}>
        <TopBar label={c.label} index={3} total={N} />
        <div style={{ height: 70 }} />
        <Law source={c.source} size={46}>
          {c.before} <Mark>{c.mark}</Mark> {c.after}
        </Law>
      </Canvas>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 560 }}>
        <Canvas mode="dark">
          <Label color={C.mint}>{c.plainLabel}</Label>
          <div style={{ display: 'flex', gap: 26, marginTop: 30, flex: 1 }}>
            <div style={{ fontFamily: FONT.sans, fontWeight: 300, fontSize: 170, lineHeight: 0.8, color: C.mint, marginTop: -6 }}>[</div>
            <div>
              <Text kind="h2" style={{ fontSize: 58 }}>
                {c.plainA}
              </Text>
              <Text kind="lead" color={C.mint} style={{ marginTop: 22 }}>
                {c.plainB}
              </Text>
            </div>
          </div>
          <Footer action={c.action} />
        </Canvas>
      </div>
    </AbsoluteFill>
  );
};

/** 04 · Mapa de revisão: exemplo numérico como data viz. */
export const Example: React.FC = () => {
  const c = TEMA796.example;
  return (
    <Canvas mode="light">
      <TopBar label={c.label} index={4} total={N} />
      <Fill justify="space-evenly">
        <Text kind="h2" style={{ fontSize: 60, letterSpacing: -2.4 }}>
          {c.title}
        </Text>
        <div>
          {[
            { ...c.immune, color: C.green },
            { ...c.taxed, color: C.alert },
          ].map((row, i) => (
            <div key={row.value} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: GRID.gutter, padding: '26px 0', borderTop: `${i ? 1.5 : 3}px solid ${i ? C.line : C.ink}` }}>
              <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 112, lineHeight: 0.86, letterSpacing: -5, color: row.color, whiteSpace: 'nowrap' }}>{row.value}</span>
              <Label color={row.color} style={{ textAlign: 'right', maxWidth: 330, paddingBottom: 6 }}>
                {row.label}
              </Label>
            </div>
          ))}
          <div style={{ marginTop: 30 }}>
            <SplitBar
              height={88}
              scale={c.scale}
              parts={[
                { value: 600, label: '', caption: '', tone: 'green' },
                { value: 400, label: '', caption: '', tone: 'alert' },
              ]}
            />
          </div>
        </div>
        <div style={{ background: C.surface, padding: '30px 34px', borderLeft: `6px solid ${C.green}` }}>
          <Text kind="body" style={{ fontWeight: 600 }}>
            {c.rule}
          </Text>
        </div>
      </Fill>
      <Footer action={c.action} />
    </Canvas>
  );
};

const LockColumn: React.FC<{ label: string; q: string; a: string; src: string; alert?: boolean }> = ({ label, q, a, src, alert }) => (
  <div style={{ flex: 1, borderTop: `6px solid ${alert ? C.alertSoft : C.mint}`, paddingTop: 30 }}>
    <Label color={alert ? C.alertSoft : C.mint}>{label}</Label>
    <Text kind="h2" style={{ fontSize: 46, marginTop: 20 }}>
      {q}
    </Text>
    <Text kind="body" color="#D3DCD7" style={{ marginTop: 22, fontSize: 30 }}>
      {a}
    </Text>
    <Label size={17} style={{ marginTop: 26 }}>
      {src}
    </Label>
  </div>
);

/** 05 · Erro clássico: comparação lado a lado. */
export const Locks: React.FC = () => {
  const c = TEMA796.locks;
  return (
    <Canvas mode="dark">
      <TopBar label={c.label} index={5} total={N} />
      <Fill justify="space-evenly">
        <Text kind="display" style={{ fontSize: 92, letterSpacing: -4.2 }}>
          Não confunda as <Hl>duas travas</Hl> do inciso I.
        </Text>
        <div style={{ display: 'flex', gap: 48 }}>
          <LockColumn {...c.value} />
          <LockColumn {...c.activity} alert />
        </div>
        <Text kind="small" color={C.mutedDark} style={{ fontFamily: FONT.mono, fontSize: 21, letterSpacing: 0.4, lineHeight: 1.5 }}>
          {c.note}
        </Text>
      </Fill>
      <Footer action={c.action} />
    </Canvas>
  );
};

/** 06 · Insight estratégico: checklist acionável. */
export const Checklist: React.FC = () => {
  const c = TEMA796.checklist;
  return (
    <Canvas mode="light">
      <TopBar label={c.label} index={6} total={N} />
      <Fill>
        <Text kind="display" style={{ fontSize: 108 }}>
          3 leituras antes de <Hl>marcar.</Hl>
        </Text>
        <div style={{ marginTop: 70 }}>
          {c.items.map((item, i) => (
            <div key={item} style={{ display: 'flex', gap: 34, alignItems: 'baseline', padding: '34px 0', borderTop: `${i ? 1.5 : 3}px solid ${i ? C.line : C.ink}` }}>
              <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: C.green, width: 52, flexShrink: 0 }}>0{i + 1}</span>
              <Text kind="lead" style={{ fontSize: 40 }}>
                {item}
              </Text>
            </div>
          ))}
        </div>
      </Fill>
      <Footer action={c.action} />
    </Canvas>
  );
};

/** 07 · Conversão (objetivo: salvamento). */
export const SaveCta: React.FC = () => {
  const c = TEMA796.save;
  return (
    <Canvas mode="dark">
      <TopBar label={c.label} index={7} total={N} />
      <Fill justify="space-between">
        <div style={{ height: 40 }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 30 }}>
            <Text kind="display" style={{ fontSize: 112, flex: 1 }}>
              Salve para revisar <Hl>antes da prova.</Hl>
            </Text>
            <div style={{ marginTop: 18 }}>{Icon.bookmark(C.mint, 120)}</div>
          </div>
        </div>
        <div>
          <Label>Neste post</Label>
          <div style={{ marginTop: 18 }}>
            {c.index.map((item, i) => (
              <div key={item} style={{ display: 'flex', gap: 24, padding: '16px 0', borderTop: `1.5px solid ${C.lineDark}` }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 22, color: C.mint, width: 44 }}>0{i + 2}</span>
                <span style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 600, color: C.white, letterSpacing: -0.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Fill>
      <div style={{ height: 48 }} />
      <Footer
        action={
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {Icon.bookmark(C.mint, 30)} {c.action}
          </span>
        }
      />
    </Canvas>
  );
};

/** Template 10 · Card de conversão (variante produto, para A/B do último slide). */
export const ProductCta: React.FC = () => {
  const c = TEMA796.product;
  return (
    <Canvas mode="light">
      <TopBar label={c.label} index={7} total={N} />
      <Fill justify="space-evenly">
        <Text kind="display" style={{ fontSize: 112 }}>
          Mapas como este, para o <Hl>edital inteiro.</Hl>
        </Text>
        <div style={{ display: 'flex', gap: GRID.gutter * 2, borderTop: `3px solid ${C.ink}`, paddingTop: 40 }}>
          {c.kpis.map((k) => (
            <div key={k.label} style={{ flex: 1 }}>
              <Stat value={k.value} label={k.label} color={C.green} size={132} />
            </div>
          ))}
        </div>
        <div style={{ background: C.ink, color: C.white, padding: '34px 38px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, letterSpacing: -1.2 }}>{c.offer}</span>
          <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 21, color: C.mint, letterSpacing: 2, textTransform: 'uppercase' }}>{c.action} ↗</span>
        </div>
      </Fill>
      <Footer />
    </Canvas>
  );
};

/** Template 4 · Questão comentada (enunciado). */
export const QuestionSlide: React.FC = () => {
  const q = QUESTAO;
  return (
    <Canvas mode="light">
      <TopBar label={q.label} index={1} total={2} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 34 }}>
        <Tag>{q.bank}</Tag>
        <Tag tone="plain">10 segundos</Tag>
      </div>
      <Fill justify="space-evenly">
        <Text kind="body" style={{ fontWeight: 700, fontSize: 31, lineHeight: 1.36 }}>
          {q.stem}
        </Text>
        <div>
          {q.options.map((o) => (
            <div key={o.letter} style={{ display: 'flex', gap: 24, padding: '20px 0', borderTop: `1.5px solid ${C.line}` }}>
              <span style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: 28, color: C.green, width: 30 }}>{o.letter}</span>
              <Text kind="small" style={{ fontSize: 27 }}>
                {o.text}
              </Text>
            </div>
          ))}
        </div>
      </Fill>
      <Footer action={q.actionQ} />
    </Canvas>
  );
};

/** Template 4 · Questão comentada (gabarito). */
export const AnswerSlide: React.FC = () => {
  const q = QUESTAO;
  const right = q.options.find((o) => o.letter === q.correct);
  return (
    <Canvas mode="dark">
      <TopBar label={q.label} index={2} total={2} />
      <Fill justify="space-evenly">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36 }}>
          <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 300, lineHeight: 0.78, letterSpacing: -12, color: C.mint }}>{q.correct}</div>
          <div style={{ paddingBottom: 8 }}>
            <Label color={C.mint}>Gabarito</Label>
            <Text kind="lead" style={{ marginTop: 12, maxWidth: 560 }}>
              {right?.text}
            </Text>
          </div>
        </div>
        <div style={{ borderTop: `3px solid ${C.mint}`, paddingTop: 32 }}>
          <Label>{q.answerLabel}</Label>
          <Text kind="body" color="#D3DCD7" style={{ marginTop: 18, fontSize: 31 }}>
            {q.answer}
          </Text>
        </div>
        <div style={{ background: C.inkSoft, padding: '26px 30px', borderLeft: `6px solid ${C.alertSoft}` }}>
          <Text kind="body" style={{ fontWeight: 700, fontSize: 30 }}>
            <Warn>Pegadinha:</Warn> {q.trap}
          </Text>
        </div>
      </Fill>
      <Footer action={q.actionA} />
    </Canvas>
  );
};

/** Template 5 · Erro clássico aplicado a outro tema (SV 31). */
export const Sv31: React.FC = () => {
  const s = SV31;
  return (
    <Canvas mode="light">
      <TopBar label={s.label} />
      <Fill justify="space-evenly">
        <Text kind="display" style={{ fontSize: 104 }}>
          {s.title.a} <Hl>{s.title.hl}</Hl>
        </Text>
        <Law source={s.source} size={38}>
          {s.law.map((x, i) => (x.mark ? <Mark key={i}>{x.t}</Mark> : <React.Fragment key={i}>{x.t}</React.Fragment>))}
        </Law>
        <div style={{ background: C.ink, padding: '38px 40px' }}>
          <Label color={C.mint}>{s.plainLabel}</Label>
          <Text kind="h2" color={C.white} style={{ marginTop: 20, fontSize: 46, lineHeight: 1.14 }}>
            {s.plain.a}
            <span style={{ color: C.mint }}>{s.plain.hl}</span>
            {s.plain.b}
          </Text>
        </div>
      </Fill>
      <Footer action={s.action} />
    </Canvas>
  );
};

/** Template 2 · Comparativo entre bancas (estrutura; dados a preencher). */
export const BanksTemplate: React.FC = () => {
  const banks = ['Banca A', 'Banca B', 'Banca C'];
  const rows = ['Questões no recorte', 'Tópico mais cobrado', 'Estilo predominante', 'Pegadinha recorrente'];
  return (
    <Canvas mode="light">
      <TopBar label="Comparativo entre bancas" index={2} total={6} />
      <Fill justify="space-evenly">
        <Text kind="display" style={{ fontSize: 96 }}>
          {'{Assunto}'}: o que <Hl>muda</Hl> de uma banca para outra.
        </Text>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', borderBottom: `3px solid ${C.ink}`, paddingBottom: 16 }}>
            <span />
            {banks.map((b) => (
              <Label key={b} color={C.ink} style={{ fontWeight: 700 }}>
                {b}
              </Label>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={r} style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', padding: '26px 0', borderBottom: `1.5px solid ${C.line}`, alignItems: 'baseline' }}>
              <Text kind="small" style={{ fontWeight: 700 }}>
                {r}
              </Text>
              {banks.map((b, j) => (
                <span key={b} style={{ fontFamily: i === 0 ? FONT.sans : FONT.mono, fontWeight: i === 0 ? 900 : 500, fontSize: i === 0 ? 56 : 22, color: i === 0 && j === 1 ? C.green : C.muted, letterSpacing: i === 0 ? -2 : 0.4 }}>
                  {i === 0 ? '00' : '{preencher}'}
                </span>
              ))}
            </div>
          ))}
        </div>
        <Label size={17}>Fonte: {'{levantamento próprio · n questões · período · cargos}'}</Label>
      </Fill>
      <Footer action="Ranking por assunto →" />
      <TemplateBadge />
    </Canvas>
  );
};

/** Template 3 · Ranking de incidência (estrutura; dados a preencher). */
export const RankingTemplate: React.FC = () => {
  const bars = [100, 78, 61, 44, 30];
  return (
    <Canvas mode="dark">
      <TopBar label="Ranking de incidência" index={3} total={6} />
      <Fill justify="space-evenly">
        <Text kind="display" style={{ fontSize: 92 }}>
          Onde a {'{banca}'} mais cobra <Hl>{'{disciplina}'}</Hl>.
        </Text>
        <div>
          {bars.map((w, i) => (
            <div key={i} style={{ padding: '20px 0', borderTop: `1.5px solid ${C.lineDark}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: FONT.sans, fontWeight: 700, fontSize: 32, color: C.white }}>
                  <span style={{ fontFamily: FONT.mono, color: C.mint, fontSize: 24, marginRight: 20 }}>0{i + 1}</span>
                  {`{Assunto ${i + 1}}`}
                </span>
                <span style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: 44, color: i === 0 ? C.mint : C.white, letterSpacing: -1.5 }}>00%</span>
              </div>
              <div style={{ height: 14, marginTop: 14, background: C.lineDark }}>
                <div style={{ width: `${w}%`, height: '100%', background: i === 0 ? C.mint : '#4A5A52' }} />
              </div>
            </div>
          ))}
        </div>
        <Label size={17}>Fonte: {'{n questões · provas · período}'} · % sobre o total da disciplina</Label>
      </Fill>
      <Footer action="O que fazer com isso →" />
      <TemplateBadge />
    </Canvas>
  );
};

export const FEED = [
  { id: 'DS-T796-01A-capa-impacto', component: CoverImpact },
  { id: 'DS-T796-01B-capa-curiosidade', component: CoverCuriosity },
  { id: 'DS-T796-02-contexto', component: Context },
  { id: 'DS-T796-03-tese', component: Tese },
  { id: 'DS-T796-04-exemplo', component: Example },
  { id: 'DS-T796-05-erro-classico', component: Locks },
  { id: 'DS-T796-06-checklist', component: Checklist },
  { id: 'DS-T796-07A-cta-salvar', component: SaveCta },
  { id: 'DS-T796-07B-cta-produto', component: ProductCta },
  { id: 'DS-QC-01-enunciado', component: QuestionSlide },
  { id: 'DS-QC-02-gabarito', component: AnswerSlide },
  { id: 'DS-SV31-erro-classico', component: Sv31 },
  { id: 'DS-MODELO-comparativo-bancas', component: BanksTemplate },
  { id: 'DS-MODELO-ranking-incidencia', component: RankingTemplate },
];
