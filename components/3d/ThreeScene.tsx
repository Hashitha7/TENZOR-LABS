'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

function RotatingRing() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })
  return (
    <Torus ref={meshRef} args={[2.5, 0.04, 16, 100]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#00a8ff" opacity={0.4} transparent />
    </Torus>
  )
}

function RotatingRing2() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4
    }
  })
  return (
    <Torus ref={meshRef} args={[3.5, 0.025, 16, 100]} position={[0, 0, 0]}>
      <meshBasicMaterial color="#00d4ff" opacity={0.25} transparent />
    </Torus>
  )
}

function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })
  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00a8ff"
        wireframe
        distort={0.4}
        speed={2}
        opacity={0.3}
        transparent
      />
    </Sphere>
  )
}

function FloatingOctahedron({ position, scale, speed, color }: {
  position: [number, number, number]
  scale: number
  speed: number
  color: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.5
    }
  })
  return (
    <Octahedron ref={meshRef} args={[scale, 0]} position={position}>
      <meshBasicMaterial color={color} wireframe opacity={0.6} transparent />
    </Octahedron>
  )
}

function FloatingBox({ position, scale, speed }: {
  position: [number, number, number]
  scale: number
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.8
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.4
    }
  })
  return (
    <Box ref={meshRef} args={[scale, scale, scale]} position={position}>
      <meshBasicMaterial color="#0066ff" wireframe opacity={0.5} transparent />
    </Box>
  )
}

function ParticleField() {
  const count = 150
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#00a8ff" size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Normalize -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    // Smooth lerp toward mouse target — 0.03 is gentler than 0.04
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.03
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00a8ff" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#0066ff" intensity={1} />

      <CameraRig />
      <ParticleField />
      <CentralSphere />
      <RotatingRing />
      <RotatingRing2 />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingOctahedron position={[-4, 1, -2]} scale={0.6} speed={0.6} color="#00d4ff" />
      </Float>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <FloatingOctahedron position={[4, -1, -1]} scale={0.4} speed={0.8} color="#00a8ff" />
      </Float>
      <Float speed={1} rotationIntensity={0.4} floatIntensity={1.2}>
        <FloatingBox position={[-3, -2, -1]} scale={0.5} speed={0.5} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
        <FloatingBox position={[3, 2, -3]} scale={0.3} speed={0.7} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.1}>
        <FloatingOctahedron position={[0, 3, -3]} scale={0.35} speed={0.9} color="#ffffff" />
      </Float>
    </Canvas>
  )
}
