import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Box, Cpu, Rocket, Code2, Database } from 'lucide-react'
import './About.css'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const techStack = [
    { icon: Brain, name: 'AI/ML', color: '#6366f1' },
    { icon: Box, name: 'VR/XR', color: '#06d6a0' },
    { icon: Cpu, name: 'Embedded Systems', color: '#ff6b6b' },
    { icon: Rocket, name: '3D Development', color: '#8b5cf6' },
    { icon: Code2, name: 'Full Stack Development', color: '#3b82f6' },
    { icon: Database, name: 'Database', color: '#f59e0b' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
          <p>Discover my journey in AI, ML, VR/XR and embedded systems development</p>
        </div>

        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <h3>AI & ML Developer with VR/XR Expertise</h3>
            <p>
              I'm a passionate developer specializing in Artificial Intelligence, Machine Learning, 
              and immersive technologies like Virtual Reality and Augmented Reality. My expertise 
              extends to embedded AI systems, where I combine hardware and software to create 
              intelligent solutions.
            </p>
            <p>
              With a strong foundation in computer science and a keen interest in emerging 
              technologies, I strive to create innovative solutions that push the boundaries 
              of what's possible. From developing machine learning models to building 
              immersive VR experiences, I'm constantly exploring new frontiers in technology.
            </p>
            
            <div className="stats">
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">1+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Technologies</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-visual" variants={itemVariants}>
            <div className="tech-grid">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  className="tech-card"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <tech.icon 
                    className="tech-icon" 
                    style={{ color: tech.color }}
                  />
                  <span>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About