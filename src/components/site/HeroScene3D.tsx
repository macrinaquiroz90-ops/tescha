"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Line,
  MeshDistortMaterial,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { HeroCanvas } from "./HeroCanvas";
import styles from "./HeroScene3D.module.css";

type ThemePalette = {
  accent: string;
  accentSoft: string;
  glow: string;
  line: string;
  panel: string;
  fog: string;
};

type RenderTier = "full" | "balanced" | "fallback";

type SceneQuality = {
  particleCount: number;
  sparkleCount: number;
  maxDpr: number;
  antialias: boolean;
  scale: number;
  icosahedronDetail: number;
  torusSegments: [number, number];
  latticeSphereSegments: [number, number];
  circleSegments: number;
};

const DARK_THEME: ThemePalette = {
  accent: "#2ff4d8",
  accentSoft: "#7c6bff",
  glow: "#ff7c28",
  line: "#9fe7ff",
  panel: "#d6f7ff",
  fog: "#07111f",
};

const LIGHT_THEME: ThemePalette = {
  accent: "#006a8e",
  accentSoft: "#4038c0",
  glow: "#c45000",
  line: "#244f80",
  panel: "#ffffff",
  fog: "#dce5f2",
};

const LATTICE_POINTS: [number, number, number][] = [
  [-2.2, 1.05, -0.75],
  [-1.2, 0.3, 0.5],
  [-0.4, -0.55, -0.25],
  [0.55, 0.95, 0.85],
  [1.45, 0.15, -0.45],
  [2.15, -0.8, 0.3],
];

const SCENE_QUALITY: Record<Exclude<RenderTier, "fallback">, SceneQuality> = {
  full: {
    particleCount: 88,
    sparkleCount: 28,
    maxDpr: 1.2,
    antialias: true,
    scale: 1,
    icosahedronDetail: 2,
    torusSegments: [12, 72],
    latticeSphereSegments: [14, 14],
    circleSegments: 40,
  },
  balanced: {
    particleCount: 56,
    sparkleCount: 0,
    maxDpr: 1,
    antialias: false,
    scale: 0.9,
    icosahedronDetail: 1,
    torusSegments: [10, 48],
    latticeSphereSegments: [10, 10],
    circleSegments: 28,
  },
};

function getPalette() {
  if (typeof document === "undefined") {
    return DARK_THEME;
  }

  return document.documentElement.getAttribute("data-theme") === "light"
    ? LIGHT_THEME
    : DARK_THEME;
}

