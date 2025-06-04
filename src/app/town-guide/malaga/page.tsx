import Image from 'next/image'
import Link from 'next/link'

export default function MalagaPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12">
        <Image
          src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
          alt="Málaga Landscape"
          fill
          className="object-cover rounded-xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-xl" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">Málaga</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
            Discover charming properties in one of Andalucia's most vibrant provinces
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
          Towns in Málaga Province
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Alameda', count: 12 },
            { name: 'Alhaurin de la Torre', count: 15 },
            { name: 'Alhaurin el Grande', count: 8 },
            { name: 'Alora', count: 7 },
            { name: 'Antequera', count: 27 },
            { name: 'Archidona', count: 15 },
            { name: 'Ardales', count: 9 },
            { name: 'Campillos', count: 4 },
            { name: 'Cartama', count: 6 },
            { name: 'Casarabonela', count: 3 },
            { name: 'Coin', count: 11 },
            { name: 'El Burgo', count: 2 },
            { name: 'Fuente de Piedra', count: 5 },
            { name: 'Humilladero', count: 3 },
            { name: 'Mollina', count: 19 },
            { name: 'Ronda', count: 14 },
            { name: 'Teba', count: 4 },
            { name: 'Yunquera', count: 2 }
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
          About Málaga
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square relative rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
              alt="Málaga City View"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-6 leading-relaxed">
              Málaga Province is located in the southern part of Andalucia, along the Mediterranean coast. It's known for its beautiful 
              beaches, stunning mountain ranges, and rich cultural heritage.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              The province offers a perfect blend of coastal and inland living, with the Sierra de las Nieves Natural Park and the famous 
              El Torcal de Antequera providing spectacular natural landscapes.
            </p>
            <Link 
              href="/about/malaga" 
              className="inline-flex items-center text-primary-600 font-semibold group"
            >
              Learn more about Málaga
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
          Discover Málaga
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Natural Beauty */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
                alt="El Torcal de Antequera"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Natural Beauty</h3>
              <p className="text-gray-700 mb-4">
                The province boasts diverse natural landscapes, from the dramatic limestone formations of El Torcal de Antequera to the 
                pristine beaches of the Costa del Sol. The Sierra de las Nieves Natural Park is a UNESCO Biosphere Reserve.
              </p>
              <Link href="/about/malaga/nature" className="text-primary-600 font-medium hover:text-primary-700">
                Explore natural landscapes →
              </Link>
            </div>
          </div>
          
          {/* Cultural Heritage */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
                alt="Antequera Dolmens"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Cultural Heritage</h3>
              <p className="text-gray-700 mb-4">
                Málaga's cultural heritage spans thousands of years. The city of Málaga features the impressive Alcazaba fortress and 
                Roman Theatre. Antequera is known for its dolmens, prehistoric burial mounds that are UNESCO World Heritage sites.
              </p>
              <Link href="/about/malaga/culture" className="text-primary-600 font-medium hover:text-primary-700">
                Discover cultural sites →
              </Link>
            </div>
          </div>
          
          {/* Local Cuisine */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
                alt="Málaga Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Local Cuisine</h3>
              <p className="text-gray-700 mb-4">
                Málaga's cuisine reflects its coastal and inland influences. Fresh seafood, particularly fried fish (pescaíto frito), 
                is a local specialty. The province is also known for its sweet wines, particularly Málaga wine.
              </p>
              <Link href="/about/malaga/cuisine" className="text-primary-600 font-medium hover:text-primary-700">
                Taste local flavors →
              </Link>
            </div>
          </div>
          
          {/* Festivals & Events */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80"
                alt="Málaga Festivals"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Festivals & Events</h3>
              <p className="text-gray-700 mb-4">
                The province hosts numerous festivals throughout the year. The Málaga Film Festival attracts international attention, 
                while the Feria de Málaga in August is one of the biggest celebrations in Andalucia.
              </p>
              <Link href="/about/malaga/festivals" className="text-primary-600 font-medium hover:text-primary-700">
                Experience local events →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Buyers Guide */}
      <div className="bg-primary-50 rounded-xl p-8 mb-20">
        <h2 className="text-3xl font-bold text-primary-900 mb-6">Ready to find your dream home?</h2>
        <p className="text-lg text-primary-700 mb-8 max-w-3xl">
          Explore our comprehensive buyer's guide for everything you need to know about purchasing property in Málaga and throughout Andalucia.
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
          <Link href="/buyers-guide/faqs" className="flex items-center p-4 bg-white rounded-lg hover:bg-primary-100 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-primary-900 font-medium">FAQs</span>
          </Link>
          <Link href="/buyers-guide/unpaid-taxes" className="flex items-center p-4 bg-white rounded-lg hover:bg-primary-100 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-primary-900 font-medium">Unpaid Taxes</span>
          </Link>
          <Link href="/buyers-guide/mortgage" className="flex items-center p-4 bg-white rounded-lg hover:bg-primary-100 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-primary-900 font-medium">Mortgage</span>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-900 mb-4">Find Your Dream Home in Málaga</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Explore our extensive property listings and find the perfect home in this beautiful region of Andalucia.
        </p>
        <Link
          href="/properties?province=Malaga"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  )
} 