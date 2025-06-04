import Image from 'next/image'
import Link from 'next/link'

export default function JaenPage() {
  return (
    <div className="container mx-auto px-4 pb-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-12">
        <Image
          src="https://multimedia.andalucia.org/destination/photo_407.jpg"
          alt="Jaén Landscape"
          fill
          className="object-cover rounded-xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-xl" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">Jaén</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
            Explore the land of olive groves and historic castles
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
          Towns in Jaén Province
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { name: 'Alcala la Real', count: 14 },
            { name: 'Alcaudete', count: 5 },
            { name: 'Andujar', count: 3 },
            { name: 'Arjona', count: 2 },
            { name: 'Baeza', count: 6 },
            { name: 'Bailen', count: 2 },
            { name: 'Castillo de Locubin', count: 8 },
            { name: 'Frailes', count: 10 },
            { name: 'Jaén', count: 7 },
            { name: 'Linares', count: 3 },
            { name: 'Martos', count: 8 },
            { name: 'Sabiote', count: 5 },
            { name: 'Ubeda', count: 6 },
            { name: 'Valdepeñas de Jaén', count: 3 }
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
          About Jaén
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square relative rounded-xl overflow-hidden">
            <Image
              src="https://content.r9cdn.net/rimg/dimg/5b/26/ad27f889-city-7473-175407ac6a6.jpg?width=1366&height=768&xhint=1818&yhint=1367&crop=true&watermarkposition=lowerright"
              alt="Jaén Olive Groves"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg mb-6 leading-relaxed">
              Jaén province is known as the world's capital of olive oil, with endless olive groves covering its rolling hills and valleys. 
              This beautiful inland region is home to Renaissance cities, medieval castles, and natural parks.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              The province offers an authentic Spanish lifestyle away from the coastal tourist areas, with a rich cultural heritage and 
              stunning natural landscapes such as the Sierra de Cazorla, Segura y Las Villas Natural Park.
            </p>
            <Link 
              href="/about/jaen" 
              className="inline-flex items-center text-primary-600 font-semibold group"
            >
              Learn more about Jaén
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
          Discover Jaén
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Olive Oil Heritage */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://guias-viajar.com/wp-content/uploads/2018/12/Viaje-en-Globo-95-2.jpg"
                alt="Olive Oil Production"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Olive Oil Heritage</h3>
              <p className="text-gray-700 mb-4">
                Jaén produces more olive oil than any other region in the world. The vast sea of olive trees covering the 
                landscape is not just economically important but also shapes the culture and gastronomy of the area.
              </p>
              <Link href="/about/jaen/olive-oil" className="text-primary-600 font-medium hover:text-primary-700">
                Explore olive oil culture →
              </Link>
            </div>
          </div>
          
          {/* Renaissance Heritage */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://tomaandcoe.com/wp-content/uploads/Baeza-San-Salvador-church.webp"
                alt="Úbeda and Baeza"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Renaissance Heritage</h3>
              <p className="text-gray-700 mb-4">
                The twin cities of Úbeda and Baeza are UNESCO World Heritage sites, known for their remarkable Renaissance 
                architecture. These historic centers showcase palaces, churches, and plazas built during Spain's Golden Age.
              </p>
              <Link href="/about/jaen/renaissance" className="text-primary-600 font-medium hover:text-primary-700">
                Discover architectural treasures →
              </Link>
            </div>
          </div>
          
          {/* Natural Parks */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1470137430626-983a37b8ea46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Sierra de Cazorla"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Natural Parks</h3>
              <p className="text-gray-700 mb-4">
                The Sierra de Cazorla, Segura y Las Villas Natural Park is Spain's largest protected area, offering 
                breathtaking mountain scenery, dense forests, rivers, and diverse wildlife including deer and wild boar.
              </p>
              <Link href="/about/jaen/natural-parks" className="text-primary-600 font-medium hover:text-primary-700">
                Explore natural wonders →
              </Link>
            </div>
          </div>
          
          {/* Gastronomy */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative">
              <Image
                src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Jaén Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary-900 mb-3">Gastronomy</h3>
              <p className="text-gray-700 mb-4">
                Jaén's cuisine is centered around olive oil, with traditional dishes like pipirrana (vegetable salad), 
                andrajos (stew with flat noodles), and ochíos (aniseed bread) offering authentic flavors of inland Andalucia.
              </p>
              <Link href="/about/jaen/gastronomy" className="text-primary-600 font-medium hover:text-primary-700">
                Taste local flavors →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Buyers Guide */}
      <div className="bg-primary-50 rounded-xl p-8 mb-20">
        <h2 className="text-3xl font-bold text-primary-900 mb-6">Ready to find your dream home?</h2>
        <p className="text-lg text-primary-700 mb-8 max-w-3xl">
          Explore our comprehensive buyer's guide for everything you need to know about purchasing property in Jaén and throughout Andalucia.
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
        <h2 className="text-3xl font-bold text-primary-900 mb-4">Find Your Dream Home in Jaén</h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Explore our extensive property listings and find the perfect home in this beautiful region of Andalucia.
        </p>
        <Link
          href="/properties?province=Jaen"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    </div>
  )
} 