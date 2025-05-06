"use client"

import { useState, Suspense } from "react"
import { Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { algorithms } from "@/lib/algorithms"
import type { Algorithm } from "@/lib/algorithms"

// Dynamically import the AlgorithmVisualizer component
const AlgorithmVisualizer = dynamic(() => import("@/components/algorithm-visualizer"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
        <p className="text-lg">Loading visualizer...</p>
      </div>
    </div>
  ),
})

interface AlgorithmVisualizerWrapperProps {
  initialAlgorithm: Algorithm
}

export default function AlgorithmVisualizerWrapper({ initialAlgorithm }: AlgorithmVisualizerWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(initialAlgorithm)
  const [activeCategory, setActiveCategory] = useState("all")
  const [error, setError] = useState<Error | null>(null)

  const categories = ["all", ...Array.from(new Set(algorithms.map((algo) => algo.category)))]

  const filteredAlgorithms = algorithms.filter(
    (algo) =>
      (activeCategory === "all" || algo.category === activeCategory) &&
      (algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Visualizer</h2>
          <p className="mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-3 text-center">Algorithm Visualizer</h1>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl text-center">
          Interactive visualizations to master data structures and algorithms in Python
        </p>
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <Input
            type="search"
            placeholder="Search algorithms (e.g., 'Binary Search', 'Heap', 'Sorting')"
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-6 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`capitalize ${activeCategory === category ? "bg-white text-purple-700" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-72 p-4 bg-white dark:bg-slate-800 shadow-md overflow-y-auto">
          <h2 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <BookOpen size={18} />
            Algorithm Library
          </h2>
          <div className="space-y-1">
            {filteredAlgorithms.length > 0 ? (
              filteredAlgorithms.map((algo) => (
                <Button
                  key={algo.id}
                  variant={selectedAlgorithm.id === algo.id ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-auto py-3 ${
                    selectedAlgorithm.id === algo.id
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                  onClick={() => setSelectedAlgorithm(algo)}
                >
                  <div>
                    <div className="font-medium">{algo.name}</div>
                    <div className="text-xs opacity-80">{algo.category}</div>
                  </div>
                </Button>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 p-4 text-center">
                No algorithms found. Try a different search term.
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
                  <p className="text-lg">Loading visualizer...</p>
                </div>
              </div>
            }
          >
            <AlgorithmVisualizer algorithm={selectedAlgorithm} />
          </Suspense>
        </div>
      </div>
    </>
  )
}
