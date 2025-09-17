// utils/mapUtils.ts

// Area coordinates mapping
export const areaCoordinates: Record<string, { lat: number; lng: number }> = {
    // Cordoba Province
    'Almedinilla': { lat: 37.4417, lng: -4.0917 },
    'Baena': { lat: 37.6167, lng: -4.3167 },
    'Benameji': { lat: 37.2667, lng: -4.5667 },
    'Cabra': { lat: 37.4722, lng: -4.4422 },
    'Carcabuey': { lat: 37.4461, lng: -4.2778 },
    'Cordoba (city)': { lat: 37.4461, lng: -4.2778 },
    'Encinas Reales': { lat: 37.2667, lng: -4.5333 },
    'Espejo': { lat: 37.2667, lng: -4.5333 },
    'Fuente Carreteros': { lat: 37.2667, lng: -4.5333 },
    'Fuente Obejuna': { lat: 37.4492, lng: -4.0917 },
    'Fuente-Tojar': { lat: 37.4492, lng: -4.0917 },
    'Iznajar': { lat: 37.2572, lng: -4.3081 },
    'Jauja': { lat: 37.2572, lng: -4.3081 },
    'La Carlota': { lat: 37.6708, lng: -4.9281 },
    'La Guijarrosa': { lat: 37.6167, lng: -4.8167 },
    'La Rambla': { lat: 37.6167, lng: -4.8167 },
    'Los Juncares': { lat: 37.6167, lng: -4.8167 },
    'Lucena': { lat: 37.4089, lng: -4.4853 },
    'Luque': { lat: 37.5572, lng: -4.2778 },
    'Almodovar Del Rio': { lat: 37.8125, lng: -5.0194 },
    'Castro Del Rio': { lat: 37.6961, lng: -4.4806 },
    'Montilla': { lat: 37.5861, lng: -4.6389 },
    'Montoro': { lat: 38.0222, lng: -4.3833 },
    'Monturque': { lat: 37.5333, lng: -4.6333 },
    'Priego de Cordoba': { lat: 37.4386, lng: -4.1956 },
    'Puente Genil': { lat: 37.3897, lng: -4.7667 },
    'Rute': { lat: 37.3222, lng: -4.3639 },
    'Santaella': { lat: 37.6167, lng: -4.8500 },
    'Valenzuela': { lat: 37.7667, lng: -4.2833 },
    'Zuheros': { lat: 37.5431, lng: -4.3156 },
  
    // Granada Province
    'Agron': { lat: 37.0176, lng: -3.8012 },
    'Algarinejo': { lat: 37.3227, lng: -4.1297 },
    'Alhama de Granada': { lat: 37.0089, lng: -3.9906 },
    'Atarfe': { lat: 37.2204, lng: -3.6852 },
    'Benalua de las Villas': { lat: 37.5095, lng: -3.7537 },
    'Campotejar': { lat: 37.5212, lng: -3.6909 },
    'Huetor Tajar': { lat: 37.1961, lng: -4.0461 },
    'Illora': { lat: 37.2888, lng: -3.8813 },
    'Las Casillas de Gumiel': { lat: 37.4181, lng: -3.9789 },
    'Loja': { lat: 37.1681, lng: -4.1511 },
    'Moclin': { lat: 37.3852, lng: -3.7877 },
    'Montefrio': { lat: 37.3206, lng: -4.0117 },
    'Montillana': { lat: 37.4943, lng: -3.7534 },
    'Moraleda de Zafayona': { lat: 37.1494, lng: -3.9944 },
    'Nevada National Parc': { lat: 37.0500, lng: -3.3500 },
    'Otura': { lat: 37.0945, lng: -3.6503 },
    'Puerto Lope': { lat: 37.3858, lng: -3.8967 },
    'Tozar': { lat: 37.3628, lng: -3.9115 },
    'Ventorros de San Jose': { lat: 37.2590, lng: -4.1201 },
    'Villanueva de las Torres': { lat: 37.5833, lng: -3.0167 },
    'Zagra': { lat: 37.2977, lng: -4.1938 },
  
    // Jaen Province
    'Alcala la Real': { lat: 37.4600, lng: -3.9231 },
    'Alcaudete': { lat: 37.5830, lng: -4.1000 },
    'Baeza': { lat: 37.9967, lng: -3.4676 },
    'Bobadilla de Alcaudete': { lat: 37.6611, lng: -4.1055 },
    'Cambil': { lat: 37.6670, lng: -3.5670 },
    'Carchelejo': { lat: 37.6353, lng: -3.6404 },
    'Castillo de Locubin': { lat: 37.5167, lng: -3.9333 },
    'Charilla': { lat: 37.4871, lng: -3.8910 },
    'Ermita Nueva': { lat: 37.4740, lng: -3.8982 },
    'Frailes': { lat: 37.5167, lng: -3.8167 },
    'Fuensanta de Martos': { lat: 37.6478, lng: -3.9060 },
    'Fuente Alamo': { lat: 37.7205, lng: -3.9955 },
    'Huelma': { lat: 37.6484, lng: -3.4505 },
    'Jaen (city)': { lat: 37.7692, lng: -3.7903 },
    'La Carrasca': { lat: 37.5100, lng: -3.8600 },
    'La Pedriza': { lat: 37.4980, lng: -3.8750 },
    'La Rabita': { lat: 37.5380, lng: -3.9600 },
    'Las Casillas': { lat: 37.6300, lng: -4.0100 },
    'Martos': { lat: 37.7211, lng: -3.9722 },
    'Mengibar': { lat: 37.9683, lng: -3.8088 },
    'Monte Lope Alvarez': { lat: 37.7032, lng: -4.1137 },
    'Mures': { lat: 37.4805, lng: -3.9522 },
    'Noguerones': { lat: 37.5466, lng: -4.0644 },
    'Pegalajar': { lat: 37.7111, lng: -3.6816 },
    'Porcuna': { lat: 37.8709, lng: -4.1847 },
    'Sabariego': { lat: 37.5750, lng: -4.0150 },
    'San Jose de La Rabita': { lat: 37.5300, lng: -3.9480 },
    'Santiago de Calatrava': { lat: 37.8333, lng: -4.1167 },
    'Torredonjimeno': { lat: 37.7658, lng: -3.9574 },
    'Valdepenas de Jaen': { lat: 37.5167, lng: -3.8500 },
    'Villardompardo': { lat: 37.8374, lng: -4.0005 },
  
    // Malaga Province
    'Alameda': { lat: 37.2095, lng: -4.6603 },
    'Alcaucin': { lat: 36.9030, lng: -4.1141 },
    'Campillos': { lat: 37.0492, lng: -4.8625 },
    'Coin': { lat: 36.6597, lng: -4.7569 },
    'Mijas': { lat: 36.5968, lng: -4.6373 },
    'Arroyo de la Miel': { lat: 36.6033, lng: -4.5424 },
    'Antequera': { lat: 37.0194, lng: -4.5612 },
    'Archidona': { lat: 37.0961, lng: -4.3889 },
    'Villanueva del Rosario': { lat: 37.0089, lng: -4.3636 },
    'Villanueva de Tapia': { lat: 37.1833, lng: -4.3333 },
    'Ronda': { lat: 36.7400, lng: -5.1700 },
    'Torrox': { lat: 36.7200, lng: -3.9200 },
    'Frigiliana': { lat: 36.7800, lng: -3.8800 },
  
    // Sevilla Province
    'Aguadulce': { lat: 37.2528, lng: -4.9911 },
    'Arahal': { lat: 37.2627, lng: -5.5453 },
    'Écija': { lat: 37.5415, lng: -5.0827 },
    'Estepa': { lat: 37.2922, lng: -4.8781 },
    'Osuna': { lat: 37.2375, lng: -5.1031 },
    'La Roda de Andalucia': { lat: 37.2000, lng: -4.7833 },
    'Utrera': { lat: 37.1800, lng: -5.7800 },
    'Marchena': { lat: 37.3100, lng: -5.0600 },
  
    // Cadiz Province
    'Arcos de la Frontera': { lat: 36.7500, lng: -5.8167 },
    'Olvera': { lat: 36.9333, lng: -5.2667 },
    'Villamartin': { lat: 36.8667, lng: -5.6333 },
  
    // Almeria Province
    'Almeria (city)': { lat: 36.8381, lng: -2.4597 },
  
    // Default fallback
    'default': { lat: 37.5, lng: -4.5 },
  };
  
  // Province color mapping
  export const provinceColors: Record<string, { bg: string; hover: string; hex: string }> = {
    'ALL': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#6B7280' },
    'Malaga': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#3B82F6' },
    'Cordoba': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#22C55E' },
    'Granada': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#EF4444' },
    'Sevilla': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#F59E0B' },
    'Jaen': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#8B5CF6' },
    'Cadiz': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#06B6D4' },
    'Huelva': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#84CC16' },
    'Almeria': { bg: 'bg-neutral-500', hover: 'hover:bg-primary-600', hex: '#EC4899' },
  };
  
  // Area images
  export const areaImages: Record<string, string> = {
    // Malaga Province
    'Antequera': '/images/areas/antequera.jpg',
    'Archidona': '/images/areas/archidona.jpg',
    'Campillos': '/images/areas/campillos.jpg',
    'Coin': '/images/areas/coin.jpg',
    'Villanueva del Rosario': '/images/areas/villanueva-del-rosario.jpg',
    'Villanueva de Tapia': '/images/areas/villanueva-de-tapia.jpg',
  
    // Cordoba Province
    'Almedinilla': '/images/areas/almedinilla.jpg',
    'Almodovar Del Rio': '/images/areas/almodovar-del-rio.jpg',
    'Baena': '/images/areas/baena.jpg',
    'Benameji': '/images/areas/benameji.jpg',
    'Cabra': '/images/areas/cabra.jpg',
    'Carcabuey': '/images/areas/carcabuey.jpg',
    'Castro Del Rio': '/images/areas/castro-del-rio.jpg',
    'Encinas Reales': '/images/areas/encinas-reales.jpg',
    'Fuente-Tojar': '/images/areas/fuente-tojar.jpg',
    'Iznajar': '/images/areas/iznajar.jpg',
    'La Carlota': '/images/areas/la-carlota.jpg',
    'La Guijarrosa': '/images/areas/la-guijarrosa.jpg',
    'Lucena': '/images/areas/lucena.jpg',
    'Luque': '/images/areas/luque.jpg',
    'Montilla': '/images/areas/montilla.jpg',
    'Montoro': '/images/areas/montoro.jpg',
    'Monturque': '/images/areas/monturque.jpg',
    'Priego de Cordoba': '/images/areas/priego-de-cordoba.jpg',
    'Puente Genil': '/images/areas/puente-genil.jpg',
    'Rute': '/images/areas/rute.jpg',
    'Santaella': '/images/areas/santaella.jpg',
    'Valenzuela': '/images/areas/valenzuela.jpg',
    'Zuheros': '/images/areas/zuheros.jpg',
  
    // Granada Province
    'Alhama de Granada': '/images/areas/alhama-de-granada.jpg',
    'Loja': '/images/areas/loja.jpg',
    'Montefrio': '/images/areas/montefrio.jpg',
  
    // Jaen Province
    'Alcala la Real': '/images/areas/alcala-la-real.jpg',
    'Alcaudete': '/images/areas/alcaudete.jpg',
    'Castillo de Locubin': '/images/areas/castillo-de-locubin.jpg',
    'Frailes': '/images/areas/frailes.jpg',
    'Martos': '/images/areas/martos.jpg',
  
    // Sevilla Province
    'Estepa': '/images/areas/estepa.jpg',
    'Osuna': '/images/areas/osuna.jpg',
    'La Roda de Andalucia': '/images/areas/la-roda-de-andalucia.jpg',
  
    // Cadiz Province
    'Arcos de la Frontera': '/images/areas/arcos-de-la-frontera.jpg',
    'Olvera': '/images/areas/olvera.jpg',
    'Villamartin': '/images/areas/villamartin.jpg',
  
    // Default fallback image
    'default': '/images/areas/default.jpg'
  };
  
  // Custom marker generator
  export function getIAMarkerIcon(province: string) {
    const color = provinceColors[province]?.hex || '#FFD600';
    const svg = `
      <svg width="44" height="54" viewBox="0 0 44 54" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="0" y="0" width="44" height="54" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.18"/>
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <path d="M22 2C11.1 2 2 11.1 2 22.5C2 36.5 22 52 22 52C22 52 42 36.5 42 22.5C42 11.1 32.9 2 22 2Z" fill="${color}" stroke="#FFFFFF" stroke-width="2"/>
          <text x="50%" y="52%" text-anchor="middle" fill="#FFFFFF" font-size="16" font-family="Arial" font-weight="bold" dy=".3em">IA</text>
        </g>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }