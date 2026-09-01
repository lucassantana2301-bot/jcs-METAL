"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import MetalStructure from "./MetalStructure";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

function CameraRig() {
  useFrame((state) => {
    // Parallax effect based on mouse movement
    const targetX = state.pointer.x * 2;
    const targetY = 2 + state.pointer.y * 2;
    
    // Smoothly interpolate camera position
    state.camera.position.x += (targetX - state.camera.position.x) * 0.02;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Experience3D({ scrollYProgress, dimensions }: { scrollYProgress: any, dimensions?: {w: number, h: number, l: number} }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0c] pointer-events-none">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
        <CameraRig />
        
        {/* Cinematic Lights */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
        <directionalLight position={[-10, -5, -5]} intensity={1} color="#aa0000" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color="#00aaff" />

        <Environment preset="city" />

        <MetalStructure scrollYProgress={scrollYProgress} dimensions={dimensions} />

        {/* Postprocessing */}
        <EffectComposer>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
          <Noise opacity={0.035} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
