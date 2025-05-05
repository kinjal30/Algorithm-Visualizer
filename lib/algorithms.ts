export interface Algorithm {
  id: string
  name: string
  category: string
  description: string
  timeComplexity: string
  spaceComplexity: string
  useCases: string[]
  code: string
  totalSteps: number
}

export const algorithms: Algorithm[] = [
  {
    id: "bst",
    name: "Binary Search Tree",
    category: "Tree",
    description:
      "A binary search tree is a binary tree data structure where each node has at most two children, and for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater than the node.",
    timeComplexity: "Average: O(log n) for search, insert, delete. Worst: O(n) if tree becomes unbalanced.",
    spaceComplexity: "O(n) for storing n elements",
    useCases: [
      "Implementing dynamic sets and lookup tables",
      "Used in many search applications",
      "Database indexing",
      "Priority queues",
    ],
    code: `class Node {\n  constructor(value) {\n    this.value = value;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nclass BinarySearchTree {\n  constructor() {\n    this.root = null;\n  }\n\n  insert(value) {\n    const newNode = new Node(value);\n    if (!this.root) {\n      this.root = newNode;\n      return this;\n    }\n    let current = this.root;\n    while (true) {\n      if (value === current.value) return undefined;\n      if (value < current.value) {\n        if (!current.left) {\n          current.left = newNode;\n          return this;\n        }\n        current = current.left;\n      } else {\n        if (!current.right) {\n          current.right = newNode;\n          return this;\n        }\n        current = current.right;\n      }\n    }\n  }\n\n  find(value) {\n    if (!this.root) return false;\n    let current = this.root;\n    while (current) {\n      if (value === current.value) return true;\n      if (value < current.value) {\n        current = current.left;\n      } else {\n        current = current.right;\n      }\n    }\n    return false;\n  }\n}`,
    totalSteps: 10,
  },
  {
    id: "graph-dfs",
    name: "Depth-First Search (Graph)",
    category: "Graph",
    description:
      "Depth-First Search is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E) where V is the number of vertices and E is the number of edges",
    spaceComplexity: "O(V) for the recursion stack",
    useCases: [
      "Topological sorting",
      "Finding connected components",
      "Solving puzzles with only one solution (e.g., mazes)",
      "Detecting cycles in a graph",
    ],
    code: `function dfs(graph, start) {\n  const visited = new Set();\n  const result = [];\n\n  function traverse(vertex) {\n    if (!vertex) return null;\n    \n    visited.add(vertex);\n    result.push(vertex);\n    \n    graph[vertex].forEach(neighbor => {\n      if (!visited.has(neighbor)) {\n        traverse(neighbor);\n      }\n    });\n  }\n  \n  traverse(start);\n  return result;\n}`,
    totalSteps: 12,
  },
  {
    id: "graph-bfs",
    name: "Breadth-First Search (Graph)",
    category: "Graph",
    description:
      "Breadth-First Search is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth prior to moving on to nodes at the next depth level.",
    timeComplexity: "O(V + E) where V is the number of vertices and E is the number of edges",
    spaceComplexity: "O(V) for the queue",
    useCases: [
      "Finding shortest path in an unweighted graph",
      "Web crawlers",
      "Social networking websites",
      "GPS navigation systems",
    ],
    code: `function bfs(graph, start) {\n  const queue = [start];\n  const visited = new Set([start]);\n  const result = [];\n\n  while (queue.length) {\n    const vertex = queue.shift();\n    result.push(vertex);\n\n    graph[vertex].forEach(neighbor => {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    });\n  }\n\n  return result;\n}`,
    totalSteps: 10,
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    description:
      "Binary search is a search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array and continues the search on the half that is likely to contain the target.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) for iterative implementation, O(log n) for recursive implementation due to call stack",
    useCases: [
      "Finding an element in a sorted array",
      "Dictionary lookup",
      "Finding insertion position in a sorted array",
      "Debugging (e.g., git bisect)",
    ],
    code: `function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n\n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  return -1; // Target not found\n}`,
    totalSteps: 8,
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    description:
      "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.",
    timeComplexity: "O(n²) in worst and average case, O(n) in best case (when array is already sorted)",
    spaceComplexity: "O(1) as it sorts in-place",
    useCases: [
      "Small datasets",
      "Nearly sorted arrays",
      "Online algorithms (can sort as data arrives)",
      "Embedded systems with limited memory",
    ],
    code: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let currentVal = arr[i];\n    let j;\n    \n    for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {\n      arr[j + 1] = arr[j];\n    }\n    \n    arr[j + 1] = currentVal;\n  }\n  \n  return arr;\n}`,
    totalSteps: 10,
  },
]
