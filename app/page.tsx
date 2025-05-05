"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AlgorithmVisualizer from "@/components/algorithm-visualizer"
import { algorithms } from "@/lib/algorithms"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0])

  const filteredAlgorithms = algorithms.filter(
    (algo) =>
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <h1 className="text-4xl font-bold mb-2">3D Algorithm Visualizer</h1>
        <p className="text-slate-300 mb-6 max-w-2xl text-center">
          Search and visualize common data structures and algorithms in 3D space
        </p>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input
            type="search"
            placeholder="Search algorithms (e.g., 'Binary Search', 'Tree', 'Sorting')"
            className="pl-10 bg-slate-800 border-slate-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-64 p-4 bg-slate-100 overflow-y-auto">
          <h2 className="font-semibold mb-3">Available Algorithms</h2>
          <div className="space-y-2">
            {filteredAlgorithms.length > 0 ? (
              filteredAlgorithms.map((algo) => (
                <Button
                  key={algo.id}
                  variant={selectedAlgorithm.id === algo.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedAlgorithm(algo)}
                >
                  {algo.name}
                </Button>
              ))
            ) : (
              <p className="text-sm text-slate-500">No algorithms found</p>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <AlgorithmVisualizer algorithm={selectedAlgorithm} />
        </div>
      </div>
    </main>
  )
}
