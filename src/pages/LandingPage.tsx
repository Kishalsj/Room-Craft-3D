import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sofa, PenTool, RotateCcw, Palette, Maximize, Move, Eye, PanelRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'RoomCraft3D - Design Your Dream Space in 3D';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Design Your Dream Space in <span className="text-blue-600">3D</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
                Easily create and customize your perfect room with our interactive 3D design tool. Change colors, rearrange furniture, and visualize your space in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/customize" className="btn-primary group flex items-center justify-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#how-it-works" className="btn-secondary flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video"
            >
              <img 
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="3D Room Customization" 
                className="rounded-xl shadow-2xl w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Powerful <span className="text-blue-600">Features</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to design and visualize your perfect room before making any real-world changes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Sofa className="w-12 h-12 text-blue-600" />,
                title: 'Furniture Library',
                description: 'Access a vast library of high-quality 3D furniture models to populate your space.'
              },
              {
                icon: <PenTool className="w-12 h-12 text-blue-600" />,
                title: 'Custom Colors',
                description: 'Change the colors of walls, floors, furniture and more with our intuitive color picker.'
              },
              {
                icon: <Maximize className="w-12 h-12 text-blue-600" />,
                title: 'Room Sizing',
                description: 'Adjust room dimensions to match your actual space for accurate planning and visualization.'
              },
              {
                icon: <Move className="w-12 h-12 text-blue-600" />,
                title: 'Drag & Drop',
                description: 'Easily position furniture with our intuitive drag and drop interface.'
              },
              {
                icon: <RotateCcw className="w-12 h-12 text-blue-600" />,
                title: 'Real-time Updates',
                description: 'See changes instantly as you customize your room for immediate feedback.'
              },
              {
                icon: <Eye className="w-12 h-12 text-blue-600" />,
                title: '360° View',
                description: 'Navigate and view your room from any angle to ensure perfect placement.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 rounded-full bg-blue-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">How It <span className="text-blue-600">Works</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Creating your perfect space is simple with our easy-to-use platform. Follow these steps to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="space-y-8">
                {[
                  {
                    number: '01',
                    title: 'Choose Your Starting Point',
                    description: 'Select between starting with a default room layout or building from scratch.'
                  },
                  {
                    number: '02',
                    title: 'Customize Room Dimensions',
                    description: 'Set the size and shape of your room to match your actual space.'
                  },
                  {
                    number: '03',
                    title: 'Add and Place Furniture',
                    description: 'Browse our library and add furniture items, then position them in your space.'
                  },
                  {
                    number: '04',
                    title: 'Customize Colors and Materials',
                    description: 'Change the colors and materials of walls, floors, and furniture to your liking.'
                  }
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <img 
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Room Customization Process" 
                className="rounded-xl shadow-lg w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">Inspiration <span className="text-blue-600">Gallery</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through these stunning designs created with our platform to inspire your next project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              "https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg shadow-md group"
              >
                <div className="relative aspect-[4/3]">
                  <img 
                    src={image} 
                    alt={`Room design ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-white font-medium">Room Design {index + 1}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/customize" className="btn-primary inline-flex items-center">
              Start Designing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-heading">What Our Users <span className="text-blue-600">Say</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from those who have transformed their spaces using our 3D room customization tool.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Interior Designer",
                quote: "This tool has revolutionized how I present concepts to clients. Being able to show them exactly how their space will look saves so much time and prevents misunderstandings.",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Michael Chen",
                role: "Homeowner",
                quote: "I was renovating my living room and wasn't sure about furniture placement. This tool helped me visualize different layouts before making any purchases. Saved me from expensive mistakes!",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Emma Rodriguez",
                role: "Architect",
                quote: "The ability to adjust room dimensions and try different material combinations in real-time is incredible. My clients love seeing their future spaces come to life in 3D.",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="section-heading">About <span className="text-blue-600">RoomCraft3D</span></h2>
              <p className="text-lg text-gray-600 mb-6">
                We're a team of designers, developers, and 3D artists passionate about helping people visualize and create their perfect living spaces.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our mission is to make interior design accessible to everyone by providing powerful yet easy-to-use tools that bridge the gap between imagination and reality.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2023, we've helped thousands of homeowners, interior designers, and architects bring their vision to life through our intuitive 3D customization platform.
              </p>
              <Link to="/customize" className="btn-primary inline-flex items-center">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our Team" 
                className="rounded-xl shadow-lg w-full h-auto object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Design Your Perfect Space?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start creating your dream room today with our intuitive 3D customization tools.
          </p>
          <Link 
            to="/customize" 
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300 inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;