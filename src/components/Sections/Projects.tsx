import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  ExternalLink, Github, Brain, Cpu, Code, Smartphone, 
  Car, FileText, Play, Image, X, Download,
  Calendar, Clock, Users, Maximize2, Minimize2, Wifi
} from 'lucide-react'
import './Projects.css'

// Import project images
import telemedicine1 from '../../assets/projects/telemedicine/image1.jpg'
import telemedicine2 from '../../assets/projects/telemedicine/image2.jpg'
import telemedicine3 from '../../assets/projects/telemedicine/image3.jpg'

import vru1 from '../../assets/projects/vru/image1.png'
import vru2 from '../../assets/projects/vru/image2.png'

import blindspot2 from '../../assets/projects/blindspot/image2.png'
import blindspot3 from '../../assets/projects/blindspot/image3.jpg'

// import drone1 from '../../assets/projects/drone/image1.png'
// import drone2 from '../../assets/projects/drone/image2.jpg'

// Import project videos
import telemedicineDemo from '../../assets/projects/telemedicine/demo.mp4'
import vruDemo from '../../assets/projects/vru/video1.mp4'
import vruDemo2 from '../../assets/projects/vru/video2.mp4'
import virtualMouseVideo from '../../assets/projects/virtual-mouse/demo.mp4'

