import Image from 'next/image'
import Link from 'next/link'

export default function SevillaPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12">
        <Image
          src="https://images.unsplash.com/photo-1554867662-0c6fae2a902e?auto=format&fit=crop&q=80"
          alt="Sevilla Landscape"
          fill
          className="object-cover rounded-xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-xl" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">Sevilla</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
            Discover the charm of Andalucia's cultural capital
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-lg leading-relaxed">
          Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE. 
          For Each town we have properties for sale, click on the town name to get all the information you need. 
          Luvinland will return you to us to view the properties for sale in the town selected.
        </p>
      </div>

      {/* Towns Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-primary-900 mb-8 flex items-center">
          <span className="w-10 h-1 bg-secondary-500 mr-4"></span>
          Towns in Sevilla Province
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Aguadulce', count: 4 },
            { name: 'Algamitas', count: 3 },
            { name: 'Arahal', count: 5 },
            { name: 'Badolatosa', count: 7 },
            { name: 'Casariche', count: 12 },
            { name: 'Coripe', count: 3 },
            { name: 'Écija', count: 8 },
            { name: 'El Coronil', count: 2 },
            { name: 'El Rubio', count: 4 },
            { name: 'El Saucejo', count: 6 },
            { name: 'Estepa', count: 10 },
            { name: 'Gilena', count: 5 },
            { name: 'Herrera', count: 9 },
            { name: 'La Lantejuela', count: 3 },
            { name: 'La Puebla de Cazalla', count: 7 },
            { name: 'La Roda de Andalucía', count: 5 },
            { name: 'Los Corrales', count: 4 },
            { name: 'Marchena', count: 6 },
            { name: 'Marinaleda', count: 2 },
            { name: 'Martín de la Jara', count: 5 },
            { name: 'Montellano', count: 4 },
            { name: 'Morón de la Frontera', count: 8 },
            { name: 'Osuna', count: 14 },
            { name: 'Pruna', count: 6 },
            { name: 'Villanueva de San Juan', count: 3 }
          ].map((town) => (
            <Link 
              key={town.name}
              href={`/properties?location=${encodeURIComponent(town.name)}`}
              className="block p-4 bg-white rounded-lg hover:bg-primary-50 border border-gray-100 hover:border-primary-200 transition-all group"
            >
              <div className="flex justify-between items-center">
                <span className="text-primary-900 font-medium group-hover:text-primary-700">{town.name}</span>
                <span className="px-2 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm font-medium">{town.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-primary-900 mb-8 flex items-center">
          <span className="w-10 h-1 bg-secondary-500 mr-4"></span>
          About Sevilla
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square relative rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1554867662-0c6fae2a902e?auto=format&fit=crop&q=80"
              alt="Sevilla Plaza de España"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-6 leading-relaxed">
              Sevilla province is a treasure trove of history, culture, and natural beauty. While famous for its capital city with 
              iconic landmarks like the Giralda and Plaza de España, the inland areas offer a different, more authentic experience.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              The province features picturesque white towns, rolling olive groves, and historical sites from various civilizations 
              that have called this region home, from the Romans and Moors to Renaissance and Baroque influences.
            </p>
            <Link 
              href="/about/sevilla" 
              className="inline-flex items-center text-primary-600 font-semibold group"
            >
              Learn more about Sevilla
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-primary-900 mb-8 flex items-center">
          <span className="w-10 h-1 bg-secondary-500 mr-4"></span>
          Discover Sevilla
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Historic Towns */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1559625482-19953f1d8451?auto=format&fit=crop&q=80"
                alt="Osuna Historical Center"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Historic Towns</h3>
              <p className="text-gray-700 mb-4">
                Inland Sevilla is home to charming historic towns like Osuna, Écija, Carmona, and Marchena, each with unique architecture and 
                rich heritage. Osuna's Renaissance palaces and Écija's Baroque church towers have earned it the nickname "City of Towers."
              </p>
              <Link href="/about/sevilla/historic-towns" className="text-primary-600 font-medium hover:text-primary-700">
                Explore historic towns →
              </Link>
            </div>
          </div>
          
          {/* Natural Landscapes */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1476990789491-712b869b91a5?auto=format&fit=crop&q=80"
                alt="Sevilla Countryside"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Natural Landscapes</h3>
              <p className="text-gray-700 mb-4">
                The province boasts diverse natural landscapes, from the Sierra Norte Natural Park with its dense forests and granite formations, 
                to the fertile Guadalquivir Valley with endless fields of sunflowers, wheat, and olive groves.
              </p>
              <Link href="/about/sevilla/natural-landscapes" className="text-primary-600 font-medium hover:text-primary-700">
                Discover natural beauty →
              </Link>
            </div>
          </div>
          
          {/* Culinary Traditions */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&q=80"
                alt="Andalucian Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Culinary Traditions</h3>
              <p className="text-gray-700 mb-4">
                Sevillian cuisine is a delight for food lovers, featuring specialties like gazpacho, spinach with chickpeas, and Iberian ham. 
                The inland areas are particularly renowned for olive oils, artisanal cheeses, and traditional sweets.
              </p>
              <Link href="/about/sevilla/cuisine" className="text-primary-600 font-medium hover:text-primary-700">
                Taste local flavors →
              </Link>
            </div>
          </div>
          
          {/* Festivals & Traditions */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1571390596201-5c1f748aea62?auto=format&fit=crop&q=80"
                alt="Sevilla Festival"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Festivals & Traditions</h3>
              <p className="text-gray-700 mb-4">
                Inland Sevilla comes alive during its traditional festivals. Each town has its own unique celebration, from the elaborate 
                Holy Week processions to vibrant summer ferias, flamenco performances, and agricultural harvesting festivals.
              </p>
              <Link href="/about/sevilla/festivals" className="text-primary-600 font-medium hover:text-primary-700">
                Experience local culture →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Buyers Guide */}
      <div className="bg-primary-50 rounded-xl p-8 mb-20">
        <h2 className="text-3xl font-bold text-primary-900 mb-6">Ready to find your dream home?</h2>
        <p className="text-lg text-primary-700 mb-8 max-w-3xl">
          Explore our comprehensive buyer's guide for everything you need to know about purchasing property in Sevilla and throughout Andalucia.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/buyers-guide/buying-property" className="flex items-center p-4 bg-white rounded-lg hover:bg-primary-100 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-primary-900 font-medium">Buying a Property</span>
          </Link>
          <Link href="/buyers-guide/buying-process" className="flex items-center p-4 bg-white rounded-lg hover:bg-primary-100 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-primary-900 font-medium">Buying Process</span>
          </Link>
          <Link href="/buyers-guide/property-taxes" className="flex items-center p-4 bg-white rounded-lg hover:bg-primary-100 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-primary-900 font-medium">Property Taxes</span>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-900 mb-4">Find Your Dream Home in Sevilla</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Explore our extensive property listings and find the perfect home in this beautiful region of Andalucia.
        </p>
        <Link
          href="/properties?province=Sevilla"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  )
} 