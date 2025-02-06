export type Sutta = {
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
  category: 'regular' | 'premium' | 'special';
  isAvailable: boolean;
};

export const suttas: Sutta[] = [
  {
    id: '1',
    name: 'Advance',
    hinglishTagline: 'Boss Level Sutta 🔥',
    price: '₹20',
    description: 'For the connoisseur who knows their smoke.',
    tadkaLevel: 5,
    image: 'https://images.unsplash.com/photo-1527099908998-5b73a5fe2a0d?auto=format&fit=crop&q=80',
    flavor: 'Full Power',
    hindiQuote: 'बॉस की पसंद',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
  },
  {
    id: '2',
    name: 'Light',
    hinglishTagline: 'Halka Fulka Scenes',
    price: '₹15',
    description: 'When you want to keep it light and breezy.',
    tadkaLevel: 2,
    image: 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?auto=format&fit=crop&q=80',
    flavor: 'Easy Going',
    hindiQuote: 'हल्का फुल्का मज़ा',
    upvotes: 0,
    category: 'regular',
    isAvailable: true
  },
  {
    id: '3',
    name: 'Clovemix',
    hinglishTagline: 'Masaledar Vibes',
    price: '₹18',
    description: 'Spice up your smoke break with a hint of clove.',
    tadkaLevel: 4,
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&q=80',
    flavor: 'Spicy Mix',
    hindiQuote: 'मसालेदार धमाका',
    upvotes: 0,
    category: 'special',
    isAvailable: true
  }
];

export const funnyQuotes = [
  "Chai ke saath special scene ✨",
  "Tension? Bhool jao 💨",
  "Break time = Sutta time 🌟",
  "Yaar tera superstar 🎭"
];

export const getSortedSuttas = (limit?: number) => {
  const sorted = [...suttas]
    .filter(sutta => sutta.isAvailable)
    .sort((a, b) => b.upvotes - a.upvotes);
  
  return limit ? sorted.slice(0, limit) : sorted;
};

export const searchSuttas = (query: string) => {
  const searchTerm = query.toLowerCase();
  return suttas.filter(sutta => 
    sutta.isAvailable && (
      sutta.name.toLowerCase().includes(searchTerm) ||
      sutta.hinglishTagline.toLowerCase().includes(searchTerm) ||
      sutta.description.toLowerCase().includes(searchTerm) ||
      sutta.flavor.toLowerCase().includes(searchTerm) ||
      sutta.hindiQuote.toLowerCase().includes(searchTerm)
    )
  );
};

export const getAllSuttas = () => suttas; 