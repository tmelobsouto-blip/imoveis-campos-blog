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
      bg-gray-50
      border border-gray-300
      rounded-md
      p-6
      my-8
    ">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Acompanhe lançamentos diários
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Receba posts sobre mercado imobiliário de Campos dos Goytacazes no seu email.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="
            flex-1
            px-3 py-2
            border border-gray-300
            rounded-md
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            disabled:bg-gray-100
          "
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            px-4 py-2
            bg-blue-600
            text-white
            text-sm
            font-medium
            rounded-md
            hover:bg-blue-700
            disabled:bg-gray-400
            transition-colors
          "
        >
          {status === 'loading' ? 'Enviando...' : 'Inscrever'}
        </button>
      </form>

      {message && (
        <p className={`text-sm mt-2 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
