"use client"

import { useMemo } from "react"

interface TopologicalSortProps {
  step: number
}

export default function TopologicalSort({ step }: TopologicalSortProps) {
  // Create a sample directed acyclic graph (DAG) for course prerequisites
  const graph = useMemo(() => {
    return {
      A: { id: "A", label: "Math 101", x: 50, y: 50, dependencies: [] },
      B: { id: "B", label: "CS 101", x: 20, y: 120, dependencies: [] },
      C: { id: "C", label: "Physics 101", x: 80, y: 120, dependencies: ["A"] },
      D: { id: "D", label: "CS 201", x: 35, y: 190, dependencies: ["B"] },
      E: { id: "E", label: "Math 201", x: 65, y: 190, dependencies: ["A"] },
      F: { id: "F", label: "CS 301", x: 50, y: 260, dependencies: ["D", "E"] },
    }
  }, [])

  // Topological sort steps
  const sortSteps = useMemo(() => {
    return [
      { active: "A", visited: ["A"], completed: [], stack: ["A"] },
      { active: "B", visited: ["A", "B"], completed: [], stack: ["B", "A"] },
      { active: "D", visited: ["A", "B", "D"], completed: [], stack: ["D", "B", "A"] },
      { active: "C", visited: ["A", "B", "D", "C"], completed: [], stack: ["C", "D", "B", "A"] },
      { active: "E", visited: ["A", "B", "D", "C", "E"], completed: [], stack: ["E", "C", "D", "B", "A"] },
      { active: "F", visited: ["A", "B", "D", "C", "E", "F"], completed: [], stack: ["F", "E", "C", "D", "B", "A"] },
      { active: "", visited: ["A", "B", "D", "C", "E", "F"], completed: ["F"], stack: ["E", "C", "D", "B", "A"] },
      { active: "", visited: ["A", "B", "D", "C", "E", "F"], completed: ["F", "E"], stack: ["C", "D", "B", "A"] },
      { active: "", visited: ["A", "B", "D", "C", "E", "F"], completed: ["F", "E", "C"], stack: ["D", "B", "A"] },
      { active: "", visited: ["A", "B", "D", "C", "E", "F"], completed: ["F", "E", "C", "D"], stack: ["B", "A"] },
      { active: "", visited: ["A", "B", "D", "C", "E", "F"], completed: ["F", "E", "C", "D", "B"], stack: ["A"] },
      { active: "", visited: ["A", "B", "D", "C", "E", "F"], completed: ["F", "E", "C", "D", "B", "A"], stack: [] },
    ]
  }, [])

  // Current sort state based on step
  const currentSort = useMemo(() => {
    return sortSteps[Math.min(step, sortSteps.length - 1)]
  }, [sortSteps, step])

  // Update graph based on current step
  const updatedGraph = useMemo(() => {
    const newGraph = { ...graph }

    // Mark nodes as visited, active, or completed
    Object.values(newGraph).forEach((node) => {
      node.visited = currentSort.visited.includes(node.id)
      node.active = node.id === currentSort.active
      node.completed = currentSort.completed.includes(node.id)
      node.order = currentSort.completed.indexOf(node.id)
    })

    return newGraph
  }, [graph, currentSort])

  // Generate edges
  const edges = []
  Object.values(updatedGraph).forEach((node) => {
    node.dependencies.forEach((depId) => {
      const depNode = updatedGraph[depId]

      // Determine edge appearance
      let edgeColor = "#999999" // Default gray
      let edgeWidth = 1

      if (node.active && depNode.visited) {
        edgeColor = "#ff6b6b" // Red for active
        edgeWidth = 3
      } else if (node.completed && depNode.completed) {
        edgeColor = "#40c057" // Green for completed
        edgeWidth = 2
      } else if (node.visited && depNode.visited) {
        edgeColor = "#4dabf7" // Blue for visited
        edgeWidth = 2
      }

      edges.push({
        from: depNode,
        to: node,
        color: edgeColor,
        width: edgeWidth,
      })
    })
  })

  return (
    <div className="w-full flex flex-col items-center p-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">Topological Sort</h2>
      <p className="text-xl mb-6">{currentSort.active ? `Visiting ${currentSort.active}` : "Processing stack"}</p>

      {/* Graph Visualization */}
      <div className="relative w-full" style={{ height: "350px" }}>
        {/* Draw edges */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={`${edge.from.x}%`}
              y1={`${edge.from.y}px`}
              x2={`${edge.to.x}%`}
              y2={`${edge.to.y}px`}
              stroke={edge.color}
              strokeWidth={edge.width}
            />
          ))}
        </svg>

        {/* Draw nodes */}
        {Object.values(updatedGraph).map((node) => {
          let bgColor = "bg-gray-400"
          const textColor = "text-white"
          let scale = "scale-100"
          let border = "border-gray-600"

          if (node.active) {
            bgColor = "bg-red-500"
            border = "border-red-700"
            scale = "scale-110"
          } else if (node.completed) {
            bgColor = "bg-green-500"
            border = "border-green-700"
          } else if (node.visited) {
            bgColor = "bg-blue-500"
            border = "border-blue-700"
          }

          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${scale} transition-all duration-300`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}px`,
                zIndex: 2,
              }}
            >
              <div
                className={`w-16 h-16 ${bgColor} ${textColor} rounded-full flex items-center justify-center text-2xl font-bold border-2 ${border} shadow-lg`}
              >
                {node.id}
              </div>

              <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 text-sm font-medium">
                {node.label}
              </div>

              {/* Order number for completed nodes */}
              {node.completed && node.order !== undefined && node.order >= 0 && (
                <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                  {node.order + 1}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Stack and Result Visualization */}
      <div className="mt-8 flex gap-8 flex-wrap justify-center">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Stack</h3>
          <div className="flex flex-col-reverse gap-2 items-center">
            {currentSort.stack.map((id, index) => (
              <div
                key={index}
                className="bg-blue-100 dark:bg-blue-900 w-10 h-10 flex items-center justify-center rounded border border-blue-300 dark:border-blue-700 font-bold"
              >
                {id}
              </div>
            ))}
            {currentSort.stack.length === 0 && <div className="text-lg italic">Stack empty</div>}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Topological Order</h3>
          <div className="flex gap-2 items-center">
            {currentSort.completed.map((id, index) => (
              <div
                key={index}
                className="bg-green-100 dark:bg-green-900 w-10 h-10 flex items-center justify-center rounded border border-green-300 dark:border-green-700 font-bold"
              >
                {id}
              </div>
            ))}
            {currentSort.completed.length === 0 && <div className="text-lg italic">No nodes completed yet</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
