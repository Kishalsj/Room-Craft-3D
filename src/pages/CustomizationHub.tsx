import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight, LayoutTemplate, Boxes, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CustomizationHub: React.FC = () => {
  useEffect(() => {
    document.title = 'RoomCraft3D - Choose Your Starting Point';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                  Choose Your Starting Point
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Select how you'd like to begin your room customization journey. You can start with a default room or build entirely from scratch.
                </p>
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card p-6 md:p-8 flex flex-col h-full"
              >
                <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Default Room" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">Customize Default Room</h2>
                <p className="text-gray-600 mb-6 flex-grow">
                  Start with a pre-designed room that includes standard furniture and layouts. You can modify colors, replace items, and rearrange everything to your liking.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Quick start with pre-populated items
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Modify existing furniture placement
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Customize colors and materials
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Add or remove furniture as needed
                  </li>
                </ul>
                <Link 
                  to="/customize/default" 
                  className="btn-primary w-full flex items-center justify-center"
                >
                  Start with Default Room
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card p-6 md:p-8 flex flex-col h-full"
              >
                <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Empty Room" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-4">Build from Scratch</h2>
                <p className="text-gray-600 mb-6 flex-grow">
                  Start with an empty room and complete creative freedom. Set the dimensions, add walls, doors, windows, and then fill your space with furniture and decorations.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Complete creative control
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Set custom room dimensions
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Place walls, doors and windows
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Add furniture from our extensive library
                  </li>
                </ul>
                <Link 
                  to="/customize/scratch" 
                  className="btn-secondary w-full flex items-center justify-center"
                >
                  Build from Scratch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </div>

            <div className="mt-12 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex items-start">
                  <HelpCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Need Help Getting Started?</h3>
                    <p className="text-gray-600 mb-4">
                      Not sure which option is right for you? Here's a quick guide:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <LayoutTemplate className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          <strong>Default Room:</strong> Best for beginners or if you want to quickly see what's possible.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Boxes className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          <strong>From Scratch:</strong> Ideal if you have specific dimensions or a unique layout in mind.
                        </span>
                      </li>
                    </ul>
                    <p className="text-gray-600">
                      No matter which option you choose, you can always modify your space later!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CustomizationHub;