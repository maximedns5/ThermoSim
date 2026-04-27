// GroundGrid — grille technique au sol
import { useRef } from 'react';
import * as THREE from 'three';

interface GroundGridProps {
  size?: number;
  divisions?: number;
}

export function GroundGrid({ size = 60, divisions = 60 }: GroundGridProps) {
  return (
    <group>
      {/* Grille principale */}
      <gridHelper
        args={[size, divisions, '#C8C5BE', '#E2DFD8']}
        position={[0, -0.01, 0]}
      />
      {/* Plan de sol transparent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color="#EEEBE3" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
