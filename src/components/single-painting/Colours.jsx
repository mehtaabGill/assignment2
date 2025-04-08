import React from 'react'

function Colours({ dominantColours }) {
  return (
    <div className="pt-2">
      <h3 className="text-lg font-medium mb-2">Dominant Colours</h3>
      <div className="flex gap-2">
        {dominantColours.slice(0, 6).map((colour, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-md shadow-sm border border-gray-200"
            style={{ backgroundColor: colour.web }}
            title={colour.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Colours