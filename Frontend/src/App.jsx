import './App.css'

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import SelectLab from './pages/SelectLab'
import Labs from './pages/Labs'
import AboutUs from './pages/AboutUs/AboutUs'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SelectLab' element={<SelectLab />} />
        <Route path='/Labs' element={<Labs />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
