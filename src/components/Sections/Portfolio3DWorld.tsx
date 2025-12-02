// Portfolio3DWorld.tsx
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text, Billboard, Environment, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'
import './Portfolio3DWorld.css'

// Enhanced components with your actual projects
const Road = ({ length = 30 }) => {
  const roadRef = useRef<THREE.Mesh>(null)
  
  return (
    <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[6, length]} />
      <meshStandardMaterial 
        color="#1e293b" 
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}

const RoadMarkings = ({ length = 30 }) => {
  const markings = []
  
  for (let i = -length/2; i < length/2; i += 2) {
    markings.push(
      <mesh key={i} position={[0, 0.02, i]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 1.2]} />
        <meshStandardMaterial 
          color="#6366f1" 
          emissive="#6366f1"
          emissiveIntensity={0.5}
        />
      </mesh>
    )
  }
  
  return <>{markings}</>
}

const FloatingInfoPanel = ({ position, content, type = "project" }: { position: [number, number, number]; content: { title?: string; name?: string; level?: number; tags?: string[]; }; type?: "project" | "skill" | string }) => {
  const panelRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  const getColor = () => {
    if (type === "project") return hovered ? "#6366f1" : "#3b82f6"
    if (type === "skill") return hovered ? "#06d6a0" : "#10b981"
    return "#8b5cf6"
  }

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Glowing orb */}
        <mesh 
          position={[0, 0.5, 0]}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color={getColor()}
            emissive={getColor()}
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Connection line */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>

        {/* Info panel */}
        <mesh 
          ref={panelRef}
          position={[0, -0.5, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
        >
          <boxGeometry args={[2.8, 1.8, 0.1]} />
          <meshStandardMaterial 
            color={hovered ? "#1e293b" : "#0f172a"}
            metalness={0.1}
            roughness={0.5}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Content */}
        <Billboard follow position={[0, -0.5, 0.06]}>
          <Text
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="top"
            maxWidth={2.5}
            font="/fonts/inter-bold.woff"
          >
            {content.title || content.name}
          </Text>
        </Billboard>

        {/* Subtitle */}
        <Billboard follow position={[0, -1.1, 0.06]}>
          <Text
            fontSize={0.1}
            color={type === "skill" ? "#34d399" : "#94a3b8"}
            anchorX="center"
            anchorY="top"
            maxWidth={2.5}
          >
            {type === "skill" ? `${content.level}% Proficiency` : content.tags?.slice(0, 2).join(' • ')}
          </Text>
        </Billboard>

        {/* Click indicator */}
        <Billboard follow position={[0, -1.4, 0.06]}>
          <Text
            fontSize={0.08}
            color={hovered ? "#6366f1" : "#6366f199"}
            anchorX="center"
            anchorY="top"
          >
            Click for details
          </Text>
        </Billboard>
      </group>
    </Float>
  )
}

const Ground = () => {
  const groundRef = useRef<THREE.Mesh>(null)
  
  return (
    <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
      <planeGeometry args={[40, 30]} />
      <meshStandardMaterial 
        color="#0f766e"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

const Tree = ({ position, size = 1 }: any) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.8 * size, 0]}>
        <cylinderGeometry args={[0.15 * size, 0.2 * size, 1.6 * size, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2 * size, 0]}>
        <sphereGeometry args={[0.8 * size, 12, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>
    </group>
  )
}

