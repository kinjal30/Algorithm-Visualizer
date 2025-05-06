"use client"

import { useMemo } from "react"

interface MaxHeapProps {
  step: number
}

export default function MaxHeap({ step }: MaxHeapProps) {
  // Initial heap array
  const initialHeap = useMemo(() => [60, 50, 40, 30, 20, 10, 5], [])

  // Heap operations steps (extract max)
  const heapSteps = useMemo(() => {
    const steps = []

    // Initial state
    steps.push({
      heap: [...initialHeap],
      message: "Initial max-heap",
      highlighted: [],
      swapping: [],
      extracted: null,
    })

    // Extract the maximum element (root)
    const heap = [...initialHeap]
    const max = heap[0]

    steps.push({
      heap: [...heap],
      message: `Extract maximum element: ${max}`,
      highlighted: [0],
      swapping: [],
      extracted: max,
    })

    // Replace root with last element
    heap[0] = heap[heap.length - 1]
    const heapAfterReplace = heap.slice(0, heap.length - 1)

    steps.push({
      heap: [...heapAfterReplace],
      message: "Replace root with last element and remove last element",
      highlighted: [0],
      swapping: [],
      extracted: max,
    })

    // Heapify down
    let currentIdx = 0
    const heapSize = heapAfterReplace.length

    while (true) {
      let largest = currentIdx
      const leftIdx = 2 * currentIdx + 1
      const rightIdx = 2 * currentIdx + 2

      // Compare with left child
      if (leftIdx < heapSize) {
        steps.push({
          heap: [...heapAfterReplace],
          message: `Compare ${heapAfterReplace[currentIdx]} with left child ${heapAfterReplace[leftIdx]}`,
          highlighted: [currentIdx, leftIdx],
          swapping: [],
          extracted: max,
        })

        if (heapAfterReplace[leftIdx] > heapAfterReplace[largest]) {
          largest = leftIdx
        }
      }

      // Compare with right child
      if (rightIdx < heapSize) {
        steps.push({
          heap: [...heapAfterReplace],
          message: `Compare ${heapAfterReplace[currentIdx]} with right child ${heapAfterReplace[rightIdx]}`,
          highlighted: [currentIdx, rightIdx],
          swapping: [],
          extracted: max,
        })

        if (heapAfterReplace[rightIdx] > heapAfterReplace[largest]) {
          largest = rightIdx
        }
      }

      // If largest is not current, swap
      if (largest !== currentIdx) {
        steps.push({
          heap: [...heapAfterReplace],
          message: `${heapAfterReplace[largest]} > ${heapAfterReplace[currentIdx]}, swap them`,
          highlighted: [currentIdx, largest],
          swapping: [currentIdx, largest],
          extracted: max,
        })

        // Perform the swap
        ;[heapAfterReplace[currentIdx], heapAfterReplace[largest]] = [
          heapAfterReplace[largest],
          heapAfterReplace[currentIdx],
        ]

        steps.push({
          heap: [...heapAfterReplace],
          message: "After swap",
          highlighted: [largest],
          swapping: [],
          extracted: max,
        })

        currentIdx = largest
      } else {
        break
      }
    }

    // Final state
    steps.push({
      heap: [...heapAfterReplace],
      message: `Max-heap property restored after extracting ${max}`,
      highlighted: [],
      swapping: [],
      extracted: max,
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
      <h2 className="text-2xl font-bold mb-4">Max Heap Visualization</h2>
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
                      : "bg-red-100 border-red-300 dark:bg-red-900 dark:border-red-700"
                }`}
            >
              {value}
            </div>
          ))}
          {currentState.extracted !== null && (
            <div className="w-12 h-12 flex items-center justify-center rounded border-2 text-xl font-bold bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700 ml-2">
              {currentState.extracted}
            </div>
          )}
        </div>
        <div className="flex gap-1 mt-1">
          {currentState.heap.map((_, index) => (
            <div key={index} className="w-12 h-6 flex items-center justify-center text-lg">
              {index}
            </div>
          ))}
          {currentState.extracted !== null && (
            <div className="w-12 h-6 flex items-center justify-center text-lg ml-2">max</div>
          )}
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
          let bgColor = "bg-red-500"
          const textColor = "text-white"
          let scale = "scale-100"
          let border = "border-red-700"

          if (node.swapping) {
            bgColor = "bg-red-600"
            border = "border-red-800"
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

        {/* Extracted element */}
        {currentState.extracted !== null && (
          <div
            className="absolute transform -translate-x-1/2 transition-all duration-300"
            style={{
              right: "10%",
              top: "30%",
              zIndex: 2,
            }}
          >
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold border-2 border-green-700 shadow-lg">
              {currentState.extracted}
            </div>
            <div className="mt-2 text-center text-lg font-bold">Extracted Max</div>
          </div>
        )}
      </div>
    </div>
  )
}
