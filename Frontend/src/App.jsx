import './App.css'

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import SelectLab from './pages/SelectLab'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SelectLab' element={<SelectLab />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
