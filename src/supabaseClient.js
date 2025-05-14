    // src/supabaseClient.js
    import { createClient } from '@supabase/supabase-js';

    // Carga las variables de entorno definidas en .env.local
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Verifica que las claves se hayan cargado (opcional, pero útil para depurar)
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase URL or Anon Key not loaded from environment variables.');
      // Considera lanzar un error o mostrar un mensaje al usuario en un entorno real
    }

    // Crea y exporta el cliente de Supabase
    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    