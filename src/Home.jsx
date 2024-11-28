'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, Egg, BarChart2, Feather, Thermometer, Droplet, Truck, HelpCircle, ArrowRight, Menu, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Maximize2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef([])
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5])
  const [enlargedImage, setEnlargedImage] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const navigate = useNavigate()

  const handleImageClick = (imageSrc) => {
    setEnlargedImage(imageSrc)
  }

  const scrollToSection = (index) => {
    const section = sectionRefs.current[index]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  // const navigateToAuthForm = () => {
  //   navigate('/auth')
  // }

  const EnlargedImageView = ({ imageSrc, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-full">
        <img src={imageSrc} alt="Enlarged view" className="max-w-full max-h-[90vh] object-contain" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  )

  useEffect(() => {
    const handleScroll = () => {
      const pageTop = window.scrollY
      const pageBottom = pageTop + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (sectionTop <= pageBottom && sectionBottom >= pageTop) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'hero', title: 'Welcome to EggCellent' },
    { id: 'features', title: 'Key Features' },
    { id: 'statistics', title: 'Farm Statistics' },
    { id: 'management', title: 'Management Tools' },
    { id: 'gallery', title: 'Farm Gallery' },
    { id: 'testimonials', title: 'Happy Farmers' },
    { id: 'faq', title: 'FAQ' },
    { id: 'blog', title: 'Latest News' },
    { id: 'cta', title: 'Get Started' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Egg className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">EggCellent</span>
            </div>
            <div className="hidden md:flex space-x-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`text-sm font-medium ${
                    activeSection === index ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
            <button
              className="md:hidden bg-amber-500 text-white p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden bg-white p-4">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                className={`block w-full text-left py-2 ${
                  activeSection === index ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          ref={(el) => (sectionRefs.current[0] = el)}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1612807022649-c984d85596c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNoaWNrZW5zfGVufDB8fDB8fHww"
              alt="Chicken farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              EggCellent Poultry Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl md:text-2xl mb-8"
            >
              Revolutionize your farm with smart technology
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/auth"
                className="bg-amber-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-600 transition duration-300 inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-12 w-12 text-white opacity-75" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={(el) => (sectionRefs.current[1] = el)}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Egg, title: 'Egg Tracking', description: 'Monitor egg production and quality' },
                { icon: BarChart2, title: 'Performance Analytics', description: 'Analyze farm performance metrics' },
                { icon: Feather, title: 'Flock Management', description: 'Efficiently manage your chicken flocks' },
                { icon: Thermometer, title: 'Climate Control', description: 'Optimize coop temperature and humidity' },
                { icon: Droplet, title: 'Water Management', description: 'Monitor and control water consumption' },
                { icon: Truck, title: 'Supply Chain', description: 'Streamline your supply chain operations' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-amber-50 p-6 rounded-lg shadow-md"
                >
                  <feature.icon className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section
          id="statistics"
          ref={(el) => (sectionRefs.current[2] = el)}
          className="py-20 bg-amber-500 text-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Farm Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { value: '10M+', label: 'Eggs Tracked' },
                { value: '5,000+', label: 'Farms Managed' },
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-xl">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Tools Section */}
        <section
          id="management"
          ref={(el) => (sectionRefs.current[3] = el)}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Management Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
                  alt="Poultry management dashboard"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Comprehensive Dashboard</h3>
                <p className="text-gray-600 mb-6">
                  Our intuitive dashboard provides real-time insights into your farm's performance, allowing you to make
                  data-driven decisions quickly and efficiently.
                </p>
                <ul className="space-y-4">
                  {[
                    'Real-time egg production tracking',
                    'Feed consumption analysis',
                    'Health monitoring alerts',
                    'Environmental control settings',
                    'Financial performance reports',
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <ArrowRight className="h-5 w-5 text-amber-500 mr-2" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          ref={(el) => (sectionRefs.current[4] = el)}
          className="py-20 bg-amber-100"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Farm Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3',
                'https://images.unsplash.com/photo-1589923188651-268a9765e432?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNoaWNrZW4lMjBNYW5hZ2VtZW50JTIwVG9vbHN8ZW58MHx8MHx8fDA%3D',
                'https://images.unsplash.com/photo-1441122456239-401e92b73c65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNoaWNrZW4lMjBNYW5hZ2VtZW50JTIwVG9vbHN8ZW58MHx8MHx8fDA%3D',
                'https://images.unsplash.com/photo-1447624799968-c704f86dc931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGNoaWNrZW4lMjBNYW5hZ2VtZW50JTIwVG9vbHN8ZW58MHx8MHx8fDA%3D',
                'https://plus.unsplash.com/premium_photo-1664971411348-3e497b7dfb9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNoaWNrZW5zfGVufDB8fDB8fHww',
                'https://plus.unsplash.com/premium_photo-1664527009186-c99de7e508ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNoaWNrZW5zfGVufDB8fDB8fHww',
                'https://images.unsplash.com/photo-1694984717218-a2560bf5abea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoaWNrZW5zfGVufDB8fDB8fHww',
                'https://images.unsplash.com/photo-1639194335563-d56b83f0060c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoaWNrZW4lMjBlZ2dzfGVufDB8fDB8fHww',
               
              ].map((imgSrc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => handleImageClick(imgSrc)}
                >
                  <img src={`${imgSrc}?auto=format&fit=crop&w=500&q=60`} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <Maximize2 size={24} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          ref={(el) => (sectionRefs.current[5] = el)}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Happy Farmers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'John Doe',
                  role: 'Poultry Farmer',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3',
                  quote: 'EggCellent has transformed the way I manage my farm. The insights provided are invaluable.',
                },
                {
                  name: 'Jane Smith',
                  role: 'Farm Manager',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
                  quote: 'The ease of use and comprehensive features make EggCellent a must-have for any poultry farm.',
                },
                {
                  name: 'Mike Johnson',
                  role: 'Agricultural Consultant',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3',
                  quote: 'I recommend EggCellent to all my clients. It\'s a game-changer in poultry management.',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-amber-50 p-6 rounded-lg shadow-md"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-gray-600 mb-4 text-center">{testimonial.quote}</p>
                  <div className="text-center">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          ref={(el) => (sectionRefs.current[6] = el)}
          className="py-20 bg-amber-50"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: 'How does EggCellent improve egg production?',
                  answer:
                    'EggCellent provides real-time monitoring and analytics of your flock, allowing you to optimize feeding, environmental conditions, and health management for maximum egg production.',
                },
                {
                  question: 'Is EggCellent suitable for small-scale farms?',
                  answer:
                    'EggCellent is designed to scale with your farm, whether you have a small backyard operation or a large commercial farm.',
                },
                {
                  question: 'How secure is the data collected by EggCellent?',
                  answer:
                    'We take data security seriously. All data is encrypted and stored securely in the cloud, with strict access controls and regular security audits.',
                },
                {
                  question: 'Can EggCellent integrate with other farm management tools?',
                  answer:
                    'Yes, EggCellent offers API integrations with various farm management tools and accounting software to provide a seamless experience.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <HelpCircle className="h-5 w-5 text-amber-500 mr-2" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section
          id="blog"
          ref={(el) => (sectionRefs.current[7] = el)}
          className="py-20 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Maximizing Egg Production: Tips and Tricks',
                  excerpt:
                    'Discover the latest strategies to boost your farm\'s egg production while maintaining hen health and happiness.',
                  image: 'https://images.unsplash.com/photo-1635842902489-b9e74f0c812f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fGNoaWNrZW4lMjBlZ2dzfGVufDB8fDB8fHww',
                },
                {
                  title: 'Sustainable Poultry Farming Practices',
                  excerpt:
                    'Learn how to implement eco-friendly practices in your poultry farm to reduce environmental impact and cut costs.',
                  image: 'https://plus.unsplash.com/premium_photo-1661964158054-f8ec74178017?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNoaWNrZW4lMjBNYW5hZ2VtZW50JTIwVG9vbHN8ZW58MHx8MHx8fDA%3D',
                },
                {
                  title: 'The Future of Poultry Management Technology',
                  excerpt:
                    'Explore upcoming technologies that will revolutionize poultry farming, from AI-driven analytics to IoT sensors.',
                  image: 'https://images.unsplash.com/photo-1580983230786-ce385a434707?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHRlY2hub2xvZ3klMjBpbiUyMHBvdWx0cnl8ZW58MHx8MHx8fDA%3D',
                },
              ].map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-amber-50 rounded-lg shadow-md overflow-hidden"
                >
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <a href="#" className="text-amber-500 font-medium hover:underline">
                      Read more
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section
          id="cta"
          ref={(el) => (sectionRefs.current[8] = el)}
          className="py-20 bg-amber-500"
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Revolutionize Your Poultry Farm?</h2>
            <p className="text-xl text-white mb-8">
              Join thousands of satisfied farmers and start optimizing your poultry management today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/auth"
                className="bg-white text-amber-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-100 transition duration-300 inline-block"
              >
                Get Started Now
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EggCellent</h3>
              <p className="mb-4">Revolutionizing poultry management with cutting-edge technology and sustainable practices.</p>
              <div className="flex space-x-4">
                <a href="https://web.facebook.com/?_rdc=1&_rdr" className="hover:text-amber-400"><Facebook size={24} /></a>
                <a href="https://x.com/?lang=en" className="hover:text-amber-400"><Twitter size={24} /></a>
                <a href="https://www.instagram.com/" className="hover:text-amber-400"><Instagram size={24} /></a>
              </div>
            </div>
            {/* <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400">Home</a></li>
                <li><a href="#" className="hover:text-amber-400">About Us</a></li>
                <li><a href="#" className="hover:text-amber-400">Services</a></li>
                <li><a href="#" className="hover:text-amber-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400">Blog</a></li>
                <li><a href="#" className="hover:text-amber-400">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-400">Support</a></li>
                <li><a href="#" className="hover:text-amber-400">Privacy Policy</a></li>
              </ul>
            </div> */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center"><Mail size={18} className="mr-2" /> info@eggcellent.com</li>
                <li className="flex items-center"><Phone size={18} className="mr-2" /> +234 816 896 6141</li>
                <li className="flex items-center"><MapPin size={18} className="mr-2" /> 287 Poultry Lane, Port Harcourt, NG </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 EggCellent. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EnlargedImageView
              imageSrc={enlargedImage}
              onClose={() => setEnlargedImage(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{
          position: 'fixed',
          left: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 5,
          height: '50%',
          background: '#f59e0b',
          scaleY: scrollYProgress,
        }}
      />

      <motion.div
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#f59e0b',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          scale,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronDown className="h-6 w-6 text-white transform rotate-180" />
      </motion.div>
    </div>
  )
}

