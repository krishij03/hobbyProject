import React, { useState, useEffect, useRef } from 'react';
import { Cigarette, Search, Menu, X, ChevronDown, Star, Cloud, Wind, MapPin, Send, Mail } from 'lucide-react';
import L from 'leaflet';
import { useUpvotes } from './hooks/useUpvotes';
import { supabase } from './lib/supabase';
import { useVisitCount } from './hooks/useVisitCount';
import { 
  funnyQuotes, 
  getSortedSuttas, 
  searchSuttas,
  Sutta
} from './config/suttas';
import { 
  getLocationsByArea, 
  getAllLocations 
} from './config/locations';
import { Link } from 'react-router-dom';
import { BrandCard } from './components/BrandCard';

type Brand = {
  id: string;
  name: string;
  hinglishTagline: string;
  price: string;
  description: string;
  tadkaLevel: number;
  image: string;
  flavor: string;
  hindiQuote: string;
  upvotes: number;
};

type Location = {
  id: string;
  name: string;
  address: string;
  area: string;
  lat: number;
  lng: number;
  description: string;
};

function PixelHeart({ filled }: { filled: boolean }) {
  return (
    <div className={`w-4 h-4 relative transition-all duration-300 transform hover:scale-110 ${
      filled ? 'opacity-100' : 'opacity-30'
    }`}>
      <div className="absolute inset-0 pixelated">
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wPC94bXA6Q3JlYXRvclRvb2w+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+Yt5B1AAAAJlJREFUGJV1j7ENwjAQRZ+dC1JQpGAE78AW9NyKEViADajTMQMDZAF6UiQdI7BCGiRkWTpLp7vT/3fnG1VVQwjhClyBB/Bq2/ZVliUxRgBCCPuU0sL7OWZGjHHWWvPe92b2MLNzjJE5qOrBOXcys2tK6QN0wN3MeufcBhiAj6ruzWwDVMA9pfQEtsCoquf/PvgFoKoq+p/PF6ECJMgzqHNYAAAAAElFTkSuQmCC"
          alt="pixel heart"
          className="w-full h-full"
          style={{ filter: 'brightness(0) saturate(100%) invert(36%) sepia(51%) saturate(2878%) hue-rotate(337deg) brightness(91%) contrast(92%)' }}
        />
      </div>
    </div>
  );
}

function TadkaLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <span 
          key={index}
          className={`text-lg ${index < level ? 'text-red-500' : 'text-gray-300'}`}
        >
          ♥
        </span>
      ))}
      <span className="ml-2 text-sm text-brown-700 font-hindi">
        तड़का {level}/5
      </span>
    </div>
  );
}

function SmokingAnimation() {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        <Cloud className="h-6 w-6 text-black/20 animate-float-fast" />
        <Cloud className="h-4 w-4 text-black/30 absolute -top-4 left-2 animate-float-medium" />
        <Cloud className="h-3 w-3 text-black/40 absolute -top-8 left-4 animate-float-slow" />
      </div>
    </div>
  );
}

