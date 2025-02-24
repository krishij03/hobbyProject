import React, { useState, useEffect } from 'react';
import { searchSuttas, getSortedSuttas } from '../config/suttas';
import { BrandCard } from '../components/BrandCard';
import { supabase } from '../lib/supabase';

export function SuttaCatalogue() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suttas, setSuttas] = useState(getSortedSuttas());

  // Apply search filter to current suttas state instead of getting new ones
  const filteredSuttas = searchQuery 
    ? suttas.filter(sutta => 
        sutta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sutta.hinglishTagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sutta.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sutta.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sutta.hindiQuote.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suttas;

  // Fetch initial sutta data with upvotes
  useEffect(() => {
    const fetchSuttas = async () => {
      const { data: brandData, error } = await supabase
        .from('brands')
        .select('id, upvotes');
      
      if (error) {
        console.error('Error fetching brands:', error);
        return;
      }

      if (brandData) {
        // Sort suttas by upvotes when setting initial state
        setSuttas(current =>
          current.map(sutta => {
            const dbBrand = brandData.find(b => b.id === sutta.id);
            return dbBrand 
              ? { ...sutta, upvotes: dbBrand.upvotes }
              : sutta;
          }).sort((a, b) => b.upvotes - a.upvotes)
        );
      }
    };

    fetchSuttas();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('brands')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'brands' 
      }, payload => {
        setSuttas(current => 
          current.map(sutta => 
            sutta.id === payload.new.id 
              ? { ...sutta, upvotes: payload.new.upvotes }
              : sutta
          ).sort((a, b) => b.upvotes - a.upvotes)
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle successful upvote
  const handleUpvoteSuccess = (suttaId: string) => {
    setSuttas(current =>
      current.map(sutta =>
        sutta.id === suttaId
          ? { ...sutta, upvotes: sutta.upvotes + 1 }
          : sutta
      ).sort((a, b) => b.upvotes - a.upvotes)
    );
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sutta Catalogue
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search suttas..."
            className="w-full px-4 py-2 rounded-full border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSuttas.map(sutta => (
            <BrandCard 
              key={sutta.id} 
              brand={sutta} 
              onUpvote={handleUpvoteSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 