// Import project documents
import telemedicineTechDocs from '../../assets/projects/telemedicine/report.pdf'
import vruArchitecture from '../../assets/projects/vru/report.pdf'
import blindspotPaper from '../../assets/projects/blindspot/report.pdf'
// import droneProposal from '../../assets/projects/drone/Drone_communication.pdf'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [mediaView, setMediaView] = useState<'image' | 'video' | 'document'>('image')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Project data with imported assets
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Telemedicine Kiosk',
      shortDescription: 'Healthcare platform reducing rural patient wait times by 50%',
      fullDescription: 'A comprehensive healthcare solution that leverages AI-driven scheduling and QR-based registration to streamline patient flow in rural areas. Features voice-assisted UI for non-literate patients and real-time appointment management system.',
      category: 'ai-ml',
      tags: ['Node.js', 'Express.js', 'JavaScript', 'AI Scheduling', 'Healthcare', 'Voice UI'],
      images: [telemedicine1, telemedicine2, telemedicine3],
      videos: [telemedicineDemo],
      documents: [
        { 
          name: 'report.pdf', 
          url: telemedicineTechDocs, 
          size: '1.8 MB',
          type: 'pdf'
        }
      ],
      links: {
        demo: 'https://sunkeerth.github.io/MINI_PROJECT_KISOK/',
        code: 'https://github.com/Sunkeerth/MINI_PROJECT_KISOK'
      },
      features: [
        'AI-driven appointment scheduling',
        'QR-based patient registration',
        'Voice-assisted UI for accessibility',
        'Real-time patient flow management',
        'Automated triage system'
      ],
      stats: {
        timeline: '6 Months',
        teamSize: '4 People',
        completion: 'Completed'
      },
      icon: Brain,
      status: 'completed'
    },
    {
      id: 2,
      title: 'RGAC Virtual University',
      shortDescription: 'VR-based learning platform with 90% efficiency improvement',
      fullDescription: 'An immersive VR learning platform integrating virtual laboratories, 3D simulations, and collaborative hackathon spaces. Implements project-based skill evaluation for enhanced learning outcomes.',
      category: 'vr-ar',
      tags: ['Unity', 'VR/AR/XR', '3D Modeling', 'Education Tech', 'Immersive Learning'],
      images: [vru1, vru2],
      videos: [vruDemo, vruDemo2],
      documents: [
        { 
          name: 'report1.pdf', 
          url: vruArchitecture, 
          size: '1.5 MB',
          type: 'pdf'
        }
      ],
      links: {
        demo: 'Video1',
        code: 'https://github.com/Sunkeerth/RAGC-Virtual-university-'
      },
      features: [
        'Immersive VR laboratories',
        'Interactive 3D simulations',
        'Collaborative hackathon spaces',
        'Project-based evaluation',
        'Real-time multiplayer sessions'
      ],
      stats: {
        timeline: '8 Months',
        teamSize: '6 People',
        completion: 'In Development'
      },
      icon: Smartphone,
      status: 'development'
    },
    {
      id: 3,
      title: 'Phone-to-PC Virtual Mouse Controller',
      shortDescription: 'Mobile phone as wireless mouse for laptop/PC using socket connection',
      fullDescription: 'An innovative wireless control system that transforms your smartphone into a virtual mouse for your laptop or PC. Using socket-based real-time communication, this application enables seamless cursor control, click operations, and gesture-based commands through WiFi connectivity. Perfect for presentations and remote desktop control.',
      category: 'mobile',
      tags: ['Python', 'Socket Programming', 'Android', 'Java', 'WiFi', 'Real-time Communication', 'Mouse Control'],
      images: [
        'https://picsum.photos/600/400?random=10',
        'https://picsum.photos/600/400?random=11',
        'https://picsum.photos/600/400?random=12'
      ],
      videos: [virtualMouseVideo],
      documents: [
        { 
          name: 'doc.pdf', 
          url: '#',
          size: '1.2 MB',
          type: 'pdf'
        }
      ],
      links: {
        demo: 'demo.mp4',
        code: 'https://github.com/Sunkeerth/Virtual-Mouse'
      },
      features: [
        'Real-time socket communication over WiFi',
        'Touch-based cursor control from phone',
        'Left/right click functionality',
        'Scroll gestures support',
        'Multi-touch support for advanced operations',
        'Low latency performance'
      ],
      stats: {
        timeline: '2 Months',
        teamSize: '1 Person',
        completion: 'Completed'
      },
      icon: Wifi,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Embedded AI-Based Blind Spot Vehicle Detection System',
      shortDescription: 'Real-time embedded AI system for truck safety',
      fullDescription: 'An advanced embedded AI system designed for commercial vehicles to detect objects in blind spots using computer vision and ultrasonic sensors. Provides real-time alerts to prevent accidents.',
      category: 'embedded',
      tags: ['Python', 'TensorFlow Lite', 'Raspberry Pi', 'ESP32-CAM', 'Ultrasonic', 'Embedded AI'],
      images: [blindspot2, blindspot3],
      videos: [],
      documents: [
        { 
          name: 'report.pdf', 
          url: blindspotPaper, 
          size: '3.2 MB',
          type: 'pdf'
        },
      ],
      links: {
        demo: 'demo.mp4',
        // code: '#'
      },
      features: [
        'Real-time vehicle detection',
        'Multiple sensor integration',
        'Visual and audible alerts',
        'Low-power embedded design',
        'Weather-resistant housing'
      ],
      stats: {
        timeline: '4 Months',
        teamSize: '3 People',
        completion: 'yet to be completed'
      },
      icon: Car,
      status: 'Ongoing'
    },
   
  ]

  const filters = [
    { key: 'all', label: 'All Projects', icon: Code, count: projects.length },
    { key: 'ai-ml', label: 'AI/ML', icon: Brain, count: projects.filter(p => p.category === 'ai-ml').length },
    { key: 'vr-ar', label: 'VR/AR', icon: Smartphone, count: projects.filter(p => p.category === 'vr-ar').length },
    { key: 'mobile', label: 'Mobile Apps', icon: Wifi, count: projects.filter(p => p.category === 'mobile').length },
    { key: 'embedded', label: 'Embedded AI', icon: Cpu, count: projects.filter(p => p.category === 'embedded').length }
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

  const getProjectIcon = (project: any) => {
    const IconComponent = project.icon;
    return <IconComponent />;
  }

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setMediaView('image')
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
    setSelectedImage(null)
    setSelectedVideo(null)
    setSelectedDocument(null)
    setIsVideoFullscreen(false)
  }

  const openImageLightbox = (image: string) => {
    setSelectedImage(image)
  }

  const closeImageLightbox = () => {
    setSelectedImage(null)
  }

  const openVideoPlayer = (video: string) => {
    setSelectedVideo(video)
  }

  const closeVideoPlayer = () => {
    setSelectedVideo(null)
    setIsVideoFullscreen(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const openDocumentViewer = (document: any) => {
    setSelectedDocument(document)
  }

  const closeDocumentViewer = () => {
    setSelectedDocument(null)
  }

  const toggleVideoFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`)
        })
        setIsVideoFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsVideoFullscreen(false)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'development': return '#f59e0b';
      case 'prototype': return '#8b5cf6';
      case 'Ongoing': return '#f59e0b';
      default: return '#6b7280';
    }
  }

  // Safe image display component with fallback
  const SafeImage = ({ src, alt, className = '' }: { src: any, alt: string, className?: string }) => {
    const actualSrc = typeof src === 'string' ? src : (src?.default || src);
  
    const [imgSrc, setImgSrc] = useState<string>(actualSrc || '');
    const [hasError, setHasError] = useState(false);
  
    const handleError = () => {
      if (!hasError) {
        setHasError(true);
        setImgSrc(`https://picsum.photos/400/250?random=${Math.random()}`);
      }
    };
  
    return (
      <img 
        src={imgSrc} 
        alt={alt} 
        className={className}
        onError={handleError}
        loading="lazy"
      />
    );
  };

  // Safe video source component
  const SafeVideo = ({ src, className = '' }: { src: any, className?: string }) => {
    const videoSrc = typeof src === 'string' ? src : (src?.default || src);
    
    return (
      <video className={className} controls ref={videoRef}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>Showcasing innovative solutions in AI, VR/AR, Mobile Apps, and Embedded Systems</p>
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
              <span className="filter-count">({filter.count})</span>
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
                whileHover={{ y: -5 }}
              >
                <div className="project-header">
                  <div className="project-icon">
                    {getProjectIcon(project)}
                  </div>
                  <div className="project-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(project.status) }}
                    >
                      {project.stats.completion}
                    </span>
                  </div>
                </div>

                <div className="project-image" onClick={() => openProjectModal(project)}>
                  <SafeImage src={project.images[0]} alt={project.title} />
                  <div className="project-overlay">
                    <div className="media-indicators">
                      {project.images.length > 0 && (
                        <div className="media-indicator">
                          <Image size={14} />
                          <span>{project.images.length}</span>
                        </div>
                      )}
                      {project.videos.length > 0 && (
                        <div className="media-indicator">
                          <Play size={14} />
                          <span>{project.videos.length}</span>
                        </div>
                      )}
                      {project.documents.length > 0 && (
                        <div className="media-indicator">
                          <FileText size={14} />
                          <span>{project.documents.length}</span>
                        </div>
                      )}
                    </div>
                    <div className="view-project-btn">
                      View Details
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <h3 onClick={() => openProjectModal(project)}>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                  
                  <div className="project-stats">
                    <div className="stat">
                      <Clock size={14} />
                      <span>{project.stats.timeline}</span>
                    </div>
                    <div className="stat">
                      <Users size={14} />
                      <span>{project.stats.teamSize}</span>
                    </div>
                  </div>
                  
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag-more">+{project.tags.length - 3} more</span>
                    )}
                  </div>

                  <div className="project-actions">
                    <a 
                      href={project.links.demo} 
                      className="action-btn demo-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.links.demo === '#') {
                          e.preventDefault();
                          alert('Demo link coming soon!');
                        }
                      }}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                    <a 
                      href={project.links.code} 
                      className="action-btn code-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (project.links.code === '#') {
                          e.preventDefault();
                          alert('Code repository coming soon!');
                        }
                      }}
                    >
                      <Github size={16} />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeProjectModal}>
                <X size={24} />
              </button>

              <div className="modal-header">
                <div className="project-title-section">
                  <div className="title-icon">
                    {getProjectIcon(selectedProject)}
                  </div>
                  <div>
                    <h2>{selectedProject.title}</h2>
                    <div className="project-meta-info">
                      <span 
                        className="status-badge large"
                        style={{ backgroundColor: getStatusColor(selectedProject.status) }}
                      >
                        {selectedProject.stats.completion}
                      </span>
                      <div className="meta-stats">
                        <div className="meta-stat">
                          <Calendar size={14} />
                          <span>{selectedProject.stats.timeline}</span>
                        </div>
                        <div className="meta-stat">
                          <Users size={14} />
                          <span>{selectedProject.stats.teamSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="project-full-description">{selectedProject.fullDescription}</p>
              </div>

              <div className="modal-body">
                <div className="modal-sidebar">
                  <div className="sidebar-section">
                    <h4>Key Features</h4>
                    <ul className="features-list">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <li key={index}>
                          <div className="feature-bullet"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sidebar-section">
                    <h4>Technologies Used</h4>
                    <div className="technologies-grid">
                      {selectedProject.tags.map((tag: string) => (
                        <span key={tag} className="technology-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="sidebar-section">
                    <h4>Project Links</h4>
                    <div className="project-links-vertical">
                      <a 
                        href={selectedProject.links.demo} 
                        className="demo-link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (selectedProject.links.demo === '#') {
                            e.preventDefault();
                            alert('Demo link coming soon!');
                          }
                        }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                      <a 
                        href={selectedProject.links.code} 
                        className="code-link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (selectedProject.links.code === '#') {
                            e.preventDefault();
                            alert('Code repository coming soon!');
                          }
                        }}
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    </div>
                  </div>
                </div>

                <div className="modal-main-content">
                  <div className="media-tabs">
                    <button
                      className={`tab-button ${mediaView === 'image' ? 'active' : ''}`}
                      onClick={() => setMediaView('image')}
                    >
                      <Image size={18} />
                      Images
                      <span className="tab-count">{selectedProject.images.length}</span>
                    </button>
                    <button
                      className={`tab-button ${mediaView === 'video' ? 'active' : ''}`}
                      onClick={() => setMediaView('video')}
                    >
                      <Play size={18} />
                      Videos
                      <span className="tab-count">{selectedProject.videos.length}</span>
                    </button>
                    <button
                      className={`tab-button ${mediaView === 'document' ? 'active' : ''}`}
                      onClick={() => setMediaView('document')}
                    >
                      <FileText size={18} />
                      Documents
                      <span className="tab-count">{selectedProject.documents.length}</span>
                    </button>
                  </div>

                  <div className="media-content">
                    {mediaView === 'image' && (
                      <div className="images-grid">
                        {selectedProject.images.map((image: any, index: number) => (
                          <div 
                            key={index} 
                            className="media-item image-item"
                            onClick={() => openImageLightbox(image)}
                          >
                            <SafeImage src={image} alt={`${selectedProject.title} ${index + 1}`} />
                            <div className="image-overlay">
                              <Image size={24} />
                              <span>Click to enlarge</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {mediaView === 'video' && (
                      <div className="videos-section">
                        <div className="videos-grid">
                          {selectedProject.videos.map((video: any, index: number) => (
                            <div key={index} className="video-item">
                              <div className="video-thumbnail" onClick={() => openVideoPlayer(video)}>
                                <SafeImage 
                                  src={selectedProject.images[0]} 
                                  alt={`${selectedProject.title} Video ${index + 1}`} 
                                />
                                <div className="video-play-overlay">
                                  <Play size={48} />
                                  <span>Play Video {index + 1}</span>
                                </div>
                                <div className="video-duration">2:30</div>
                              </div>
                              <div className="video-info">
                                <span className="video-title">Demo Video {index + 1}</span>
                                <button 
                                  className="play-video-btn"
                                  onClick={() => openVideoPlayer(video)}
                                >
                                  <Play size={16} />
                                  Play
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {mediaView === 'document' && (
                      <div className="documents-section">
                        <div className="documents-grid">
                          {selectedProject.documents.map((doc: any, index: number) => (
                            <div
                              key={index}
                              className="document-card"
                              onClick={() => openDocumentViewer(doc)}
                            >
                              <div className="document-icon">
                                <FileText size={32} />
                              </div>
                              <div className="document-info">
                                <span className="document-name">{doc.name}</span>
                                <span className="document-size">{doc.size}</span>
                                <span className="document-type">{doc.type}</span>
                              </div>
                              <div className="document-actions">
                                <button 
                                  className="view-document-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openDocumentViewer(doc);
                                  }}
                                >
                                  <FileText size={16} />
                                  View
                                </button>
                                <a 
                                  href={doc.url}
                                  className="download-document-btn"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Download size={16} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="media-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageLightbox}
          >
            <button className="lightbox-close" onClick={closeImageLightbox}>
              <X size={24} />
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <SafeImage src={selectedImage} alt="Enlarged view" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="media-lightbox video-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoPlayer}
          >
            <button className="lightbox-close" onClick={closeVideoPlayer}>
              <X size={24} />
            </button>
            <div className="lightbox-content video-container" onClick={(e) => e.stopPropagation()}>
              <div className="video-player-wrapper">
                <SafeVideo src={selectedVideo} className="video-player" />
                <div className="video-controls">
                  <button className="fullscreen-btn" onClick={toggleVideoFullscreen}>
                    {isVideoFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            className="media-lightbox document-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDocumentViewer}
          >
            <button className="lightbox-close" onClick={closeDocumentViewer}>
              <X size={24} />
            </button>
            <div className="lightbox-content document-container" onClick={(e) => e.stopPropagation()}>
              <div className="document-viewer">
                <div className="document-header">
                  <div className="document-title">
                    <FileText size={24} />
                    <h3>{selectedDocument.name}</h3>
                  </div>
                  <div className="document-actions">
                    <a 
                      href={selectedDocument.url}
                      className="download-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download size={20} />
                      Download
                    </a>
                  </div>
                </div>
                <div className="document-content">
                  <iframe
                    src={selectedDocument.url}
                    title={selectedDocument.name}
                    className="document-iframe"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  <div className="document-fallback">
                    <FileText size={64} />
                    <p>Preview not available</p>
                    <a 
                      href={selectedDocument.url}
                      className="view-external-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in new tab
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects