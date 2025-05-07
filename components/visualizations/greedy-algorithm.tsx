"use client"

import { useMemo } from "react"

interface GreedyAlgorithmProps {
  step: number
}

export default function GreedyAlgorithm({ step }: GreedyAlgorithmProps) {
  // Activity selection problem data
  const activities = useMemo(
    () => [
      { id: 0, start: 1, finish: 2 },
      { id: 1, start: 3, finish: 4 },
      { id: 2, start: 0, finish: 6 },
      { id: 3, start: 5, finish: 7 },
      { id: 4, start: 8, finish: 9 },
      { id: 5, start: 5, finish: 9 },
    ],
    [],
  )

  // Sort activities by finish time
  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => a.finish - b.finish)
  }, [activities])

  // Activity selection steps
  const selectionSteps = useMemo(() => {
    const steps = []

    // Initial state
    steps.push({
      selected: [],
      current: -1,
      lastFinish: -1,
      message:
        "Initial state: We have 6 activities with different start and finish times. First, we sort them by finish time.",
      sortedActivities: [...sortedActivities],
    })

    // Select first activity
    steps.push({
      selected: [sortedActivities[0].id],
      current: 0,
      lastFinish: sortedActivities[0].finish,
      message: `Step 1: Select the first activity (id: ${sortedActivities[0].id}) with finish time ${sortedActivities[0].finish}. This is always optimal because it finishes earliest.`,
      sortedActivities: [...sortedActivities],
    })

    // Consider the rest of the activities
    const selected = [sortedActivities[0].id]
    let lastFinish = sortedActivities[0].finish

    for (let i = 1; i < sortedActivities.length; i++) {
      const activity = sortedActivities[i]

      // Check if this activity can be selected
      if (activity.start >= lastFinish) {
        // Add step before selection
        steps.push({
          selected: [...selected],
          current: i,
          lastFinish,
          message: `Step ${steps.length}: Considering activity ${activity.id} which starts at ${activity.start}. Since ${activity.start} ≥ ${lastFinish} (last finish time), we can select it.`,
          sortedActivities: [...sortedActivities],
          considering: true,
        })

        // Select this activity
        selected.push(activity.id)
        lastFinish = activity.finish

        // Add step after selection
        steps.push({
          selected: [...selected],
          current: i,
          lastFinish,
          message: `Step ${steps.length}: Selected activity ${activity.id}. Our new last finish time is ${activity.finish}.`,
          sortedActivities: [...sortedActivities],
        })
      } else {
        // Add step for skipping
        steps.push({
          selected: [...selected],
          current: i,
          lastFinish,
          message: `Step ${steps.length}: Considering activity ${activity.id} which starts at ${activity.start}. Since ${activity.start} < ${lastFinish} (last finish time), we must skip it.`,
          sortedActivities: [...sortedActivities],
          skipping: true,
        })
      }
    }

    // Final state
    steps.push({
      selected: [...selected],
      current: -1,
      lastFinish,
      message: `Final result: We've selected activities ${selected.join(", ")}. This is the maximum number of non-overlapping activities possible.`,
      sortedActivities: [...sortedActivities],
      final: true,
    })

    return steps
  }, [sortedActivities])

  // Current state based on step
  const currentState = useMemo(() => {
    return selectionSteps[Math.min(step, selectionSteps.length - 1)]
  }, [selectionSteps, step])

  // Timeline scale - increased for better visibility
  const timelineScale = 70 // pixels per unit of time (increased from 60)
  const timelineStart = 0
  const timelineEnd = 10

  return (
    <div className="w-full flex flex-col items-center p-4 pb-20">
      <h2 className="text-3xl font-bold mb-6">Greedy Algorithm: Activity Selection</h2>

      {/* Problem Statement */}
      <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-lg w-full max-w-4xl mb-8 border-2 border-purple-300 dark:border-purple-800">
        <h3 className="text-xl font-bold mb-3">Problem:</h3>
        <p className="text-lg mb-3">
          You are given n activities with their start and finish times. Select the maximum number of activities that can
          be performed by a single person, assuming that a person can only work on a single activity at a time.
        </p>
        <p className="text-lg">
          For example, given activities with start times [1, 3, 0, 5, 8, 5] and finish times [2, 4, 6, 7, 9, 9], find
          the maximum number of activities that can be done.
        </p>
      </div>

      {/* Current Step Explanation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg w-full max-w-4xl mb-8 border-2 border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold mb-2">Current Step:</h3>
        <p className="text-lg">{currentState.message}</p>
      </div>

      {/* Timeline Visualization */}
      <div className="mb-10 w-full max-w-4xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Activity Timeline</h3>

        {/* Legend */}
        <div className="flex gap-6 mb-6 flex-wrap">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 border-2 border-gray-400 rounded-lg mr-2"></div>
            <span className="text-base">Unselected</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 border-2 border-green-700 rounded-lg mr-2"></div>
            <span className="text-base">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 border-2 border-yellow-700 rounded-lg mr-2"></div>
            <span className="text-base">Currently Considering</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 border-2 border-red-700 rounded-lg mr-2"></div>
            <span className="text-base">Skipped</span>
          </div>
        </div>

        <div className="relative" style={{ height: `${(activities.length + 1) * 50}px` }}>
          {/* Time axis */}
          <div className="absolute bottom-0 left-0 right-0 h-10 flex border-t-2 border-gray-400">
            {Array.from({ length: timelineEnd - timelineStart + 1 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center" style={{ width: `${timelineScale}px` }}>
                <div className="h-4 w-1 bg-gray-400"></div>
                <div className="text-base font-medium mt-1">{i + timelineStart}</div>
              </div>
            ))}
          </div>

          {/* Activities */}
          {currentState.sortedActivities.map((activity, index) => {
            // Determine activity appearance
            let bgColor = "bg-gray-200 dark:bg-gray-700"
            let borderColor = "border-gray-400"
            let textColor = "text-gray-800 dark:text-gray-200"

            if (currentState.selected.includes(activity.id)) {
              bgColor = "bg-green-500"
              borderColor = "border-green-700"
              textColor = "text-white"
            } else if (index === currentState.current) {
              if (currentState.considering) {
                bgColor = "bg-yellow-500"
                borderColor = "border-yellow-700"
                textColor = "text-white"
              } else if (currentState.skipping) {
                bgColor = "bg-red-500"
                borderColor = "border-red-700"
                textColor = "text-white"
              }
            }

            const left = activity.start * timelineScale
            const width = Math.max((activity.finish - activity.start) * timelineScale, 30) // Ensure minimum width

            return (
              <div
                key={activity.id}
                className={`absolute flex items-center justify-center ${bgColor} ${textColor} border-3 ${borderColor} rounded-lg transition-all duration-300 shadow-md`}
                style={{
                  left: `${left}px`,
                  width: `${width}px`,
                  height: "40px", // Increased height
                  top: `${index * 50}px`, // Increased spacing
                }}
              >
                <span className="text-base font-bold">
                  A{activity.id}: [{activity.start},{activity.finish}]
                </span>
              </div>
            )
          })}

          {/* Activity labels */}
          {currentState.sortedActivities.map((activity, index) => (
            <div
              key={`label-${activity.id}`}
              className="absolute right-0 flex items-center"
              style={{
                top: `${index * 50 + 20}px`, // Centered vertically with the activity
                transform: "translateY(-50%)",
              }}
            >
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg ml-4 shadow">
                <span className="font-bold">Activity {activity.id}</span>
              </div>
            </div>
          ))}

          {/* Last finish time indicator */}
          {currentState.lastFinish > 0 && (
            <div
              className="absolute h-full border-l-4 border-purple-600 transition-all duration-300"
              style={{ left: `${currentState.lastFinish * timelineScale}px` }}
            >
              <div className="absolute top-0 -left-24 bg-purple-200 dark:bg-purple-900 px-3 py-2 rounded text-sm font-bold">
                Last Finish: {currentState.lastFinish}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Activities */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mb-8">
        <h3 className="text-2xl font-bold mb-4">Selected Activities</h3>
        <div className="flex flex-wrap gap-3">
          {currentState.selected.length > 0 ? (
            currentState.selected.map((id) => {
              const activity = activities.find((a) => a.id === id)
              return (
                <div key={id} className="bg-green-100 dark:bg-green-900 px-4 py-3 rounded-lg shadow">
                  <span className="font-bold text-lg">Activity {id}</span>
                  <span className="text-base ml-3">
                    [{activity?.start}, {activity?.finish}]
                  </span>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500 text-lg">No activities selected yet</p>
          )}
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h3 className="text-2xl font-bold mb-4">How Activity Selection Works:</h3>
        <ol className="list-decimal pl-8 space-y-3">
          <li className="text-lg">Sort all activities by finish time</li>
          <li className="text-lg">Select the first activity (earliest finish time)</li>
          <li className="text-lg">
            For each remaining activity:
            <ul className="list-disc pl-8 mt-2 space-y-1">
              <li className="text-lg">
                If the start time is greater than or equal to the finish time of the last selected activity, select it
              </li>
              <li className="text-lg">Otherwise, skip it</li>
            </ul>
          </li>
          <li className="text-lg">This greedy approach guarantees the maximum number of non-overlapping activities</li>
        </ol>
      </div>
    </div>
  )
}
