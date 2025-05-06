"use client"

import dynamic from "next/dynamic"
import type { Algorithm } from "@/lib/algorithms"

// Dynamically import the AlgorithmVisualizerWrapper component
const AlgorithmVisualizerWrapper = dynamic(() => import("@/components/algorithm-visualizer-wrapper"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
        <p className="text-lg">Loading visualizer...</p>
      </div>
    </div>
  ),
})

interface AlgorithmVisualizerClientProps {
  initialAlgorithm: Algorithm
}

export default function AlgorithmVisualizerClient({ initialAlgorithm }: AlgorithmVisualizerClientProps) {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <AlgorithmVisualizerWrapper initialAlgorithm={initialAlgorithm} />
    </main>
  )
}
