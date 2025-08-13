import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SelectLab from './pages/SelectLab'
import Labs from './pages/Labs'
import AboutUs from './pages/AboutUs/AboutUs'
import HowToUse from './pages/HowToUse'
import AdminTeachers from './pages/AdminTeachers'
import MassUpdate from './pages/MassUpdate'
import AutoAgendamento from './pages/AutoAgendamento'
import AdminDashboard from './pages/AdminDashboard'

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
        <Route path='/admin/AutoAgendamento' element={<AutoAgendamento />} />
        <Route path='/admin/mass-update' element={<MassUpdate />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}


export default App
