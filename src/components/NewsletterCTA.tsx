'use client';

import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('✓ Verifique seu email');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setMessage('Erro ao inscrever. Tente novamente.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Erro de conexão.');
    }
  };

  return (
    <div className="
      bg-gradient-to-br from-blue-50 to-blue-100
      rounded-2xl
      p-12
      my-12
      shadow-sm
      backdrop-blur-sm
    ">
      <h3 className="text-3xl font-semibold text-black mb-3 leading-tight">
        Acompanhe lançamentos diários
      </h3>
      <p className="text-gray-700 text-base mb-8 max-w-md leading-relaxed">
        Receba posts sobre mercado imobiliário de Campos dos Goytacazes no seu email.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="
            flex-1
            px-4 py-3
            bg-white
            border border-gray-300
            rounded-xl
            text-base
            placeholder:text-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600
            focus:ring-offset-0
            disabled:opacity-50
            transition-all
            duration-300
          "
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            px-6 py-3
            bg-blue-600
            text-white
            text-base
            font-semibold
            rounded-xl
            hover:bg-blue-700
            disabled:opacity-50
            transition-all
            duration-300
            whitespace-nowrap
          "
        >
          {status === 'loading' ? 'Enviando...' : 'Inscrever'}
        </button>
      </form>

      {message && (
        <p className={`text-sm mt-4 font-medium ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
