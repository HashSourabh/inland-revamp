// Collection of property images by type
export const propertyImages = {
  'Town House': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d'
  ],
  'Villa': [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227',
    'https://images.unsplash.com/photo-1600047508788-786f3865b4b9',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4'
  ],
  'Country House': [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    'https://images.unsplash.com/photo-1600047509358-9dc75507daeb',
    'https://images.unsplash.com/photo-1600047509782-20d39509125c',
    'https://images.unsplash.com/photo-1600047508145-26a2144b0d0b',
    'https://images.unsplash.com/photo-1600047509697-5191f3e3a3c0',
    'https://images.unsplash.com/photo-1600047509334-4b8eacf019c8'
  ],
  'Cortijo': [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    'https://images.unsplash.com/photo-1600573472592-401b489a3cdc',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'
  ],
  'Apartment': [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'
  ]
};

// Function to get random images for a property
export function getRandomPropertyImages(propertyType: keyof typeof propertyImages, count: number = 3): string[] {
  const images = propertyImages[propertyType];
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(url => `${url}?w=800&auto=format&fit=crop&q=60`);
} 