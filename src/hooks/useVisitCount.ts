import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export function useVisitCount() {
  const [visitCount, setVisitCount] = useState<number>(0);
  const hasIncremented = useRef(false);

  useEffect(() => {
    const incrementCount = async () => {
      if (hasIncremented.current) return;
      
      try {
        const { data, error } = await supabase
          .rpc('increment_visit_count');
        
        if (error) {
          console.error('Error incrementing visit count:', error);
          // Fallback to just fetching the count
          const { data: visits } = await supabase
            .from('visits')
            .select('count')
            .single();
          if (visits) {
            setVisitCount(visits.count);
          }
          return;
        }

        if (data) {
          setVisitCount(data);
          hasIncremented.current = true;
        }
      } catch (error) {
        console.error('Error with visit count:', error);
      }
    };

    incrementCount();
  }, []);

  return visitCount;
} 