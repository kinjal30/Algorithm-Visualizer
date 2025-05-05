"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Line } from "@react-three/drei"
import type * as THREE from "three"

interface GraphBFSProps {
  step: number
}

interface GraphNode {
  id: string
  x: number
  y: number
  z: number
  neighbors: string[]
  visited?: boolean
  active?: boolean
  visitedAt?: number
  inQueue?: boolean
}

export default function GraphBFS({ step }: GraphBFSProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Create a sample graph
  const graph = useMemo(() => {
    const nodes: Record<string, GraphNode> = {
      A: { id: "A", x: 0, y: 0, z: 0, neighbors: ["B", "C", "D"] },
      B: { id: "B", x: -3, y: 0, z: 2, neighbors: ["A", "E", "F"] },
      C: { id: "C", x: 3, y: 0, z: 2, neighbors: ["A", "G"] },
      D: { id: "D", x: 0, y: 0, z: -3, neighbors: ["A", "H"] },
      E: { id: "E", x: -5, y: 0, z: 0, neighbors: ["B"] },
      F: { id: "F", x: -3, y: 0, z: 5, neighbors: ["B"] },
      G: { id: "G", x: 5, y: 0, z: 3, neighbors: ["C"] },
      H: { id: "H", x: -2, y: 0, z: -5, neighbors: ["D"] },
    }

    return nodes
  }, [])

  // Update visited nodes based on step (BFS traversal: A -> B -> C -> D -> E -> F -> G -> H)
  const visitedGraph = useMemo(() => {
    const bfsOrder = ["A", "B", "C", "D", "E", "F", "G", "H"]
    const newGraph = JSON.parse(JSON.stringify(graph))

    // BFS queue simulation
    const queueSteps = [
      ["A"], // Initial
      ["B", "C", "D"], // After processing A
      ["C", "D", "E", "F"], // After processing B
      ["D", "E", "F", "G"], // After processing C
      ["E", "F", "G", "H"], // After processing D
      ["F", "G", "H"], // After processing E
      ["G", "H"], // After processing F
      ["H"], // After processing G
      [], // After processing H
    ]

    // Mark nodes as visited and in queue based on step
    if (step >= 0) {
      // Mark the active node
      const activeNodeId = step < bfsOrder.length ? bfsOrder[step] : null

      // Mark visited nodes
      for (let i = 0; i <= Math.min(step, bfsOrder.length - 1); i++) {
        const nodeId = bfsOrder[i]
        newGraph[nodeId].visited = true
        newGraph[nodeId].visitedAt = i
      }

      // Mark nodes in queue
      if (step < queueSteps.length) {
        queueSteps[step].forEach((nodeId) => {
          newGraph[nodeId].inQueue = true
        })
      }

      // Mark active node
      if (activeNodeId) {
        newGraph[activeNodeId].active = true
      }
    }

    return newGraph
  }, [graph, step])

  // Gentle rotation of the graph
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Render nodes and edges
  const renderGraph = () => {
    const nodes = Object.values(visitedGraph)

    return (
      <>
        {/* Render edges first */}
        {nodes.map((node) =>
          node.neighbors.map((neighborId) => {
            const neighbor = visitedGraph[neighborId]
            // Only render each edge once (when node.id < neighbor.id)
            if (node.id < neighborId) {
              const isVisitedEdge =
                node.visited && neighbor.visited && Math.abs(node.visitedAt! - neighbor.visitedAt!) === 1

              return (
                <Line
                  key={`${node.id}-${neighborId}`}
                  points={[
                    [node.x, node.y, node.z],
                    [neighbor.x, neighbor.y, neighbor.z],
                  ]}
                  color={isVisitedEdge ? "#ff9500" : "#999999"}
                  lineWidth={isVisitedEdge ? 4 : 1}
                />
              )
            }
            return null
          }),
        )}

        {/* Render nodes */}
        {nodes.map((node) => {
          let nodeColor = "#aaaaaa" // Default color
          if (node.active)
            nodeColor = "#ff6b6b" // Active node
          else if (node.visited)
            nodeColor = "#4dabf7" // Visited node
          else if (node.inQueue) nodeColor = "#ffd43b" // In queue

          return (
            <group key={node.id} position={[node.x, node.y, node.z]}>
              <mesh>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial color={nodeColor} />
              </mesh>

              <Text position={[0, 1, 0]} fontSize={0.6} color="#000000" anchorX="center" anchorY="middle">
                {node.id}
              </Text>

              {node.visited && (
                <Text position={[0, -1, 0]} fontSize={0.5} color="#000000" anchorX="center" anchorY="middle">
                  {node.visitedAt}
                </Text>
              )}
            </group>
          )
        })}
      </>
    )
  }

  return <group ref={groupRef}>{renderGraph()}</group>
}