const FloatingParticles = ({ count = 50 }) => {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particles = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i += 3) {
    particles[i] = (Math.random() - 0.5) * 30
    particles[i + 1] = Math.random() * 10
    particles[i + 2] = (Math.random() - 0.5) * 30
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

const Scene = ({ onItemClick, onInteraction }: any) => {
  const { camera, gl } = useThree()
  
  // Updated projects data from your projects component
  const projects = [
    {
      id: 1,
      title: "AI-Powered Telemedicine Kiosk",
      description: "Healthcare platform reducing rural patient wait times by 50% with AI-driven scheduling and QR-based registration.",
      tags: ["Node.js", "Express.js", "JavaScript", "AI Scheduling", "Healthcare", "Voice UI"],
      github: "https://github.com/Sunkeerth/MINI_PROJECT_KISOK",
      demo: "https://sunkeerth.github.io/MINI_PROJECT_KISOK/",
      position: [-5, 2, -8] as [number, number, number],
      category: "ai-ml"
    },
    {
      id: 2,
      title: "RGAC Virtual University",
      description: "VR-based learning platform with 90% efficiency improvement featuring virtual laboratories and 3D simulations.",
      tags: ["Unity", "VR/AR/XR", "3D Modeling", "Education Tech", "Immersive Learning"],
      github: "https://github.com/Sunkeerth/RAGC-Virtual-university-",
      demo: "#",
      position: [-5, 2, 0] as [number, number, number],
      category: "vr-ar"
    },
    {
      id: 3,
      title: "Phone-to-PC Virtual Mouse Controller",
      description: "Mobile phone as wireless mouse for laptop/PC using socket connection over WiFi.",
      tags: ["Python", "Socket Programming", "Android", "Java", "WiFi", "Real-time Communication"],
      github: "https://github.com/Sunkeerth/Virtual-Mouse",
      demo: "#",
      position: [-5, 2, 8] as [number, number, number],
      category: "mobile"
    },
    {
      id: 4,
      title: "Embedded AI-Based Blind Spot Detection",
      description: "Real-time embedded AI system for truck safety using computer vision and ultrasonic sensors.",
      tags: ["Python", "TensorFlow Lite", "Raspberry Pi", "ESP32-CAM", "Ultrasonic", "Embedded AI"],
      github: "#",
      demo: "#",
      position: [0, 2, -4] as [number, number, number],
      category: "embedded"
    },
    {
      id: 5,
      title: "Smart Dual-Drone Agricultural System",
      description: "Autonomous drone system for precision agriculture with crop scanning and targeted pesticide spraying.",
      tags: ["Python", "ROS 2", "PX4", "Jetson Nano", "Computer Vision", "MAVLink"],
      github: "#",
      demo: "#",
      position: [0, 2, 4] as [number, number, number],
      category: "embedded"
    }
  ]

  // Updated skills data
  const skills = [
    { 
      id: 1,
      name: "AI/ML Development", 
      level: 90, 
      description: "Expert in machine learning, deep learning, computer vision, and neural networks with TensorFlow and PyTorch.",
      projects: ["Telemedicine Kiosk", "Blind Spot Detection", "Smart Dual-Drone"],
      position: [5, 2, -8] as [number, number, number]
    },
    { 
      id: 2,
      name: "VR/AR Development", 
      level: 85, 
      description: "Proficient in Unity3D, 3D modeling, and creating immersive virtual and augmented reality experiences.",
      projects: ["RGAC Virtual University", "3D Applications", "Immersive Learning"],
      position: [5, 2, 0] as [number, number, number]
    },
    { 
      id: 3,
      name: "Mobile Development", 
      level: 80, 
      description: "Experienced in Android development, cross-platform apps, and mobile-first solutions.",
      projects: ["Virtual Mouse Controller", "Mobile Applications", "IoT Integration"],
      position: [5, 2, 8] as [number, number, number]
    },
    { 
      id: 4,
      name: "Embedded Systems", 
      level: 85, 
      description: "Skilled in integrating AI models with embedded systems, robotics, and IoT devices.",
      projects: ["Smart Dual-Drone", "Blind Spot Detection", "IoT Projects"],
      position: [8, 2, -4] as [number, number, number]
    },
    { 
      id: 5,
      name: "Full Stack Development", 
      level: 75, 
      description: "Proficient in building end-to-end web applications with modern frameworks and technologies.",
      projects: ["Telemedicine Kiosk", "Web Applications", "API Development"],
      position: [8, 2, 4] as [number, number, number]
    }
  ]

  useEffect(() => {
    camera.position.set(0, 4, 12)
    camera.lookAt(0, 0, 0)
  }, [camera])

  const handleItemClick = (item: any, type: string) => {
    onItemClick({ ...item, type })
    onInteraction()
  }

  // Handle canvas interactions for audio
  useEffect(() => {
    const handleInteraction = () => {
      onInteraction()
    }

    const canvas = gl.domElement
    canvas.addEventListener('mousedown', handleInteraction)
    canvas.addEventListener('touchstart', handleInteraction)

    return () => {
      canvas.removeEventListener('mousedown', handleInteraction)
      canvas.removeEventListener('touchstart', handleInteraction)
    }
  }, [gl, onInteraction])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#6366f1" />
      
      <Environment preset="night" background blur={0.5} />
      
      <FloatingParticles count={100} />
      <Sparkles count={50} scale={[30, 10, 30]} size={2} speed={0.3} />
      
      <Ground />
      <Road length={40} />
      <RoadMarkings length={40} />
      
      {/* Project Panels */}
      {projects.map((project) => (
        <mesh 
          key={project.id}
          onClick={() => handleItemClick(project, "project")}
          position={project.position}
        >
          <FloatingInfoPanel 
            position={[0, 0, 0]}
            content={project}
            type="project"
          />
        </mesh>
      ))}
      
      {/* Skills Panels */}
      {skills.map((skill) => (
        <mesh 
          key={skill.id}
          onClick={() => handleItemClick(skill, "skill")}
          position={skill.position}
        >
          <FloatingInfoPanel 
            position={[0, 0, 0]}
            content={skill}
            type="skill"
          />
        </mesh>
      ))}
      
      {/* Decorative Trees */}
      <Tree position={[-15, 0, -15]} size={1.2} />
      <Tree position={[15, 0, -15]} size={1} />
      <Tree position={[-15, 0, 15]} size={0.8} />
      <Tree position={[15, 0, 15]} size={1.1} />
      
      {/* Welcome Sign */}
      <Billboard position={[0, 3, -18]}>
        <Text
          fontSize={0.8}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          Welcome to My 3D Portfolio
        </Text>
      </Billboard>

      <Billboard position={[0, 2, -18]}>
        <Text
          fontSize={0.3}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          Explore my projects and skills
        </Text>
      </Billboard>
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={6}
        maxDistance={25}
        enableDamping
        dampingFactor={0.05}
        onChange={onInteraction} // Trigger audio when controls are used
      />
    </>
  )
}

