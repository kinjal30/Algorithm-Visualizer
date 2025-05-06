"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { getVisualization } from "@/components/visualizations"
import { ErrorBoundary } from "react-error-boundary"

interface VisualizationCanvasProps {
  algorithmId: string
  step: number
  autoRotate: boolean
}

function ErrorFallback() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <Html position={[0, 2, 0]} center>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-red-500 font-bold">Error loading visualization</h3>
          <p>There was an error loading this visualization.</p>
        </div>
      </Html>
    </group>
  )
}

function VisualizationContent({ algorithmId, step }: { algorithmId: string; step: number }) {
  const VisualizationComponent = getVisualization(algorithmId)

  if (!VisualizationComponent) {
    return (
      <group>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <Html position={[0, 2, 0]} center>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-center">
            <p>Visualization not found for: {algorithmId}</p>
          </div>
        </Html>
      </group>
    )
  }

  return <VisualizationComponent step={step} />
}

export default function VisualizationCanvas({ algorithmId, step, autoRotate }: VisualizationCanvasProps) {
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    console.error("Visualization error:", error)
  }

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <Environment preset="city" />

      <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error) => setError(error)}>
        <Suspense fallback={null}>
          <VisualizationContent algorithmId={algorithmId} step={step} />
        </Suspense>
      </ErrorBoundary>

      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={50}
      />
    </Canvas>
  )
}
