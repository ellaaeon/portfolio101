"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useEasterEggs } from "@/context/EasterEggContext";
import { useReducedMotion } from "@/hooks/useMotion";

function Cube() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.8;
    ref.current.position.y = Math.sin(t * 1.5) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.7}
        roughness={0.2}
        emissive="#6366f1"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

export default function FloatingCube() {
  const { developerMode } = useEasterEggs();
  const reduced = useReducedMotion();

  if (!developerMode || reduced) return null;

  return (
    <div
      className="pointer-events-auto fixed bottom-6 left-6 z-30 h-20 w-20 cursor-grab active:cursor-grabbing"
      title="Developer Mode — Secret Cube"
      data-cursor="link"
      data-cursor-text="Dev"
    >
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#a855f7" />
        <Suspense fallback={null}>
          <Cube />
        </Suspense>
      </Canvas>
    </div>
  );
}
