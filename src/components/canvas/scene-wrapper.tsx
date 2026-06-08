"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

interface SceneWrapperProps {
  children: React.ReactNode;
}

export function SceneWrapper({ children }: SceneWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 -z-10 bg-canvas overflow-hidden" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10 bg-canvas overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

