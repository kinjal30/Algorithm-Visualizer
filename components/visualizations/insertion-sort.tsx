"use client"

import { useMemo } from "react"

interface InsertionSortProps {
  step: number
}

export default function InsertionSort({ step }: InsertionSortProps) {
  // Initial unsorted array
  const initialArray = useMemo(() => [29, 10, 14, 37, 20, 25, 44, 15], [])

  // Insertion sort steps
  const sortSteps = useMemo(() => {
    const steps = []
    const arr = [...initialArray]

    // Initial state
    steps.push({
      array: [...arr],
      current: null,
      comparing: null,
      sorted: [0],
    })

    // Insertion sort algorithm with step tracking
    for (let i = 1; i < arr.length; i++) {
      const currentVal = arr[i]

      // Before shifting elements
      steps.push({
        array: [...arr],
        current: i,
        comparing: i - 1,
        sorted: Array.from({ length: i }, (_, idx) => idx),
      })

      let j = i - 1
      while (j >= 0 && arr[j] > currentVal) {
        arr[j + 1] = arr[j]

        // After shifting one element
        steps.push({
          array: [...arr],
          current: i,
          comparing: j,
          sorted: Array.from({ length: i }, (_, idx) => idx),
        })

        j--
      }

      arr[j + 1] = currentVal

      // After inserting the current element
      steps.push({
        array: [...arr],
        current: j + 1,
        comparing: null,
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      })
    }

    // Final sorted array
    steps.push({
      array: [...arr],
      current: null,
      comparing: null,
      sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    })

    return steps
  }, [initialArray])

  // Current sort state based on step
  const currentSort = useMemo(() => {
    return sortSteps[Math.min(step, sortSteps.length - 1)]
  }, [sortSteps, step])

  // Get step description
  const getStepDescription = () => {
    if (currentSort.current === null && currentSort.sorted.length === initialArray.length) {
      return "Array sorted!"
    } else if (currentSort.current !== null) {
      return `Inserting ${currentSort.array[currentSort.current]} at the right position`
    } else {
      return "Starting insertion sort"
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Insertion Sort</h2>
      <p className="text-xl mb-6">{getStepDescription()}</p>

      <div className="flex items-end space-x-4 mb-8">
        {currentSort.array.map((value, index) => {
          // Determine element appearance
          let bgColor = "bg-gray-200 dark:bg-gray-700"
          let textColor = "text-gray-800 dark:text-gray-200"
          let scale = "transform scale-100"
          let border = "border-2 border-transparent"

          if (index === currentSort.current) {
            bgColor = "bg-red-500"
            textColor = "text-white"
            scale = "transform scale-110"
            border = "border-2 border-red-700"
          } else if (index === currentSort.comparing) {
            bgColor = "bg-yellow-500"
            textColor = "text-white"
            scale = "transform scale-105"
            border = "border-2 border-yellow-700"
          } else if (currentSort.sorted.includes(index)) {
            bgColor = "bg-green-500"
            textColor = "text-white"
          }

          // Calculate height based on value
          const height = `${Math.max(value * 2, 30)}px`

          return (
            <div key={index} className={`flex flex-col items-center transition-all duration-300 ${scale}`}>
              <div
                className={`w-14 ${bgColor} ${textColor} ${border} rounded-t-lg flex items-center justify-center text-xl font-bold shadow-md`}
                style={{ height }}
              >
                {value}
              </div>
              <div className="mt-2 text-lg font-medium">{index}</div>
            </div>
          )
        })}
      </div>

      <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg max-w-2xl">
        <h3 className="text-xl font-bold mb-2">How Insertion Sort Works:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-lg">
          <li>Start with the second element (index 1)</li>
          <li>Compare it with elements to its left</li>
          <li>Shift elements greater than the current element to the right</li>
          <li>Insert the current element in its correct position</li>
          <li>Repeat for all elements in the array</li>
        </ol>
      </div>
    </div>
  )
}
