"use client"

import { useMemo } from "react"

interface GraphBFSProps {
  step: number
}

export default function GraphBFS({ step }: GraphBFSProps) {
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

  // BFS traversal order: A -> B -> C -> D -> E -> F -> G -> H
  const bfsOrder = ["A", "B", "C", "D", "E", "F", "G", "H"]

  // BFS queue simulation
  const queueSteps = useMemo(
    () => [
      ["A"], // Initial
      ["B", "C", "D"], // After processing A
      ["C", "D", "E", "F"], // After processing B
      ["D", "E", "F", "G"], // After processing C
      ["E", "F", "G", "H"], // After processing D
      ["F", "G", "H"], // After processing E
      ["G", "H"], // After processing F
      ["H"], // After processing G
      [], // After processing H
    ],
    [],
  )

  // Update visited nodes based on step
  const visitedGraph = useMemo(() => {
    const newGraph = { ...graph }

    // Mark nodes as visited and in queue based on step
    if (step >= 0) {
      // Mark the active node
      const activeNodeId = step < bfsOrder.length ? bfsOrder[step] : null

      // Mark visited nodes
      for (let i = 0; i <= Math.min(step, bfsOrder.length - 1); i++) {
        const nodeId = bfsOrder[i]
        newGraph[nodeId] = {
          ...newGraph[nodeId],
          visited: true,
          visitedAt: i,
        }
      }

      // Mark nodes in queue
      if (step < queueSteps.length) {
        queueSteps[step].forEach((nodeId) => {
          newGraph[nodeId] = {
            ...newGraph[nodeId],
            inQueue: true,
          }
        })
      }

      // Mark active node
      if (activeNodeId) {
        newGraph[activeNodeId] = {
          ...newGraph[activeNodeId],
          active: true,
        }
      }
    }

    return newGraph
  }, [graph, step, bfsOrder, queueSteps])

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
      <h2 className="text-2xl font-bold mb-4">Breadth-First Search (BFS)</h2>
      <p className="text-xl mb-6">
        {step === 0 ? "Starting BFS from vertex A" : `Visiting vertex ${bfsOrder[step]} (Step ${step + 1})`}
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
          } else if (node.inQueue) {
            bgColor = "bg-yellow-500"
            border = "border-yellow-700"
            scale = "scale-105"
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

      {/* Queue Visualization */}
      <div className="mt-8 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2">Queue</h3>
        <div className="flex gap-2">
          {queueSteps[Math.min(step, queueSteps.length - 1)].map((nodeId, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-xl font-bold border-2 border-yellow-700"
            >
              {nodeId}
            </div>
          ))}
          {queueSteps[Math.min(step, queueSteps.length - 1)].length === 0 && (
            <div className="text-lg italic">Queue empty</div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
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
            <div className="w-6 h-6 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-lg">Node in Queue</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
            <span className="text-lg">Current Node</span>
          </div>
        </div>
      </div>
    </div>
  )
}
