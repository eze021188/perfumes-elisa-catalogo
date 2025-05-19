import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useInfiniteScroll(pageSize = 20) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .range(from, to)
        .order('id', { ascending: true });

      if (error) throw error;

      if (data.length < pageSize) {
        setHasMore(false);
      }

      setItems(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error cargando más productos:', error);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, hasMore, loadMore };
}