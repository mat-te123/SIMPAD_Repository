import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/react'

// route component website fix
import Login from './component/Page/Login.jsx'
import Register from './component/Page/Register.jsx'
import Email from './component/Page/EmailLogin.jsx'
import Index from './component/Page/index.jsx'
import Project from './component/Page/Project.jsx'
import About from './component/Page/About.jsx'
import UserProjectPage from './component/Page/UserProjectPage.jsx'
import './App.css'

// route test
// import Navbar from './component/ReuseableComponents/navbar.jsx'
import Test from './api.jsx'
import Demo from './component/Page/Demo.jsx'



function App() {
  return (
    <HeroUIProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email" element={<Email />} />
          <Route path="/api/test" element={<Test />} />
          <Route path="/demo" element={<Demo />} />
          {/* router test */}
          <Route path='/' element={<Index/>}/>
          <Route path='/Project' element={<Project/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/UserProjectPage' element={<UserProjectPage/>}/>
        </Routes>
      </Router>
    </HeroUIProvider>
  )

}

export default App
