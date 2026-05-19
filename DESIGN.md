# Blog Imóveis Campos — Design System

## Theme & Lighting
**Scene:** Daytime reader on mobile (office break, lunch scroll). Bright ambient light, focused attention on content quality. Prefer light theme for scannability.

## Color Strategy
**Restrained** — tinted neutrals + one accent (blue). Trust-forward, professional journalism aesthetic.

### Palette (OKLCH)
| Name | OKLCH | Hex | Usage |
|------|-------|-----|-------|
| Base (lightest) | 98.5 0.01 250 | #fafbfc | Backgrounds |
| Surface | 96 0.01 250 | #f3f4f6 | Cards, sections |
| Border | 90 0.01 250 | #e5e7eb | Dividers |
| Text (primary) | 25 0.01 250 | #1f2937 | Headings, body |
| Text (secondary) | 45 0.01 250 | #6b7280 | Meta, dates, hints |
| Accent (primary) | 55 0.15 240 | #3b82f6 | Links, CTAs, highlights |
| Accent (dark) | 45 0.12 240 | #1e40af | Hover, active states |
| Danger | 55 0.15 25 | #ef4444 | Alerts only |

### Strategy Notes
- Grays tinted slightly blue (chroma 0.01) for warmth
- Blue accent at 15% chroma (strong but not aggressive)
- Dark mode not needed initially (laser focus on light)

## Typography

### Scale (Modular 1.25x)
| Role | Size | Weight | Line-height | Usage |
|------|------|--------|-------------|-------|
| Display | 3rem (48px) | 700 | 1.1 | Hero sections (none yet) |
| H1 | 2.25rem (36px) | 700 | 1.25 | Post titles |
| H2 | 1.875rem (30px) | 600 | 1.3 | Section headings |
| H3 | 1.5rem (24px) | 600 | 1.4 | Subsections |
| Body | 1rem (16px) | 400 | 1.6 | Article text |
| Meta | 0.875rem (14px) | 400 | 1.5 | Dates, bylines, captions |
| Tiny | 0.75rem (12px) | 500 | 1.4 | Tags, labels |

### Font Stack
- **Primary:** system fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
  - Later: Géist (from Vercel, $0) for modern touch
- **Line length cap:** 65–75ch (readability for long-form)

## Spacing

### Scale (4px base unit)
| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tag padding, tight spacing |
| sm | 8px | Button internal, small gaps |
| md | 16px | Card padding, section gaps |
| lg | 24px | Post spacing, major sections |
| xl | 32px | Page margins, hero sections |
| 2xl | 48px | Between content blocks |

**Rhythm rule:** Never the same padding on all sides of a card. Vary vertical/horizontal.

## Components

### Post Card (Homepage)
- Border: 1px solid border color
- Padding: 16px (md)
- Radius: 6px
- Hover: +2px subtle shadow, bg slightly lighter
- Content: Title (H3) → date (meta) → excerpt (100-120 chars) → tags

### Post Detail Layout
- Width: max 800px (65ch line length)
- Padding: xl (32px) on desktop, lg (24px) on mobile
- Header: H1 title → byline (date + author) → featured image (if exists)
- Body: Rendered markdown with consistent spacing
- Footer: Tags + AdSense disclaimer + related posts CTA

### Newsletter CTA
- Card-style (bg: surface)
- Inline form: email input + submit button
- Success state: "✓ Check your inbox"
- Copy: "Acompanhe lançamentos diários" (opinionated, not salesy)

### Tag
- Bg: tinted neutral (surface)
- Text: secondary
- Padding: 4px 8px
- Radius: 3px
- Inline with post metadata

### AdSense Placements
- **Display ad (sidebar):** 300px wide, sticky-scroll (desktop only, hide mobile)
- **In-feed ad:** Between posts on list (respects 70%+ content rule)
- **Responsive ad unit:** Adapts to container width
- **Disclaimer:** "Ads help fund content" (trust signal, footnote size)

## Layout Rules

### Homepage
- Hero section: Site title + tagline (no image, text-only, clean)
- Post grid: 1 column (mobile) → 1 column (tablet, because focus on read-first)
- Spacing: 2xl (48px) between posts for visual breathing room
- Sidebar (desktop >1024px): 300px ads, pinned

### Post Detail
- Single column, center-aligned
- Image: full width, max 800px
- Related posts: 3-column grid (desktop), 1-column (mobile)
- No nested cards (absolute ban)

## Motion

### Interactions
- Link hover: color shift (primary → dark accent), no underline by default
- Button hover: bg darken + 0.5s ease-out-quart
- Scroll animations: subtle fade-in on post cards (on-scroll intersection observer)
- No layout shifts on interaction

### Easing
- Standard ease: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-quart)
- No bouncing, no elastic

## Responsive Breakpoints

| Device | Width | Notes |
|--------|-------|-------|
| Mobile | <640px | 1 col, full bleed padding lg |
| Tablet | 640px–1024px | 1 col, xl padding |
| Desktop | >1024px | Sidebar layout, xl padding |

## Accessibility

- **Color contrast:** AA minimum (4.5:1 text)
- **Focus states:** Visible 2px blue outline, offset 2px
- **Touch targets:** min 44x44px buttons
- **Keyboard nav:** Tab order = visual order, no traps
- **Alt text:** Required on all images
- **Form labels:** Associated with inputs (no placeholder-only)

## Anti-Patterns (Absolute Bans)

- ❌ Gradient text
- ❌ Side-stripe borders on cards (rewrite with full border or bg tint)
- ❌ Hero-metric template (big number + label)
- ❌ Identical card grids (vary sizing/layout)
- ❌ Modal first (exhaust inline alternatives)
- ❌ Glassmorphism
- ❌ Animated layout shifts
- ❌ Em dashes (use comma, colon, semicolon, period, parenthesis)

## Implementation Notes

- Use Tailwind utility-first (TailwindCSS 4.x)
- CSS custom properties for color tokens (future theming)
- No external UI library yet (shadcn/ui later if needed)
- Mobile-first CSS (responsive utilities)
