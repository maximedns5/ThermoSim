// OrbitCameraRig — contrôles caméra + presets isométrique/façade/coupe
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

type CameraPreset = 'isometric' | 'south_facade' | 'section' | 'top';

const PRESETS: Record<CameraPreset, { position: THREE.Vector3; target: THREE.Vector3 }> = {
  isometric:    { position: new THREE.Vector3(20, 16, 20), target: new THREE.Vector3(0, 4, 0) },
  south_facade: { position: new THREE.Vector3(0, 6, 25),  target: new THREE.Vector3(0, 4, 0) },
  section:      { position: new THREE.Vector3(25, 6, 0),  target: new THREE.Vector3(0, 4, 0) },
  top:          { position: new THREE.Vector3(0, 30, 0),  target: new THREE.Vector3(0, 0, 0) },
};

export function OrbitCameraRig() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { activeView } = useUIStore();
  const preset = useRef<CameraPreset>('isometric');

  const applyPreset = (p: CameraPreset) => {
    const { position, target } = PRESETS[p];
    camera.position.copy(position);
    if (controlsRef.current) {
      controlsRef.current.target.copy(target);
      controlsRef.current.update();
    }
  };

  useEffect(() => {
    if (activeView === '3d') applyPreset('isometric');
  }, [activeView]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.07}
      minDistance={3}
      maxDistance={80}
      maxPolarAngle={Math.PI / 2}
      target={[0, 4, 0]}
    />
  );
}
