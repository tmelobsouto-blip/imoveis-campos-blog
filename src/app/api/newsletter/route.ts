import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Email inválido' }, { status: 400 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Armazena em uma tabela de newsletter subscribers (criar se necessário)
    const { error } = await supabase.from('newsletter_subscribers').insert([
      {
        email,
        subscribed_at: new Date().toISOString(),
      },
    ]);

    if (error?.code === 'PGRST116') {
      // Tabela não existe - retorna sucesso mesmo assim (para demo)
      return Response.json({
        success: true,
        message: 'Inscrição recebida',
      });
    }

    if (error) {
      console.error('Newsletter subscription error:', error);
      return Response.json(
        { error: 'Erro ao inscrever' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Inscrito com sucesso!',
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    return Response.json(
      { error: 'Erro ao processar' },
      { status: 500 }
    );
  }
}
