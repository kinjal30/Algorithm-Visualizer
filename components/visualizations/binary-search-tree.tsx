"use client"

import { useMemo } from "react"

interface BinarySearchTreeProps {
  step: number
}

export default function BinarySearchTree({ step }: BinarySearchTreeProps) {
  // Create a sample BST
  const tree = useMemo(() => {
    const root = {
      value: 50,
      x: 50,
      y: 50,
      left: {
        value: 25,
        x: 25,
        y: 120,
        left: { value: 12, x: 12.5, y: 190 },
        right: { value: 37, x: 37.5, y: 190 },
      },
      right: {
        value: 75,
        x: 75,
        y: 120,
        left: { value: 62, x: 62.5, y: 190 },
        right: { value: 87, x: 87.5, y: 190 },
      },
    }
    return root
  }, [])

  // Update highlighted nodes based on step
  const highlightedTree = useMemo(() => {
    const cloneTree = (node) => {
      if (!node) return undefined

      return {
        ...node,
        highlighted: false,
        inserted: false,
        searched: false,
        left: cloneTree(node.left),
        right: cloneTree(node.right),
      }
    }

    const newTree = cloneTree(tree)

    // Highlight nodes based on step (simulating a search for value 62)
    if (step >= 0) {
      newTree.highlighted = true
      newTree.searched = true
    }
    if (step >= 1) {
      newTree.highlighted = false
      if (newTree.right) {
        newTree.right.highlighted = true
        newTree.right.searched = true
      }
    }
    if (step >= 2) {
      if (newTree.right) {
        newTree.right.highlighted = false
        if (newTree.right.left) {
          newTree.right.left.highlighted = true
          newTree.right.left.searched = true
        }
      }
    }
    if (step >= 3) {
      if (newTree.right && newTree.right.left) {
        // Found the target
        newTree.right.left.highlighted = true
        newTree.right.left.inserted = true
      }
    }

    return newTree
  }, [tree, step])

  // Flatten tree for rendering
  const flattenTree = (node, result = []) => {
    if (!node) return result

    result.push(node)
    if (node.left) flattenTree(node.left, result)
    if (node.right) flattenTree(node.right, result)

    return result
  }

  const nodes = flattenTree(highlightedTree)

  // Generate edges
  const edges = []
  const addEdges = (node) => {
    if (!node) return

    if (node.left) {
      edges.push({
        from: { x: node.x, y: node.y },
        to: { x: node.left.x, y: node.left.y },
        highlighted: node.highlighted && node.left.highlighted,
      })
      addEdges(node.left)
    }

    if (node.right) {
      edges.push({
        from: { x: node.x, y: node.y },
        to: { x: node.right.x, y: node.right.y },
        highlighted: node.highlighted && node.right.highlighted,
      })
      addEdges(node.right)
    }
  }

  addEdges(highlightedTree)

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Binary Search Tree</h2>
      <p className="text-xl mb-6">
        {step === 0
          ? "Starting search for 62 at root node"
          : step === 1
            ? "62 > 50, go to right subtree"
            : step === 2
              ? "62 < 75, go to left subtree"
              : step === 3
                ? "Found 62! Search complete"
                : "Binary Search Tree"}
      </p>

      {/* Tree Visualization */}
      <div className="relative w-full" style={{ height: "350px" }}>
        {/* Draw edges */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={`${edge.from.x}%`}
              y1={edge.from.y}
              x2={`${edge.to.x}%`}
              y2={edge.to.y}
              stroke={edge.highlighted ? "#ff6b6b" : "#999999"}
              strokeWidth={edge.highlighted ? 3 : 2}
            />
          ))}
        </svg>

        {/* Draw nodes */}
        {nodes.map((node, index) => {
          let bgColor = "bg-blue-500"
          const textColor = "text-white"
          let scale = "scale-100"
          let border = "border-blue-700"

          if (node.inserted) {
            bgColor = "bg-green-500"
            border = "border-green-700"
            scale = "scale-110"
          } else if (node.highlighted) {
            bgColor = "bg-red-500"
            border = "border-red-700"
            scale = "scale-110"
          } else if (node.searched) {
            bgColor = "bg-yellow-500"
            border = "border-yellow-700"
          }

          return (
            <div
              key={index}
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
                {node.value}
              </div>

              {/* Status indicator */}
              {node.highlighted && (
                <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-lg font-bold">
                  {node.inserted ? "Found!" : "Checking"}
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
            <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-lg">Regular Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
            <span className="text-lg">Current Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-lg">Visited Node</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
            <span className="text-lg">Found Node</span>
          </div>
        </div>
      </div>
    </div>
  )
}
