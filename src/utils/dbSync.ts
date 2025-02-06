import { supabase } from '../lib/supabase';
import { suttas } from '../config/suttas';

export async function syncSuttasWithDB() {
  try {
    // Just insert the IDs for any new suttas
    const upsertData = suttas.map(sutta => ({
      id: sutta.id,
      upvotes: 0
    }));

    const { error } = await supabase
      .from('brands')
      .upsert(upsertData, {
        onConflict: 'id',
        ignoreDuplicates: true  // This will keep existing upvote counts
      });

    if (error) throw error;
    
    console.log('Successfully synced suttas with database');
    return true;
  } catch (error) {
    console.error('Error syncing suttas:', error);
    return false;
  }
} 