function TouchSmokeTrail() {
  useEffect(() => {
    let particles: { x: number; y: number; size: number; alpha: number; element: HTMLDivElement }[] = [];
    let isTouch = false;
    let lastX = 0;
    let lastY = 0;

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'fixed pointer-events-none rounded-full bg-gradient-to-t from-black/30 to-black/10 blur-sm transition-all duration-1000';
      document.body.appendChild(particle);

      const size = Math.random() * 20 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x - size/2}px`;
      particle.style.top = `${y - size/2}px`;

      return {
        x,
        y,
        size,
        alpha: 1,
        element: particle
      };
    };

    const updateParticles = () => {
      particles.forEach((p, index) => {
        p.alpha -= 0.02;
        if (p.alpha <= 0) {
          p.element.remove();
          particles.splice(index, 1);
        } else {
          p.y -= 1;
          p.element.style.opacity = p.alpha.toString();
          p.element.style.transform = `translate(${p.x - p.size/2}px, ${p.y - p.size/2}px)`;
        }
      });
      requestAnimationFrame(updateParticles);
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const x = touch.clientX;
      const y = touch.clientY;

      if (isTouch && (Math.abs(x - lastX) > 10 || Math.abs(y - lastY) > 10)) {
        particles.push(createParticle(x, y));
        lastX = x;
        lastY = y;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isTouch = true;
      handleTouch(e);
    };

    const handleTouchEnd = () => {
      isTouch = false;
    };

    document.addEventListener('touchmove', handleTouch, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    updateParticles();

    return () => {
      document.removeEventListener('touchmove', handleTouch);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      particles.forEach(p => p.element.remove());
    };
  }, []);

  return null;
}

function MumbaiMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [areaSearch, setAreaSearch] = useState('');
  const markersRef = useRef<L.Marker[]>([]);
  const prevSearchRef = useRef(areaSearch);

  const filteredSpots = getLocationsByArea(areaSearch);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView([19.0760, 72.8777], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Separate effect for handling markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Custom icon for markers
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>`,
      iconSize: [0, 0]
    });

    // Update markers based on filtered spots
    filteredSpots.forEach(spot => {
      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });
      markersRef.current.push(marker);
      marker.addTo(mapRef.current!);
      
      // Create popup content with Google Maps link
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 min-w-[200px]';
      popupContent.innerHTML = `
        <h3 class="font-bold text-lg mb-1">${spot.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${spot.address}</p>
        <p class="text-sm mb-3">${spot.description}</p>
        <button
          onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&travelmode=driving')"
          class="bg-brown-600 text-white px-4 py-2 rounded-full text-sm hover:bg-brown-700 transition-colors w-full"
        >
          Get Directions
        </button>
      `;

      marker.bindPopup(popupContent);
    });

    // Only fit bounds when search changes and there are results
    if (filteredSpots.length > 0 && prevSearchRef.current !== areaSearch) {
      const bounds = L.latLngBounds(filteredSpots.map(spot => [spot.lat, spot.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }

    prevSearchRef.current = areaSearch;
  }, [filteredSpots, areaSearch]); // Update when spots or search changes

  return (
    <section id="locations" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-brown-900">
          Sutta Spots in Mumbai
        </h2>
        <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg mb-8">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        {/* Area Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by area (Bandra, Andheri, Juhu...)"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 
                       text-black placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-brown-400 transition-all"
              value={areaSearch}
              onChange={(e) => setAreaSearch(e.target.value)}
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-500">
            {filteredSpots.length} spots found in {areaSearch || 'Mumbai'}
          </div>
        </div>

        {/* Location Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpots.map(spot => (
            <div 
              key={spot.id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">{spot.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{spot.address}</p>
                </div>
                <span className="px-3 py-1 bg-brown-100 text-brown-800 rounded-full text-sm capitalize">
                  {spot.area}
                </span>
              </div>
              <p className="text-sm mb-3">{spot.description}</p>
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}&travelmode=driving`)}
                className="bg-brown-600 text-white px-4 py-2 rounded-full text-sm hover:bg-brown-700 transition-colors w-full flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Open default mail client with pre-filled message
    window.location.href = `mailto:contact@sutta.me?subject=Sutta Website Feedback&body=${encodeURIComponent(message)}`;
    
    setSending(false);
    setSent(true);
    setMessage('');
    
    // Reset sent status after 3 seconds
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="bg-brown-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Send us feedback!
        </h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your favorite sutta spots! If we're missing a sutta, include the brand name, price, and exact location (Google Maps link if possible) of where people can find it & we'll add it to the website!"
          className="w-full p-3 rounded-lg border border-brown-200 focus:ring-2 focus:ring-brown-400 focus:border-transparent min-h-[120px]"
          required
        />
        <button
          type="submit"
          disabled={sending || !message}
          className={`mt-3 px-6 py-2 rounded-full flex items-center justify-center gap-2 w-full
            ${sending || !message 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-brown-600 hover:bg-brown-700'} text-white transition-colors`}
        >
          {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Feedback'}
          <Send className={`w-4 h-4 ${sending ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </form>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [brandsState, setBrandsState] = useState<Sutta[]>([]); // Properly typed empty array
  const [selectedArea, setSelectedArea] = useState('');
  const [locations, setLocations] = useState(getLocationsByArea(''));
  const visitCount = useVisitCount();

  // Add auto-refresh for quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(current => (current + 1) % funnyQuotes.length);
    }, 2000); // Changes every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredBrands = searchQuery
    ? brandsState.filter(brand =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.hinglishTagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.hindiQuote.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : brandsState;

  // Handle successful upvote
  const handleUpvoteSuccess = (brandId: string) => {
    setBrandsState(current =>
      current.map(brand =>
        brand.id === brandId
          ? { ...brand, upvotes: brand.upvotes + 1 }
          : brand
      )
    );
  };

  // Add this effect to fetch initial brand data
  useEffect(() => {
    const fetchBrands = async () => {
      const { data: brandData, error } = await supabase
        .from('brands')
        .select('id, upvotes');
      
      if (error) {
        console.error('Error fetching brands:', error);
        return;
      }

      if (brandData) {
        // Get all suttas, update their upvotes, sort them, and take top 3
        setBrandsState(
          getSortedSuttas()
            .map(brand => {
              const dbBrand = brandData.find(b => b.id === brand.id);
              return dbBrand 
                ? { ...brand, upvotes: dbBrand.upvotes }
                : brand;
            })
            .sort((a, b) => b.upvotes - a.upvotes)
            .slice(0, 3)  // Only take top 3 for main page
        );
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('brands')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'brands' 
      }, payload => {
        setBrandsState(current => 
          current.map(brand => 
            brand.id === payload.new.id 
              ? { ...brand, upvotes: payload.new.upvotes }
              : brand
          )
          .sort((a, b) => b.upvotes - a.upvotes)
          .slice(0, 3)  // Keep only top 3 after sorting
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update locations when area changes
  useEffect(() => {
    setLocations(getLocationsByArea(selectedArea));
  }, [selectedArea]);

  return (
    <div className="min-h-screen bg-white">
      <TouchSmokeTrail />
      {/* Navigation */}
      <nav className="bg-white text-black p-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Cigarette className="h-6 w-6 animate-wiggle group-hover:animate-none" />
              <SmokingAnimation />
            </div>
            <h1 className="text-xl font-bold">
              Aaj Kya Phookoge?
              
            </h1>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden transform transition-transform hover:scale-110"
          >
            {isMenuOpen ? <X className="animate-spin" /> : <Menu className="animate-pulse" />}
          </button>
          <div className={`absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent
            ${isMenuOpen ? 'block animate-fadeIn' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <a href="#brands" className="hover:text-brown-600 transition-colors">Brands</a>
              <a href="#quiz" className="hover:text-brown-600 transition-colors">Quiz</a>
              <a href="#about" className="hover:text-brown-600 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-[70vh] bg-white text-black overflow-hidden">
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center py-20">
          <div className="animate-float">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-brown-900 font-hindi">
              सुट्टा टाइम
            </h1>
            <p className="text-2xl mb-2 animate-pulse text-brown-700">
              Your Unsolicited Smoke Break Companion
            </p>
            <p className="text-xl mb-2 font-hindi text-brown-600">
              {funnyQuotes[currentQuote]}
            </p>
            <p className="text-lg text-brown-600 mt-4 mb-16">
              You are the <span className="font-bold text-brown-900">{visitCount}</span> suttebaaz here
            </p>
          </div>
          <div className="w-full max-w-md relative transform hover:scale-105 transition-transform mb-16">
            <Search className="absolute left-3 top-[35%] transform -translate-y-1/2 text-gray-400 animate-bounce" />
            <input
              type="text"
              placeholder="Konsa Chahiye Bhai? 🚬"
              className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brown-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <section id="brands" className="container mx-auto px-4 py-1">
        <h2 className="text-4xl font-bold text-center mb-4 text-brown-900">
          Top Suttas
        </h2>
        <p className="text-center text-brown-700 mb-12 font-hindi">
          मस्त सुट्टे
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrands.map((brand) => (
            <BrandCard 
              key={brand.name} 
              brand={brand} 
              onUpvote={handleUpvoteSuccess}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/catalogue"
            className="inline-block bg-brown-600 text-white px-6 py-3 rounded-full"
          >
            View Full Catalogue
          </Link>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-float">
              <h2 className="text-4xl font-bold mb-2 text-brown-900">
                Tera Sutta Kaun?
              </h2>
              <p className="text-xl text-brown-700 mb-4 font-hindi">
                पता करो अपना सुट्टा
              </p>
            </div>
            <p className="text-gray-700 mb-8">
              Find your perfect smoke match!
            </p>
            <button className="group bg-brown-900 text-white px-8 py-4 rounded-full hover:bg-brown-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto">
              <Star className="mr-2 animate-spin-slow" />
              <span>Start The Scene</span>
              <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <MumbaiMap />

      {/* Footer */}
      <footer className="bg-white text-brown-900 py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6 animate-float">
              <div className="relative">
                <Cigarette className="h-8 w-8 mr-2" />
                <SmokingAnimation />
              </div>
              <h2 className="text-2xl font-bold font-hindi">
                सुट्टा टाइम
              </h2>
            </div>
            <p className="mb-4">
              © 2024 - All Rights Reserved
            </p>
            <p className="text-brown-600 text-sm mb-2">
              Disclaimer: This website is for informational purposes only.
            </p>
            <p className="text-red-600 text-sm font-bold mb-4">
              WARNING: Tobacco is injurious to health. Smoking kills.
            </p>
            <p className="text-brown-500 text-xs italic">
              Made by Anonymous (kyuki baap dekhega toh maarega.)
            </p>
            <FeedbackForm />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;