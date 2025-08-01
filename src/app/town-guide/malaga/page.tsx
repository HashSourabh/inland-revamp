import Image from 'next/image';
import Link from 'next/link';

export default function MalagaPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
          <Image src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80" alt="Cordoba Mezquita" fill className="object-cover mt-0 opacity-45" priority />
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
              <div className="mx-auto max-w-5xl px-5 text-center">
                  <h1 className="font-heading text-5xl font-bold text-white mb-2">Málaga</h1>
              </div>
          </div>
      </div>
      
      {/* Introduction */}
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div className="col-span-3">
          <p className="text-base mb-8 text-neutral-700">
            Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE. 
            For Each town we have properties for sale, click on the town name to get all the information you need. 
            Luvinland will return you to us to view the properties for sale in the town selected.
          </p>
          {/* Towns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-primary-900 font-medium">{town.name}</span>
                    <span className="text-secondary-600">{town.count} properties</span>
                  </div>
                </Link>
              ))}
            </div>

          {/* About Section */}
          <div className="space-y-6">
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">About Málaga</h2>
                  <p className="text-base text-neutral-700">Málaga Province is located in the southern part of Andalucia, along the Mediterranean coast. It's known for its beautiful beaches, stunning mountain ranges, and rich cultural heritage.</p>
                  <p className="text-base text-neutral-700">The province offers a perfect blend of coastal and inland living, with the Sierra de las Nieves Natural Park and the famous El Torcal de Antequera providing spectacular natural landscapes.</p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                    alt="Granada City View"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                    alt="Granada City View"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Beauty</h2>
                  <p className="text-base text-neutral-700">The province boasts diverse natural landscapes, from the dramatic limestone formations of El Torcal de Antequera to the pristine beaches of the Costa del Sol. The Sierra de las Nieves Natural Park is a UNESCO Biosphere Reserve.</p>
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Cultural Heritage</h2>
                  <p className="text-base text-neutral-700">Málaga's cultural heritage spans thousands of years. The city of Málaga features the impressive Alcazaba fortress and Roman Theatre. Antequera is known for its dolmens, prehistoric burial mounds that are UNESCO World Heritage sites.</p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                    alt="Granada City View"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                    alt="Granada City View"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Local Cuisine</h2>
                  <p className="text-base text-neutral-700">Málaga's cuisine reflects its coastal and inland influences. Fresh seafood, particularly fried fish (pescaíto frito), is a local specialty. The province is also known for its sweet wines, particularly Málaga wine.</p>
                </div>
              </div>
            </section>
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h2 className="text-3xl font-semibold text-primary-900 mb-4">Festivals & Events</h2>
                  <p className="text-base text-neutral-700">The province hosts numerous festivals throughout the year. The Málaga Film Festival attracts international attention, while the Feria de Málaga in August is one of the biggest celebrations in Andalucia.</p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                    alt="Granada City View"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
        <div>
          <div className="flex flex-col bg-white rounded-xl border border-black/10 p-3 sticky top-[120px] mb-6">
            <div className="p-2.5 border-b border-black/10 mb-4">
                <h2 className="text-2xl font-semibold text-primary-900">Related Links</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 p-2.5">
                <Link href="/buyers-guide/buying-property" className="text-primary-600 hover:text-primary-800">
                Buying a Property
                </Link>
                <Link href="/buyers-guide/buying-process" className="text-primary-600 hover:text-primary-800">
                Buying Process
                </Link>
                <Link href="/buyers-guide/property-taxes" className="text-primary-600 hover:text-primary-800">
                Property Taxes
                </Link>
                <Link href="/buyers-guide/faqs" className="text-primary-600 hover:text-primary-800">
                FAQs
                </Link>
                <Link href="/buyers-guide/unpaid-taxes" className="text-primary-600 hover:text-primary-800">
                Unpaid Taxes
                </Link>
                <Link href="/buyers-guide/mortgage" className="text-primary-600 hover:text-primary-800">
                Mortgage
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};