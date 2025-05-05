"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface BinarySearchProps {
  step: number
}

export default function BinarySearch({ step }: BinarySearchProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Sample sorted array
  const array = useMemo(() => [5, 13, 19, 24, 29, 38, 45, 53, 67, 78, 91], [])

  // Binary search steps (searching for 45)
  const searchSteps = useMemo(
    () => [
      { left: 0, right: 10, mid: 5, found: false }, // Initial state
      { left: 0, right: 4, mid: 2, found: false }, // 38 > 19, go left
      { left: 3, right: 4, mid: 3, found: false }, // 19 < 45, go right
      { left: 4, right: 4, mid: 4, found: false }, // 24 < 45, go right
      { left: 5, right: 4, mid: 5, found: false }, // 29 < 45, go right
      { left: 6, right: 10, mid: 8, found: false }, // 67 > 45, go left
      { left: 6, right: 7, mid: 6, found: true }, // Found 45!
    ],
    [],
  )

  // Current search state based on step
  const currentSearch = useMemo(() => {
    return searchSteps[Math.min(step, searchSteps.length - 1)]
  }, [searchSteps, step])

  // Gentle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Array elements */}
      {array.map((value, index) => {
        // Determine element color based on search state
        let color = "#e9ecef" // Default color

        if (currentSearch.found && index === currentSearch.mid) {
          color = "#51cf66" // Found
        } else if (index === currentSearch.mid) {
          color = "#ff6b6b" // Current mid
        } else if (index >= currentSearch.left && index <= currentSearch.right) {
          color = "#4dabf7" // In current search range
        }

        const xPos = (index - array.length / 2) * 1.5

        return (
          <group key={index} position={[xPos, 0, 0]}>
            {/* Box */}
            <mesh>
              <boxGeometry args={[1.3, 1.3, 1.3]} />
              <meshStandardMaterial color={color} />
            </mesh>

            {/* Value */}
            <Text position={[0, 0, 0.7]} fontSize={0.6} color="#000000" anchorX="center" anchorY="middle">
              {value}
            </Text>

            {/* Index */}
            <Text position={[0, -1, 0]} fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
              {index}
            </Text>

            {/* Markers for left, right, mid */}
            {index === currentSearch.left && (
              <Text position={[0, 1.5, 0]} fontSize={0.5} color="#000000" anchorX="center" anchorY="middle">
                L
              </Text>
            )}

            {index === currentSearch.right && (
              <Text position={[0, 1.5, 0]} fontSize={0.5} color="#000000" anchorX="center" anchorY="middle">
                R
              </Text>
            )}

            {index === currentSearch.mid && (
              <Text position={[0, 2, 0]} fontSize={0.5} color="#000000" anchorX="center" anchorY="middle">
                MID
              </Text>
            )}
          </group>
        )
      })}

      {/* Step information */}
      <Text position={[0, -3, 0]} fontSize={0.7} color="#000000" anchorX="center" anchorY="middle">
        {currentSearch.found
          ? "Target 45 found at index 6!"
          : `Searching for 45: L=${currentSearch.left}, R=${currentSearch.right}, Mid=${currentSearch.mid}`}
      </Text>
    </group>
  )
}
