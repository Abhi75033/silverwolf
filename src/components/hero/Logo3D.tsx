import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial, Float, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Wolf Head Component
const WolfHead = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0.5, 0]} scale={[1.2, 1.2, 1.2]}>
        {/* Wolf head shape - stylized */}
        <sphereGeometry args={[0.8, 16, 16]} />
        <MeshDistortMaterial
          color="#4FC3F7"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      
      {/* Wolf ears */}
      <mesh position={[-0.4, 1.1, 0.2]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.2, 0.6, 8]} />
        <MeshDistortMaterial
          color="#7B1FA2"
          distort={0.2}
          speed={1.5}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      
      <mesh position={[0.4, 1.1, 0.2]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.2, 0.6, 8]} />
        <MeshDistortMaterial
          color="#7B1FA2"
          distort={0.2}
          speed={1.5}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      
      {/* Wolf snout */}
      <mesh position={[0, 0.2, 0.6]} scale={[0.6, 0.4, 0.8]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <MeshDistortMaterial
          color="#81C784"
          distort={0.1}
          speed={3}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.25, 0.6, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#4FC3F7" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[0.25, 0.6, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#4FC3F7" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
};

// Tech Orbits Component
const TechOrbits = () => {
  const orbitRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={0.2} />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2.3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#7B1FA2" emissive="#7B1FA2" emissiveIntensity={0.2} />
      </mesh>
      
      <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.2} />
      </mesh>
      
      {/* Floating tech symbols */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#4FC3F7" emissive="#4FC3F7" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-2, 0.5, 0.5]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.08]} />
          <meshStandardMaterial color="#7B1FA2" emissive="#7B1FA2" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={3.5} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, -2, 1]}>
          <tetrahedronGeometry args={[0.1]} />
          <meshStandardMaterial color="#81C784" emissive="#81C784" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

// Main 3D Scene Component
const Logo3DScene = () => {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4FC3F7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7B1FA2" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#81C784"
        castShadow
      />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
      
      {/* 3D Logo Components */}
      <WolfHead />
      <TechOrbits />
      
      {/* Company Name in 3D */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.3}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/orbitron.woff"
        >
          SILVER WOLF
        </Text>
        <Text
          position={[0, -2.2, 0]}
          fontSize={0.15}
          color="#4FC3F7"
          anchorX="center"
          anchorY="middle"
          font="/fonts/orbitron.woff"
        >
          TECHNOLOGIES
        </Text>
      </Float>
    </Canvas>
  );
};

// Main Logo Component with Motion Wrapper
const Logo3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Canvas Container */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <Logo3DScene />
      </div>
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-wolf-blue/20 via-tech-purple/20 to-neon-green/20 blur-xl"
        animate={{
          opacity: isHovered ? 0.8 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Interactive ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-wolf-blue via-tech-purple to-neon-green"
        animate={{
          rotate: isHovered ? 360 : 0,
        }}
        transition={{ duration: 2, ease: "linear", repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
};

export default Logo3D;