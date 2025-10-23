import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

interface Node {
  position: [number, number, number]
  connections: number[]
}

const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  const nodes: Node[] = [
    { position: [-2, 2, 0], connections: [1, 2] },
    { position: [2, 2, 0], connections: [0, 3] },
    { position: [-2, 0, 0], connections: [0, 3] },
    { position: [2, 0, 0], connections: [1, 2] },
    { position: [0, -2, 0], connections: [0, 1, 2, 3] }
  ]

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, index) => (
        <Sphere key={index} args={[0.1, 16, 16]} position={node.position}>
          <meshBasicMaterial color="#6366f1" />
        </Sphere>
      ))}
      
      {/* Connections */}
      {nodes.map((node, index) =>
        node.connections.map(connectionIndex => (
          <Line
            key={`${index}-${connectionIndex}`}
            points={[node.position, nodes[connectionIndex].position]}
            color="#6366f1"
            lineWidth={1}
            opacity={0.6}
            transparent
          />
        ))
      )}
    </group>
  )
}

export default NeuralNetwork