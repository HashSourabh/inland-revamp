import React from 'react';
import { SunIcon, CloudIcon, BeakerIcon } from '@heroicons/react/24/outline';

interface SeasonInfo {
  name: string;
  months: string;
  temperature: string;
  description: string;
  icon: React.ReactNode;
}

export default function WeatherPage() {
  const seasons: SeasonInfo[] = [
    {
      name: 'Summer',
      months: 'June - August',
      temperature: '25°C - 35°C',
      description: 'Hot and dry with very little rainfall. Perfect for outdoor activities in the morning and evening.',
      icon: <SunIcon className="h-8 w-8" />
    },
    {
      name: 'Autumn',
      months: 'September - November',
      temperature: '15°C - 25°C',
      description: 'Mild temperatures with occasional rainfall. Ideal for exploring the countryside.',
      icon: <CloudIcon className="h-8 w-8" />
    },
    {
      name: 'Winter',
      months: 'December - February',
      temperature: '8°C - 18°C',
      description: 'Cool temperatures with some rainfall. Snow is possible in mountainous areas.',
      icon: <CloudIcon className="h-8 w-8" />
    },
    {
      name: 'Spring',
      months: 'March - May',
      temperature: '15°C - 25°C',
      description: 'Pleasant temperatures with occasional rainfall. Perfect time to see wildflowers.',
      icon: <SunIcon className="h-8 w-8" />
    }
  ];

  const climateFeatures = [
    {
      title: 'Sunshine Hours',
      value: '3000+',
      description: 'Hours of sunshine per year',
      icon: <SunIcon className="h-6 w-6" />
    },
    {
      title: 'Annual Rainfall',
      value: '500-700mm',
      description: 'Average yearly precipitation',
      icon: <CloudIcon className="h-6 w-6" />
    },
    {
      title: 'Air Quality',
      value: 'Excellent',
      description: 'Clean mountain air inland',
      icon: <BeakerIcon className="h-6 w-6" />
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl">
          Weather in Andalucia
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700">
          Enjoy over 300 days of sunshine per year in one of Europe's most pleasant climates
        </p>
      </div>

      {/* Climate Features */}
      <div className="mb-16 grid gap-8 md:grid-cols-3">
        {climateFeatures.map((feature, index) => (
          <div key={index} className="rounded-xl bg-white p-6 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-neutral-900">{feature.title}</h3>
            <p className="mt-1 text-2xl font-bold text-primary-600">{feature.value}</p>
            <p className="mt-2 text-neutral-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Seasonal Information */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-8 font-heading text-2xl font-bold text-neutral-900">
          Seasonal Weather Guide
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {seasons.map((season, index) => (
            <div key={index} className="flex space-x-4 rounded-lg border border-neutral-200 p-6">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  {season.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">{season.name}</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Months:</span> {season.months}
                  </p>
                  <p className="text-sm text-neutral-600">
                    <span className="font-medium">Temperature:</span> {season.temperature}
                  </p>
                  <p className="text-sm text-neutral-700">{season.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16">
        <h2 className="mb-6 font-heading text-2xl font-bold text-neutral-900">
          Best Time to Visit
        </h2>
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <p className="text-neutral-700">
            The best time to visit Inland Andalucia is during spring (March to May) and autumn 
            (September to November) when temperatures are mild and comfortable. These seasons 
            offer perfect conditions for exploring the region's beautiful landscapes, historic 
            towns, and outdoor activities. Summer can be quite hot, especially in inland areas, 
            while winters are mild with occasional rainfall and snow in mountainous regions.
          </p>
        </div>
      </div>
    </div>
  );
} 