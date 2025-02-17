import './App.css'

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import SelectLab from './pages/SelectLab'
import Labs from './pages/Labs'
import AboutUs from './pages/AboutUs/AboutUs'
import HowToUse from './pages/HowToUse'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SelectLab' element={<SelectLab />} />
        <Route path='/Labs' element={<Labs />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
        <Route path='/HowToUse' element={<HowToUse />}></Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
