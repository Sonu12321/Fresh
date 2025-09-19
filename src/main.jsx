import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Apps from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './Context/FavoritesContext.jsx'



createRoot(document.getElementById('root')).render(

 <>
 <FavoritesProvider>

<BrowserRouter>
    {/* <App /> */}
    <Apps />
</BrowserRouter>
 </FavoritesProvider>
 </>
 


  
)
