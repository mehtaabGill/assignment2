import React from 'react'

export default function SidebarGenreList({ genres, onSelect }) {
  return (
<div className="w-1/4 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-primary/5 bg-gray-200">
        <h2 className="text-xl font-semibold">Genres</h2>
      </div>
      <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-1">
          {genres.map((genre) => (
            <div
            key={genre.genreId}
            className="block px-3 py-2 text-sm rounded-md hover:bg-primary/5 transition-colors cursor-pointer hover:font-bold"
            onClick={() => onSelect(genre)}
          >
            {genre.genreName}
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}