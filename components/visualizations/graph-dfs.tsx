"use client"

import { useMemo } from "react"

interface GraphDFSProps {
  step: number
}

export default function GraphDFS({ step }: GraphDFSProps) {
  // Create a sample graph
  const graph = useMemo(() => {
    return {
      A: { id: "A", x: 50, y: 50, neighbors: ["B", "C", "D"] },
      B: { id: "B", x: 25, y: 120, neighbors: ["A", "E", "F"] },
      C: { id: "C", x: 75, y: 120, neighbors: ["A", "G"] },
      D: { id: "D", x: 50, y: 180, neighbors: ["A", "H"] },
      E: { id: "E", x: 10, y: 190, neighbors: ["B"] },
      F: { id: "F", x: 40, y: 190, neighbors: ["B"] },
      G: { id: "G", x: 90, y: 190, neighbors: ["C"] },
      H: { id: "H", x: 60, y: 250, neighbors: ["D"] },
    }
  }, [])

  // DFS traversal order: A -> B -> E -> F -> C -> G -> D -> H
  const dfsOrder = ["A", "B", "E", "F", "C", "G", "D", "H"]

  // Update visited nodes based on step
  const visitedGraph = useMemo(() => {
    const newGraph = { ...graph }

    for (let i = 0; i <= Math.min(step, dfsOrder.length - 1); i++) {
      const nodeId = dfsOrder[i]
      newGraph[nodeId] = {
        ...newGraph[nodeId],
        visited: true,
        visitedAt: i,
      }
    }

    // Set active node
    if (step < dfsOrder.length) {
      newGraph[dfsOrder[step]] = {
        ...newGraph[dfsOrder[step]],
        active: true,
      }
    }

    return newGraph
  }, [graph, step, dfsOrder])

  // Generate edges
  const edges = []
  Object.values(visitedGraph).forEach((node) => {
    node.neighbors.forEach((neighborId) => {
      const neighbor = visitedGraph[neighborId]
      // Only render each edge once (when node.id < neighbor.id)
      if (node.id < neighborId) {
        const isVisitedEdge = node.visited && neighbor.visited && Math.abs(node.visitedAt - neighbor.visitedAt) === 1

        edges.push({
          from: node,
          to: neighbor,
          isVisitedEdge,
        })
      }
    })
  })

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Depth-First Search (DFS)</h2>
      <p className="text-xl mb-6">
        {step === 0 ? "Starting DFS from vertex A" : `Visiting vertex ${dfsOrder[step]} (Step ${step + 1})`}
      </p>

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
              stroke={edge.isVisitedEdge ? "#ff9500" : "#999999"}
              strokeWidth={edge.isVisitedEdge ? 4 : 1}
            />
          ))}
        </svg>

        {/* Draw nodes */}
        {Object.values(visitedGraph).map((node) => {
          let bgColor = "bg-gray-400"
          const textColor = "text-white"
          let scale = "scale-100"
          let border = "border-gray-600"

          if (node.active) {
            bgColor = "bg-red-500"
            border = "border-red-700"
            scale = "scale-110"
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

              {node.visited && (
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-lg font-bold">
                  {node.visitedAt}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-lg">Unvisited Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-lg">Visited Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
            <span className="text-lg">Current Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 border-4 border-orange-500 rounded-full mr-2"></div>
            <span className="text-lg">DFS Path</span>
          </div>
        </div>
      </div>
    </div>
  )
}
