// Navbar.tsx
import React, { useState } from 'react';

interface NavbarProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ logoText, navLinks }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold">{logoText}</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-blue-400 transition-all duration-200">
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isMenuOpen ? 'X' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700 text-white px-4 py-3 space-y-4`}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="block text-lg hover:text-blue-400 transition-all duration-200">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
