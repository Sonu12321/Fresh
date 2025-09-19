import React from 'react'
import {Route,Routes,Link } from 'react-router-dom'
import SearchBar from './Components/SearchBar'
import Loader from './Components/Loader'
import Home from './Pages/HomePages'
import BookDetails from './Pages/BookDetails'
import Favorites from './Pages/Favorites'
const App = () => {
  return (
    <>

    

      <nav className="bg-gradient-to-r from-slate-700 to-neutral-700 shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="px-3 py-2 bg-slate-500 rounded hover:bg-white">Home</Link>
          <div className="space-x-4">
            <Link to="/favorites" className="px-3 py-2 rounded bg-slate-500 hover:bg-slate-100">Favorites</Link>
          </div>
        </div>
      </nav>
    <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/book/works/:id' element={<BookDetails/>} /> 
      <Route path='/book/works/:id' element={<BookDetails/>} /> 
       <Route path="/favorites" element={<Favorites />} />
    </Routes>
    
    </>
  )
}

export default App