"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Line } from "@react-three/drei"
import type * as THREE from "three"

interface BinarySearchTreeProps {
  step: number
}

interface TreeNode {
  value: number
  x: number
  y: number
  left?: TreeNode
  right?: TreeNode
  highlighted?: boolean
}

export default function BinarySearchTree({ step }: BinarySearchTreeProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Create a sample BST
  const tree = useMemo(() => {
    const root: TreeNode = { value: 50, x: 0, y: 0 }

    // Level 1
    root.left = { value: 25, x: -4, y: -2 }
    root.right = { value: 75, x: 4, y: -2 }

    // Level 2
    root.left.left = { value: 12, x: -6, y: -4 }
    root.left.right = { value: 37, x: -2, y: -4 }
    root.right.left = { value: 62, x: 2, y: -4 }
    root.right.right = { value: 87, x: 6, y: -4 }

    return root
  }, [])

  // Update highlighted nodes based on step
  const highlightedTree = useMemo(() => {
    const cloneTree = (node: TreeNode | undefined): TreeNode | undefined => {
      if (!node) return undefined

      return {
        ...node,
        highlighted: false,
        left: cloneTree(node.left),
        right: cloneTree(node.right),
      }
    }

    const newTree = cloneTree(tree)

    // Highlight nodes based on step (simulating a search for value 62)
    if (newTree) {
      if (step >= 0) newTree.highlighted = true
      if (step >= 1) {
        newTree.highlighted = false
        if (newTree.right) newTree.right.highlighted = true
      }
      if (step >= 2) {
        if (newTree.right) {
          newTree.right.highlighted = false
          if (newTree.right.left) newTree.right.left.highlighted = true
        }
      }
      if (step >= 3) {
        if (newTree.right && newTree.right.left) {
          // Found the target
          newTree.right.left.highlighted = true
        }
      }
    }

    return newTree
  }, [tree, step])

  // Gentle rotation of the tree
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  // Recursive function to render nodes and edges
  const renderNode = (node: TreeNode | undefined) => {
    if (!node) return null

    const nodeColor = node.highlighted ? "#ff6b6b" : "#4dabf7"
    const textColor = node.highlighted ? "#ffffff" : "#000000"

    return (
      <group key={`${node.value}-${node.x}-${node.y}`}>
        {/* Node */}
        <mesh position={[node.x, node.y, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color={nodeColor} />
        </mesh>

        {/* Value text */}
        <Text position={[node.x, node.y, 0.8]} fontSize={0.5} color={textColor} anchorX="center" anchorY="middle">
          {node.value}
        </Text>

        {/* Edge to left child */}
        {node.left && (
          <Line
            points={[
              [node.x, node.y, 0],
              [node.left.x, node.left.y, 0],
            ]}
            color="#999999"
            lineWidth={2}
          />
        )}

        {/* Edge to right child */}
        {node.right && (
          <Line
            points={[
              [node.x, node.y, 0],
              [node.right.x, node.right.y, 0],
            ]}
            color="#999999"
            lineWidth={2}
          />
        )}

        {/* Render children */}
        {renderNode(node.left)}
        {renderNode(node.right)}
      </group>
    )
  }

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {renderNode(highlightedTree)}
    </group>
  )
}
