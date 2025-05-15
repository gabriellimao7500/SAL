import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SelectLab from './pages/SelectLab'
import Labs from './pages/Labs'
import AboutUs from './pages/AboutUs/AboutUs'
import HowToUse from './pages/HowToUse'
import AdminTeachers from './pages/AdminTeachers'
import Conflicts from './pages/Conflicts'
import MassUpdate from './pages/MassUpdate'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SelectLab' element={<SelectLab />} />
        <Route path='/Labs' element={<Labs />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
        <Route path='/HowToUse' element={<HowToUse />}></Route>
        <Route path='/admin/teachers' element={<AdminTeachers />} />
        <Route path='/conflicts' element={<Conflicts />} />
        <Route path='/mass-update' element={<MassUpdate />} />
      </Routes>
    </Router>
  )
}


export default App
