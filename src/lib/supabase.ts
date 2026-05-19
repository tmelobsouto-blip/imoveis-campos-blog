import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjAwMDAwMDAsImV4cCI6MTc5OTk5OTk5OX0.mock_token';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  title: string;
  slug: string;
  body: string;
  tags: string[];
  featured_image_url?: string;
  author: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type Listing = {
  id: string;
  source: 'zap' | 'vivareal' | 'local';
  url: string;
  title: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  neighborhood: string;
  type: 'residential' | 'commercial';
  transaction_type: 'sale' | 'rent';
  description?: string;
  created_at: string;
};

export async function getPosts(limit = 10, offset = 0) {
  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return { posts: data as Post[], total: count || 0 };
}

export async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Post;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function getListings(limit = 100) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Listing[];
}

export async function getTrending() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, tags, published_at')
    .order('published_at', { ascending: false })
    .limit(5);

  if (error) throw error;

  const tags = new Set<string>();
  (data as any[]).forEach(post => {
    post.tags?.forEach((tag: string) => tags.add(tag));
  });

  return {
    trending_posts: data,
    tags: Array.from(tags),
  };
}
