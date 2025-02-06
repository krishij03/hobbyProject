import React, { useState } from 'react';
import { syncSuttasWithDB } from '../utils/dbSync';

export function AdminSync() {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSync = async () => {
    setSyncing(true);
    setMessage('Syncing...');
    
    try {
      const success = await syncSuttasWithDB();
      setMessage(success ? 'Sync completed successfully!' : 'Sync failed. Check console for details.');
    } catch (error) {
      setMessage('Error occurred during sync');
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Database Sync
        </h1>
        
        <div className="max-w-md mx-auto text-center">
          <button
            onClick={handleSync}
            disabled={syncing}
            className={`px-6 py-3 rounded-full ${
              syncing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-brown-600 hover:bg-brown-700'
            } text-white transition-colors`}
          >
            {syncing ? 'Syncing...' : 'Sync Suttas with Database'}
          </button>
          
          {message && (
            <p className="mt-4 text-sm text-gray-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 