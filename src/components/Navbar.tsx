import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Palette, Info, Phone, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Palette className={`w-8 h-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`ml-2 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              RoomCraft3D
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                >
                  Testimonials
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}
                >
                  About Us
                </button>
              </>
            ) : (
              <Link to="/" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Home
              </Link>
            )}
            
            {!isHomePage && (
              <Link to="/customize" className={`font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>
                Customize
              </Link>
            )}
          </div>

          <div className="hidden md:block">
            <Link
              to={isHomePage ? "/customize" : "/"}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {isHomePage ? 'Get Started' : 'Back to Home'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg mt-4 shadow-lg p-4 absolute left-4 right-4 transition-all duration-300">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection('features')}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center"
                >
                  <Palette className="w-5 h-5 mr-2 text-blue-600" />
                  Features
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center"
                >
                  <Palette className="w-5 h-5 mr-2 text-blue-600" />
                  How It Works
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center"
                >
                  <Palette className="w-5 h-5 mr-2 text-blue-600" />
                  Testimonials
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center"
                >
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  About Us
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="block w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5 mr-2 text-blue-600" />
                Home
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </Link>
            )}
            
            {!isHomePage && (
              <Link
                to="/customize"
                className="block w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Palette className="w-5 h-5 mr-2 text-blue-600" />
                Customize
                <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
              </Link>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to={isHomePage ? "/customize" : "/"}
                className="block w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {isHomePage ? 'Get Started' : 'Back to Home'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;