import './globals.css';

export const metadata = {
  title: 'Blog Imóveis Campos',
  description: 'Posts diários sobre imóveis em Campos dos Goytacazes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        <header className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Blog Imóveis Campos</h1>
            <p className="text-gray-600">Posts diários sobre mercado imobiliário local</p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-100 py-6 text-center text-gray-600 mt-12">
          <p>&copy; 2026 Blog Imóveis Campos. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
