"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, StepForward, StepBack, Code, BookOpen, Info, Lightbulb } from "lucide-react"
import VisualizationCanvas2D from "@/components/visualization-canvas-2d"
import type { Algorithm } from "@/lib/algorithms"

interface AlgorithmVisualizerProps {
  algorithm: Algorithm
}

export default function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(0.75) // Default speed
  const animationRef = useRef<number | null>(null)
  const lastStepTimeRef = useRef<number>(0)

  // Reset step when algorithm changes
  useEffect(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [algorithm])

  // Handle animation loop
  useEffect(() => {
    if (isPlaying) {
      const animate = (time: number) => {
        if (!lastStepTimeRef.current) {
          lastStepTimeRef.current = time
        }

        // Calculate time since last step
        const delta = time - lastStepTimeRef.current

        // Advance step based on speed (slower = more milliseconds between steps)
        const stepInterval = 2000 / speed // Increased base interval for slower animation

        if (delta > stepInterval) {
          if (currentStep < algorithm.totalSteps - 1) {
            setCurrentStep((prev) => prev + 1)
          } else {
            setIsPlaying(false)
          }
          lastStepTimeRef.current = time
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [isPlaying, currentStep, algorithm.totalSteps, speed])

  const handlePlay = () => {
    setIsPlaying(true)
    lastStepTimeRef.current = 0 // Reset time tracking
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const handleNextStep = () => {
    if (currentStep < algorithm.totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="visualization" className="flex-1 flex flex-col">
        <div className="border-b px-4 bg-white dark:bg-slate-800 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <TabsList className="w-auto justify-start">
              <TabsTrigger value="visualization" className="flex items-center gap-2">
                <Play size={16} />
                Visualization
              </TabsTrigger>
              <TabsTrigger value="explanation" className="flex items-center gap-2">
                <BookOpen size={16} />
                Explanation
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code size={16} />
                Python Code
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="visualization" className="flex-1 flex flex-col mt-0 overflow-auto">
          <div className="flex-1 relative">
            {/* Problem Statement Card */}
            <div className="p-4">
              <Card className="mb-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Info size={20} className="text-purple-600" />
                    Problem Statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base">{algorithm.problemStatement || algorithm.description}</p>
                </CardContent>
              </Card>
            </div>

            <VisualizationCanvas2D algorithmId={algorithm.id} step={currentStep} />

            <div className="sticky bottom-4 left-4 right-4 mx-4 mt-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg z-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                      className="h-9 w-9"
                    >
                      <StepBack size={18} />
                    </Button>

                    {isPlaying ? (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePause}
                        className="h-9 w-9 bg-purple-100 text-purple-700 border-purple-200"
                      >
                        <Pause size={18} />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePlay}
                        className="h-9 w-9"
                        disabled={currentStep === algorithm.totalSteps - 1}
                      >
                        <Play size={18} />
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextStep}
                      disabled={currentStep === algorithm.totalSteps - 1}
                      className="h-9 w-9"
                    >
                      <StepForward size={18} />
                    </Button>

                    <Button variant="outline" size="icon" onClick={handleReset} className="h-9 w-9">
                      <RotateCcw size={18} />
                    </Button>
                  </div>

                  <div className="text-sm font-medium">
                    Step {currentStep + 1} of {algorithm.totalSteps}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm">Speed:</span>
                    <div className="w-32">
                      <Slider
                        value={[speed]}
                        min={0.25}
                        max={2}
                        step={0.25}
                        onValueChange={(value) => setSpeed(value[0])}
                      />
                    </div>
                    <span className="text-sm font-medium">{speed}x</span>
                  </div>
                </div>

                <div className="text-sm bg-purple-50 dark:bg-slate-700 p-3 rounded-md border border-purple-100 dark:border-slate-600">
                  <div className="flex gap-2 items-start">
                    <Info size={18} className="text-purple-500 dark:text-purple-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300 text-base">
                        {algorithm.stepDescriptions[Math.min(currentStep, algorithm.stepDescriptions.length - 1)]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="explanation" className="mt-0 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen size={20} className="text-purple-600" />
                {algorithm.name}
              </CardTitle>
              <CardDescription className="text-base">Category: {algorithm.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Info size={18} className="text-purple-600" />
                  Problem Statement
                </h3>
                <p className="text-base leading-relaxed">{algorithm.problemStatement || algorithm.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Info size={18} className="text-purple-600" />
                  Description
                </h3>
                <p className="text-base leading-relaxed">{algorithm.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Code size={18} className="text-purple-600" />
                  Time Complexity
                </h3>
                <p className="text-base leading-relaxed">{algorithm.timeComplexity}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Code size={18} className="text-purple-600" />
                  Space Complexity
                </h3>
                <p className="text-base leading-relaxed">{algorithm.spaceComplexity}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb size={18} className="text-purple-600" />
                  Use Cases
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {algorithm.useCases.map((useCase, index) => (
                    <li key={index} className="text-base leading-relaxed">
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb size={18} className="text-purple-600" />
                  Key Insights
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {algorithm.keyInsights.map((insight, index) => (
                    <li key={index} className="text-base leading-relaxed">
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-0 p-6 overflow-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Code size={20} className="text-purple-600" />
                Python Implementation
              </CardTitle>
              <CardDescription className="text-base">Complete Python code for {algorithm.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-950 text-slate-50 p-6 rounded-md overflow-x-auto text-sm font-mono leading-relaxed">
                <code>{algorithm.pythonCode}</code>
              </pre>

              <div className="mt-6 bg-purple-50 dark:bg-slate-700 p-4 rounded-md border border-purple-100 dark:border-slate-600">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb size={18} className="text-purple-600 dark:text-purple-400" />
                  Code Explanation
                </h3>
                <p className="text-base leading-relaxed">{algorithm.codeExplanation}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
