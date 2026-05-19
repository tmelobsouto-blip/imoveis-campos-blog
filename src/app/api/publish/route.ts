import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase environment variables not configured');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey);
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const payload = await request.json();
    const { title, slug, body, tags, featured_image, author } = payload;

    // Validate required fields
    if (!title || !slug || !body) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, body' },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: `Slug already exists: ${slug}` },
        { status: 409 }
      );
    }

    // Insert post
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          slug,
          body,
          tags: tags || [],
          featured_image_url: featured_image,
          author: author || 'Blog Imóveis Campos',
          published_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { success: false, error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // Revalidate path for ISR
    try {
      await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: `/posts/${slug}` }),
      }).catch(() => {
        // Revalidate fails in development, but that's OK
      });
    } catch (_) {
      // Ignore revalidate errors
    }

    return NextResponse.json(
      {
        success: true,
        postId: data.id,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${slug}`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
