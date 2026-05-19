import './globals.css';

export const metadata = {
  title: 'Blog Imóveis Campos',
  description: 'Posts diários sobre imóveis em Campos dos Goytacazes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white">
        <main className="min-h-screen">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-600 mt-24">
          <p className="text-sm">&copy; 2026 Blog Imóveis Campos. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
