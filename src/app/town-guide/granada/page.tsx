import Image from 'next/image'
import Link from 'next/link'

export default function GranadaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary-900 mb-8">Granada</h1>
      
      <div className="prose max-w-none">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
            alt="Granada Alhambra"
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="text-lg mb-6">
          Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE. 
          For Each town we have properties for sale, click on the town name to get all the information you need. 
          Luvinland will return you to us to view the properties for sale in the town selected.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { name: 'Agron', count: 2 },
            { name: 'Algarinejo', count: 7 },
            { name: 'Baza', count: 1 },
            { name: 'Benalua de las Villas', count: 2 },
            { name: 'Cacin', count: 1 },
            { name: 'Cajar', count: 1 },
            { name: 'Campotejar', count: 1 },
            { name: 'Colomera', count: 1 },
            { name: 'Durcal', count: 1 },
            { name: 'El Valle', count: 1 },
            { name: 'Granada (city)', count: 1 },
            { name: 'Illora', count: 3 },
            { name: 'Itrabo', count: 3 },
            { name: 'Jatar', count: 2 },
            { name: 'Las Casillas de Gumiel', count: 1 },
            { name: 'Loja', count: 16 },
            { name: 'Moclin', count: 4 },
            { name: 'Molvizar', count: 6 },
            { name: 'Montefrio', count: 12 },
            { name: 'Montillana', count: 1 },
            { name: 'Moraleda de Zafayona', count: 1 },
            { name: 'Nevada', count: 1 },
            { name: 'Puerto Lope', count: 6 },
            { name: 'Salar', count: 1 },
            { name: 'Tozar', count: 11 },
            { name: 'Velez de Benaudalla', count: 1 },
            { name: 'Ventorros de San Jose', count: 1 },
            { name: 'Zafarraya', count: 1 },
            { name: 'Zagra', count: 1 }
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

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">About Granada</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <p>
                GRANADA Province is situated in the eastern part of the autonomous region of Andalucia, is bordered by the provinces of Málaga, 
                Córdoba, Jaén, Albacete, Murcia, Almería and stretches down to the Mediterranean sea. It's total area is 12,635km2 and contains 
                168 municipalities.
              </p>
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
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Natural Beauty</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                  alt="Sierra Nevada Mountains"
                  fill
                  className="object-cover"
                />
              </div>
              <p>
                Granada province boasts the tallest mountain in continental Spain, Mulhacén, at 3,481 metres as well as the Sierra Nevada mountain 
                range (the most southerly ski resort in Europe). During the winter months, tourists flock to the Sierra Nevada for the skiing and 
                mountain climbing, but Granada city is popular the year round for its Moorish architecture and the famous Alhambra, with its palaces 
                and gardens. Not forgetting the cave dwellings dotted about the Sacromonte hill to the north of the city which was once the home of 
                Granada's large gypsy community.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Cultural Heritage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <p>
                The hill facing the Alhambra is called the Albaicin and if you wind your way up through the narrow streets, past all the whitewashed 
                houses, you will reach the highest point with amazing views of the Alhambra and the many differing landscapes of Granada province.
              </p>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                  alt="Albaicin District"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary-900 mb-4">Outdoor Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80"
                  alt="Outdoor Activities in Granada"
                  fill
                  className="object-cover"
                />
              </div>
              <p>
                The province offers numerous opportunities for outdoor activities. The Rio Genil is famous for its trout fishing, and the Sierra Nevada 
                provides excellent hiking and climbing opportunities. The Alpujarras region is particularly popular for walking holidays, with its 
                network of ancient paths connecting the white villages.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-primary-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-primary-900 mb-4">Related Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  )
} 