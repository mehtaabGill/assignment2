import React from 'react'

function GenericPaintingList({ paintings, className, sortBy, setSortBy, gridCols, filterOptions }) {
  return (
    <div className={className}>
      <div className="p-4 bg-primary/5">
        <h2 className="text-xl font-semibold">Paintings</h2>
      </div>
      <div className="m-2">
        <label className="mr-2 font-semibold">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {filterOptions.map((opt, key) => {
            return <option value={opt.key} key={key} className='capitalize'>{opt.value}</option>
          })}
        </select>
      </div>

      <div className={`w-full grid grid-cols-4 gap-4`}>
        {paintings.sort((a, b) => {
          return a[sortBy].toString().localeCompare(b[sortBy].toString())
        }).map((painting) => (
          <a
            key={painting.paintingId}
            className="p-2 shadow rounded hover:bg-gray-100 cursor-pointer text-center"
            href={`/painting/${painting.paintingId}`}
          >
            <img src={`/art-images/paintings/square/${painting.imageFileName}.jpg`} alt={painting.title} className="rounded mx-auto" />
            <div className="font-semibold">{painting.title}</div>
            <div className="text-sm text-gray-600">
              {painting.artists.firstName} {painting.artists.lastName} — {painting.yearOfWork}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default GenericPaintingList