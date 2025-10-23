import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

const FloatingCube: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.2} />
    </Box>
  )
}

const FloatingSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.4, 32, 32]}>
      <meshStandardMaterial color="#06d6a0" emissive="#06d6a0" emissiveIntensity={0.2} />
    </Sphere>
  )
}

const FloatingCylinder: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.4
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + 1) * 0.3
    }
  })

  return (
    <Cylinder ref={meshRef} position={position} args={[0.3, 0.3, 0.6, 32]}>
      <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.2} />
    </Cylinder>
  )
}

const FloatingShapes: React.FC = () => {
  return (
    <group>
      <FloatingCube position={[-2, 0, 0]} />
      <FloatingSphere position={[0, 0, 0]} />
      <FloatingCylinder position={[2, 0, 0]} />
    </group>
  )
}

export default FloatingShapes