import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((__, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.5}>
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.7}
      />
    </Sphere>
  )
}

const Scene: React.FC = () => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default Scene