import Image from 'next/image';
import Link from 'next/link';
import { TownGuideNav } from '@/components/buyers-guide/TownGuideNav';
import Sevilla from '@/assets/images/sevilla/vista-sevilla.jpg';
import Sevilla1 from '@/assets/images/sevilla/sevilla1.jpg';
import Sevilla2 from '@/assets/images/sevilla/sevilla2.jpg'; 
import Sevilla3 from '@/assets/images/sevilla/sevilla3.jpg'; 
import Sevilla4 from '@/assets/images/sevilla/sevilla4.jpg'; 
import Sevilla5 from '@/assets/images/sevilla/garbanzos-scaled.jpg'; 

export default function SevillaPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden bg-black">
          <Image src={Sevilla} alt="Cordoba Mezquita" fill className="object-cover mt-0 opacity-45" priority />
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
              <div className="mx-auto max-w-5xl px-5 text-center">
                  <h1 className="font-heading text-5xl font-bold text-white mb-2">Sevilla</h1>
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
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">About Sevilla</h2>
              <p className="text-base text-neutral-700">Sevilla province is a treasure trove of history, culture, and natural beauty. While famous for its capital city with 
              iconic landmarks like the Giralda and Plaza de España, the inland areas offer a different, more authentic experience.</p>
              <p className="text-base text-neutral-700">The province features picturesque white towns, rolling olive groves, and historical sites from various civilizations 
              that have called this region home, from the Romans and Moors to Renaissance and Baroque influences.</p>
            </div>
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla1}
                alt="Granada City View"
                
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla2}
                alt="Granada City View"
                
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Historic Towns</h2>
              <p className="text-base text-neutral-700">Inland Sevilla is home to charming historic towns like Osuna, Écija, Carmona, and Marchena, each with unique architecture and 
                rich heritage. Osuna's Renaissance palaces and Écija's Baroque church towers have earned it the nickname "City of Towers."</p>
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Natural Landscapes</h2>
              <p className="text-base text-neutral-700">The province boasts diverse natural landscapes, from the Sierra Norte Natural Park with its dense forests and granite formations, 
                to the fertile Guadalquivir Valley with endless fields of sunflowers, wheat, and olive groves.</p>
            </div>
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla3}
                alt="Granada City View"
                
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla5}
                alt="Granada City View"
                
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Culinary Traditions</h2>
              <p className="text-base text-neutral-700">Sevillian cuisine is a delight for food lovers, featuring specialties like gazpacho, spinach with chickpeas, and Iberian ham. 
                The inland areas are particularly renowned for olive oils, artisanal cheeses, and traditional sweets.</p>
            </div>
          </div>
        </section>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <h2 className="text-3xl font-semibold text-primary-900 mb-4">Festivals & Traditions</h2>
              <p className="text-base text-neutral-700">Inland Sevilla comes alive during its traditional festivals. Each town has its own unique celebration, from the elaborate 
                Holy Week processions to vibrant summer ferias, flamenco performances, and agricultural harvesting festivals.</p>
            </div>
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={Sevilla4}
                alt="Granada City View"
                
                className="rounded-lg object-cover w-full"
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
  )
} 