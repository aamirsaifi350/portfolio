import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Edges, Float } from "@react-three/drei";
import { useLocation } from "wouter";
import * as THREE from "three";
import { projects } from "@/data/projects";

// Face configs: position of text layer and rotation to face outward
const FACE_CONFIGS = [
  { pos: [0, 0, 1.01] as [number,number,number], rot: [0, 0, 0] as [number,number,number] },          // Front  (+Z)
  { pos: [0, 0, -1.01] as [number,number,number], rot: [0, Math.PI, 0] as [number,number,number] },    // Back   (-Z)
  { pos: [1.01, 0, 0] as [number,number,number], rot: [0, Math.PI / 2, 0] as [number,number,number] }, // Right  (+X)
  { pos: [-1.01, 0, 0] as [number,number,number], rot: [0, -Math.PI / 2, 0] as [number,number,number] }, // Left  (-X)
  { pos: [0, 1.01, 0] as [number,number,number], rot: [-Math.PI / 2, 0, 0] as [number,number,number] }, // Top    (+Y)
  { pos: [0, -1.01, 0] as [number,number,number], rot: [Math.PI / 2, 0, 0] as [number,number,number] },  // Bottom (-Y)
];

export function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const cubeProjects = useMemo(() => projects.slice(0, 6), []);

  // Auto-rotate when idle; subtle mouse parallax
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (hovered === null) {
      meshRef.current.rotation.x += delta * 0.18;
      meshRef.current.rotation.y += delta * 0.28;
    } else {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.06);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.06);
    }
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (state.pointer.x * state.viewport.width) / 12,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      (state.pointer.y * state.viewport.height) / 12,
      0.05
    );
  });

  const materials = useMemo(() => {
    return Array(6).fill(0).map((_, i) =>
      new THREE.MeshStandardMaterial({
        color: hovered === i ? "#140000" : "#070707",
        roughness: 0.15,
        metalness: 0.85,
        emissive: hovered === i ? "#330000" : "#000000",
        emissiveIntensity: hovered === i ? 0.4 : 0,
      })
    );
  }, [hovered]);

  const handleOver = (e: any) => {
    e.stopPropagation();
    setHovered(Math.floor(e.faceIndex / 2));
    document.body.style.cursor = "pointer";
  };

  const handleOut = () => {
    setHovered(null);
    document.body.style.cursor = "auto";
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    const idx = Math.floor(e.faceIndex / 2);
    if (cubeProjects[idx]) setLocation(`/projects/${cubeProjects[idx].id}`);
  };

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh
        ref={meshRef}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={handleClick}
        material={materials}
      >
        <boxGeometry args={[2, 2, 2]} />
        <Edges scale={1.0} threshold={15} color="#FF3B30" />

        {cubeProjects.map((p, i) => {
          const isHov = hovered === i;
          const techLabel = p.tech.slice(0, 3).join(" · ");
          return (
            <group key={i} position={FACE_CONFIGS[i].pos} rotation={FACE_CONFIGS[i].rot}>
              {/* Project name */}
              <Text
                fontSize={isHov ? 0.21 : 0.18}
                color={isHov ? "#FFFFFF" : "#666666"}
                maxWidth={1.7}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                position={[0, 0.12, 0]}
                font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
              >
                {p.name.toUpperCase()}
              </Text>

              {/* Tech tag line — only visible on hover */}
              <Text
                fontSize={0.1}
                color={isHov ? "#FF3B30" : "#333333"}
                maxWidth={1.7}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                position={[0, -0.12, 0]}
                font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
              >
                {techLabel}
              </Text>

              {/* Arrow hint on hover */}
              {isHov && (
                <Text
                  fontSize={0.09}
                  color="#FF3B30"
                  anchorX="center"
                  anchorY="middle"
                  position={[0, -0.38, 0]}
                  font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
                >
                  CLICK TO VIEW →
                </Text>
              )}
            </group>
          );
        })}
      </mesh>
    </Float>
  );
}
