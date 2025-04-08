import React from 'react';
import Pin from '../../icons/Pin';
import External from '../../icons/External';
import Heart from '../../icons/Heart';
import favouritesManager from '../../lib/favouritesManager';

export default function GalleryDetails({ gallery, onAddFavorite }) {
  if (!gallery) return (
    <div className="p-4 bg-primary/5 w-1/4">
      <h2 className="text-xl font-semibold">Detailed Info</h2>
    </div>
  )

  return (
    <div className="w-1/4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-primary/5">
        <h2 className="text-xl font-semibold">Detailed Info</h2>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{gallery.galleryName}</h2>
        <div className="flex items-center text-gray-500 text-sm mt-1">

          <Pin />
          <span>{gallery.galleryAddress}, {gallery.galleryCity}, {gallery.galleryCountry}</span>
        </div>
      </div>
      <div className="p-0">
        <div className="relative h-[300px] w-full">
          <div className="absolute inset-0 p-2">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${gallery.longitude},${gallery.latitude},${gallery.longitude + 0.003},${gallery.latitude + 0.003}&layer=mapnik`}
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="flex justify-between p-4 pt-4 border-t border-gray-200 mt-0">
        <a href={gallery.galleryWebSite} target="_blank" className="px-3 py-1 text-sm border border-gray-200 rounded-md flex items-center hover:bg-gray-50">
          <External />
          Visit Gallery
        </a>
        <button className="px-3 py-1 text-sm border border-gray-200 rounded-md flex items-center hover:bg-gray-50" onClick={() => { favouritesManager.addFavouriteGallery(gallery) }}>
          <Heart />
          Add Favourites
        </button>
      </div>
    </div>
  )
}