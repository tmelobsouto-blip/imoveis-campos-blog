import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Visita imersiva',
  description:
    'Percorra a casa a partir das fotografias reais do imóvel: piscina, áreas externas, salas, cozinha e quarto, em uma visita cinematográfica controlada pelo scroll.',
};

export const viewport: Viewport = {
  themeColor: '#0b0907',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
