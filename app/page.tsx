import { algorithms } from "@/lib/algorithms"
import AlgorithmVisualizerClient from "@/components/algorithm-visualizer-client"

export default function Home() {
  return <AlgorithmVisualizerClient initialAlgorithm={algorithms[0]} />
}
