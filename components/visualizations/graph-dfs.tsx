"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Line } from "@react-three/drei"
import type * as THREE from "three"

interface GraphDFSProps {
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
}

export default function GraphDFS({ step }: GraphDFSProps) {
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

  // Update visited nodes based on step (DFS traversal: A -> B -> E -> F -> C -> G -> D -> H)
  const visitedGraph = useMemo(() => {
    const dfsOrder = ["A", "B", "E", "F", "C", "G", "D", "H"]
    const newGraph = JSON.parse(JSON.stringify(graph))

    for (let i = 0; i <= Math.min(step, dfsOrder.length - 1); i++) {
      const nodeId = dfsOrder[i]
      newGraph[nodeId].visited = true
      newGraph[nodeId].visitedAt = i
    }

    // Set active node
    if (step < dfsOrder.length) {
      newGraph[dfsOrder[step]].active = true
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
          const nodeColor = node.active ? "#ff6b6b" : node.visited ? "#4dabf7" : "#aaaaaa"

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
