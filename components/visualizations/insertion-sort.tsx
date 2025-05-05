"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface InsertionSortProps {
  step: number
}

export default function InsertionSort({ step }: InsertionSortProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Initial unsorted array
  const initialArray = useMemo(() => [29, 10, 14, 37, 20, 25, 44, 15], [])

  // Insertion sort steps
  const sortSteps = useMemo(() => {
    const steps = []
    const arr = [...initialArray]

    // Initial state
    steps.push({
      array: [...arr],
      current: null,
      comparing: null,
      sorted: [0],
    })

    // Insertion sort algorithm with step tracking
    for (let i = 1; i < arr.length; i++) {
      const currentVal = arr[i]

      // Before shifting elements
      steps.push({
        array: [...arr],
        current: i,
        comparing: i - 1,
        sorted: Array.from({ length: i }, (_, idx) => idx),
      })

      let j = i - 1
      while (j >= 0 && arr[j] > currentVal) {
        arr[j + 1] = arr[j]

        // After shifting one element
        steps.push({
          array: [...arr],
          current: i,
          comparing: j,
          sorted: Array.from({ length: i }, (_, idx) => idx),
        })

        j--
      }

      arr[j + 1] = currentVal

      // After inserting the current element
      steps.push({
        array: [...arr],
        current: j + 1,
        comparing: null,
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      })
    }

    // Final sorted array
    steps.push({
      array: [...arr],
      current: null,
      comparing: null,
      sorted: Array.from({ length: arr.length }, (_, idx) => idx),
    })

    return steps
  }, [initialArray])

  // Current sort state based on step
  const currentSort = useMemo(() => {
    return sortSteps[Math.min(step, sortSteps.length - 1)]
  }, [sortSteps, step])

  // Gentle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Array elements */}
      {currentSort.array.map((value, index) => {
        // Determine element color and position based on sort state
        let color = "#e9ecef" // Default color
        let yOffset = 0

        if (index === currentSort.current) {
          color = "#ff6b6b" // Current element being inserted
          yOffset = 0.5
        } else if (index === currentSort.comparing) {
          color = "#ffd43b" // Element being compared
        } else if (currentSort.sorted.includes(index)) {
          color = "#51cf66" // Sorted portion
        }

        const xPos = (index - currentSort.array.length / 2) * 1.8

        return (
          <group key={index} position={[xPos, yOffset, 0]}>
            {/* Box */}
            <mesh>
              <boxGeometry args={[1.5, value / 10, 1.5]} />
              <meshStandardMaterial color={color} />
            </mesh>

            {/* Value */}
            <Text position={[0, value / 20 + 0.5, 0]} fontSize={0.6} color="#000000" anchorX="center" anchorY="middle">
              {value}
            </Text>

            {/* Index */}
            <Text position={[0, -value / 20 - 0.5, 0]} fontSize={0.4} color="#000000" anchorX="center" anchorY="middle">
              {index}
            </Text>
          </group>
        )
      })}

      {/* Step information */}
      <Text position={[0, -3, 0]} fontSize={0.7} color="#000000" anchorX="center" anchorY="middle">
        {step >= sortSteps.length - 1
          ? "Array sorted!"
          : currentSort.current !== null
            ? `Inserting ${currentSort.array[currentSort.current]} at the right position`
            : "Starting insertion sort"}
      </Text>
    </group>
  )
}
