"use client"

import { useMemo } from "react"

interface DutchNationalFlagProps {
  step: number
}

export default function DutchNationalFlag({ step }: DutchNationalFlagProps) {
  // Sample array for Dutch National Flag algorithm
  const initialArray = useMemo(() => [2, 0, 1, 1, 0, 2, 0, 1, 2, 0, 1, 2], [])

  // Dutch National Flag algorithm steps
  const sortSteps = useMemo(() => {
    const steps = []
    const arr = [...initialArray]

    // Initial state
    steps.push({
      array: [...arr],
      low: 0,
      mid: 0,
      high: arr.length - 1,
      action: "Initial array with low=0, mid=0, high=11",
      swap: false,
      swapIndices: [],
    })

    let low = 0
    let mid = 0
    let high = arr.length - 1

    while (mid <= high) {
      if (arr[mid] === 0) {
        // Before swap
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `arr[${mid}] = 0: We need to move 0 to the left section. Swap with arr[${low}]`,
          swap: true,
          swapIndices: [low, mid],
        })

        // Perform swap
        ;[arr[low], arr[mid]] = [arr[mid], arr[low]]

        // After swap
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `After swap: arr[${low}] = 0, arr[${mid}] = ${arr[mid]}. Increment low and mid.`,
          swap: false,
          swapIndices: [],
        })

        low++
        mid++

        // Show after increments
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `After incrementing: low=${low}, mid=${mid}`,
          swap: false,
          swapIndices: [],
        })
      } else if (arr[mid] === 1) {
        // No swap needed
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `arr[${mid}] = 1: This is already in the middle section. No swap needed. Just increment mid.`,
          swap: false,
          swapIndices: [],
        })

        mid++

        // Show after increment
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `After incrementing: mid=${mid}`,
          swap: false,
          swapIndices: [],
        })
      } else {
        // arr[mid] === 2
        // Before swap
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `arr[${mid}] = 2: We need to move 2 to the right section. Swap with arr[${high}]`,
          swap: true,
          swapIndices: [mid, high],
        })

        // Perform swap
        ;[arr[mid], arr[high]] = [arr[high], arr[mid]]

        // After swap
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `After swap: arr[${mid}] = ${arr[mid]}, arr[${high}] = 2. Decrement high.`,
          swap: false,
          swapIndices: [],
        })

        high--

        // Show after decrement
        steps.push({
          array: [...arr],
          low,
          mid,
          high,
          action: `After decrementing: high=${high}. Note: mid stays the same because we need to check the new value at mid.`,
          swap: false,
          swapIndices: [],
        })
      }
    }

    // Final state
    steps.push({
      array: [...arr],
      low,
      mid,
      high,
      action: "Sorting complete! All 0s are on the left, 1s in the middle, and 2s on the right.",
      swap: false,
      swapIndices: [],
      final: true,
    })

    return steps
  }, [initialArray])

  // Current sort state based on step
  const currentState = useMemo(() => {
    return sortSteps[Math.min(step, sortSteps.length - 1)]
  }, [sortSteps, step])

  // Color mapping for values
  const colorMap = {
    0: "bg-red-500 border-red-700",
    1: "bg-white border-gray-300",
    2: "bg-blue-500 border-blue-700",
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Dutch National Flag Algorithm</h2>

      {/* Problem Statement */}
      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg w-full max-w-3xl mb-6">
        <h3 className="text-lg font-bold mb-2">Problem:</h3>
        <p className="mb-2">
          Given an array containing only 0s, 1s, and 2s (representing red, white, and blue), sort the array in-place so
          that the same numbers are grouped together.
        </p>
        <p>For example, given [2, 0, 1, 1, 0, 2, 0, 1, 2, 0, 1, 2], sort it to [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2].</p>
      </div>

      <p className="text-xl mb-6">{currentState.action}</p>

      {/* Array Visualization */}
      <div className="flex items-center justify-center mb-8">
        {currentState.array.map((value, index) => {
          // Determine element appearance
          const baseColor = colorMap[value]
          const textColor = value === 1 ? "text-gray-800" : "text-white"
          let scale = "transform scale-100"
          let border = "border-2"

          // Highlight pointers
          if (index === currentState.low) {
            border = "border-4 border-yellow-500"
          } else if (index === currentState.mid) {
            border = "border-4 border-green-500"
          } else if (index === currentState.high) {
            border = "border-4 border-purple-500"
          }

          // Highlight swapping elements
          if (currentState.swap && currentState.swapIndices.includes(index)) {
            scale = "transform scale-110"
            border = "border-4 border-orange-500"
          }

          return (
            <div key={index} className={`flex flex-col items-center transition-all duration-300 mx-1 ${scale}`}>
              <div
                className={`w-12 h-12 ${baseColor} ${textColor} ${border} rounded-lg flex items-center justify-center text-xl font-bold shadow-md`}
              >
                {value}
              </div>
              <div className="mt-2 text-sm font-medium">{index}</div>

              {/* Pointer indicators */}
              <div className="h-6 mt-1">
                {index === currentState.low && (
                  <div className="bg-yellow-500 text-white px-2 py-0.5 rounded text-xs font-bold">low</div>
                )}
                {index === currentState.mid && (
                  <div className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">mid</div>
                )}
                {index === currentState.high && (
                  <div className="bg-purple-500 text-white px-2 py-0.5 rounded text-xs font-bold">high</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Current State Information */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-2xl mb-4">
        <h3 className="text-lg font-bold mb-2">Current State:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="font-bold text-yellow-500">low</span>: {currentState.low}
          </div>
          <div>
            <span className="font-bold text-green-500">mid</span>: {currentState.mid}
          </div>
          <div>
            <span className="font-bold text-purple-500">high</span>: {currentState.high}
          </div>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-2">How Dutch National Flag Algorithm Works:</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Use three pointers: <span className="font-bold text-yellow-500">low</span>,{" "}
            <span className="font-bold text-green-500">mid</span>, and{" "}
            <span className="font-bold text-purple-500">high</span>
          </li>
          <li>
            The algorithm divides the array into four sections:
            <ul className="list-disc pl-6 mt-1">
              <li>0 to low-1: elements are 0 (red)</li>
              <li>low to mid-1: elements are 1 (white)</li>
              <li>mid to high: elements are unprocessed</li>
              <li>high+1 to end: elements are 2 (blue)</li>
            </ul>
          </li>
          <li>
            Process elements at mid pointer:
            <ul className="list-disc pl-6 mt-1">
              <li>If element is 0: swap with low, increment both low and mid</li>
              <li>If element is 1: leave it, increment mid</li>
              <li>If element is 2: swap with high, decrement high</li>
            </ul>
          </li>
          <li>Continue until mid &gt; high</li>
        </ol>
      </div>

      {/* Legend */}
      <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            <span className="text-lg">Value 0 (Red)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-white border border-gray-300 rounded mr-2"></div>
            <span className="text-lg">Value 1 (White)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
            <span className="text-lg">Value 2 (Blue)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 border-4 border-orange-500 rounded mr-2"></div>
            <span className="text-lg">Swapping Elements</span>
          </div>
        </div>
      </div>
    </div>
  )
}
