import Header from '../components/Header'
import SidebarGalleryList from '../components/gallery/SidebarGalleryList'
import GalleryDetails from '../components/gallery/GalleryDetails'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/sb'
import GenericPaintingList from '../components/GenericPaintingList'

export default function Galleries() {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    async function fetchPaintings() {
      const { data, error } = await supabase
        .from('paintings')
        .select(`
            paintingId, title, yearOfWork, imageFileName, artists!inner(firstName, lastName)
          `)
        .eq('galleryId', selectedGallery.galleryId)
        .order('paintingId', { ascending: true })

      if (error) {
        console.error('Failed to fetch galleries:', error.message)
      } else {
        setPaintings(data)
      }
    }

    if (selectedGallery) fetchPaintings();
  }, [selectedGallery])

  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    async function fetchGalleries() {
      const { data, error } = await supabase
        .from('galleries')
        .select(`
          galleryId, galleryName, galleryCity, galleryAddress, galleryCountry, galleryWebSite, latitude, longitude
        `)
        .order('galleryName', { ascending: true })

      if (error) {
        console.error('Failed to fetch galleries:', error.message)
      } else {
        setGalleries(data)
      }
    }

    fetchGalleries()
  }, [])

  return (
    <div className="min-h-screen max-w-[1800px] mx-auto">
      <Header />
      <div className="flex gap-4">
        <SidebarGalleryList galleries={galleries} onSelect={setSelectedGallery} />
        <GalleryDetails
          gallery={selectedGallery}
          onAddFavorite={(g) => console.log('Add to favourites', g)}
        />
        <GenericPaintingList
          paintings={paintings}
          className={"border border-gray-200 rounded w-2/4"}
          sortBy={sortBy}
          setSortBy={setSortBy}
          gridCols={3}
          filterOptions={[{ key: 'yearOfWork', value: 'Year' }, { key: 'title', value: 'Title' }]}
        />
      </div>
    </div>
  )
}
