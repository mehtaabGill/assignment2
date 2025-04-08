import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/sb'
import SidebarGenreList from '../components/genres/SidebarGenreList'
import GenreDetails from '../components/genres/GenreDetails'
import GenericPaintingList from '../components/GenericPaintingList'

export default function Genres() {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [paintings, setPaintings] = useState([]);
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    async function fetchPaintings() {
      const { data: allIds, error: idsError } = await supabase
        .from('_painting_to_genre')
        .select('*')
        .eq('genreId', selectedGenre.genreId)
        .order('paintingId', { ascending: true })

      if (idsError) {
        console.error('Failed to fetch galleries:', error.message)
      }

      const { data, error } = await supabase
        .from('paintings')
        .select(`
            paintingId, title, yearOfWork, imageFileName, artists!inner(firstName, lastName)
          `)
        .in('paintingId', allIds.map(p => p.paintingId))
        .order('paintingId', { ascending: true })

      if (error) {
        console.error('Failed to fetch galleries:', error.message)
      } else {
        setPaintings(data)
      }
    }

    if (selectedGenre) fetchPaintings();
  }, [selectedGenre])

  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchGenres() {
      const { data, error } = await supabase
        .from('genres')
        .select(`
          *
        `)
        .order('genreName', { ascending: true })

      if (error) {
        console.error('Failed to fetch genres:', error.message)
      } else {
        setGenres(data)
      }
    }

    fetchGenres()
  }, [])

  return (
    <div className="min-h-screen max-w-[1800px] mx-auto">
      <Header />
      <div className="flex gap-4">
        <SidebarGenreList genres={genres} onSelect={setSelectedGenre} />
        <div className="flex w-3/4 p-4 rounded shadow flex-col">
          <GenreDetails
            genre={selectedGenre}
            onAddFavorite={(g) => {}}
          />

          <GenericPaintingList
          paintings={paintings}
          className={"w-full max-h-[65vh] overflow-auto"}
          sortBy={sortBy}
          setSortBy={setSortBy}
          gridCols={5}
          filterOptions={[{ key: 'yearOfWork', value: 'Year' }, { key: 'title', value: 'Title' }]}
        />
        </div>
      </div>
    </div>
  )
}
