// Hero.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Cpu, Sparkles, Download, Brain } from 'lucide-react'
import Portfolio3DWorld from './Portfolio3DWorld'
import './Hero.css'

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const texts = [
    'AI/ML Developer',
    'VR/XR Engineer', 
    'Computer Vision Expert',
    'Deep Learning Specialist',
    'Embedded AI Developer'
  ]

  useEffect(() => {
    const current = texts[currentIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 1500)
        } else {
          setCurrentText(current.slice(0, currentText.length + 1))
        }
      } else {
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
        } else {
          setCurrentText(current.slice(0, currentText.length - 1))
        }
      }
    }, isDeleting ? 40 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 2000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="hero">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="gradient-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Cpu className="badge-icon" />
              <span>AI/ML & VR Developer</span>
              <AnimatePresence>
                {showSparkles && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="sparkle"
                  >
                    <Sparkles size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hi, I'm <span className="gradient-text">Sunkeerth</span>
            </motion.h1>
            
            <motion.div 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span>I create </span>
              <span className="typing-text">{currentText}</span>
              <span className="cursor">|</span>
              <span> solutions</span>
            </motion.div>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Building intelligent systems and immersive experiences that push the boundaries 
              of technology. Specializing in machine learning, computer vision, virtual reality, 
              and embedded AI systems with 3+ years of hands-on experience.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a 
                href="#projects" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain size={18} />
                View My Work
                <ArrowRight />
              </motion.a>
              <motion.a 
                href="/resume.pdf" 
                className="btn btn-outline"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                download
              >
                <Download size={18} />
                Download CV
              </motion.a>
            </motion.div>

            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="stat">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">7+</div>
                <div className="stat-label">Major Projects</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced 3D Portfolio World */}
          <motion.div 
            className="hero-3d-world"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Portfolio3DWorld />
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-line"></div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}

export default Hero