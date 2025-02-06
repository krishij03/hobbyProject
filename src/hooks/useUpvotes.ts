import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useUpvotes(onUpvoteSuccess?: (brandId: string) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async (brandId: string) => {
    try {
      setIsLoading(true);

      // Call the RPC function to increment upvotes
      const { data, error: rpcError } = await supabase
        .rpc('increment_brand_upvotes', {
          brand_id: brandId
        });

      if (rpcError) {
        console.error('Error incrementing upvotes:', rpcError);
        return;
      }

      // If we got a new count back, update the UI
      if (data && onUpvoteSuccess) {
        onUpvoteSuccess(brandId);
      }

    } catch (error) {
      console.error('Error handling upvote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleUpvote,
    hasUpvoted: () => false, // Always allow upvoting
    isLoading
  };
} 