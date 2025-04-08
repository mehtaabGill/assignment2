import React from 'react';
import Pin from '../../icons/Pin';
import External from '../../icons/External';
import Heart from '../../icons/Heart';

export default function GenreDetails({ genre, onAddFavorite }) {
  if (!genre) return (
    <div className="p-4 bg-primary/5 w-full">
      <h2 className="text-xl font-semibold">Detailed Info</h2>
    </div>
  )

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-primary/5">
        <h2 className="text-xl font-semibold">Detailed Info</h2>
      </div>

      <div className="px-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{genre.genreName}</h2>
        <p className=" italic text-sm">"{genre.description}"</p>
      </div>
      <div className="flex justify-between p-4 pt-4 border-t border-gray-200 mt-0">
        <a href={genre.wikiLink} target="_blank" className="px-3 py-1 text-sm border border-gray-200 rounded-md flex items-center hover:bg-gray-50">
          <External />
          Learn More
        </a>
      </div>
    </div>
  )
}