import React from 'react';
import {
  HomeModernIcon,
  BeakerIcon,
  EyeIcon,
  BuildingOfficeIcon,
  MapIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface FeaturesCardProps {
  beds: number | string;
  baths: number | string;
  views: string;
  built: number | string;
  plot: string;
  location?: string | null;
}

export default function FeaturesCard({
  beds,
  baths,
  views,
  built,
  plot,
  location,
}: FeaturesCardProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 bg-white p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg ">

      {(beds !== undefined && beds !== null) && (<div className="flex items-start gap-2">
        <HomeModernIcon className="h-5 w-5 text-primary-600" />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Beds</p>
          <p className="font-semibold">{beds}</p>
        </div>
      </div>)}
      {(baths !== undefined && baths !== null) && (<div className="flex items-start gap-2">
        <BeakerIcon className="h-5 w-5 text-primary-600" />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Baths</p>
          <p className="font-semibold">{baths}</p>
        </div>
      </div>)}
      {(views !== undefined && views !== null && views !== '') && (<div className="flex items-start gap-2">
        <EyeIcon className="h-5 w-5 text-primary-600" />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Views</p>
          <p className="font-semibold">{views}</p>
        </div>
      </div>)}
      {(built !== undefined && built !== null) && (<div className="flex items-start gap-2">
        <BuildingOfficeIcon className="h-5 w-5 text-primary-600" />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Built</p>
          <p className="font-semibold">{built}</p>
        </div>
      </div>)}
      {(plot !== undefined && plot !== null && plot !== '') && (<div className="flex items-start gap-2">
        <MapIcon className="h-5 w-5 text-primary-600" />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Plot</p>
          <p className="font-semibold">{plot}</p>
        </div>
      </div>)}       
      {location && (<div className="flex items-start gap-2 col-span-2">
        <MapPinIcon className="h-5 w-5 text-primary-600" />
        <div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Location</p>
          <p className="font-semibold">{location}</p>
        </div>
      </div>)}
    </div>
  );
}
