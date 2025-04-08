import Header from '../components/Header'
import SidebarList from '../components/artists/SidebarList'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/sb'
import ArtistDetails from '../components/artists/ArtistDetails'
import GenericPaintingList from '../components/GenericPaintingList'
import favouritesManager from '../lib/favouritesManager'

export default function Artists() {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    async function fetchPaintings() {
      const { data, error } = await supabase
        .from('paintings')
        .select(`
            paintingId, title, yearOfWork, imageFileName, artists!inner(firstName, lastName)
          `)
        .eq('artistId', selectedArtist.artistId)
        .order('paintingId', { ascending: true })

      if (error) {
        console.error('Failed to fetch paintings:', error.message)
      } else {
        setPaintings(data)
      }
    }

    if (selectedArtist) fetchPaintings();
  }, [selectedArtist])

  const [artists, setArtists] = useState([])

  useEffect(() => {
    async function fetchArtists() {
      const { data, error } = await supabase
        .from('artists')
        .select(`
          *
        `)
        .order('firstName', { ascending: true })

      if (error) {
        console.error('Failed to fetch artists:', error.message)
      } else {
        setArtists(data)
      }
    }

    fetchArtists()
  }, [])

  return (
    <div className="min-h-screen max-w-[1800px] mx-auto">
      <Header />
      <div className="flex gap-4">
        <SidebarList artists={artists} onSelect={setSelectedArtist} />
        <ArtistDetails
          artist={selectedArtist}
          onAddFavorite={(g) => { favouritesManager.addFavouriteArtist(g) }}
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
