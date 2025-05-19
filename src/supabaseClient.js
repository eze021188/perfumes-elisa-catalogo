import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno de Supabase no están configuradas. Por favor, usa el botón "Connect to Supabase" en la parte superior derecha.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);