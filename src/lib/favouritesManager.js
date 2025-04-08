import { toast } from "react-toastify";

class FavouritesManager {
  constructor() {
    this.DATA_KEY = 'FAVOURITES_DATA';
    this.loadData();
  }

  buildDefaultData() {
    return {
      galleries: [],
      artists: [],
      paintings: []
    }
  }

  loadData() {
    const raw = localStorage.getItem(this.DATA_KEY);

    if (!raw) {
      const data = this.buildDefaultData();
      this.dumpData(data);
      return data;
    } else {
      return JSON.parse(raw);
    }
  }

  dumpData(data) {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(data));
  }

  clearData() {
    this.dumpData(this.buildDefaultData());
    toast.success('Favourites cleared!', { position: 'bottom-right' })
  }

  addFavouriteGallery(newGallery) {
    const data = this.loadData();

    if (!data.galleries.find(gal => gal.galleryId === newGallery.galleryId)) {
      data.galleries.push(newGallery);
      this.dumpData(data);
      toast.success('Gallery added to favourites!', { position: 'bottom-right' })
    }
  }

  removeGallery(oldGallery) {
    const data = this.loadData();
    data.galleries = data.galleries.filter(gal => gal.galleryId !== oldGallery.galleryId);
    this.dumpData(data);
  }

  addFavouriteArtist(newArtist) {
    const data = this.loadData();

    if (!data.artists.find(artist => artist.artistId === newArtist.artistId)) {
      data.artists.push(newArtist);
      this.dumpData(data);
      toast.success('Artist added to favourites!', { position: 'bottom-right' })
    }
  }

  removeArtist(oldArtist) {
    const data = this.loadData();
    data.artists = data.artists.filter(artist => artist.artistId !== oldArtist.artistId);
    this.dumpData(data);
  }

  addFavouritePainting(newPainting) {
    const data = this.loadData();

    if (!data.paintings.find(painting => painting.paintingId === newPainting.paintingId)) {
      data.paintings.push(newPainting);
      this.dumpData(data);
      toast.success('Painting added to favourites!', { position: 'bottom-right' })
    }
  }

  removePainting(oldPainting) {
    const data = this.loadData();
    data.paintings = data.paintings.filter(painting => painting.paintingId !== oldPainting.paintingId);
    this.dumpData(data);
  }
}

export default new FavouritesManager();