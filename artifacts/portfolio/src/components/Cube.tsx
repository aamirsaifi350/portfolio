import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Edges, Float } from "@react-three/drei";
import { useLocation } from "wouter";
import * as THREE from "three";
import { projects } from "@/data/projects";

export function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  // Project faces
  const cubeProjects = useMemo(() => projects.slice(0, 6), []);
  
  // Rotate the cube slowly, stop on hover
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (hovered === null) {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
      } else {
        // Smoothly interpolate towards the hovered face
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
      }
      
      // Subtle parallax from mouse
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (state.pointer.x * state.viewport.width) / 10, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (state.pointer.y * state.viewport.height) / 10, 0.05);
    }
  });

  const materials = useMemo(() => {
    return Array(6).fill(0).map((_, i) => {
      return new THREE.MeshStandardMaterial({
        color: hovered === i ? "#111111" : "#050505",
        roughness: 0.2,
        metalness: 0.8,
        emissive: hovered === i ? "#330000" : "#000000",
      });
    });
  }, [hovered]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    const materialIndex = Math.floor(e.faceIndex / 2);
    setHovered(materialIndex);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    const materialIndex = Math.floor(e.faceIndex / 2);
    if (cubeProjects[materialIndex]) {
      setLocation(`/projects/${cubeProjects[materialIndex].id}`);
    }
  };

  // Face positions and rotations for text
  const textConfigs = [
    { pos: [1.01, 0, 0], rot: [0, Math.PI / 2, 0] }, // Right
    { pos: [-1.01, 0, 0], rot: [0, -Math.PI / 2, 0] }, // Left
    { pos: [0, 1.01, 0], rot: [-Math.PI / 2, 0, 0] }, // Top
    { pos: [0, -1.01, 0], rot: [Math.PI / 2, 0, 0] }, // Bottom
    { pos: [0, 0, 1.01], rot: [0, 0, 0] }, // Front
    { pos: [0, 0, -1.01], rot: [0, Math.PI, 0] }, // Back
  ];

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        material={materials}
      >
        <boxGeometry args={[2, 2, 2]} />
        <Edges scale={1.0} threshold={15} color="#FF3B30" />
        
        {cubeProjects.map((p, i) => (
          <Text
            key={i}
            position={textConfigs[i].pos as any}
            rotation={textConfigs[i].rot as any}
            fontSize={0.2}
            color={hovered === i ? "#FFFFFF" : "#888888"}
            maxWidth={1.8}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
          >
            {p.name.toUpperCase()}
          </Text>
        ))}
      </mesh>
    </Float>
  );
}
