import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { supabase } from '../lib/sb'
import GenericPaintingList from '../components/GenericPaintingList'

function Paintings() {
  const [filterType, setFilterType] = useState("title")
  const [titleFilter, setTitleFilter] = useState("")
  const [artistFilter, setArtistFilter] = useState(0)
  const [artistOptions, setArtistOptions] = useState([])
  const [galleryFilter, setGalleryFilter] = useState(0)
  const [galleryOptions, setGalleryOptions] = useState([])
  const [minYearFilter, setMinYearFilter] = useState(0);
  const [maxYearFilter, setMaxYearFilter] = useState(Infinity);
  const [paintings, setPaintings] = useState([]);
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');

  const filterPaintings = () => {
    setFilteredPaintings(paintings.filter(painting => {
      if (filterType === "title") {
        return painting.title.includes(titleFilter);
      } else if (filterType === "artist") {
        return painting.artists.artistId === parseInt(artistFilter);
      } else if (filterType === "gallery") {
        return painting.galleries.galleryId === parseInt(galleryFilter);
      } else if (filterType === "year") {
        return painting.yearOfWork >= minYearFilter && painting.yearOfWork <= maxYearFilter;
      }
    }))
  }

  useEffect(() => {
    const fetchPaintings = async () => {
      const { data, error } = await supabase
        .from('paintings')
        .select('*, galleries!inner(*), artists!inner(*)')

      if (error) {
        console.error(error);
      } else {
        setPaintings(data);
        setFilteredPaintings(data);
      }
    }

    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('artistId, firstName, lastName')

      if (error) {
        console.error(error);
      } else {
        setArtistOptions(data);
      }
    }

    const fetchGalleries = async () => {
      const { data, error } = await supabase
        .from('galleries')
        .select('galleryId, galleryName')

      if (error) {
        console.error(error);
      } else {
        setGalleryOptions(data);
      }
    }

    fetchPaintings();
    fetchArtists();
    fetchGalleries();
  }, [])

  return (
    <div className="min-h-screen max-w-[1800px] mx-auto">
      <Header />
      <div className="flex gap-4 p-4 w-full">
        <div className="flex bg-white p-4 border border-gray-200 rounded flex-col w-1/5">
          <h2 className="text-lg mb-4 font-semibold">Painting Filters</h2>

          <div className="flex gap-4 flex-col">
            <div>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="filterType"
                  checked={filterType === "title"}
                  onChange={() => setFilterType("title")}
                  className="mr-2"
                />
                <span>Title</span>
              </label>
              <input
                type="text"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                disabled={filterType !== "title"}
                placeholder="Filter by title..."
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="filterType"
                  checked={filterType === "artist"}
                  onChange={() => setFilterType("artist")}
                  className="mr-2"
                />
                <span>Artist</span>
              </label>
              <div className="relative">
                <select
                  name='artists' id='artists' className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100'
                  onChange={(e) => setArtistFilter(e.target.value)}
                  value={artistFilter}
                >
                  <option value="" selected></option>
                  {artistOptions.map((artist) => {
                    return <option value={artist.artistId} key={artist.artistId}>{artist.firstName} {artist.lastName}</option>
                  })}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="filterType"
                  checked={filterType === "gallery"}
                  onChange={() => setFilterType("gallery")}
                  className="mr-2"
                />
                <span>Gallery</span>
              </label>
              <div className="relative">
                <select
                  name='galleries' id='galleries' className='w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100'
                  onChange={(e) => setGalleryFilter(e.target.value)}
                  value={galleryFilter}
                >
                  <option value="" selected></option>
                  {galleryOptions.map((gallery) => {
                    return <option value={gallery.galleryId} key={gallery.galleryId}>{gallery.galleryName}</option>
                  })}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="filterType"
                  checked={filterType === "year"}
                  onChange={() => setFilterType("year")}
                  className="mr-2"
                />
                <span>Year</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={minYearFilter}
                  onChange={(e) => setMinYearFilter(e.target.value)}
                  disabled={filterType !== "year"}
                  placeholder="Minimum"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <input
                  type="text"
                  value={maxYearFilter}
                  onChange={(e) => setMaxYearFilter(e.target.value)}
                  disabled={filterType !== "year"}
                  placeholder="Maximum"
                  className="w-1/2 p-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>

            <hr className='text-gray-400' />

            <div className="flex gap-2">
              <button className="p-2 bg-gray-100 text-gray-700 rounded w-1/2 cursor-pointer border border-gray-300">Clear</button>
              <button className="p-2 bg-gray-700 text-white rounded w-1/2 cursor-pointer border border-gray-300" onClick={filterPaintings}>Filter</button>
            </div>
          </div>
        </div>

        <GenericPaintingList
          paintings={filteredPaintings}
          className={"border border-gray-200 rounded max-h-[calc(100vh-150px)] overflow-auto w-4/5"}
          sortBy={sortBy}
          setSortBy={setSortBy}
          gridCols={5}
          filterOptions={[{ key: 'yearOfWork', value: 'Year' }, { key: 'title', value: 'Title' }]}
        />
      </div>
    </div>
  )
}

export default Paintings