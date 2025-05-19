import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno de Supabase no están configuradas. Por favor, usa el botón "Connect to Supabase" en la parte superior derecha.');
}

// Log the URL to verify it's being read correctly (but not the key for security)
console.log('Supabase URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true
  },
  db: {
    schema: 'public'
  }
});

// Add a health check function
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('productos').select('id').limit(1);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};