const ItemModal = ({ item, isOpen, onClose }: any) => {
  if (!isOpen || !item) return null

  return (
    <div className="item-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h3>{item.title || item.name}</h3>
          <div className="item-type-badge">
            {item.type === 'project' ? '🚀 Project' : '💡 Skill'}
          </div>
        </div>

        <p className="item-description">{item.description}</p>

        {item.type === 'project' && (
          <>
            <div className="tags">
              {item.tags?.map((tag: string, index: number) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="project-links">
              {item.github && item.github !== '#' && (
                <a href={item.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>📁</span> GitHub
                </a>
              )}
              {item.demo && item.demo !== '#' && (
                <a href={item.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>🌐</span> Live Demo
                </a>
              )}
              {(item.github === '#' || item.demo === '#') && (
                <div className="coming-soon">
                  🔄 More details coming soon...
                </div>
              )}
            </div>
          </>
        )}

        {item.type === 'skill' && (
          <div className="skill-details">
            <div className="skill-level-display">
              <span>Proficiency Level: {item.level}%</span>
              <div className="skill-level-bar">
                <div 
                  className="skill-level-fill" 
                  style={{ width: `${item.level}%` }}
                ></div>
              </div>
            </div>
            
            {item.projects && (
              <div className="related-projects">
                <h4>Related Projects:</h4>
                <div className="project-tags">
                  {item.projects.map((project: string, index: number) => (
                    <span key={index} className="project-tag">{project}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Portfolio3DWorld = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Background music for the 3D world - using a placeholder URL
  // You can replace this with your own audio file
  const backgroundMusic = "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleWorldInteraction = () => {
    if (audioRef.current && !isAudioPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsAudioPlaying(true)
        })
        .catch(error => {
          console.log('Audio play failed:', error)
        })
    }
  }

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
    handleWorldInteraction()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <div className="portfolio-3d-world">
      {/* Audio element */}
      <audio 
        ref={audioRef} 
        loop
        preload="auto"
      >
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio controls */}
      <div className="audio-controls">
        <div className="volume-slider">
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <button 
          className={`audio-btn ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Audio visualization */}
      <div className={`audio-visualization ${isAudioPlaying && !isMuted ? 'active' : ''}`}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="audio-bar" />
        ))}
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading 3D Portfolio World...</p>
          <div className="loading-progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      )}
      
      <Canvas
        shadows
        camera={{ position: [0, 4, 12], fov: 50 }}
        className="three-canvas"
        gl={{ antialias: true }}
        onMouseDown={handleWorldInteraction}
        onTouchStart={handleWorldInteraction}
      >
        <Scene onItemClick={handleItemClick} onInteraction={handleWorldInteraction} />
      </Canvas>
      
      <div className="world-instructions">
        <p>🎮 Drag to look around • Scroll to zoom • Click on floating panels for details</p>
        {!isAudioPlaying && (
          <p className="audio-hint">🔊 Move around to activate ambient music</p>
        )}
      </div>

      <ItemModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Portfolio3DWorld