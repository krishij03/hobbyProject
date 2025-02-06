import { Star, Wind } from 'lucide-react';
import { useUpvotes } from '../hooks/useUpvotes';
import { Sutta } from '../config/suttas';

export function BrandCard({ brand, onUpvote }: { brand: Sutta; onUpvote?: (brandId: string) => void }) {
  const { handleUpvote, hasUpvoted, isLoading } = useUpvotes(onUpvote);

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 filter grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-brown-900">
              {brand.name}
            </h3>
            <p className="text-brown-700">
              {brand.hinglishTagline}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-brown-900 font-bold text-xl">{brand.price}</span>
            <div className="flex items-center mt-1">
              <Wind className="h-4 w-4 text-brown-600 mr-1" />
              <span className="text-sm text-brown-700">
                {brand.flavor}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          {brand.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <span 
                key={index}
                className={`text-lg ${index < brand.tadkaLevel ? 'text-red-500' : 'text-gray-300'}`}
              >
                ♥
              </span>
            ))}
            <span className="ml-2 text-sm text-brown-700 font-hindi">
              तड़का {brand.tadkaLevel}/5
            </span>
          </div>
        </div>
        <p className="text-center mt-4 text-brown-600 font-hindi text-sm">
          {brand.hindiQuote}
        </p>
        <div className="flex items-center justify-between p-4 border-t border-gray-100">
          <button 
            onClick={() => handleUpvote(brand.id)}
            disabled={isLoading || hasUpvoted(brand.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full 
              ${hasUpvoted(brand.id) 
                ? 'bg-brown-200 cursor-not-allowed' 
                : isLoading 
                  ? 'bg-brown-100 cursor-wait' 
                  : 'bg-brown-100 hover:bg-brown-200'} 
              transition-colors`}
          >
            <Star 
              className={`h-4 w-4 ${
                hasUpvoted(brand.id) 
                  ? 'text-yellow-500 fill-yellow-500' 
                  : 'text-gray-400'
              } ${isLoading ? 'animate-spin' : ''}`} 
            />
            <span>{brand.upvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 