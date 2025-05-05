"use client"

import { useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Algorithm } from "@/lib/algorithms"
import BinarySearchTree from "@/components/visualizations/binary-search-tree"
import GraphDFS from "@/components/visualizations/graph-dfs"
import GraphBFS from "@/components/visualizations/graph-bfs"
import BinarySearch from "@/components/visualizations/binary-search"
import InsertionSort from "@/components/visualizations/insertion-sort"

interface AlgorithmVisualizerProps {
  algorithm: Algorithm
}

export default function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(1)
  const animationRef = useRef<number | null>(null)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, algorithm.totalSteps - 1))
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const renderVisualization = () => {
    switch (algorithm.id) {
      case "bst":
        return <BinarySearchTree step={currentStep} />
      case "graph-dfs":
        return <GraphDFS step={currentStep} />
      case "graph-bfs":
        return <GraphBFS step={currentStep} />
      case "binary-search":
        return <BinarySearch step={currentStep} />
      case "insertion-sort":
        return <InsertionSort step={currentStep} />
      default:
        return <BinarySearchTree step={currentStep} />
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="visualization" className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="visualization" className="flex-1 flex flex-col mt-0">
          <div className="flex-1 relative">
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              {renderVisualization()}
              <OrbitControls />
            </Canvas>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePrevStep} disabled={currentStep === 0}>
                    ←
                  </Button>

                  {isPlaying ? (
                    <Button variant="outline" size="icon" onClick={handlePause}>
                      ⏸️
                    </Button>
                  ) : (
                    <Button variant="outline" size="icon" onClick={handlePlay}>
                      ▶️
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextStep}
                    disabled={currentStep === algorithm.totalSteps - 1}
                  >
                    →
                  </Button>

                  <Button variant="outline" size="icon" onClick={handleReset}>
                    ↺
                  </Button>
                </div>

                <div className="text-sm">
                  Step {currentStep + 1} of {algorithm.totalSteps}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Speed:</span>
                  <select
                    className="text-sm border rounded p-1"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explanation" className="mt-0 p-4 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle>{algorithm.name}</CardTitle>
              <CardDescription>Category: {algorithm.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{algorithm.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Time Complexity</h3>
                <p>{algorithm.timeComplexity}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Space Complexity</h3>
                <p>{algorithm.spaceComplexity}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Use Cases</h3>
                <ul className="list-disc pl-5">
                  {algorithm.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-0 p-4 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
              <CardDescription>{algorithm.name} implementation in JavaScript</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-x-auto">
                <code>{algorithm.code}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
