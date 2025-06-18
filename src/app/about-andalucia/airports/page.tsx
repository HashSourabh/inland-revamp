import React from 'react';
import { PaperAirplaneIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Airport {
  name: string;
  code: string;
  location: string;
  distance: string;
  driveTime: string;
  description: string;
  airlines: string[];
}

export default function AirportsPage() {
  const airports: Airport[] = [
    {
      name: 'Málaga Airport',
      code: 'AGP',
      location: 'Málaga',
      distance: '60km from Antequera',
      driveTime: '45 minutes',
      description: 'The main international airport serving the Costa del Sol and inland Andalucia. Offers flights to major European cities year-round.',
      airlines: ['Ryanair', 'EasyJet', 'British Airways', 'Vueling', 'Lufthansa']
    },
    {
      name: 'Granada Airport',
      code: 'GRX',
      location: 'Granada',
      distance: '90km from Antequera',
      driveTime: '1 hour',
      description: 'Convenient for accessing the eastern parts of inland Andalucia. Regular flights to Madrid and Barcelona.',
      airlines: ['Iberia', 'Vueling', 'Air Europa']
    },
    {
      name: 'Sevilla Airport',
      code: 'SVQ',
      location: 'Sevilla',
      distance: '160km from Antequera',
      driveTime: '1 hour 45 minutes',
      description: 'Major airport serving western Andalucia with connections to European capitals.',
      airlines: ['Ryanair', 'Vueling', 'Air Europa', 'Iberia']
    }
  ];

  const transportOptions = [
    {
      title: 'Car Rental',
      description: 'All major car rental companies are available at each airport',
      icon: <MapPinIcon className="h-6 w-6" />
    },
    {
      title: 'Transfer Service',
      description: 'We can arrange private transfers to your property',
      icon: <PaperAirplaneIcon className="h-6 w-6" />
    },
    {
      title: 'Public Transport',
      description: 'Bus and train connections available from major airports',
      icon: <ClockIcon className="h-6 w-6" />
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
          Airports in Andalucia
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
          Easy access to Inland Andalucia through multiple international airports
        </p>
      </div>

      {/* Airports Grid */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {airports.map((airport, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">{airport.name}</h2>
              <span className="rounded-md bg-primary-100 px-2 py-1 text-sm font-medium text-primary-700">
                {airport.code}
              </span>
            </div>
            
            <div className="mb-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-neutral-600">
                <MapPinIcon className="h-4 w-4" />
                <span>{airport.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-600">
                <PaperAirplaneIcon className="h-4 w-4" />
                <span>{airport.distance}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-neutral-600">
                <ClockIcon className="h-4 w-4" />
                <span>Drive time: {airport.driveTime}</span>
              </div>
            </div>

            <p className="mb-4 text-neutral-700">{airport.description}</p>

            <div>
              <h3 className="mb-2 font-medium text-neutral-900">Major Airlines:</h3>
              <div className="flex flex-wrap gap-2">
                {airport.airlines.map((airline, airlineIndex) => (
                  <span
                    key={airlineIndex}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                  >
                    {airline}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transport Options */}
      <div>
        <h2 className="mb-8 font-heading text-2xl font-bold text-neutral-900">
          Transport Options
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {transportOptions.map((option, index) => (
            <div key={index} className="rounded-xl bg-white p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                {option.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                {option.title}
              </h3>
              <p className="text-neutral-600">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 