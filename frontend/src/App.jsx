import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/react'

// route component website fix
import LoginWithGoogle from './component/Page/LoginWithGoogle.jsx'
import Index from './component/Page/index.jsx'
import Project from './component/Page/Project.jsx'
import About from './component/Page/About.jsx'
import UserProjectPage from './component/Page/UserProjectPage.jsx'
import Mahasiswa from './component/Page/Mahasiswa.jsx'
import MahasiswaPage from './component/Page/MahasiswaPage.jsx'
import MahasiswaPageEdit from './component/Page/MahasiswaPageEdit.jsx'
import EditProject from './component/Page/EditProject.jsx'
import './App.css'

// route test
// import Navbar from './component/ReuseableComponents/navbar.jsx'
import Demo from './component/Page/Demo.jsx'




function App() {
  return (
    <HeroUIProvider>
      <Router>
        <Routes>
          {/* Fixed Route */}
          <Route path='/' element={<Index />} />
          <Route path='/Project' element={<Project />} />
          <Route path='/About' element={<About />} />
          <Route path='/UserProjectPage' element={<UserProjectPage />} />
          <Route path='/login' element={<LoginWithGoogle />} />
          <Route path='/Mahasiswa/' element={<Mahasiswa />} />
          <Route path='/Mahasiswa/:id' element={<MahasiswaPage />} />
          <Route path='/Mahasiswa/Edit/:id' element={<MahasiswaPageEdit />} />
          <Route path='/Mahasiswa/:id/editProject' element={<EditProject />} />
          {/* router test */}
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Router>
    </HeroUIProvider>
  )

}

export default App
