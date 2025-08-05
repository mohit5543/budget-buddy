import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <Link to="/" className="logo" onClick={closeMenu}>
                Budget Buddy
            </Link>
            
            {/* Desktop Navigation */}
            <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                <Link to="/features" className="nav-link" onClick={closeMenu}>Features</Link>
                <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
                
                
            </nav>

            

            {/* Mobile Menu Button */}
            <button 
                className="menu-toggle" 
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </header>
    );
};

export default Navbar;
