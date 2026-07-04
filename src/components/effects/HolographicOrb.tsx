"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, MeshDistortMaterial } from "@react-three/drei";
import type { Group, Points } from "three";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useMotion";

function OrbScene({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<Group>(null);
  const ringsRef = useRef<Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.12;
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.35,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouse.x * 0.25,
        0.04
      );
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = t * 0.35;
      ringsRef.current.rotation.z = t * 0.22;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.03;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          distort={0.22}
          speed={1.8}
          roughness={0.08}
          metalness={0.85}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh scale={0.78}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.12} />
      </mesh>

      <Text
        position={[0, 0, 1.18]}
        fontSize={0.65}
        color="#f4f4f5"
        anchorX="center"
        anchorY="middle"
      >
        DA
      </Text>

      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.55, 0.018, 12, 80]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 3.2, 0.6, 0.2]}>
          <torusGeometry args={[1.78, 0.012, 12, 80]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[0.8, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[2.0, 0.01, 12, 80]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.25} />
        </mesh>
      </group>

      <OrbParticles />
    </group>
  );
}

function OrbParticles() {
  const count = 36;
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.4 + Math.random() * 0.9;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#818cf8"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

type HolographicOrbProps = {
  mouse: { x: number; y: number };
};

function OrbCanvas({ mouse }: HolographicOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-4, -2, 3]} intensity={0.6} color="#a855f7" />
      <spotLight
        position={[0, 5, 2]}
        intensity={0.4}
        color="#818cf8"
        angle={0.5}
        penumbra={1}
      />
      <Suspense fallback={null}>
        <OrbScene mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}

export default function HolographicOrb({
  mouse,
}: HolographicOrbProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex h-44 w-44 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-gradient-to-br from-[var(--accent)]/20 to-purple-500/20 text-4xl font-bold shadow-2xl glow-accent">
        DA
      </div>
    );
  }

  return (
    <div
      className="relative h-52 w-52 sm:h-60 sm:w-60"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(99, 102, 241, 0.25))",
      }}
    >
      <OrbCanvas mouse={mouse} />
    </div>
  );
}
