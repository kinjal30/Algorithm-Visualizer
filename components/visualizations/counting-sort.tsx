"use client"

import { useMemo } from "react"

interface CountingSortProps {
  step: number
}

export default function CountingSort({ step }: CountingSortProps) {
  // Sample array for counting sort
  const array = useMemo(() => [4, 2, 2, 8, 3, 3, 1, 0, 5, 7, 6, 2], [])

  // Maximum value in the array (for counting array size)
  const maxValue = useMemo(() => Math.max(...array), [array])

  // Counting sort steps
  const sortSteps = useMemo(() => {
    const steps = []

    // Initial state
    steps.push({
      phase: "initial",
      index: -1,
      array: [...array],
      countArray: Array(maxValue + 1).fill(0),
      outputArray: Array(array.length).fill(null),
      message: "Initialize count array with zeros",
    })

    // Phase 1: Count occurrences
    const countArray = Array(maxValue + 1).fill(0)
    for (let i = 0; i < array.length; i++) {
      countArray[array[i]]++
      steps.push({
        phase: "counting",
        index: i,
        array: [...array],
        countArray: [...countArray],
        outputArray: Array(array.length).fill(null),
        message: `Count array[${array[i]}]++: Now count[${array[i]}] = ${countArray[array[i]]}`,
      })
    }

    // Phase 2: Calculate cumulative count
    for (let i = 1; i <= maxValue; i++) {
      countArray[i] += countArray[i - 1]
      steps.push({
        phase: "cumulative",
        index: i,
        array: [...array],
        countArray: [...countArray],
        outputArray: Array(array.length).fill(null),
        message: `Make count array cumulative: count[${i}] += count[${i - 1}]`,
      })
    }

    // Phase 3: Build output array
    const outputArray = Array(array.length).fill(null)
    for (let i = array.length - 1; i >= 0; i--) {
      outputArray[countArray[array[i]] - 1] = array[i]
      countArray[array[i]]--

      const filledOutput = [...outputArray]
      steps.push({
        phase: "output",
        index: i,
        array: [...array],
        countArray: [...countArray],
        outputArray: [...filledOutput],
        message: `Place ${array[i]} at position ${countArray[array[i]]} in output array`,
      })
    }

    // Final state
    steps.push({
      phase: "final",
      index: -1,
      array: [...array],
      countArray: [...countArray],
      outputArray: [...outputArray],
      message: "Sorting complete!",
    })

    return steps
  }, [array, maxValue])

  // Current sort state based on step
  const currentState = useMemo(() => {
    return sortSteps[Math.min(step, sortSteps.length - 1)]
  }, [sortSteps, step])

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Counting Sort</h2>
      <p className="text-xl mb-6">{currentState.message}</p>

      {/* Input Array */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Input Array</h3>
        <div className="flex gap-1">
          {currentState.array.map((value, index) => {
            // Determine element appearance
            let bgColor = "bg-gray-200 dark:bg-gray-700"
            let textColor = "text-gray-800 dark:text-gray-200"
            let scale = "transform scale-100"
            let border = "border-2 border-transparent"

            if (currentState.phase === "counting" && index === currentState.index) {
              bgColor = "bg-red-500"
              textColor = "text-white"
              scale = "transform scale-110"
              border = "border-2 border-red-700"
            } else if (currentState.phase === "output" && index === currentState.index) {
              bgColor = "bg-red-500"
              textColor = "text-white"
              scale = "transform scale-110"
              border = "border-2 border-red-700"
            }

            return (
              <div key={index} className={`flex flex-col items-center transition-all duration-300 ${scale}`}>
                <div
                  className={`w-12 h-12 ${bgColor} ${textColor} ${border} rounded-lg flex items-center justify-center text-xl font-bold shadow-md`}
                >
                  {value}
                </div>
                <div className="mt-1 text-lg font-medium">{index}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Count Array */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Count Array</h3>
        <div className="flex gap-1">
          {currentState.countArray.map((count, index) => {
            // Determine element appearance
            let bgColor = "bg-gray-200 dark:bg-gray-700"
            let textColor = "text-gray-800 dark:text-gray-200"
            let scale = "transform scale-100"
            let border = "border-2 border-transparent"

            if (currentState.phase === "counting" && index === array[currentState.index]) {
              bgColor = "bg-blue-500"
              textColor = "text-white"
              scale = "transform scale-110"
              border = "border-2 border-blue-700"
            } else if (currentState.phase === "cumulative" && index === currentState.index) {
              bgColor = "bg-yellow-500"
              textColor = "text-white"
              scale = "transform scale-110"
              border = "border-2 border-yellow-700"
            } else if (currentState.phase === "output" && index === array[currentState.index]) {
              bgColor = "bg-blue-500"
              textColor = "text-white"
              scale = "transform scale-110"
              border = "border-2 border-blue-700"
            }

            return (
              <div key={index} className={`flex flex-col items-center transition-all duration-300 ${scale}`}>
                <div
                  className={`w-12 h-12 ${bgColor} ${textColor} ${border} rounded-lg flex items-center justify-center text-xl font-bold shadow-md`}
                >
                  {count}
                </div>
                <div className="mt-1 text-lg font-medium">{index}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Output Array */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Output Array</h3>
        <div className="flex gap-1">
          {currentState.outputArray.map((value, index) => {
            // Determine element appearance
            let bgColor = "bg-gray-200 dark:bg-gray-700"
            let textColor = "text-gray-800 dark:text-gray-200"
            let scale = "transform scale-100"
            let border = "border-2 border-transparent"

            if (value !== null) {
              bgColor = "bg-green-500"
              textColor = "text-white"
              border = "border-2 border-green-700"

              // Highlight the most recently filled position
              if (currentState.phase === "output" && currentState.countArray[array[currentState.index]] === index) {
                bgColor = "bg-red-500"
                border = "border-2 border-red-700"
                scale = "transform scale-110"
              }
            }

            return (
              <div key={index} className={`flex flex-col items-center transition-all duration-300 ${scale}`}>
                <div
                  className={`w-12 h-12 ${bgColor} ${textColor} ${border} rounded-lg flex items-center justify-center text-xl font-bold shadow-md`}
                >
                  {value !== null ? value : ""}
                </div>
                <div className="mt-1 text-lg font-medium">{index}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            <span className="text-lg">Current Element</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
            <span className="text-lg">Count Being Updated</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 rounded mr-2"></div>
            <span className="text-lg">Cumulative Count</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            <span className="text-lg">Sorted Element</span>
          </div>
        </div>
      </div>
    </div>
  )
}
