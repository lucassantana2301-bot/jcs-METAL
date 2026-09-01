"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";
import { MotionValue } from "framer-motion";

interface MetalStructureProps {
  scrollYProgress?: MotionValue<number>;
  dimensions?: { w: number; h: number; l: number };
}

export default function MetalStructure({ scrollYProgress, dimensions }: MetalStructureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);

  // Materials
  const solidMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#2a2b30"),
        metalness: 0.92,
        roughness: 0.28,
        clearcoat: 0.2,
        clearcoatRoughness: 0.25,
        reflectivity: 0.8,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#00c3ff"),
        wireframe: true,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  const jointMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#dc2626"),
        metalness: 0.85,
        roughness: 0.35,
      }),
    []
  );

  // Structural beams definition
  const beams = useMemo(
    () => [
      // 4 Main Columns / Pillars
      { id: "col-1", basePos: [-2, 0, -2] as [number, number, number], size: [0.35, 5.5, 0.35] as [number, number, number], explode: [-2.5, 1.5, -2.5] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "col-2", basePos: [2, 0, -2] as [number, number, number], size: [0.35, 5.5, 0.35] as [number, number, number], explode: [2.5, 1.5, -2.5] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "col-3", basePos: [-2, 0, 2] as [number, number, number], size: [0.35, 5.5, 0.35] as [number, number, number], explode: [-2.5, 1.5, 2.5] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "col-4", basePos: [2, 0, 2] as [number, number, number], size: [0.35, 5.5, 0.35] as [number, number, number], explode: [2.5, 1.5, 2.5] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },

      // Top Perimeter Beams
      { id: "top-1", basePos: [0, 2.75, -2] as [number, number, number], size: [4.35, 0.35, 0.35] as [number, number, number], explode: [0, 3, -3] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "top-2", basePos: [0, 2.75, 2] as [number, number, number], size: [4.35, 0.35, 0.35] as [number, number, number], explode: [0, 3, 3] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "top-3", basePos: [-2, 2.75, 0] as [number, number, number], size: [0.35, 0.35, 4.35] as [number, number, number], explode: [-3, 3, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "top-4", basePos: [2, 2.75, 0] as [number, number, number], size: [0.35, 0.35, 4.35] as [number, number, number], explode: [3, 3, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },

      // Base Support Beams
      { id: "bot-1", basePos: [0, -2.75, -2] as [number, number, number], size: [4.35, 0.3, 0.3] as [number, number, number], explode: [0, -2.5, -3] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "bot-2", basePos: [0, -2.75, 2] as [number, number, number], size: [4.35, 0.3, 0.3] as [number, number, number], explode: [0, -2.5, 3] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "bot-3", basePos: [-2, -2.75, 0] as [number, number, number], size: [0.3, 0.3, 4.35] as [number, number, number], explode: [-3, -2.5, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },
      { id: "bot-4", basePos: [2, -2.75, 0] as [number, number, number], size: [0.3, 0.3, 4.35] as [number, number, number], explode: [3, -2.5, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] },

      // Industrial Cross Braces (Truss pattern)
      { id: "brace-1", basePos: [0, 0, -2] as [number, number, number], size: [0.18, 6.2, 0.18] as [number, number, number], explode: [0, 0, -4.5] as [number, number, number], rot: [0, 0, 0.65] as [number, number, number] },
      { id: "brace-2", basePos: [0, 0, -2] as [number, number, number], size: [0.18, 6.2, 0.18] as [number, number, number], explode: [0, 0, -4.5] as [number, number, number], rot: [0, 0, -0.65] as [number, number, number] },
      { id: "brace-3", basePos: [0, 0, 2] as [number, number, number], size: [0.18, 6.2, 0.18] as [number, number, number], explode: [0, 0, 4.5] as [number, number, number], rot: [0, 0, 0.65] as [number, number, number] },
      { id: "brace-4", basePos: [0, 0, 2] as [number, number, number], size: [0.18, 6.2, 0.18] as [number, number, number], explode: [0, 0, 4.5] as [number, number, number], rot: [0, 0, -0.65] as [number, number, number] },
    ],
    []
  );

  const meshesRef = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    const scroll = scrollYProgress ? scrollYProgress.get() : 0;
    const time = state.clock.elapsedTime;

    // Smooth ambient rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.12 + scroll * Math.PI * 2;

      // Dynamic Scaling
      const scaleMultiplier = 1 + scroll * 0.2;
      const targetW = (dimensions?.w || 1) * scaleMultiplier;
      const targetH = (dimensions?.h || 1) * scaleMultiplier;
      const targetL = (dimensions?.l || 1) * scaleMultiplier;
      groupRef.current.scale.set(targetW, targetH, targetL);
    }

    // Exploded factor calculation based on scroll
    let explodeFactor = 0;
    if (scroll >= 0.08 && scroll < 0.22) {
      explodeFactor = (scroll - 0.08) / (0.22 - 0.08);
    } else if (scroll >= 0.22 && scroll < 0.48) {
      explodeFactor = 1;
    } else if (scroll >= 0.48 && scroll < 0.62) {
      explodeFactor = 1 - (scroll - 0.48) / (0.62 - 0.48);
    } else {
      explodeFactor = 0;
    }

    // Blueprint wireframe visibility (between 0.18 and 0.36)
    let wireOpacity = 0;
    if (scroll >= 0.18 && scroll <= 0.36) {
      wireOpacity = Math.sin(((scroll - 0.18) / (0.36 - 0.18)) * Math.PI);
    }
    wireframeMaterial.opacity = THREE.MathUtils.lerp(wireframeMaterial.opacity, wireOpacity, 0.1);
    solidMaterial.opacity = THREE.MathUtils.lerp(solidMaterial.opacity, 1 - wireOpacity * 0.8, 0.1);

    // Welding torch light and sparks (between 0.36 and 0.56)
    let weldingPower = 0;
    if (scroll >= 0.36 && scroll <= 0.56) {
      const p = Math.sin(((scroll - 0.36) / (0.56 - 0.36)) * Math.PI);
      const flicker = (Math.sin(time * 50) + Math.cos(time * 33)) * 0.3 + 0.7;
      weldingPower = p * flicker * 8;
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = weldingPower;
      pointLightRef.current.position.set(
        Math.sin(time * 6) * 1.5,
        Math.cos(time * 4) * 1.8,
        Math.sin(time * 5) * 1.5
      );
    }

    if (sparklesGroupRef.current) {
      sparklesGroupRef.current.scale.setScalar(weldingPower > 0.5 ? 1 : 0.001);
    }

    // Position each beam
    beams.forEach((beam, idx) => {
      const mesh = meshesRef.current[idx];
      if (mesh) {
        mesh.position.x = beam.basePos[0] + beam.explode[0] * explodeFactor;
        mesh.position.y = beam.basePos[1] + beam.explode[1] * explodeFactor;
        mesh.position.z = beam.basePos[2] + beam.explode[2] * explodeFactor;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Arc Welding Dynamic Spotlight & Pointlight */}
      <pointLight ref={pointLightRef} color="#ffb703" distance={12} decay={2} intensity={0} />

      {/* Welding Arc Sparkles */}
      <group ref={sparklesGroupRef} scale={0.001}>
        <Sparkles count={150} scale={6} size={5} speed={0.8} opacity={1} color="#ffea00" />
        <Sparkles count={80} scale={3} size={8} speed={1.2} opacity={1} color="#ff4800" />
      </group>

      {/* Meshes for Beams */}
      {beams.map((beam, index) => (
        <group
          key={beam.id}
          ref={(el) => {
            meshesRef.current[index] = el;
          }}
          rotation={beam.rot}
        >
          {/* Main Solid Beam */}
          <mesh material={solidMaterial} castShadow receiveShadow>
            <boxGeometry args={beam.size} />
          </mesh>

          {/* Hologram / Blueprint Wireframe Overlay */}
          <mesh material={wireframeMaterial}>
            <boxGeometry args={[beam.size[0] * 1.01, beam.size[1] * 1.01, beam.size[2] * 1.01]} />
          </mesh>

          {/* Connection Plates / Node Rivets */}
          <mesh position={[0, beam.size[1] / 2, 0]} material={jointMaterial}>
            <cylinderGeometry args={[beam.size[0] * 0.7, beam.size[0] * 0.7, 0.08, 8]} />
          </mesh>
          <mesh position={[0, -beam.size[1] / 2, 0]} material={jointMaterial}>
            <cylinderGeometry args={[beam.size[0] * 0.7, beam.size[0] * 0.7, 0.08, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
