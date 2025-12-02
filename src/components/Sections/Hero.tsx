// Hero.tsx
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Cpu, Sparkles, Download, Brain, Code2, Zap } from 'lucide-react'
import Portfolio3DWorld from './Portfolio3DWorld'
import './Hero.css'

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const texts = [
    'AI/ML Developer',
    'VR/XR Engineer', 
    'Computer Vision Expert',
    'Deep Learning Specialist',
    'Embedded AI Developer',
    'Full Stack Developer'
  ]

  // Typing effect with improved logic
  useEffect(() => {
    if (isPaused) return

    const current = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (currentText === current) {
          // Pause at full text
          setTimeout(() => setIsDeleting(true), 2000)
        } else {
          setCurrentText(current.slice(0, currentText.length + 1))
        }
      } else {
        // Deleting phase
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
        } else {
          setCurrentText(current.slice(0, currentText.length - 1))
        }
      }
    }, isDeleting ? 30 : 80)

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts, isPaused])

  // Sparkles effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 1500)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Mouse enter/leave handlers for typing effect
  const handleTextHoverStart = useCallback(() => setIsPaused(true), [])
  const handleTextHoverEnd = useCallback(() => setIsPaused(false), [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      {/* Enhanced Animated Background */}
      <div className="hero-background">
        <div className="floating-shapes">
          <motion.div 
            className="shape shape-1"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="shape shape-2"
            animate={{ 
              y: [0, 30, 0],
              x: [0, -15, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>
          <motion.div 
            className="shape shape-3"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 5, 0]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
          <motion.div 
            className="shape shape-4"
            animate={{ 
              y: [0, 25, 0],
              x: [0, -10, 0]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          ></motion.div>
        </div>
        
        {/* Animated gradient orbs */}
        <div className="gradient-orbs">
          <motion.div 
            className="orb orb-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="orb orb-2"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        <div className="gradient-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced Badge */}
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="badge-content">
                <Cpu className="badge-icon" />
                <span>AI/ML & VR Developer</span>
                <AnimatePresence>
                  {showSparkles && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      className="sparkle"
                    >
                      <Sparkles size={14} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Hi, I'm <span className="gradient-text">Sunkeerth</span>
              <motion.div 
                className="title-underline"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h1>
            
            {/* Enhanced Typing Text */}
            <motion.div 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              onHoverStart={handleTextHoverStart}
              onHoverEnd={handleTextHoverEnd}
            >
              <span>I'm a </span>
              <span className="typing-container">
                <span className="typing-text">{currentText}</span>
                <motion.span 
                  className="cursor"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Building <span className="highlight">intelligent systems</span> and{' '}
              <span className="highlight">immersive experiences</span> that push the boundaries 
              of technology. Specializing in machine learning, computer vision, virtual reality, 
              and embedded AI systems with <strong>3+ years</strong> of hands-on experience.
            </motion.p>
            
            {/* Enhanced Buttons */}
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <motion.button 
                onClick={scrollToProjects}
                className="btn btn-primary"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain size={18} />
                <span>View My Work</span>
                <ArrowRight size={16} />
              </motion.button>
              
              <motion.a 
                href="/resume.pdf" 
                className="btn btn-outline"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                download
              >
                <Download size={18} />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <motion.div 
                className="stat"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="stat-icon">🚀</div>
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </motion.div>
              <motion.div 
                className="stat"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: 0.1 }}
              >
                <div className="stat-icon">💼</div>
                <div className="stat-number">20+</div>
                <div className="stat-label">Projects Completed</div>
              </motion.div>
              <motion.div 
                className="stat"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: 0.2 }}
              >
                <div className="stat-icon">⚡</div>
                <div className="stat-number">15+</div>
                <div className="stat-label">Technologies</div>
              </motion.div>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div 
              className="tech-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="tech-label">Tech I Work With:</div>
              <div className="tech-tags">
                {['Python', 'TensorFlow', 'React', 'Three.js', 'OpenCV', 'Unity'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="tech-tag"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <Code2 size={12} />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Fixed 3D Portfolio World - Corrected Positioning */}
          <motion.div 
            className="hero-3d-container"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <div className="hero-3d-world">
              <Portfolio3DWorld />
            </div>
            {/* 3D World Indicator */}
            <motion.div 
              className="world-indicator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Zap size={14} />
              <span>Interactive 3D Portfolio</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div 
          className="scroll-line"
          animate={{ 
            height: [0, 30, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Scroll to explore
        </motion.span>
      </motion.div>
    </section>
  )
}

export default Hero