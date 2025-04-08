import React from 'react'

function PaintingStats({ painting }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      <div>
        <span className="text-gray-500">Year:</span>
        <span className="ml-2 font-medium">{painting.yearOfWork}</span>
      </div>
      <div>
        <span className="text-gray-500">Medium:</span>
        <span className="ml-2 font-medium">{painting.medium}</span>
      </div>
      <div>
        <span className="text-gray-500">Dimensions:</span>
        <span className="ml-2 font-medium">
          {painting.width} × {painting.height}
        </span>
      </div>
      <div>
        <span className="text-gray-500">Copyright:</span>
        <span className="ml-2 font-medium">{painting.copyrightText}</span>
      </div>
      <div>
        <span className="text-gray-500">Gallery:</span>
        <span className="ml-2 font-medium">{painting.galleries.galleryName}</span>
      </div>
      <div>
        <span className="text-gray-500">Location:</span>
        <span className="ml-2 font-medium">
          {painting.galleries.galleryCity}, {painting.galleries.galleryCountry}
        </span>
      </div>
    </div>
  )
}

export default PaintingStats