function CameraRig({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  useFrame((state, delta) => {
    const targetX = pointer.current.x * 0.65;
    const targetY = pointer.current.y * 0.38;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetX,
      2.8,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY,
      2.8,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function ParticleField({
  color,
  count,
}: {
  color: string;
  count: number;
}) {
  const positions = useMemo(() => {
    const buffer = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 2.2 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      buffer[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      buffer[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      buffer[index * 3 + 2] = radius * Math.cos(phi) * 0.6;
    }

    return buffer;
  }, [count]);

  return (
    <points rotation={[0.2, 0.4, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingPanels({ palette }: { palette: ThemePalette }) {
  const panels = [
    {
      position: [-2.4, 1.25, -0.6] as [number, number, number],
      rotation: [0.15, 0.45, -0.08] as [number, number, number],
      scale: 0.9,
      color: palette.accent,
    },
    {
      position: [2.15, -1.1, 0.35] as [number, number, number],
      rotation: [-0.2, -0.5, 0.16] as [number, number, number],
      scale: 1.1,
      color: palette.accentSoft,
    },
    {
      position: [0.65, 1.95, -1.1] as [number, number, number],
      rotation: [0.28, -0.2, 0.22] as [number, number, number],
      scale: 0.72,
      color: palette.glow,
    },
  ];

  return (
    <>
      {panels.map((panel, index) => (
        <Float
          key={panel.color}
          speed={1.1 + index * 0.3}
          rotationIntensity={0.35}
          floatIntensity={0.9}
        >
          <group position={panel.position} rotation={panel.rotation}>
            <RoundedBox args={[1.8 * panel.scale, 1.05 * panel.scale, 0.04]} radius={0.08}>
              <meshStandardMaterial
                color={palette.panel}
                emissive={panel.color}
                emissiveIntensity={0.18}
                transparent
                opacity={0.08}
                roughness={0.18}
                metalness={0.28}
              />
            </RoundedBox>

            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[1.35 * panel.scale, 0.52 * panel.scale]} />
              <meshBasicMaterial
                color={panel.color}
                transparent
                opacity={0.16}
              />
            </mesh>

            <mesh position={[0, -0.22 * panel.scale, 0.041]}>
              <planeGeometry args={[0.9 * panel.scale, 0.08 * panel.scale]} />
              <meshBasicMaterial
                color={palette.line}
                transparent
                opacity={0.42}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}

function Lattice({
  palette,
  quality,
}: {
  palette: ThemePalette;
  quality: SceneQuality;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.06;
    groupRef.current.position.y = 0.15 + Math.sin(Date.now() * 0.00035) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0.1, 0.15, 0]}>
      <Line
        points={LATTICE_POINTS}
        color={palette.line}
        lineWidth={1.1}
        transparent
        opacity={0.38}
      />

      <Line
        points={[
          [-2.15, -1.15, 0.2],
          [-1.2, -0.25, 0.85],
          [0.1, 0.45, -0.1],
          [1.35, -0.1, 0.45],
          [2.15, 0.95, -0.5],
        ]}
        color={palette.accent}
        lineWidth={1}
        transparent
        opacity={0.34}
      />

      {LATTICE_POINTS.map((point, index) => (
        <mesh key={`${point.join("-")}-${index}`} position={point} scale={0.1 + index * 0.01}>
          <sphereGeometry args={[1, quality.latticeSphereSegments[0], quality.latticeSphereSegments[1]]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? palette.accent : palette.accentSoft}
            emissive={index % 2 === 0 ? palette.accent : palette.accentSoft}
            emissiveIntensity={0.8}
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function Core({
  palette,
  quality,
}: {
  palette: ThemePalette;
  quality: SceneQuality;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.00025) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0.65, 0.25, 0]}>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh scale={1.18}>
          <icosahedronGeometry args={[1, quality.icosahedronDetail]} />
          <MeshDistortMaterial
            color={palette.accent}
            emissive={palette.accent}
            emissiveIntensity={0.6}
            transparent
            opacity={0.88}
            roughness={0.18}
            metalness={0.26}
            distort={0.34}
            speed={2.4}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={1.7}>
          <torusGeometry args={[1.1, 0.04, quality.torusSegments[0], quality.torusSegments[1]]} />
          <meshStandardMaterial
            color={palette.glow}
            emissive={palette.glow}
            emissiveIntensity={0.6}
            transparent
            opacity={0.72}
          />
        </mesh>

        <mesh rotation={[0.1, Math.PI / 2.2, 0.22]} scale={2.05}>
          <torusGeometry args={[0.9, 0.018, 8, quality.torusSegments[1]]} />
          <meshBasicMaterial
            color={palette.accentSoft}
            transparent
            opacity={0.68}
          />
        </mesh>
      </Float>
    </group>
  );
}

function HeroScene({
  palette,
  pointer,
  quality,
}: {
  palette: ThemePalette;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  quality: SceneQuality;
}) {
  return (
    <>
      <fog attach="fog" args={[palette.fog, 5.2, 12]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 3]} intensity={1.15} color={palette.panel} />
      <pointLight position={[-4, -1, 2]} intensity={4.8} color={palette.accent} distance={10} />
      <pointLight position={[4, 2, -1]} intensity={3.6} color={palette.accentSoft} distance={10} />

      <CameraRig pointer={pointer} />

      <group scale={quality.scale}>
        <mesh position={[0, -2.55, -1.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[4.4, quality.circleSegments]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0.08} />
        </mesh>

        <ParticleField color={palette.line} count={quality.particleCount} />
        {quality.sparkleCount > 0 && (
          <Sparkles
            count={quality.sparkleCount}
            scale={[8, 4.5, 4]}
            size={1.8}
            speed={0.18}
            opacity={0.42}
            color={palette.panel}
          />
        )}

        <FloatingPanels palette={palette} />
        <Lattice palette={palette} quality={quality} />
        <Core palette={palette} quality={quality} />
      </group>
    </>
  );
}

export function HeroScene3D() {
  const [palette, setPalette] = useState<ThemePalette>(DARK_THEME);
  const [renderTier, setRenderTier] = useState<RenderTier>("balanced");
  const [isVisible, setIsVisible] = useState(true);
  const [shouldMount3D, setShouldMount3D] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cores = navigator.hardwareConcurrency ?? 4;
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

      if (reducedMotion || coarsePointer || width < 820 || cores <= 4 || memory <= 4) {
        setRenderTier("fallback");
        return;
      }

      if (width < 1280 || cores <= 8 || memory <= 8) {
        setRenderTier("balanced");
        return;
      }

      setRenderTier("full");
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = sceneRef.current?.getBoundingClientRect();
      if (!bounds) {
        return;
      }

      const insideX = event.clientX >= bounds.left && event.clientX <= bounds.right;
      const insideY = event.clientY >= bounds.top && event.clientY <= bounds.bottom;

      if (!insideX || !insideY) {
        pointer.current.x = THREE.MathUtils.damp(pointer.current.x, 0, 8, 1 / 60);
        pointer.current.y = THREE.MathUtils.damp(pointer.current.y, 0, 8, 1 / 60);
        return;
      }

      pointer.current.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 1.5;
      pointer.current.y = -((event.clientY - bounds.top) / bounds.height - 0.5) * 1.2;
    };

    const resetPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    };

    const syncTheme = () => {
      setPalette(getPalette());
    };

    updateViewport();
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "160px 0px",
        threshold: 0.05,
      }
    );

    window.addEventListener("resize", updateViewport);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    if (sceneRef.current) {
      visibilityObserver.observe(sceneRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
      observer.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (renderTier === "fallback") {
      setShouldMount3D(false);
      return;
    }

    let timeoutId: ReturnType<typeof globalThis.setTimeout> | null = null;
    let idleId: number | null = null;

    const mount = () => {
      setShouldMount3D(true);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(mount, { timeout: 1200 });
    } else {
      timeoutId = globalThis.setTimeout(mount, 450);
    }

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [renderTier]);

  if (renderTier === "fallback" || !shouldMount3D) {
    return (
      <div ref={sceneRef} className={styles.scene} aria-hidden="true">
        <HeroCanvas />
        <div className={styles.vignette} />
        <div className={styles.scanlines} />
      </div>
    );
  }

  const quality = SCENE_QUALITY[renderTier];

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <Canvas
        className={styles.canvas}
        camera={{ fov: 42, position: [0, 0, 7.2] }}
        dpr={[1, quality.maxDpr]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          alpha: true,
          antialias: quality.antialias,
          powerPreference: "high-performance",
        }}
      >
        <HeroScene palette={palette} pointer={pointer} quality={quality} />
      </Canvas>
      <div className={styles.vignette} />
      <div className={styles.scanlines} />
    </div>
  );
}
