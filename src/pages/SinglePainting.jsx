import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/sb';
import PaintingStats from '../components/single-painting/PaintingStats';
import PaintingLinks from '../components/single-painting/PaintingLinks';
import Heart from '../icons/Heart';
import Colours from '../components/single-painting/Colours';
import favouritesManager from '../lib/favouritesManager';

function SinglePainting() {
  const [id, setId] = useState(-1);
  const params = useParams();

  const [painting, setPainting] = useState({ artists: {}, galleries: {} });
  const [dominantColours, setDominantColours] = useState([]);

  useEffect(() => {
    const paintingId = parseInt(params['id']);
    if (!isNaN(paintingId)) {
      setId(paintingId);
    }
  }, [params]);

  useEffect(() => {
    if (id === -1) return;

    const fetchPainting = async () => {
      const { data, error } = await supabase
        .from('paintings')
        .select('*, galleries!inner(*), artists!inner(*)')
        .eq('paintingId', id)
        .order('paintingId', { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      const jsonData = JSON.parse(data[0].jsonAnnotations);

      setDominantColours(jsonData.dominantColors);

      setPainting(data[0]);
    };

    fetchPainting();
  }, [id]);

  if (isNaN(id) || id < 0) {
    return <><h1>Please enter a valid ID</h1></>
  } else {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Painting Details</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => { window.location.replace('/galleries') }}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => { favouritesManager.addFavouritePainting(painting) }}
                  className={`px-6 py-2 rounded-md flex items-center gap-2 transition-colors bg-gray-100 hover:bg-gray-200 text-gray-800`}
                >
                  <Heart />
                  Favourite
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* image */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                <div className="relative w-full aspect-[4/3]">
                  <img
                    src={`/art-images/paintings/square/${painting.imageFileName}.jpg`}
                    alt={painting.title}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{painting.title}</h2>
                  <p className="text-xl text-gray-700 mt-1">{painting.artists.firstName} {painting.artists.lastName}</p>
                </div>

                <div className="space-y-4">
                  <PaintingStats painting={painting} />

                  <PaintingLinks painting={painting} />

                  <div className="pt-2">
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-700 text-sm italic">{painting.description}</p>
                  </div>

                  <Colours dominantColours={dominantColours} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SinglePainting;