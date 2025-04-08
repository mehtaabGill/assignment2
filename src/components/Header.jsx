import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import favouritesManager from '../lib/favouritesManager';

export default function Header() {
  const { pathname } = useLocation();
  if (pathname === '/login') return null;

  const [favouritesIsEmpty, setFavouritesIsEmpty] = useState(true);

  useEffect(() => {
    const data = favouritesManager.loadData();
    setFavouritesIsEmpty(data.artists.length === 0 && data.paintings.length === 0 && data.galleries.length === 0);
  }, [pathname])

  const navItems = [
    { name: 'Artists', path: '/artists' },
    { name: 'Paintings', path: '/paintings' },
    { name: 'Galleries', path: '/galleries' },
    { name: 'Genres', path: '/genres' },
    { name: 'Favourites', path: '/favourites' },
    { name: 'About', path: '/about' },
  ]

  return (
    <header className="bg-emerald-400 px-6 py-4 flex items-center justify-between rounded mb-4">
      <div className="text-xl font-semibold">Painting Dashboard</div>
      <nav className="flex gap-3">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `px-4 py-2 rounded border 
            ${isActive && name !== 'Favourites' ? ' text-gray-800 border-2' : ' text-gray-700'}
            ${name === 'Favourites' && favouritesIsEmpty ? 'select-none cursor-not-allowed bg-gray-500' : 'bg-gray-300'}
            `
            }
            onClick={(e) => { if (name === 'Favourites' && favouritesIsEmpty) e.preventDefault(); }}
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}