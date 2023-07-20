
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Store from './pages/Store'
import About from './pages/About'
import Navbar from './components/Navbar'
import './index.css';
import './about.css';
import './home.css';
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import ShoppingCart from "./components/ShoppingCart"



function App() {

  return (
    <div>
      <ShoppingCartProvider>
      <BrowserRouter basename="/pokemonTCG/">
      <ShoppingCart/>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}>Home</Route>
          <Route path="/store" element={<Store/>}>Store</Route>
          <Route path="/about" element={<About/>}>About</Route>
        </Routes>  
      </BrowserRouter>
      </ShoppingCartProvider>
    </div>
  )
}

export default App
