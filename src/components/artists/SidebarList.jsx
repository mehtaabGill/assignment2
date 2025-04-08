import React from 'react'

export default function SidebarList({ artists, onSelect }) {
  return (
    <div className="w-1/4 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-primary/5 bg-gray-200">
        <h2 className="text-xl font-semibold">Galleries</h2>
      </div>
      <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-1">
          {artists.map((artist) => (
            <div
              key={artist.artistId}
              className="block px-3 py-2 text-sm rounded-md hover:bg-primary/5 transition-colors cursor-pointer hover:font-bold"
              onClick={() => onSelect(artist)}
            >
              {artist.firstName} {artist.lastName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}