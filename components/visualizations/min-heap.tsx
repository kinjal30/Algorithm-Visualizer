"use client"

import { useMemo } from "react"

interface MinHeapProps {
  step: number
}

export default function MinHeap({ step }: MinHeapProps) {
  // Initial heap array
  const initialHeap = useMemo(() => [15, 10, 20, 30, 40, 50, 60], [])

  // Heap operations steps (insert 5)
  const heapSteps = useMemo(() => {
    const steps = []

    // Initial state
    steps.push({
      heap: [...initialHeap],
      message: "Initial min-heap",
      highlighted: [],
      swapping: [],
    })

    // Insert a new element (5) at the end
    const heap = [...initialHeap, 5]
    steps.push({
      heap: [...heap],
      message: "Insert 5 at the end of the heap",
      highlighted: [7],
      swapping: [],
    })

    // Bubble up: Compare with parent and swap if needed
    let currentIdx = 7
    let parentIdx = Math.floor((currentIdx - 1) / 2)

    while (parentIdx >= 0 && heap[currentIdx] < heap[parentIdx]) {
      // Highlight current and parent
      steps.push({
        heap: [...heap],
        message: `Compare ${heap[currentIdx]} with parent ${heap[parentIdx]}`,
        highlighted: [currentIdx, parentIdx],
        swapping: [],
      })

      // Swap if current is smaller than parent
      steps.push({
        heap: [...heap],
        message: `${heap[currentIdx]} < ${heap[parentIdx]}, swap them`,
        highlighted: [currentIdx, parentIdx],
        swapping: [currentIdx, parentIdx],
      })

      // Perform the swap
      ;[heap[currentIdx], heap[parentIdx]] = [heap[parentIdx], heap[currentIdx]]

      // Show after swap
      steps.push({
        heap: [...heap],
        message: "After swap",
        highlighted: [parentIdx],
        swapping: [],
      })

      // Move up the heap
      currentIdx = parentIdx
      parentIdx = Math.floor((currentIdx - 1) / 2)
    }

    // Final state
    steps.push({
      heap: [...heap],
      message: "Min-heap property restored",
      highlighted: [],
      swapping: [],
    })

    return steps
  }, [initialHeap])

  // Current heap state based on step
  const currentState = useMemo(() => {
    return heapSteps[Math.min(step, heapSteps.length - 1)]
  }, [heapSteps, step])

  // Calculate node positions for the heap visualization
  const heapNodes = useMemo(() => {
    const nodes = []
    const heap = currentState.heap

    for (let i = 0; i < heap.length; i++) {
      const level = Math.floor(Math.log2(i + 1))
      const position = i - (Math.pow(2, level) - 1)
      const totalNodesInLevel = Math.pow(2, level)
      const levelWidth = 100 // percentage

      // Calculate x position as percentage
      const xPercent = ((position + 0.5) / totalNodesInLevel) * levelWidth
      const yLevel = level * 100 // pixels

      nodes.push({
        value: heap[i],
        index: i,
        x: xPercent,
        y: yLevel,
        highlighted: currentState.highlighted.includes(i),
        swapping: currentState.swapping.includes(i),
      })
    }

    return nodes
  }, [currentState])

  // Draw edges between nodes
  const edges = useMemo(() => {
    const result = []
    for (let i = 1; i < heapNodes.length; i++) {
      const parentIndex = Math.floor((i - 1) / 2)
      result.push({
        from: heapNodes[parentIndex],
        to: heapNodes[i],
        highlighted:
          (heapNodes[parentIndex].highlighted && heapNodes[i].highlighted) ||
          (heapNodes[parentIndex].swapping && heapNodes[i].swapping),
      })
    }
    return result
  }, [heapNodes])

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Min Heap Visualization</h2>
      <p className="text-xl mb-6">{currentState.message}</p>

      {/* Heap Array Representation */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Heap Array</h3>
        <div className="flex gap-1">
          {currentState.heap.map((value, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded border-2 text-xl font-bold
                ${
                  currentState.highlighted.includes(index)
                    ? "bg-yellow-100 border-yellow-400 dark:bg-yellow-900 dark:border-yellow-600"
                    : currentState.swapping.includes(index)
                      ? "bg-red-100 border-red-400 dark:bg-red-900 dark:border-red-600"
                      : "bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700"
                }`}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {currentState.heap.map((_, index) => (
            <div key={index} className="w-12 h-6 flex items-center justify-center text-lg">
              {index}
            </div>
          ))}
        </div>
      </div>

      {/* Heap Tree Visualization */}
      <div className="relative w-full" style={{ height: "350px" }}>
        {/* Draw edges first */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={`${edge.from.x}%`}
              y1={edge.from.y + 20} // Adjust for node height
              x2={`${edge.to.x}%`}
              y2={edge.to.y}
              stroke={edge.highlighted ? "#ff6b6b" : "#999999"}
              strokeWidth={edge.highlighted ? 3 : 2}
            />
          ))}
        </svg>

        {/* Draw nodes */}
        {heapNodes.map((node) => {
          let bgColor = "bg-blue-500"
          const textColor = "text-white"
          let scale = "scale-100"
          let border = "border-blue-700"

          if (node.swapping) {
            bgColor = "bg-red-500"
            border = "border-red-700"
            scale = "scale-110"
          } else if (node.highlighted) {
            bgColor = "bg-yellow-500"
            border = "border-yellow-700"
            scale = "scale-110"
          }

          return (
            <div
              key={node.index}
              className={`absolute transform -translate-x-1/2 ${scale} transition-all duration-300`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}px`,
                zIndex: 2,
              }}
            >
              <div
                className={`w-16 h-16 ${bgColor} ${textColor} rounded-full flex items-center justify-center text-2xl font-bold border-2 ${border} shadow-lg`}
              >
                {node.value}
              </div>
              <div className="mt-1 text-center text-lg">{node.index}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
