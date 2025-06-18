import { Property } from '@/types/property';

// Define the province and town structure with property counts
const locationDistribution = {
  'Cordoba': {
    'Almedinilla': 7,
    'Almodovar Del Rio': 2,
    'Baena': 5,
    'Benamejí': 2,
    'Cabra': 6,
    'Carcabuey': 16,
    'Castro Del Rio': 1,
    'Encinas Reales': 4,
    'Fuente-Tojar': 24,
    'Iznajar': 28,
    'La Carlota': 2,
    'La Guijarrosa': 2,
    'Lucena': 4,
    'Luque': 36,
    'Montilla': 1,
    'Montoro': 1,
    'Monturque': 5,
    'Priego de Cordoba': 75,
    'Puente Genil': 7,
    'Rute': 51,
    'Santaella': 1,
    'Valenzuela': 1,
    'Zuheros': 9
  },
  'Malaga': {
    'Antequera': 65,
    'Archidona': 45,
    'Campillos': 28,
    'Coin': 35,
    'Villanueva del Rosario': 38,
    'Villanueva de Tapia': 30
  },
  'Granada': {
    'Alhama de Granada': 35,
    'Loja': 42,
    'Montefrio': 34
  },
  'Jaen': {
    'Alcala la Real': 89,
    'Alcaudete': 75,
    'Castillo de Locubin': 68,
    'Frailes': 65,
    'Martos': 59
  },
  'Sevilla': {
    'Estepa': 22,
    'Osuna': 24,
    'La Roda de Andalucia': 20
  },
  'Cadiz': {
    'Arcos de la Frontera': 6,
    'Olvera': 5,
    'Villamartin': 6
  }
};

// Property types with their probability weights
const propertyTypes = [
  { type: 'Town House', weight: 35 },
  { type: 'Villa', weight: 25 },
  { type: 'Country House', weight: 20 },
  { type: 'Cortijo', weight: 15 },
  { type: 'Apartment', weight: 5 }
];

// Function to generate a random property
function generateProperty(id: string, town: string, province: string): Property {
  // Select a random property type based on weights
  const totalWeight = propertyTypes.reduce((sum, type) => sum + type.weight, 0);
  let random = Math.random() * totalWeight;
  const propertyType = propertyTypes.find(type => {
    random -= type.weight;
    return random <= 0;
  })!.type;

  // Generate random price between 50,000 and 500,000
  const currentPrice = Math.floor(Math.random() * (500000 - 50000) + 50000);
  const hasOriginalPrice = Math.random() > 0.7;
  const originalPrice = hasOriginalPrice ? Math.floor(currentPrice * (1 + Math.random() * 0.3)) : undefined;

  return {
    id,
    title: propertyType,
    location: {
      town,
      province
    },
    price: {
      current: currentPrice,
      ...(originalPrice && { original: originalPrice })
    },
    specs: {
      beds: Math.floor(Math.random() * 5) + 1,
      baths: Math.floor(Math.random() * 3) + 1,
      built: Math.floor(Math.random() * (300 - 60) + 60),
      plot: Math.floor(Math.random() * (10000 - 100) + 100)
    },
    description: `Beautiful ${propertyType.toLowerCase()} located in ${town}, ${province}. This property offers great potential and stunning views of the Andalucian countryside.`,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=60'
    ].slice(0, Math.floor(Math.random() * 2) + 1),
    isExclusive: Math.random() > 0.8,
    isReduced: hasOriginalPrice
  };
}

// Generate properties based on the distribution
let propertyId = 1;
export const allProperties: Property[] = Object.entries(locationDistribution).flatMap(
  ([province, towns]) =>
    Object.entries(towns).flatMap(([town, count]) =>
      Array.from({ length: count }, () => 
        generateProperty(
          `PR${propertyId++}`.padStart(6, '0'),
          town,
          province
        )
      )
    )
); 