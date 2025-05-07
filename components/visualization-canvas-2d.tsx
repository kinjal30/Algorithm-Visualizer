"use client"

import { Suspense, useState } from "react"
import { getVisualization } from "@/components/visualizations"
import { ErrorBoundary } from "react-error-boundary"
import { Card } from "@/components/ui/card"

interface VisualizationCanvas2DProps {
  algorithmId: string
  step: number
}

function ErrorFallback() {
  return (
    <div className="flex items-center justify-center h-[500px] w-full">
      <Card className="p-6 max-w-md text-center">
        <h3 className="text-red-500 font-bold text-xl mb-2">Error loading visualization</h3>
        <p>There was an error loading this visualization. Please try a different algorithm.</p>
      </Card>
    </div>
  )
}

function VisualizationContent({ algorithmId, step }: { algorithmId: string; step: number }) {
  const VisualizationComponent = getVisualization(algorithmId)

  if (!VisualizationComponent) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Card className="p-6 max-w-md text-center">
          <p className="text-orange-500 font-bold">Visualization not found for: {algorithmId}</p>
        </Card>
      </div>
    )
  }

  return <VisualizationComponent step={step} />
}

export default function VisualizationCanvas2D({ algorithmId, step }: VisualizationCanvas2DProps) {
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    console.error("Visualization error:", error)
  }

  return (
    <div
      className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-auto"
      style={{ minHeight: "500px", maxHeight: "calc(100vh - 300px)" }}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={(error) => setError(error)}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-[500px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
                <p className="text-lg">Loading visualization...</p>
              </div>
            </div>
          }
        >
          <VisualizationContent algorithmId={algorithmId} step={step} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
