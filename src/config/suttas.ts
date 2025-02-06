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
    image: 'https://images.unsplash.com/photo-1623307645550-40d76c6e22ce?q=80&w=2256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    flavor: 'Spicy Mix',
    hindiQuote: 'मसालेदार धमाका',
    upvotes: 0,
    category: 'special',
    isAvailable: true
  },
  {
    id: '4',
    name: 'Gudang Garam',
    hinglishTagline: 'Indonesian Clove Kick',
    price: '₹70',
    description: 'Experience the unique blend of tobacco and clove from Indonesia.',
    tadkaLevel: 4,
    image: 'https://images.unsplash.com/photo-1582036575848-a20ace74f594?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNpZ2FyZXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
    flavor: 'Clove Infusion',
    hindiQuote: 'इंडोनेशियाई लौंग का स्वाद',
    upvotes: 0,
    category: 'special',
    isAvailable: true
},
{
    id: '5',
    name: 'Camel',
    hinglishTagline: 'Desert Smoothness',
    price: '₹150',
    description: 'A smooth and rich experience with a hint of Turkish tobacco.',
    tadkaLevel: 3,
    image: 'https://plus.unsplash.com/premium_photo-1724546208079-17e142699654?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    flavor: 'Turkish Blend',
    hindiQuote: 'रेगिस्तानी नरमी',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
},
{
    id: '6',
    name: 'Marlboro',
    hinglishTagline: 'American Classic',
    price: '₹300',
    description: 'The iconic American cigarette known for its bold flavor.',
    tadkaLevel: 5,
    image: 'https://images.unsplash.com/photo-1514852640403-1c2f50c3c791?auto=format&fit=crop&q=80',
    flavor: 'Bold Classic',
    hindiQuote: 'अमेरिकी क्लासिक',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
},
{
    id: '7',
    name: 'Gold Flake Kings',
    hinglishTagline: 'Royal Smoothness',
    price: '₹150',
    description: 'A smooth and refined smoke favored by many.',
    tadkaLevel: 3,
    image: 'https://images.unsplash.com/photo-1603203498779-3f59a9b4a4a4?auto=format&fit=crop&q=80',
    flavor: 'Smooth Blend',
    hindiQuote: 'शाही नरमी',
    upvotes: 0,
    category: 'regular',
    isAvailable: true
},
{
    id: '8',
    name: 'Classic Milds',
    hinglishTagline: 'Gentle Touch',
    price: '₹200',
    description: 'For those who prefer a milder smoking experience.',
    tadkaLevel: 2,
    image: 'https://images.unsplash.com/photo-1582719478181-2f1aad8aefb0?auto=format&fit=crop&q=80',
    flavor: 'Mild Blend',
    hindiQuote: 'मुलायम एहसास',
    upvotes: 0,
    category: 'regular',
    isAvailable: true
},
{
    id: '9',
    name: 'Four Square',
    hinglishTagline: 'Square Deal',
    price: '₹120',
    description: 'A balanced flavor that offers a satisfying smoke.',
    tadkaLevel: 3,
    image: 'https://images.unsplash.com/photo-1514852640403-1c2f50c3c791?auto=format&fit=crop&q=80',
    flavor: 'Balanced Blend',
    hindiQuote: 'संतुलित स्वाद',
    upvotes: 0,
    category: 'regular',
    isAvailable: true
},
{
    id: '10',
    name: 'Navy Cut',
    hinglishTagline: 'Sailor’s Choice',
    price: '₹150',
    description: 'A classic choice with a rich and robust flavor.',
    tadkaLevel: 4,
    image: 'https://images.unsplash.com/photo-1603203498779-3f59a9b4a4a4?auto=format&fit=crop&q=80',
    flavor: 'Rich Blend',
    hindiQuote: 'नाविक की पसंद',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
},
{
    id: '11',
    name: 'Charminar',
    hinglishTagline: 'Heritage Smoke',
    price: '₹100',
    description: 'An enduring brand with a strong and distinctive taste.',
    tadkaLevel: 5,
    image: 'https://images.unsplash.com/photo-1582719478181-2f1aad8aefb0?auto=format&fit=crop&q=80',
    flavor: 'Strong Blend',
    hindiQuote: 'विरासत का धुआं',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
},
{
    id: '12',
    name: 'Wills Navy Cut',
    hinglishTagline: 'Legacy of Taste',
    price: '₹150',
    description: 'A legacy brand offering a smooth and flavorful experience.',
    tadkaLevel: 4,
    image: 'https://images.unsplash.com/photo-1514852640403-1c2f50c3c791?auto=format&fit=crop&q=80',
    flavor: 'Smooth Flavor',
    hindiQuote: 'स्वाद की विरासत',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
},
{
    id: '13',
    name: 'Benson & Hedges',
    hinglishTagline: 'British Elegance',
    price: '₹350',
    description: 'A premium British brand known for its refined taste.',
    tadkaLevel: 3,
    image: 'https://images.unsplash.com/photo-1603203498779-3f59a9b4a4a4?auto=format&fit=crop&q=80',
    flavor: 'Refined Blend',
    hindiQuote: 'ब्रिटिश शान',
    upvotes: 0,
    category: 'premium',
    isAvailable: true
},
{
  id: '14',
  name: 'Beedi',
  hinglishTagline: 'Not for the weak',
  price: 'Free',
  description: 'The only thing that can actually hit you',
  tadkaLevel: 5,
  image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNpZ2FyZXR0ZXxlbnwwfHwwfHx8MA%3D%3D',
  flavor: 'Nobody knows',
  hindiQuote: 'ब्रिटिश शान',
  upvotes: 0,
  category: 'premium',
  isAvailable: true
}

  
];

export const funnyQuotes = [
  "Badly need a smoke break? 🚬",
  "Tension? Bhool jao 💨",
  "Break time = Sutta time 🌟",
  "Kaam ka stress?",
  "Padhai nahi ho rahi?",
  "Ghar jaane seh pehle deo lagana mat bhulna"
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