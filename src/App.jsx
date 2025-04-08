import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Galleries from './pages/Galleries'
import Artists from './pages/Artists'
import Genres from './pages/Genres'
import SinglePainting from './pages/SinglePainting'
import Paintings from './pages/Paintings'
import Favourites from './pages/Favourites'
import { ToastContainer } from 'react-toastify';
import About from './pages/About'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' Component={localStorage.getItem('isLoggedIn') === 'true' ? <Navigate to="/galleries" replace /> : <Navigate to="/login" replace />} />
        <Route path='/login' Component={Login} />
        <Route path='/galleries' Component={Galleries} />
        <Route path='/artists' Component={Artists} />
        <Route path='/genres' Component={Genres} />
        <Route path='/painting/:id' Component={SinglePainting} />
        <Route path='/paintings' Component={Paintings} />
        <Route path='/favourites' Component={Favourites} />
        <Route path='/about' Component={About} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
