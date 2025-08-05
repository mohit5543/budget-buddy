import React from 'react'
import './App.css'
import Navbar from './assets/components/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Body from './assets/components/Body.jsx'
import AboutUs from './assets/components/Aboutus.jsx'
import Features from './assets/components/Features.jsx'
import Contact from './assets/components/Contact.jsx'
import Footer from './assets/components/Footer.jsx'
import Dashboard from './assets/components/Dashboard.jsx'


function App() {
  return (
    <>
   
       <Router>
        <Navbar />
        <main>
          <Routes>  
            <Route path="/" element={<Body />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} /> 
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router> 
    
    </>
  )
}

export default App
