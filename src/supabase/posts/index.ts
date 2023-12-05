import { supabaseClientAdmin } from '..';
import { Database } from '../types';

export type SupabasePost = Database['public']['Tables']['posts_dev']['Row'];
export type SupabasePostInsert = Database['public']['Tables']['posts_dev']['Insert'];

const envToPostsTable = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'posts_dev';
    case 'production':
      return 'posts_prod';
    default:
      return 'posts_dev';
  }
};

export const upsertPost = async (post: SupabasePostInsert) => {
  const { data, error } = await supabaseClientAdmin.from(envToPostsTable()).upsert(post, { onConflict: 'content_id' });

  if (error) {
    throw error;
  }

  return data;
};

export const bulkUpserPosts = async (posts: SupabasePostInsert[]) => {
  const { data, error } = await supabaseClientAdmin.from(envToPostsTable()).upsert(posts, { onConflict: 'content_id' });

  if (error) {
    throw error;
  }

  return data;
};
