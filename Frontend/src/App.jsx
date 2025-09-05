import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SelectLab from './pages/SelectLab'
import Labs from './pages/Labs'
import AboutUs from './pages/AboutUs/AboutUs'
import HowToUse from './pages/HowToUse'
import AdminDashboard from './pages/AdminDashboard'
import { Navigate } from 'react-router-dom'
import OverviewPage from './pages/Overview'

function isAdminLogged() {
  if (JSON.parse(sessionStorage.getItem('professor'))) {
    let user = JSON.parse(sessionStorage.getItem('professor'));
    if (user.rule === "admin") {
      return true;
    }
  }
  return false;
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SelectLab' element={<SelectLab />} />
        <Route path='/Labs' element={<Labs />}></Route>
        <Route path='/AboutUs' element={<AboutUs />}></Route>
        <Route path='/HowToUse' element={<HowToUse />}></Route>
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/overview' element={< OverviewPage />} />
      </Routes>
    </Router>
  )
}


export default App
