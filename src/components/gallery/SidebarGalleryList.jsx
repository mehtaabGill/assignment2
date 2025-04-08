import React from 'react'

export default function SidebarGalleryList({ galleries, onSelect }) {
  return (
<div className="w-1/4 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-primary/5 bg-gray-200">
        <h2 className="text-xl font-semibold">Galleries</h2>
      </div>
      <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-1">
          {galleries.map((gallery) => (
            <div
            key={gallery.galleryId}
            className="block px-3 py-2 text-sm rounded-md hover:bg-primary/5 transition-colors cursor-pointer hover:font-bold"
            onClick={() => onSelect(gallery)}
          >
            {gallery.galleryName}
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}