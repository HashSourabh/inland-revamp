import Image from 'next/image';
import Link from 'next/link';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';

export default function JaenPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="max-w-none">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
            <Image src="https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&q=80" alt="Cordoba Mezquita" fill className="object-cover mt-0 opacity-45" priority />
            <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <div className="mx-auto max-w-5xl px-5 text-center">
                    <h1 className="font-heading text-5xl font-bold text-white mb-2">Jaén</h1>
                </div>
            </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="col-span-3">
            <p className="text-base mb-8 text-neutral-700">
              Inland Andalucia is collaborating with LuvInland.com to give you the best level of Information about Andalucia and its LIFESTYLE. 
              For Each town we have properties for sale, click on the town name to get all the information you need. 
              Luvinland will return you to us to view the properties for sale in the town selected.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">About Jaén</h2>
                    <p className="text-base text-neutral-700">Jaén province is known as the world's capital of olive oil, with endless olive groves covering its rolling hills and valleys. This beautiful inland region is home to Renaissance cities, medieval castles, and natural parks.</p>
                    <p className="text-base text-neutral-700">The province offers an authentic Spanish lifestyle away from the coastal tourist areas, with a rich cultural heritage and stunning natural landscapes such as the Sierra de Cazorla, Segura y Las Villas Natural Park.</p>
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
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Olive Oil Heritage</h2>
                    <p className="text-base text-neutral-700">Jaén produces more olive oil than any other region in the world. The vast sea of olive trees covering the landscape is not just economically important but also shapes the culture and gastronomy of the area.</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Renaissance Heritage</h2>
                    <p className="text-base text-neutral-700">The twin cities of Úbeda and Baeza are UNESCO World Heritage sites, known for their remarkable Renaissance architecture. These historic centers showcase palaces, churches, and plazas built during Spain's Golden Age.</p>
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
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Parks</h2>
                    <p className="text-base text-neutral-700">The Sierra de Cazorla, Segura y Las Villas Natural Park is Spain's largest protected area, offering breathtaking mountain scenery, dense forests, rivers, and diverse wildlife including deer and wild boar.</p>
                  </div>
                </div>
              </section>
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h2 className="text-3xl font-semibold text-primary-900 mb-4">Gastronomy</h2>
                    <p className="text-base text-neutral-700">Jaén's cuisine is centered around olive oil, with traditional dishes like pipirrana (vegetable salad), andrajos (stew with flat noodles), and ochíos (aniseed bread) offering authentic flavors of inland Andalucia.</p>
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
            <TownGuideNav/>
          </div>
        </div>
      </div>
      

      

      

      

      

      

      {/* CTA */}
      {/*<div className="text-center">
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
      </div>*/}
    </div>
  )
} 