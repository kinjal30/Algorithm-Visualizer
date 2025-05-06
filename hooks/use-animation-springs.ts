"use client"

import { useState, useEffect, useRef } from "react"
import { useSpring } from "@react-spring/three"

// Custom hook to create and manage animation springs
export function useAnimationSprings<T extends Record<string, any>>(
  items: T[],
  getPosition: (item: T) => [number, number, number],
  getScale: (item: T) => number | [number, number, number],
  config = { tension: 170, friction: 15 },
) {
  // Create state for positions and scales
  const [positions, setPositions] = useState<Array<[number, number, number]>>(items.map((item) => getPosition(item)))
  const [scales, setScales] = useState<Array<number | [number, number, number]>>(items.map((item) => getScale(item)))

  // Update positions and scales when items change
  useEffect(() => {
    setPositions(items.map((item) => getPosition(item)))
    setScales(items.map((item) => getScale(item)))
  }, [items, getPosition, getScale])

  const springRef = useRef<any[]>([])

  useEffect(() => {
    springRef.current = items.map((_, index) => {
      return useSpring({
        position: positions[index] || [0, 0, 0],
        scale: scales[index] || 1,
        config,
      })
    })
  }, [items, positions, scales, config])

  return springRef.current
}
