// Scène Three.js principale
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, AdaptiveDpr, AdaptiveEvents, Stats } from '@react-three/drei';
import { OrbitCameraRig } from './OrbitCameraRig';
import { GroundGrid } from './GroundGrid';
import { BuildingModel } from './BuildingModel';
import { ExplodedLayers } from './ExplodedLayers';
import { SectionCutPlane } from './SectionCutPlane';
import { NorthIndicator3D } from './NorthIndicator3D';
import { Cartouche3D } from './Cartouche3D';

export function BuildingScene() {
  return (
    <div className="w-full h-full bg-paper-alt">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [20, 16, 20], fov: 40, near: 0.1, far: 300 }}
        gl={{
          antialias: true,
          localClippingEnabled: true,
          toneMapping: 0, // NoToneMapping — rendu neutre "blueprint"
        }}
        style={{ background: '#D8D5CE' }}
      >
        <Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          {/* Lumières — style technique indirect */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 20, 10]} intensity={0.6} castShadow shadow-mapSize={[2048, 2048]} />
          <directionalLight position={[-10, 10, -10]} intensity={0.2} />

          <SectionCutPlane />
          <OrbitCameraRig />
          <GroundGrid size={60} divisions={60} />
          <BuildingModel />
          <ExplodedLayers />
          <NorthIndicator3D position={[-12, 0, -12]} />
          <Cartouche3D />

          {import.meta.env.DEV && <Stats />}
        </Suspense>
      </Canvas>
    </div>
  );
}
