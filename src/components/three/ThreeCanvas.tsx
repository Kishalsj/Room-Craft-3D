import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeCanvasProps {
  children?: React.ReactNode;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ children }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 4, 4], fov: 50 }}
      className="w-full h-full"
    >
      <color attach="background" args={['#f5f5f5']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      <Environment preset="apartment" />
      
      <group position={[0, -1, 0]}>
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, 0, 0]}
          opacity={0.6}
          width={10}
          height={10}
          blur={2}
          far={10}
        />
        
        {children}
      </group>
      
      <OrbitControls makeDefault />
    </Canvas>
  );
};

// Basic room component with a floor and walls
export const Room: React.FC<{
  width: number;
  length: number;
  height: number;
  floorColor: string;
  wallColor: string;
}> = ({ width, length, height, floorColor, wallColor }) => {
  const halfWidth = width / 2;
  const halfLength = length / 2;
  
  return (
    <group>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Back Wall */}
      <mesh 
        position={[0, height / 2, -halfLength]} 
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      
      {/* Left Wall */}
      <mesh 
        position={[-halfWidth, height / 2, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      
      {/* Right Wall */}
      <mesh 
        position={[halfWidth, height / 2, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  );
};

// Basic chair component as a placeholder
export const Chair: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position, rotation = [0, 0, 0], color = '#A0522D' }) => {
  return (
    <group position={position} rotation={rotation.map(r => r * Math.PI / 180) as [number, number, number]}>
      {/* Seat */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back */}
      <mesh position={[0, 0.6, -0.225]} castShadow>
        <boxGeometry args={[0.5, 0.65, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      {[
        [0.2, 0.1, 0.2],
        [-0.2, 0.1, 0.2],
        [0.2, 0.1, -0.2],
        [-0.2, 0.1, -0.2]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.05, 0.25, 0.05]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

// Basic table component as a placeholder
export const Table: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  width?: number;
  length?: number;
  height?: number;
}> = ({ 
  position, 
  rotation = [0, 0, 0], 
  color = '#8B4513',
  width = 1.2,
  length = 0.8,
  height = 0.75
}) => {
  return (
    <group 
      position={position} 
      rotation={rotation.map(r => r * Math.PI / 180) as [number, number, number]}
    >
      {/* Table top */}
      <mesh position={[0, height, 0]} castShadow>
        <boxGeometry args={[width, 0.05, length]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      {[
        [width/2 - 0.1, height/2, length/2 - 0.1],
        [-width/2 + 0.1, height/2, length/2 - 0.1],
        [width/2 - 0.1, height/2, -length/2 + 0.1],
        [-width/2 + 0.1, height/2, -length/2 + 0.1]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.1, height, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

// Basic sofa component as a placeholder
export const Sofa: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}> = ({ position, rotation = [0, 0, 0], color = '#4169E1' }) => {
  return (
    <group 
      position={position} 
      rotation={rotation.map(r => r * Math.PI / 180) as [number, number, number]}
    >
      {/* Base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back */}
      <mesh position={[0, 0.75, -0.35]} castShadow>
        <boxGeometry args={[1.8, 0.5, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.85, 0.6, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.85, 0.6, 0]} castShadow>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Cushions */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.55, 0.1]} castShadow>
          <boxGeometry args={[0.55, 0.1, 0.6]} />
          <meshStandardMaterial color={color === '#4169E1' ? '#5A7CE1' : color} />
        </mesh>
      ))}
    </group>
  );
};

// TV component
export const TV: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group 
      position={position} 
      rotation={rotation.map(r => r * Math.PI / 180) as [number, number, number]}
    >
      {/* TV Screen */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Screen Display */}
      <mesh position={[0, 0, 0.028]} castShadow>
        <boxGeometry args={[1.1, 0.62, 0.01]} />
        <meshBasicMaterial color="#111827" />
      </mesh>
      
      {/* Stand Base */}
      <mesh position={[0, -0.45, 0.2]} castShadow>
        <boxGeometry args={[0.5, 0.05, 0.4]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
      
      {/* Stand Neck */}
      <mesh position={[0, -0.2, 0.2]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>
    </group>
  );
};

export default ThreeCanvas;