"use client"

import { useMemo } from "react"

interface KadanesAlgorithmProps {
  step: number
}

export default function KadanesAlgorithm({ step }: KadanesAlgorithmProps) {
  // Sample array for maximum subarray problem
  const array = useMemo(() => [-2, 1, -3, 4, -1, 2, 1, -5, 4], [])

  // Kadane's algorithm steps
  const algorithmSteps = useMemo(() => {
    const steps = []
    let currentSum = 0
    let maxSum = Number.NEGATIVE_INFINITY
    let currentStart = 0
    let maxStart = 0
    let maxEnd = 0

    // Initial state
    steps.push({
      index: -1,
      array: [...array],
      currentSum,
      maxSum,
      currentStart,
      maxStart,
      maxEnd,
      message: "Initialize currentSum = 0, maxSum = -∞",
    })

    // Kadane's algorithm
    for (let i = 0; i < array.length; i++) {
      // If currentSum becomes negative, reset it and update currentStart
      if (currentSum < 0) {
        currentSum = 0
        currentStart = i
      }

      // Add current element to currentSum
      currentSum += array[i]

      // Record step after adding current element
      steps.push({
        index: i,
        array: [...array],
        currentSum,
        maxSum,
        currentStart,
        maxStart,
        maxEnd,
        message: `Add array[${i}] = ${array[i]} to currentSum = ${currentSum}`,
      })

      // Update maxSum if currentSum is greater
      if (currentSum > maxSum) {
        maxSum = currentSum
        maxStart = currentStart
        maxEnd = i

        // Record step after updating maxSum
        steps.push({
          index: i,
          array: [...array],
          currentSum,
          maxSum,
          currentStart,
          maxStart,
          maxEnd,
          message: `Update maxSum = ${maxSum} from index ${maxStart} to ${maxEnd}`,
        })
      }
    }

    // Final state
    steps.push({
      index: array.length,
      array: [...array],
      currentSum,
      maxSum,
      currentStart,
      maxStart,
      maxEnd,
      message: `Maximum subarray sum is ${maxSum} from index ${maxStart} to ${maxEnd}`,
    })

    return steps
  }, [array])

  // Current algorithm state based on step
  const currentState = useMemo(() => {
    return algorithmSteps[Math.min(step, algorithmSteps.length - 1)]
  }, [algorithmSteps, step])

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Kadane's Algorithm</h2>
      <p className="text-xl mb-6">{currentState.message}</p>

      {/* Array Visualization */}
      <div className="flex items-end space-x-4 mb-8">
        {array.map((value, index) => {
          // Determine element appearance
          let bgColor = "bg-gray-200 dark:bg-gray-700"
          let textColor = "text-gray-800 dark:text-gray-200"
          let scale = "transform scale-100"
          let border = "border-2 border-transparent"

          // Current element being processed
          if (index === currentState.index) {
            bgColor = "bg-red-500"
            textColor = "text-white"
            scale = "transform scale-110"
            border = "border-2 border-red-700"
          }
          // Part of current subarray
          else if (index >= currentState.currentStart && index <= currentState.index) {
            bgColor = "bg-blue-500"
            textColor = "text-white"
            scale = "transform scale-105"
            border = "border-2 border-blue-700"
          }
          // Part of maximum subarray
          else if (index >= currentState.maxStart && index <= currentState.maxEnd) {
            bgColor = "bg-green-500"
            textColor = "text-white"
            scale = "transform scale-105"
            border = "border-2 border-green-700"
          }

          // Calculate height based on value
          const height = Math.abs(value) * 20
          const yOffset = value >= 0 ? 0 : height

          return (
            <div key={index} className={`flex flex-col items-center transition-all duration-300 ${scale}`}>
              <div className="h-20 flex flex-col justify-end">
                <div
                  className={`w-14 ${bgColor} ${textColor} ${border} flex items-center justify-center text-xl font-bold shadow-md`}
                  style={{
                    height: `${height}px`,
                    marginTop: value >= 0 ? "auto" : 0,
                  }}
                >
                  {value}
                </div>
              </div>
              <div className="mt-2 text-lg font-medium">{index}</div>
            </div>
          )
        })}
      </div>

      {/* Current State Information */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-bold">Current Sum:</span> {currentState.currentSum}
          </div>
          <div>
            <span className="font-bold">Max Sum:</span>{" "}
            {currentState.maxSum !== Number.NEGATIVE_INFINITY ? currentState.maxSum : "-∞"}
          </div>
        </div>

        {currentState.maxSum !== Number.NEGATIVE_INFINITY && (
          <div className="mt-2">
            <span className="font-bold">Maximum Subarray:</span> From index {currentState.maxStart} to{" "}
            {currentState.maxEnd}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            <span className="text-lg">Current Element</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
            <span className="text-lg">Current Subarray</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            <span className="text-lg">Maximum Subarray</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
            <span className="text-lg">Regular Element</span>
          </div>
        </div>
      </div>
    </div>
  )
}
