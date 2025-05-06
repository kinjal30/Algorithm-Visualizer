import BinarySearchTree from "./binary-search-tree"
import GraphDFS from "./graph-dfs"
import GraphBFS from "./graph-bfs"
import BinarySearch from "./binary-search"
import InsertionSort from "./insertion-sort"
import TopologicalSort from "./topological-sort"
import KadanesAlgorithm from "./kadanes-algorithm"
import CountingSort from "./counting-sort"
import MinHeap from "./min-heap"
import MaxHeap from "./max-heap"
import DutchNationalFlag from "./dutch-national-flag"
import BitManipulation from "./bit-manipulation"
import GreedyAlgorithm from "./greedy-algorithm"

// Map algorithm IDs to their visualization components
export function getVisualization(id: string) {
  switch (id) {
    case "bst":
      return BinarySearchTree
    case "graph-dfs":
      return GraphDFS
    case "graph-bfs":
      return GraphBFS
    case "binary-search":
      return BinarySearch
    case "insertion-sort":
      return InsertionSort
    case "topological-sort":
      return TopologicalSort
    case "kadanes-algorithm":
      return KadanesAlgorithm
    case "counting-sort":
      return CountingSort
    case "min-heap":
      return MinHeap
    case "max-heap":
      return MaxHeap
    case "dutch-national-flag":
      return DutchNationalFlag
    case "bit-manipulation":
      return BitManipulation
    case "greedy-algorithm":
      return GreedyAlgorithm
    default:
      return BinarySearch // Default to binary search if visualization not found
  }
}
