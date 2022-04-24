import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { definitions } from './supabase.types';

let cachedClient: SupabaseClient | null = null;

/** Get the Supabase client. */
export const getClient = () => {
  if (!cachedClient) {
    const supabaseUrl = 'https://tbtclxlbkklxyjfjsihq.supabase.co';
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseKey) throw new Error('welp');

    cachedClient = createClient(supabaseUrl, supabaseKey);
  }

  return cachedClient;
};

/** Get the one and only database table: **listings** */
export const getTable = () => {
  return getClient().from<definitions['listings']>('listings');
};
