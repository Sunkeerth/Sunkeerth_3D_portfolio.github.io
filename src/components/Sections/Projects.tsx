import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Brain, Cpu, Code, Smartphone, Camera, Box, Car } from 'lucide-react'
import './Projects.css'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Telemedicine Kiosk',
      description: 'Healthcare platform that reduced rural patient wait times by 50% through AI-driven scheduling & QR-based registration. Implemented voice-assisted UI for non-literate patients.',
      category: 'ai-ml',
      tags: ['Node.js', 'Express.js', 'JavaScript', 'AI Scheduling', 'Healthcare'],
      image: '/api/placeholder/400/250',
      links: {
        demo: 'https://sunkeerth.github.io/MINI_PROJECT_KISOK/',
        code: 'https://github.com/Sunkeerth/MINI_PROJECT_KISOK'
      },
      icon: Brain
    },
    {
      id: 2,
      title: 'Virtual Reality University (VRU)',
      description: 'VR-based learning platform integrating VR labs, 3D simulations, and hackathons. Achieved 90% efficiency improvement through project-based skill evaluation.',
      category: 'vr-ar',
      tags: ['Unity', 'VR/AR/XR', '3D Modeling', 'Education Tech'],
      image: '/api/placeholder/400/250',
      links: {
        demo: '#',
        code: 'https://github.com/Sunkeerth/RAGC-Virtual-university-'
      },
      icon: Smartphone
    },
    {
      id: 3,
      title: 'Embedded AI-Based Blind Spot Vehicle Detection System',
      description: 'Real-time embedded AI system for Indian trucks that detects vehicles in blind spots and warns drivers with visual and audible alerts. Uses Raspberry Pi, TensorFlow Lite, and ultrasonic sensors.',
      category: 'embedded',
      tags: ['Python', 'TensorFlow Lite', 'Raspberry Pi', 'ESP32-CAM', 'Ultrasonic', 'Embedded AI'],
      image: '/api/placeholder/400/250',
      links: {
        demo: '#',
        code: '#'
      },
      icon: Car
    },
    {
      id: 4,
      title: 'Smart Dual-Drone Agricultural System',
      description: 'Autonomous dual-drone system for precision agriculture that scans crops, identifies stressed plants, and autonomously sprays pesticides. Designed for National Innovation Challenge for Drone Application and Research (NIDAR). My role was Communication establishment between the drones and the Drones and Base Station',
      category: 'embedded',
      tags: ['Python', 'ROS 2', 'PX4', 'Jetson Nano', 'Computer Vision', 'MAVLink', 'Unity'],
      image: '/api/placeholder/400/250',
      links: {
        demo: '#',
        code: '#'
      },
      icon: Camera
    },
    {
      id: 5,
      title: 'Reality Pod: Portable Affordable 3D Scanner',
      description: 'AI-powered portable 3D scanner that captures, reconstructs, and exports digital 3D models automatically. Uses Intel RealSense D435i and NVIDIA Jetson for edge computing, making 3D scanning accessible.',
      category: 'vr-ar',
      tags: ['Python', 'PyTorch', 'Open3D', 'Unity', 'Blender', '3D Reconstruction', 'AI'],
      image: '/api/placeholder/400/250',
      links: {
        demo: '#',
        code: '#'
      },
      icon: Box
    },
    {
      id: 6,
      title: 'Virtual Mouse Using Phone',
      description: 'Wireless phone-to-PC control application with 95% real-time synchronization using computer vision, enhancing accessibility and usability.',
      category: 'ai-ml',
      tags: ['JavaScript', 'Python', 'Flask', 'Computer Vision'],
      image: '/api/placeholder/400/250',
      links: {
        demo: '#',
        code: '#'
      },
      icon: Cpu
    },
    {
      id: 7,
      title: 'Cloud Cost Optimization for VR Platform',
      description: 'Engineered decentralized Unity asset storage system leveraging 200+ GitHub repositories. Optimized storage infrastructure to reduce cloud costs by ~60% while maintaining scalable performance.',
      category: 'embedded',
      tags: ['Unity', 'GitHub API', 'AWS/GCP', 'Cloud Optimization', 'Cost Reduction'],
      image: '/api/placeholder/400/250',
      links: {
        demo: '#',
        code: '#'
      },
      icon: Cpu
    }
  ]

  const filters = [
    { key: 'all', label: 'All Projects', icon: Code },
    { key: 'ai-ml', label: 'AI/ML', icon: Brain },
    { key: 'vr-ar', label: 'VR/AR', icon: Smartphone },
    { key: 'embedded', label: 'Embedded AI', icon: Cpu }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

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

  // Get icon for project category
  const getProjectIcon = (project: any) => {
    const IconComponent = project.icon;
    return <IconComponent />;
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>My Projects</h2>
          <p>Showcasing my work in AI, VR and embedded systems</p>
        </div>

        <div className="projects-filter">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              <filter.icon className="filter-icon" />
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          key={activeFilter}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <div className="image-placeholder">
                    {getProjectIcon(project)}
                  </div>
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.links.demo} className="project-link">
                        <ExternalLink />
                      </a>
                      <a href={project.links.code} className="project-link">
                        <Github />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects