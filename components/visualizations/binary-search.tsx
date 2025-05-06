"use client"

import { useMemo } from "react"

interface BinarySearchProps {
  step: number
}

export default function BinarySearch({ step }: BinarySearchProps) {
  // Sample sorted array
  const array = useMemo(() => [5, 13, 19, 24, 29, 38, 45, 53, 67, 78, 91], [])

  // Binary search steps (searching for 45)
  const searchSteps = useMemo(
    () => [
      { left: 0, right: 10, mid: 5, found: false, comparison: "38 < 45" }, // Initial state
      { left: 6, right: 10, mid: 8, found: false, comparison: "67 > 45" }, // 38 < 45, go right
      { left: 6, right: 7, mid: 6, found: false, comparison: "45 == 45" }, // 67 > 45, go left
      { left: 6, right: 7, mid: 6, found: true, comparison: "Found 45!" }, // Found 45!
    ],
    [],
  )

  // Current search state based on step
  const currentSearch = useMemo(() => {
    return searchSteps[Math.min(step, searchSteps.length - 1)]
  }, [searchSteps, step])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">{currentSearch.found ? "Target Found! 🎉" : "Searching for 45..."}</h2>
        <p className="text-lg">{currentSearch.comparison}</p>
      </div>

      <div className="flex items-end space-x-2 mb-8">
        {array.map((value, index) => {
          // Determine element appearance
          let bgColor = "bg-gray-200 dark:bg-gray-700"
          let textColor = "text-gray-800 dark:text-gray-200"
          let scale = "transform scale-100"
          let border = "border-2 border-transparent"

          if (currentSearch.found && index === currentSearch.mid) {
            bgColor = "bg-green-500"
            textColor = "text-white"
            scale = "transform scale-110"
            border = "border-2 border-green-700"
          } else if (index === currentSearch.mid) {
            bgColor = "bg-red-500"
            textColor = "text-white"
            scale = "transform scale-110"
            border = "border-2 border-red-700"
          } else if (index >= currentSearch.left && index <= currentSearch.right) {
            bgColor = "bg-blue-500"
            textColor = "text-white"
          }

          return (
            <div key={index} className={`flex flex-col items-center transition-all duration-300 ${scale}`}>
              <div
                className={`w-14 h-14 ${bgColor} ${textColor} ${border} rounded-lg flex items-center justify-center text-2xl font-bold shadow-md`}
              >
                {value}
              </div>
              <div className="mt-2 text-lg font-medium">{index}</div>

              {/* Markers for left, right, mid */}
              <div className="h-8 mt-1">
                {index === currentSearch.left && (
                  <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-lg font-bold text-blue-600">
                    L
                  </div>
                )}
                {index === currentSearch.right && (
                  <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-lg font-bold text-blue-600">
                    R
                  </div>
                )}
                {index === currentSearch.mid && (
                  <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-lg font-bold text-purple-600">
                    MID
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg max-w-2xl">
        <h3 className="text-xl font-bold mb-2">How Binary Search Works:</h3>
        <ol className="list-decimal pl-6 space-y-2 text-lg">
          <li>Start with a sorted array</li>
          <li>Compare the target value with the middle element</li>
          <li>If the target matches the middle element, we're done!</li>
          <li>If the target is smaller, search the left half</li>
          <li>If the target is larger, search the right half</li>
          <li>Repeat until the target is found or the search space is empty</li>
        </ol>
      </div>
    </div>
  )
}
