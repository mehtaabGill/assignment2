import { useEffect, useState } from 'react';
import Header from '../components/Header';
import favouritesManager from '../lib/favouritesManager';

export default function Favourites() {
  const [favouriteData, setFavouriteData] = useState(null);

  const reloadData = async () => {
    const data = await favouritesManager.loadData();
    setFavouriteData(data);
  };

  useEffect(() => {
    reloadData();
  }, []);

  if (!favouriteData) {
    return <>No Data</>;
  }

  const confirmAndClear = () => {
    if (confirm('Are you sure you want to clear your favourites?')) {
      favouritesManager.clearData();
      reloadData();
    }
  }

  return (
    <div className="min-h-screen max-w-[1800px] mx-auto">
      <Header />
      <button className='p-1 bg-red-400 text-white rounded m-4' onClick={() => { confirmAndClear() }}>Clear</button>
      <button className='p-1 bg-gray-200 border border-gray-400 rounded' onClick={() => { history.back() }}>Close</button>
      <div className="flex gap-4 w-full">
        <div className=""></div>
        <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-sm overflow-auto">
          <div className="p-4 bg-primary/5 bg-gray-200">
            <h2 className="text-xl font-semibold">Artists</h2>
          </div>
          <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-1">
              {favouriteData.artists.map((artist) => (
                <div
                  key={artist.artistId}
                  className="p-2 text-sm rounded-md cursor-pointer hover:font-bold flex justify-between items-center"
                >
                  <p>{artist.firstName} {artist.lastName}</p>
                  <button className='p-1 bg-red-400 text-white rounded' onClick={() => { favouritesManager.removeArtist(artist); reloadData(); }}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-sm overflow-auto">
          <div className="p-4 bg-primary/5 bg-gray-200">
            <h2 className="text-xl font-semibold">Galleries</h2>
          </div>
          <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-1">
              {favouriteData.galleries.map((gallery) => (
                <div
                  key={gallery.galleryId}
                  className="p-2 text-sm rounded-md cursor-pointer hover:font-bold flex justify-between items-center"
                >
                  {gallery.galleryName}
                  <button className='p-1 bg-red-400 text-white rounded' onClick={() => { favouritesManager.removeGallery(gallery); reloadData(); }}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-sm overflow-auto">
          <div className="p-4 bg-primary/5 bg-gray-200">
            <h2 className="text-xl font-semibold">Paintings</h2>
          </div>
          <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="space-y-1">
              {favouriteData.paintings.map((painting) => (
                <a
                  key={painting.paintingId}
                  className="p-2 text-sm rounded-md cursor-pointer hover:font-bold flex justify-between items-center"
                  href={`/painting/${painting.paintingId}`}
                >
                  {painting.title}
                  <button className='p-1 bg-red-400 text-white rounded' onClick={() => { favouritesManager.removePainting(painting); reloadData(); }}>Remove</button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
