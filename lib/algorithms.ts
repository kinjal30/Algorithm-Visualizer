export interface Algorithm {
  id: string
  name: string
  category: string
  description: string
  problemStatement?: string // Add this field
  timeComplexity: string
  spaceComplexity: string
  useCases: string[]
  keyInsights: string[]
  pythonCode: string
  codeExplanation: string
  totalSteps: number
  stepDescriptions: string[]
  tags: string[]
}

export const algorithms: Algorithm[] = [
  {
    id: "bst",
    name: "Binary Search Tree",
    category: "Tree",
    description:
      "A binary search tree is a binary tree data structure where each node has at most two children, and for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater than the node. This property makes searching, insertion, and deletion operations efficient.",
    timeComplexity: "Average: O(log n) for search, insert, delete. Worst: O(n) if tree becomes unbalanced.",
    spaceComplexity: "O(n) for storing n elements",
    useCases: [
      "Implementing dynamic sets and lookup tables",
      "Used in many search applications",
      "Database indexing",
      "Priority queues",
    ],
    keyInsights: [
      "BSTs provide O(log n) time complexity for common operations when balanced",
      "The inorder traversal of a BST gives elements in sorted order",
      "Self-balancing variants like AVL and Red-Black trees maintain O(log n) worst-case performance",
      "BSTs can degenerate into linked lists in worst case, resulting in O(n) operations",
    ],
    pythonCode: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        new_node = Node(value)
        
        if self.root is None:
            self.root = new_node
            return self
        
        current = self.root
        while True:
            if value == current.value:
                return None  # Duplicate value
            
            if value < current.value:
                if current.left is None:
                    current.left = new_node
                    return self
                current = current.left
            else:
                if current.right is None:
                    current.right = new_node
                    return self
                current = current.right
    
    def find(self, value):
        if self.root is None:
            return False
        
        current = self.root
        while current:
            if value == current.value:
                return True
            
            if value < current.value:
                current = current.left
            else:
                current = current.right
        
        return False
    
    def remove(self, value):
        self.root = self._remove_node(self.root, value)
        
    def _remove_node(self, root, value):
        # Base case
        if root is None:
            return None
            
        # Recursive search for the node to remove
        if value < root.value:
            root.left = self._remove_node(root.left, value)
        elif value > root.value:
            root.right = self._remove_node(root.right, value)
        else:
            # Node with only one child or no child
            if root.left is None:
                return root.right
            elif root.right is None:
                return root.left
                
            # Node with two children
            # Get the inorder successor (smallest in the right subtree)
            root.value = self._min_value(root.right)
            
            # Delete the inorder successor
            root.right = self._remove_node(root.right, root.value)
            
        return root
        
    def _min_value(self, node):
        current = node
        while current.left is not None:
            current = current.left
        return current.value`,
    codeExplanation:
      "This Python implementation of a Binary Search Tree includes the core operations: insert, find, and remove. The insert method adds a new value while maintaining the BST property. The find method searches for a value by traversing the tree. The remove method handles three cases: removing a leaf node, a node with one child, or a node with two children (using the inorder successor).",
    totalSteps: 10,
    stepDescriptions: [
      "Starting at the root node (50)",
      "Comparing 62 with 50: 62 > 50, so go to the right subtree",
      "Comparing 62 with 75: 62 < 75, so go to the left subtree",
      "Found 62 in the tree!",
      "BST search complete",
      "BST search complete",
      "BST search complete",
      "BST search complete",
      "BST search complete",
      "BST search complete",
    ],
    tags: ["tree", "search", "binary", "recursive"],
  },
  {
    id: "graph-dfs",
    name: "Depth-First Search (Graph)",
    category: "Graph",
    description:
      "Depth-First Search is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking. DFS uses a stack (often implemented using recursion) to keep track of nodes to visit next.",
    timeComplexity: "O(V + E) where V is the number of vertices and E is the number of edges",
    spaceComplexity: "O(V) for the recursion stack",
    useCases: [
      "Topological sorting",
      "Finding connected components",
      "Solving puzzles with only one solution (e.g., mazes)",
      "Detecting cycles in a graph",
    ],
    keyInsights: [
      "DFS explores deep into a path before backtracking",
      "It can be implemented using recursion or an explicit stack",
      "DFS is not guaranteed to find the shortest path",
      "Pre-order, in-order, and post-order tree traversals are forms of DFS",
    ],
    pythonCode: `def dfs_recursive(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    # Mark the current node as visited
    visited.add(start)
    print(start, end=' ')  # Process the current node
    
    # Recur for all adjacent vertices
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    
    return visited

def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        vertex = stack.pop()
        
        if vertex not in visited:
            print(vertex, end=' ')  # Process the current node
            visited.add(vertex)
            
            # Add all unvisited neighbors to the stack
            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited

# Example usage
if __name__ == "__main__":
    # Example graph represented as an adjacency list
    graph = {
        'A': ['B', 'C', 'D'],
        'B': ['A', 'E', 'F'],
        'C': ['A', 'G'],
        'D': ['A', 'H'],
        'E': ['B'],
        'F': ['B'],
        'G': ['C'],
        'H': ['D']
    }
    
    print("DFS Recursive:")
    dfs_recursive(graph, 'A')
    
    print("\\nDFS Iterative:")
    dfs_iterative(graph, 'A')`,
    codeExplanation:
      "This Python implementation provides both recursive and iterative approaches to Depth-First Search. The recursive version uses the call stack to keep track of vertices to visit, while the iterative version uses an explicit stack data structure. Both functions take a graph (represented as an adjacency list) and a starting vertex, then visit all reachable vertices in a depth-first manner, marking each vertex as visited to avoid cycles.",
    totalSteps: 12,
    stepDescriptions: [
      "Starting DFS from vertex A",
      "Visit vertex A and mark it as visited",
      "Explore neighbor B of vertex A",
      "Visit vertex B and mark it as visited",
      "Explore neighbor E of vertex B",
      "Visit vertex E and mark it as visited",
      "Backtrack to B and explore neighbor F",
      "Visit vertex F and mark it as visited",
      "Backtrack to A and explore neighbor C",
      "Visit vertex C and mark it as visited",
      "Explore neighbor G of vertex C",
      "Visit vertex G and mark it as visited",
    ],
    tags: ["graph", "search", "traversal", "recursive", "stack"],
  },
  {
    id: "graph-bfs",
    name: "Breadth-First Search (Graph)",
    category: "Graph",
    description:
      "Breadth-First Search is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth prior to moving on to nodes at the next depth level. BFS uses a queue to keep track of nodes to visit next, ensuring that it visits nodes in order of their distance from the source.",
    timeComplexity: "O(V + E) where V is the number of vertices and E is the number of edges",
    spaceComplexity: "O(V) for the queue",
    useCases: [
      "Finding shortest path in an unweighted graph",
      "Web crawlers",
      "Social networking websites (finding people within a certain connection distance)",
      "GPS navigation systems",
    ],
    keyInsights: [
      "BFS explores all neighbors at the current depth before moving to the next level",
      "It guarantees the shortest path in unweighted graphs",
      "BFS requires more memory than DFS due to storing all nodes at a level",
      "Level order traversal in trees is a form of BFS",
    ],
    pythonCode: `from collections import deque

def bfs(graph, start):
    # Keep track of visited vertices
    visited = set([start])
    
    # Queue for BFS
    queue = deque([start])
    
    # Result list to store the BFS traversal order
    result = []
    
    while queue:
        # Dequeue a vertex from the queue
        vertex = queue.popleft()
        result.append(vertex)
        
        # Get all adjacent vertices of the dequeued vertex
        # If an adjacent vertex has not been visited, mark it
        # visited and enqueue it
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# Function to find shortest path using BFS
def shortest_path(graph, start, end):
    # Keep track of visited vertices
    visited = set([start])
    
    # Queue for BFS with path information
    queue = deque([(start, [start])])
    
    while queue:
        # Dequeue a vertex and its path from the queue
        vertex, path = queue.popleft()
        
        # If we've reached the end vertex, return the path
        if vertex == end:
            return path
        
        # Explore neighbors
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                # Enqueue the neighbor with the updated path
                queue.append((neighbor, path + [neighbor]))
    
    # If no path is found
    return None

# Example usage
if __name__ == "__main__":
    # Example graph represented as an adjacency list
    graph = {
        'A': ['B', 'C', 'D'],
        'B': ['A', 'E', 'F'],
        'C': ['A', 'G'],
        'D': ['A', 'H'],
        'E': ['B'],
        'F': ['B'],
        'G': ['C'],
        'H': ['D']
    }
    
    print("BFS Traversal:")
    print(bfs(graph, 'A'))
    
    print("Shortest path from A to G:")
    print(shortest_path(graph, 'A', 'G'))`,
    codeExplanation:
      "This Python implementation of Breadth-First Search uses a queue to explore vertices level by level. The basic BFS function returns the traversal order, while the shortest_path function extends BFS to find the shortest path between two vertices. Both functions use a visited set to avoid cycles. The queue ensures that vertices are processed in order of their distance from the starting vertex, making BFS ideal for finding shortest paths in unweighted graphs.",
    totalSteps: 10,
    stepDescriptions: [
      "Starting BFS from vertex A",
      "Visit vertex A and add its neighbors (B, C, D) to the queue",
      "Visit vertex B and add its unvisited neighbors (E, F) to the queue",
      "Visit vertex C and add its unvisited neighbor (G) to the queue",
      "Visit vertex D and add its unvisited neighbor (H) to the queue",
      "Visit vertex E (no new neighbors to add)",
      "Visit vertex F (no new neighbors to add)",
      "Visit vertex G (no new neighbors to add)",
      "Visit vertex H (no new neighbors to add)",
      "BFS traversal complete: A, B, C, D, E, F, G, H",
    ],
    tags: ["graph", "search", "traversal", "queue", "shortest path"],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    description:
      "Binary search is a search algorithm that finds the position of a target value within a sorted array. It compares the target value to the middle element of the array and continues the search on the half that is likely to contain the target. This divide-and-conquer approach allows binary search to achieve logarithmic time complexity.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) for iterative implementation, O(log n) for recursive implementation due to call stack",
    useCases: [
      "Finding an element in a sorted array",
      "Dictionary lookup",
      "Finding insertion position in a sorted array",
      "Debugging (e.g., git bisect)",
    ],
    keyInsights: [
      "Binary search requires the array to be sorted",
      "It reduces the search space by half in each step",
      "Binary search is much faster than linear search for large datasets",
      "It can be adapted to find the insertion point for a new element",
    ],
    pythonCode: `def binary_search_iterative(arr, target):
    """
    Iterative implementation of binary search
    Returns the index of target in arr if found, otherwise -1
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        # Calculate middle index (avoiding integer overflow)
        mid = left + (right - left) // 2
        
        # Check if target is present at mid
        if arr[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
        
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    # Element is not present in array
    return -1

def binary_search_recursive(arr, target, left=None, right=None):
    """
    Recursive implementation of binary search
    Returns the index of target in arr if found, otherwise -1
    """
    # Initialize left and right for first call
    if left is None and right is None:
        left, right = 0, len(arr) - 1
    
    # Base case: element not found
    if left > right:
        return -1
    
    # Calculate middle index
    mid = left + (right - left) // 2
    
    # Check if target is present at mid
    if arr[mid] == target:
        return mid
    
    # If target is greater, search in right half
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    
    # If target is smaller, search in left half
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example usage
if __name__ == "__main__":
    sorted_array = [5, 13, 19, 24, 29, 38, 45, 53, 67, 78, 91]
    target = 45
    
    # Iterative approach
    result_iterative = binary_search_iterative(sorted_array, target)
    if result_iterative != -1:
        print(f"Iterative: Element {target} found at index {result_iterative}")
    else:
        print(f"Iterative: Element {target} not found in the array")
    
    # Recursive approach
    result_recursive = binary_search_recursive(sorted_array, target)
    if result_recursive != -1:
        print(f"Recursive: Element {target} found at index {result_recursive}")
    else:
        print(f"Recursive: Element {target} not found in the array")`,
    codeExplanation:
      "This Python implementation provides both iterative and recursive approaches to binary search. Both functions take a sorted array and a target value, then repeatedly divide the search space in half until the target is found or determined to be not present. The iterative version uses a while loop with left and right pointers, while the recursive version calls itself with updated search boundaries. Both implementations achieve O(log n) time complexity.",
    totalSteps: 8,
    stepDescriptions: [
      "Initialize search range to the entire array [5, 13, 19, 24, 29, 38, 45, 53, 67, 78, 91]",
      "Compare target 45 with middle element 38: 45 > 38, so search in right half",
      "Update search range to [45, 53, 67, 78, 91]",
      "Compare target 45 with middle element 67: 45 < 67, so search in left half",
      "Update search range to [45, 53]",
      "Compare target 45 with middle element 45: Found target!",
      "Return index 6 where target 45 is located",
      "Binary search complete",
    ],
    tags: ["search", "divide and conquer", "sorted array", "logarithmic"],
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    description:
      "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It iterates through an array, consuming one input element at each repetition, and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.",
    timeComplexity: "O(n²) in worst and average case, O(n) in best case (when array is already sorted)",
    spaceComplexity: "O(1) as it sorts in-place",
    useCases: [
      "Small datasets",
      "Nearly sorted arrays",
      "Online algorithms (can sort as data arrives)",
      "Embedded systems with limited memory",
    ],
    keyInsights: [
      "Insertion sort is efficient for small or nearly sorted datasets",
      "It's an in-place, stable sorting algorithm",
      "It performs better than other quadratic sorts like bubble sort",
      "It's often used as part of more complex algorithms like Timsort",
    ],
    pythonCode: `def insertion_sort(arr):
    """
    Sorts an array using the insertion sort algorithm
    """
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        
        # Move elements of arr[0..i-1], that are greater than key,
        # to one position ahead of their current position
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key
    
    return arr

# Example usage
if __name__ == "__main__":
    # Example array
    arr = [29, 10, 14, 37, 20, 25, 44, 15]
    
    print("Original array:", arr)
    sorted_arr = insertion_sort(arr.copy())
    print("Sorted array:", sorted_arr)
    
    # Step-by-step demonstration
    def insertion_sort_steps(arr):
        """
        Demonstrates insertion sort step by step
        """
        print("Initial array:", arr)
        
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            
            print(f"\\nStep {i}: Insert {key} into sorted portion {arr[:i]}")
            
            while j >= 0 and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
                print(f"  Shift: {arr}")
            
            arr[j + 1] = key
            print(f"  Insert: {arr}")
        
        print("\\nFinal sorted array:", arr)
    
    # Demonstrate step by step
    insertion_sort_steps(arr.copy())`,
    codeExplanation:
      "This Python implementation of insertion sort builds a sorted array one element at a time. For each element, it finds the correct position in the already sorted portion of the array and shifts larger elements to make room. The main function performs the sort efficiently, while the step-by-step demonstration function shows the algorithm's progress at each iteration. Insertion sort is particularly efficient for small or nearly sorted arrays.",
    totalSteps: 10,
    stepDescriptions: [
      "Start with array [29, 10, 14, 37, 20, 25, 44, 15]",
      "Consider element 10: Insert it before 29 → [10, 29, 14, 37, 20, 25, 44, 15]",
      "Consider element 14: Insert it between 10 and 29 → [10, 14, 29, 37, 20, 25, 44, 15]",
      "Consider element 37: It's already in correct position → [10, 14, 29, 37, 20, 25, 44, 15]",
      "Consider element 20: Insert it between 14 and 29 → [10, 14, 20, 29, 37, 25, 44, 15]",
      "Consider element 25: Insert it between 20 and 29 → [10, 14, 20, 25, 29, 37, 44, 15]",
      "Consider element 44: It's already in correct position → [10, 14, 20, 25, 29, 37, 44, 15]",
      "Consider element 15: Insert it between 14 and 20 → [10, 14, 15, 20, 25, 29, 37, 44]",
      "Sorting complete: [10, 14, 15, 20, 25, 29, 37, 44]",
      "Final sorted array: [10, 14, 15, 20, 25, 29, 37, 44]",
    ],
    tags: ["sorting", "in-place", "stable", "quadratic", "elementary"],
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    category: "Graph",
    description:
      "Topological sorting is an algorithm for ordering the vertices of a directed acyclic graph (DAG) such that for every directed edge (u, v), vertex u comes before vertex v in the ordering. In other words, it creates a linear ordering of vertices based on their dependencies. Topological sorting is only possible if the graph has no directed cycles.",
    timeComplexity: "O(V + E) where V is the number of vertices and E is the number of edges",
    spaceComplexity: "O(V) for storing the visited vertices and the result",
    useCases: [
      "Scheduling jobs or tasks with dependencies",
      "Course prerequisites in academic planning",
      "Package dependencies in software installation",
      "Compilation order in build systems",
    ],
    keyInsights: [
      "Topological sort only works on directed acyclic graphs (DAGs)",
      "There can be multiple valid topological orderings for a single graph",
      "It can be implemented using DFS or using Kahn's algorithm (BFS-based)",
      "Detecting a cycle during the algorithm means topological sort is impossible",
    ],
    pythonCode: `def topological_sort_dfs(graph):
    """
    Performs topological sort on a directed acyclic graph using DFS
    Returns a list of vertices in topological order
    """
    # Keep track of visited vertices
    visited = set()
    
    # Stack to store the topological order
    stack = []
    
    # Helper function for DFS
    def dfs(vertex):
        # Mark the current vertex as visited
        visited.add(vertex)
        
        # Recur for all adjacent vertices
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                dfs(neighbor)
        
        # After all neighbors are processed, add current vertex to stack
        stack.append(vertex)
    
    # Visit all vertices
    for vertex in graph:
        if vertex not in visited:
            dfs(vertex)
    
    # Return reversed stack (topological order)
    return stack[::-1]

def topological_sort_kahn(graph):
    """
    Performs topological sort on a directed acyclic graph using Kahn's algorithm
    Returns a list of vertices in topological order
    """
    # Calculate in-degree for each vertex
    in_degree = {vertex: 0 for vertex in graph}
    for vertex in graph:
        for neighbor in graph[vertex]:
            in_degree[neighbor] = in_degree.get(neighbor, 0) + 1
    
    # Queue of vertices with no incoming edges
    queue = [vertex for vertex in in_degree if in_degree[vertex] == 0]
    
    # Result list
    result = []
    
    # Process vertices with no incoming edges
    while queue:
        vertex = queue.pop(0)
        result.append(vertex)
        
        # Reduce in-degree of neighbors
        for neighbor in graph.get(vertex, []):
            in_degree[neighbor] -= 1
            
            # If in-degree becomes 0, add to queue
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check if there was a cycle
    if len(result) != len(graph):
        return None  # Graph has a cycle
    
    return result

# Example usage
if __name__ == "__main__":
    # Example graph represented as an adjacency list (course prerequisites)
    # Each key is a course, and its values are the courses that depend on it
    graph = {
        'A': ['C', 'E'],  # Math 101
        'B': ['D'],       # CS 101
        'C': ['F'],       # Physics 101
        'D': ['F'],       # CS 201
        'E': ['F'],       # Math 201
        'F': []           # CS 301
    }
    
    print("Topological Sort (DFS):")
    print(topological_sort_dfs(graph))
    
    print("Topological Sort (Kahn's algorithm):")
    print(topological_sort_kahn(graph))`,
    codeExplanation:
      "This Python implementation provides two approaches to topological sorting. The DFS-based method uses depth-first search to explore the graph, adding vertices to a stack after all their dependencies are processed. Kahn's algorithm uses a breadth-first approach, starting with vertices that have no dependencies and gradually removing edges as vertices are processed. Both methods achieve O(V + E) time complexity and can detect cycles in the graph, which would make topological sorting impossible.",
    totalSteps: 12,
    stepDescriptions: [
      "Start DFS-based topological sort on the course prerequisites graph",
      "Visit course A (Math 101) and explore its dependencies",
      "Visit course C (Physics 101) from A and explore its dependencies",
      "Visit course F (CS 301) from C, which has no dependencies",
      "Add F to the stack after processing all its dependencies",
      "Add C to the stack after processing all its dependencies",
      "Visit course E (Math 201) from A and explore its dependencies",
      "E depends on F, which is already visited, so add E to the stack",
      "Add A to the stack after processing all its dependencies",
      "Visit course B (CS 101) and explore its dependencies",
      "Visit course D (CS 201) from B, which depends on F (already visited)",
      "Add D and then B to the stack after processing all dependencies",
    ],
    tags: ["graph", "dag", "dependencies", "scheduling", "dfs"],
  },
  {
    id: "kadanes-algorithm",
    name: "Kadane's Algorithm",
    category: "Dynamic Programming",
    description:
      "Kadane's algorithm is a dynamic programming approach used to find the maximum sum subarray in a one-dimensional array of numbers. It efficiently solves the problem by keeping track of the maximum sum ending at each position and the global maximum sum found so far. The algorithm handles arrays containing both positive and negative numbers.",
    timeComplexity: "O(n) where n is the length of the array",
    spaceComplexity: "O(1) as it only requires a constant amount of extra space",
    useCases: [
      "Stock market analysis (maximum profit over a period)",
      "Image processing (maximum sum submatrix)",
      "Data mining and pattern recognition",
      "Bioinformatics (finding regions of interest in DNA sequences)",
    ],
    keyInsights: [
      "Kadane's algorithm uses dynamic programming to solve the maximum subarray problem",
      "It makes a single pass through the array, making it very efficient",
      "The key insight is that the maximum subarray ending at position i either includes the maximum subarray ending at position i-1 or starts fresh at position i",
      "It can be extended to find the actual subarray indices, not just the sum",
    ],
    pythonCode: `def kadanes_algorithm(arr):
    """
    Finds the maximum sum subarray using Kadane's algorithm
    Returns the maximum sum
    """
    if not arr:
        return 0
    
    # Initialize variables
    max_so_far = float('-inf')  # Global maximum
    max_ending_here = 0         # Maximum sum ending at current position
    
    for num in arr:
        # Either extend the existing subarray or start a new one
        max_ending_here = max(num, max_ending_here + num)
        
        # Update global maximum
        max_so_far = max(max_so_far, max_ending_here)
    
    return max_so_far

def kadanes_algorithm_with_indices(arr):
    """
    Finds the maximum sum subarray using Kadane's algorithm
    Returns the maximum sum and the start and end indices of the subarray
    """
    if not arr:
        return 0, -1, -1
    
    # Initialize variables
    max_so_far = float('-inf')  # Global maximum
    max_ending_here = 0         # Maximum sum ending at current position
    start = 0                   # Start index of current subarray
    end = 0                     # End index of maximum subarray
    potential_start = 0         # Potential start index
    
    for i, num in enumerate(arr):
        # If max_ending_here becomes negative, reset it and update potential_start
        if max_ending_here + num < num:
            max_ending_here = num
            potential_start = i
        else:
            max_ending_here += num
        
        # Update global maximum and indices
        if max_ending_here > max_so_far:
            max_so_far = max_ending_here
            start = potential_start
            end = i
    
    return max_so_far, start, end

# Example usage
if __name__ == "__main__":
    # Example array
    arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    
    # Find maximum sum
    max_sum = kadanes_algorithm(arr)
    print(f"Maximum subarray sum: {max_sum}")
    
    # Find maximum sum and indices
    max_sum, start, end = kadanes_algorithm_with_indices(arr)
    print(f"Maximum subarray sum: {max_sum}")
    print(f"Maximum subarray: {arr[start:end+1]} (indices {start} to {end})")
    
    # Step-by-step demonstration
    def kadanes_algorithm_steps(arr):
        """
        Demonstrates Kadane's algorithm step by step
        """
        print("Array:", arr)
        print("\\nStep-by-step execution of Kadane's algorithm:\\n")
        
        max_so_far = float('-inf')
        max_ending_here = 0
        start = 0
        end = 0
        potential_start = 0
        
        print(f"{'Index':<6} {'Value':<6} {'max_ending_here':<16} {'max_so_far':<10} {'Current Subarray'}")
        print("-" * 60)
        
        for i, num in enumerate(arr):
            # Update max_ending_here
            if max_ending_here + num < num:
                max_ending_here = num
                potential_start = i
            else:
                max_ending_here += num
            
            # Update max_so_far
            if max_ending_here > max_so_far:
                max_so_far = max_ending_here
                start = potential_start
                end = i
            
            # Print current state
            print(f"{i:<6} {num:<6} {max_ending_here:<16} {max_so_far:<10} {arr[potential_start:i+1]}")
        
        print("\\nFinal result:")
        print(f"Maximum subarray sum: {max_so_far}")
        print(f"Maximum subarray: {arr[start:end+1]} (indices {start} to {end})")
    
    # Demonstrate step by step
    kadanes_algorithm_steps(arr)`,
    codeExplanation:
      "This Python implementation of Kadane's algorithm finds the maximum sum subarray in a one-dimensional array. The basic version returns just the maximum sum, while the extended version also returns the start and end indices of the subarray. The algorithm maintains two variables: max_ending_here (the maximum sum of the subarray ending at the current position) and max_so_far (the global maximum sum found so far). At each step, it decides whether to extend the current subarray or start a new one, achieving O(n) time complexity with O(1) space.",
    totalSteps: 10,
    stepDescriptions: [
      "Initialize max_so_far = -∞, max_ending_here = 0",
      "Process element -2: max_ending_here = max(-2, 0 + (-2)) = -2, reset to 0",
      "Process element 1: max_ending_here = max(1, 0 + 1) = 1, max_so_far = 1",
      "Process element -3: max_ending_here = max(-3, 1 + (-3)) = -2, reset to 0",
      "Process element 4: max_ending_here = max(4, 0 + 4) = 4, max_so_far = 4",
      "Process element -1: max_ending_here = max(-1, 4 + (-1)) = 3",
      "Process element 2: max_ending_here = max(2, 3 + 2) = 5, max_so_far = 5",
      "Process element 1: max_ending_here = max(1, 5 + 1) = 6, max_so_far = 6",
      "Process element -5: max_ending_here = max(-5, 6 + (-5)) = 1",
      "Process element 4: max_ending_here = max(4, 1 + 4) = 5",
    ],
    tags: ["dynamic programming", "array", "maximum subarray", "optimization"],
  },
  {
    id: "counting-sort",
    name: "Counting Sort",
    category: "Sorting",
    description:
      "Counting sort is a non-comparative sorting algorithm that works by counting the number of occurrences of each element in the input array and using that information to determine their positions in the output array. It is particularly efficient when the range of input values is not significantly larger than the number of elements to be sorted.",
    timeComplexity: "O(n + k) where n is the number of elements and k is the range of input",
    spaceComplexity: "O(n + k) for the output array and counting array",
    useCases: [
      "Sorting integers with a small range",
      "As a subroutine in radix sort",
      "Sorting data with integer keys",
      "Applications where stability is important",
    ],
    keyInsights: [
      "Counting sort is not a comparison-based sort, so it can beat the O(n log n) lower bound",
      "It's stable, preserving the relative order of equal elements",
      "It's efficient when the range of input values (k) is small compared to the number of elements (n)",
      "It requires extra space proportional to the range of input values",
    ],
    pythonCode: `def counting_sort(arr):
    """
    Sorts an array using the counting sort algorithm
    """
    # Find the maximum value in the array
    max_val = max(arr) if arr else 0
    
    # Initialize counting array with zeros
    count = [0] * (max_val + 1)
    
    # Count occurrences of each element
    for num in arr:
        count[num] += 1
    
    # Modify count array to store cumulative count
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    # Build the output array
    output = [0] * len(arr)
    for num in reversed(arr):  # Process in reverse to maintain stability
        output[count[num] - 1] = num
        count[num] -= 1
    
    return output

# Example usage
if __name__ == "__main__":
    # Example array
    arr = [4, 2, 2, 8, 3, 3, 1, 0, 5, 7, 6, 2]
    
    print("Original array:", arr)
    sorted_arr = counting_sort(arr)
    print("Sorted array:", sorted_arr)
    
    # Step-by-step demonstration
    def counting_sort_steps(arr):
        """
        Demonstrates counting sort step by step
        """
        print("Original array:", arr)
        
        # Find the maximum value
        max_val = max(arr) if arr else 0
        print(f"\\nMaximum value: {max_val}")
        
        # Initialize counting array
        count = [0] * (max_val + 1)
        print(f"Initial count array: {count}")
        
        # Count occurrences
        print("\nCounting occurrences:")
        for i, num in enumerate(arr):
            count[num] += 1
            print(f"  After processing {num}: {count}")
        
        # Modify count array to store cumulative count
        print("\nModifying count array to store cumulative count:")
        for i in range(1, len(count)):
            count[i] += count[i - 1]
            print(f"  After adding count[{i-1}] to count[{i}]: {count}")
        
        # Build the output array
        output = [0] * len(arr)
        print("\nBuilding output array:")
        for i, num in reversed(list(enumerate(arr))):
            output[count[num] - 1] = num
            count[num] -= 1
            print(f"  Place {num} at position {count[num]}: {output}")
        
        print("\nFinal sorted array:", output)
    
    # Demonstrate step by step
    counting_sort_steps(arr)`,
    codeExplanation:
      "This Python implementation of counting sort efficiently sorts an array of non-negative integers. The algorithm works in three main steps: first, it counts the occurrences of each element in the input array; second, it calculates the cumulative counts to determine the position of each element in the output array; finally, it builds the sorted output array by placing each element in its correct position. By processing the input array in reverse during the final step, the algorithm maintains stability. Counting sort achieves O(n + k) time complexity, making it very efficient when the range of input values (k) is small.",
    totalSteps: 12,
    stepDescriptions: [
      "Initialize count array with zeros for each possible value in the input array",
      "Count occurrences: Increment count[4] for element 4",
      "Count occurrences: Increment count[2] for element 2",
      "Continue counting all elements in the input array",
      "Convert count array to cumulative counts: count[1] += count[0]",
      "Continue calculating cumulative counts for all positions",
      "Start building output array: Place last occurrence of 2 at position count[2]-1",
      "Continue placing elements in output array",
      "Place element 0 at position count[0]-1",
      "Continue until all elements are placed",
      "Verify the array is sorted: [0, 1, 2, 2, 2, 3, 3, 4, 5, 6, 7, 8]",
      "Counting sort complete",
    ],
    tags: ["sorting", "non-comparative", "linear time", "stable", "integer"],
  },
  {
    id: "min-heap",
    name: "Min Heap",
    category: "Heap",
    description:
      "A min heap is a complete binary tree where the value of each node is less than or equal to the values of its children. This property ensures that the minimum element is always at the root. Min heaps are commonly used to implement priority queues where the element with the highest priority (lowest value) is always at the front.",
    timeComplexity: "O(1) for find-min, O(log n) for insert and extract-min operations",
    spaceComplexity: "O(n) for storing n elements",
    useCases: [
      "Priority queues with minimum priority first",
      "Dijkstra's shortest path algorithm",
      "Heap sort",
      "Finding the k smallest elements",
    ],
    keyInsights: [
      "Min heaps maintain the heap property: each parent node is less than or equal to its children",
      "They are typically implemented as arrays, where for a node at index i, its children are at indices 2i+1 and 2i+2",
      "The root (minimum element) is always at index 0",
      "Heapify operations maintain the heap property after insertions and deletions",
    ],
    pythonCode: `class MinHeap:
    def __init__(self):
        """
        Initialize an empty min heap
        """
        self.heap = []
    
    def parent(self, i):
        """
        Return the parent index of index i
        """
        return (i - 1) // 2
    
    def left_child(self, i):
        """
        Return the left child index of index i
        """
        return 2 * i + 1
    
    def right_child(self, i):
        """
        Return the right child index of index i
        """
        return 2 * i + 2
    
    def get_min(self):
        """
        Return the minimum element (root) without removing it
        """
        if not self.heap:
            return None
        return self.heap[0]
    
    def insert(self, key):
        """
        Insert a new key into the min heap
        """
        # Append the new key to the end of the heap
        self.heap.append(key)
        
        # Fix the min heap property if it is violated
        current = len(self.heap) - 1
        
        # Bubble up: Compare with parent and swap if needed
        while current > 0 and self.heap[self.parent(current)] > self.heap[current]:
            # Swap with parent
            self.heap[current], self.heap[self.parent(current)] = self.heap[self.parent(current)], self.heap[current]
            current = self.parent(current)
    
    def heapify(self, i):
        """
        Heapify subtree rooted at index i
        """
        smallest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        # Check if left child exists and is smaller than root
        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
            smallest = left
        
        # Check if right child exists and is smaller than smallest so far
        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
            smallest = right
        
        # If smallest is not the root, swap and continue heapifying
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self.heapify(smallest)
    
    def extract_min(self):
        """
        Remove and return the minimum element
        """
        if not self.heap:
            return None
        
        # Store the minimum value to return
        min_val = self.heap[0]
        
        # Replace root with last element
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        # Heapify the root
        if self.heap:
            self.heapify(0)
        
        return min_val
    
    def decrease_key(self, i, new_val):
        """
        Decrease the value of key at index i to new_val
        """
        if i >= len(self.heap) or new_val > self.heap[i]:
            return
        
        self.heap[i] = new_val
        
        # Bubble up if needed
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)
    
    def delete_key(self, i):
        """
        Delete key at index i
        """
        # Set the key to negative infinity and bubble up to root
        self.decrease_key(i, float('-inf'))
        
        # Extract the minimum (which is now the key we wanted to delete)
        self.extract_min()
    
    def __str__(self):
        """
        String representation of the heap
        """
        return str(self.heap)

# Example usage
if __name__ == "__main__":
    # Create a min heap
    min_heap = MinHeap()
    
    # Insert elements
    elements = [15, 10, 20, 30, 40, 50, 60]
    for element in elements:
        min_heap.insert(element)
        print(f"After inserting {element}: {min_heap}")
    
    # Extract minimum elements
    print("\\nExtracting minimum elements:")
    while min_heap.heap:
        min_val = min_heap.extract_min()
        print(f"Extracted {min_val}, Remaining heap: {min_heap}")`,
    codeExplanation:
      "This Python implementation of a min heap provides all the essential operations: insertion, extraction of the minimum element, decreasing a key's value, and deletion. The heap is represented as an array where for a node at index i, its parent is at index (i-1)//2, and its children are at indices 2*i+1 and 2*i+2. The insert operation adds an element at the end and bubbles it up to maintain the heap property. The extract_min operation removes and returns the minimum element (at the root), replaces it with the last element, and then heapifies down to restore the heap property. All operations maintain the min heap invariant that each parent is less than or equal to its children.",
    totalSteps: 10,
    stepDescriptions: [
      "Start with initial min-heap [15, 10, 20, 30, 40, 50, 60]",
      "Insert new element 5 at the end: [15, 10, 20, 30, 40, 50, 60, 5]",
      "Compare 5 with its parent 30: 5 < 30, so swap them: [15, 10, 20, 5, 40, 50, 60, 30]",
      "Compare 5 with its new parent 10: 5 < 10, so swap them: [15, 5, 20, 10, 40, 50, 60, 30]",
      "Compare 5 with its new parent 15: 5 < 15, so swap them: [5, 15, 20, 10, 40, 50, 60, 30]",
      "The heap property is now satisfied with 5 at the root",
      "The min-heap is now [5, 15, 20, 10, 40, 50, 60, 30]",
      "The minimum element is 5 at the root",
      "The heap is a complete binary tree with the min-heap property",
      "All operations (insert, extract-min) maintain the min-heap property",
    ],
    tags: ["heap", "priority queue", "binary tree", "data structure", "complete tree"],
  },
  {
    id: "max-heap",
    name: "Max Heap",
    category: "Heap",
    description:
      "A max heap is a complete binary tree where the value of each node is greater than or equal to the values of its children. This property ensures that the maximum element is always at the root. Max heaps are commonly used to implement priority queues where the element with the highest priority (highest value) is always at the front.",
    timeComplexity: "O(1) for find-max, O(log n) for insert and extract-max operations",
    spaceComplexity: "O(n) for storing n elements",
    useCases: [
      "Priority queues with maximum priority first",
      "Heap sort",
      "Finding the k largest elements",
      "Job scheduling based on priority",
    ],
    keyInsights: [
      "Max heaps maintain the heap property: each parent node is greater than or equal to its children",
      "They are typically implemented as arrays, where for a node at index i, its children are at indices 2i+1 and 2i+2",
      "The root (maximum element) is always at index 0",
      "Heapify operations maintain the heap property after insertions and deletions",
    ],
    pythonCode: `class MaxHeap:
    def __init__(self):
        """
        Initialize an empty max heap
        """
        self.heap = []
    
    def parent(self, i):
        """
        Return the parent index of index i
        """
        return (i - 1) // 2
    
    def left_child(self, i):
        """
        Return the left child index of index i
        """
        return 2 * i + 1
    
    def right_child(self, i):
        """
        Return the right child index of index i
        """
        return 2 * i + 2
    
    def get_max(self):
        """
        Return the maximum element (root) without removing it
        """
        if not self.heap:
            return None
        return self.heap[0]
    
    def insert(self, key):
        """
        Insert a new key into the max heap
        """
        # Append the new key to the end of the heap
        self.heap.append(key)
        
        # Fix the max heap property if it is violated
        current = len(self.heap) - 1
        
        # Bubble up: Compare with parent and swap if needed
        while current > 0 and self.heap[self.parent(current)] < self.heap[current]:
            # Swap with parent
            self.heap[current], self.heap[self.parent(current)] = self.heap[self.parent(current)], self.heap[current]
            current = self.parent(current)
    
    def heapify(self, i):
        """
        Heapify subtree rooted at index i
        """
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        # Check if left child exists and is larger than root
        if left < len(self.heap) and self.heap[left] > self.heap[largest]:
            largest = left
        
        # Check if right child exists and is larger than largest so far
        if right < len(self.heap) and self.heap[right] > self.heap[largest]:
            largest = right
        
        # If largest is not the root, swap and continue heapifying
        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self.heapify(largest)
    
    def extract_max(self):
        """
        Remove and return the maximum element
        """
        if not self.heap:
            return None
        
        # Store the maximum value to return
        max_val = self.heap[0]
        
        # Replace root with last element
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        # Heapify the root
        if self.heap:
            self.heapify(0)
        
        return max_val
    
    def increase_key(self, i, new_val):
        """
        Increase the value of key at index i to new_val
        """
        if i >= len(self.heap) or new_val < self.heap[i]:
            return
        
        self.heap[i] = new_val
        
        # Bubble up if needed
        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:
            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)
    
    def delete_key(self, i):
        """
        Delete key at index i
        """
        # Set the key to infinity and bubble up to root
        self.increase_key(i, float('inf'))
        
        # Extract the maximum (which is now the key we wanted to delete)
        self.extract_max()
    
    def __str__(self):
        """
        String representation of the heap
        """
        return str(self.heap)

# Example usage
if __name__ == "__main__":
    # Create a max heap
    max_heap = MaxHeap()
    
    # Insert elements
    elements = [60, 50, 40, 30, 20, 10, 5]
    for element in elements:
        max_heap.insert(element)
        print(f"After inserting {element}: {max_heap}")
    
    # Extract maximum elements
    print("\\nExtracting maximum elements:")
    while max_heap.heap:
        max_val = max_heap.extract_max()
        print(f"Extracted {max_val}, Remaining heap: {max_heap}")`,
    codeExplanation:
      "This Python implementation of a max heap provides all the essential operations: insertion, extraction of the maximum element, increasing a key's value, and deletion. The heap is represented as an array where for a node at index i, its parent is at index (i-1)//2, and its children are at indices 2*i+1 and 2*i+2. The insert operation adds an element at the end and bubbles it up to maintain the heap property. The extract_max operation removes and returns the maximum element (at the root), replaces it with the last element, and then heapifies down to restore the heap property. All operations maintain the max heap invariant that each parent is greater than or equal to its children.",
    totalSteps: 12,
    stepDescriptions: [
      "Start with initial max-heap [60, 50, 40, 30, 20, 10, 5]",
      "Extract maximum element 60 from the root",
      "Replace root with last element 5: [5, 50, 40, 30, 20, 10]",
      "Compare 5 with its children 50 and 40: 50 > 5, so swap with 50: [50, 5, 40, 30, 20, 10]",
      "Compare 5 with its children 30 and 20: 30 > 5, so swap with 30: [50, 30, 40, 5, 20, 10]",
      "Compare 5 with its children (none or leaf node): heap property satisfied",
      "The max-heap is now [50, 30, 40, 5, 20, 10]",
      "The maximum element is now 50 at the root",
      "The heap is a complete binary tree with the max-heap property",
      "All operations (insert, extract-max) maintain the max-heap property",
      "The extracted maximum element was 60",
      "The heap now has one fewer element",
    ],
    tags: ["heap", "priority queue", "binary tree", "data structure", "complete tree"],
  },
  {
    id: "dutch-national-flag",
    name: "Dutch National Flag Algorithm",
    category: "Sorting",
    problemStatement:
      "Given an array containing only 0s, 1s, and 2s (representing red, white, and blue), sort the array in-place so that the same numbers are grouped together.",
    description:
      "The Dutch National Flag algorithm is a linear time partition algorithm that sorts an array containing three distinct values. It was designed by Edsger W. Dijkstra and named after the Dutch national flag, which has three colors. The algorithm efficiently sorts an array of 0s, 1s, and 2s in a single pass, which is particularly useful for problems like the 'Sort Colors' problem.",
    timeComplexity: "O(n) where n is the number of elements in the array",
    spaceComplexity: "O(1) as it sorts in-place",
    useCases: [
      "Sorting arrays with a small fixed number of distinct values",
      "Partitioning arrays around a pivot value (as in quicksort)",
      "Segregating binary arrays (0s and 1s)",
      "Solving the 'Sort Colors' problem (red, white, blue)",
    ],
    keyInsights: [
      "The algorithm uses three pointers to divide the array into four sections",
      "It processes the array in a single pass, making it very efficient",
      "It's an in-place algorithm, requiring no extra space",
      "It can be generalized to handle more than three distinct values",
    ],
    pythonCode: `def dutch_national_flag(arr):
    """
    Sorts an array containing only 0s, 1s, and 2s using the Dutch National Flag algorithm
    """
    low = 0        # Pointer for 0s (elements < pivot)
    mid = 0        # Current element being processed
    high = len(arr) - 1  # Pointer for 2s (elements > pivot)
    
    # Pivot is 1
    while mid <= high:
        if arr[mid] == 0:
            # Swap current element with the low pointer
            arr[low], arr[mid] = arr[mid], arr[low]
            low += 1
            mid += 1
        elif arr[mid] == 1:
            # Current element is already in the right place
            mid += 1
        else:  # arr[mid] == 2
            # Swap current element with the high pointer
            arr[mid], arr[high] = arr[high], arr[mid]
            high -= 1
            # Note: mid is not incremented here because we need to check the swapped element
    
    return arr

# Example usage
if __name__ == "__main__":
    # Example array with 0s, 1s, and 2s
    arr = [2, 0, 1, 1, 0, 2, 0, 1, 2, 0, 1, 2]
    
    print("Original array:", arr)
    sorted_arr = dutch_national_flag(arr.copy())
    print("Sorted array:", sorted_arr)
    
    # Step-by-step demonstration
    def dutch_national_flag_steps(arr):
        """
        Demonstrates Dutch National Flag algorithm step by step
        """
        print("Original array:", arr)
        print("\\nStep-by-step execution of Dutch National Flag algorithm:\\n")
        
        low = 0
        mid = 0
        high = len(arr) - 1
        
        print(f"{'Step':<6} {'Action':<20} {'Array':<30} {'low':<5} {'mid':<5} {'high':<5}")
        print("-" * 75)
        
        step = 1
        while mid <= high:
            if arr[mid] == 0:
                print(f"{step:<6} {'Swap mid with low':<20} {arr[:mid] + ['[' + str(arr[mid]) + ']'] + arr[mid+1:]:<30} {low:<5} {mid:<5} {high:<5}")
                arr[low], arr[mid] = arr[mid], arr[low]
                print(f"{'':<6} {'After swap':<20} {arr:<30} {low:<5} {mid:<5} {high:<5}")
                low += 1
                mid += 1
            elif arr[mid] == 1:
                print(f"{step:<6} {'Keep mid as is':<20} {arr[:mid] + ['[' + str(arr[mid]) + ']'] + arr[mid+1:]:<30} {low:<5} {mid:<5} {high:<5}")
                mid += 1
            else:  # arr[mid] == 2
                print(f"{step:<6} {'Swap mid with high':<20} {arr[:mid] + ['[' + str(arr[mid]) + ']'] + arr[mid+1:]:<30} {low:<5} {mid:<5} {high:<5}")
                arr[mid], arr[high] = arr[high], arr[mid]
                print(f"{'':<6} {'After swap':<20} {arr:<30} {low:<5} {mid:<5} {high:<5}")
                high -= 1
            
            step += 1
        
        print("\\nFinal sorted array:", arr)
    
    # Demonstrate step by step
    dutch_national_flag_steps(arr.copy())`,
    codeExplanation:
      "This Python implementation of the Dutch National Flag algorithm efficiently sorts an array containing only 0s, 1s, and 2s in a single pass. The algorithm uses three pointers: 'low' for tracking the boundary of 0s, 'mid' for the current element being processed, and 'high' for tracking the boundary of 2s. As the algorithm processes each element, it maintains three sections: elements less than the pivot (0s), elements equal to the pivot (1s), and elements greater than the pivot (2s). When it encounters a 0, it swaps it with the element at the 'low' pointer and increments both 'low' and 'mid'. When it encounters a 1, it simply increments 'mid'. When it encounters a 2, it swaps it with the element at the 'high' pointer and decrements 'high'. The algorithm continues until 'mid' exceeds 'high', at which point the array is fully sorted.",
    totalSteps: 12,
    stepDescriptions: [
      "Initialize low = 0, mid = 0, high = 11",
      "Process arr[0] = 2: Swap with arr[high], high--",
      "Process arr[0] = 0: Swap with arr[low], low++, mid++",
      "Process arr[1] = 1: mid++",
      "Process arr[2] = 1: mid++",
      "Process arr[3] = 0: Swap with arr[low], low++, mid++",
      "Process arr[4] = 2: Swap with arr[high], high--",
      "Process arr[4] = 1: mid++",
      "Process arr[5] = 0: Swap with arr[low], low++, mid++",
      "Process arr[6] = 2: Swap with arr[high], high--",
      "Process arr[6] = 1: mid++",
      "Process arr[7] = 0: Swap with arr[low], low++, mid++",
      "Final array: [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2]",
    ],
    tags: ["sorting", "in-place", "linear time", "partitioning", "three-way"],
  },
  {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    category: "Bit Operations",
    problemStatement:
      "Perform various bit-level operations on integers to solve problems efficiently, such as counting set bits, checking if a number is a power of two, and manipulating individual bits.",
    description:
      "Bit manipulation involves applying various operations on individual bits of binary numbers. These operations include bitwise AND, OR, XOR, NOT, as well as bit shifts. Bit manipulation techniques are used to optimize algorithms, perform fast arithmetic operations, and solve problems that involve binary representations.",
    timeComplexity: "O(1) for most bit operations as they operate directly on bits",
    spaceComplexity: "O(1) as bit operations typically don't require additional space",
    useCases: [
      "Optimizing algorithms for performance",
      "Implementing low-level system operations",
      "Encoding and decoding data",
      "Solving problems like finding unique numbers or counting bits",
    ],
    keyInsights: [
      "Bit manipulation can significantly improve algorithm efficiency",
      "Common operations include AND (&), OR (|), XOR (^), NOT (~), left shift (<<), and right shift (>>)",
      "XOR is particularly useful for finding unique elements or toggling bits",
      "Bit manipulation is widely used in cryptography, compression, and hardware programming",
    ],
    pythonCode: `def count_set_bits(n):
    """
    Count the number of set bits (1s) in the binary representation of n
    """
    count = 0
    while n:
        count += n & 1  # Check if the least significant bit is 1
        n >>= 1         # Right shift by 1 (divide by 2)
    return count

def is_power_of_two(n):
    """
    Check if n is a power of 2 using bit manipulation
    """
    if n <= 0:
        return False
    # A power of 2 has only one bit set, so n & (n-1) will be 0
    return (n & (n - 1)) == 0

def get_bit(n, i):
    """
    Get the value of the bit at position i in n
    """
    return (n >> i) & 1

def set_bit(n, i):
    """
    Set the bit at position i in n to 1
    """
    return n | (1 << i)

def clear_bit(n, i):
    """
    Clear the bit at position i in n (set to 0)
    """
    return n & ~(1 << i)

def toggle_bit(n, i):
    """
    Toggle the bit at position i in n
    """
    return n ^ (1 << i)

def find_single_number(nums):
    """
    Find the single number in an array where all other numbers appear twice
    Using XOR operation
    """
    result = 0
    for num in nums:
        result ^= num
    return result

def swap_without_temp(a, b):
    """
    Swap two numbers without using a temporary variable
    """
    a = a ^ b
    b = a ^ b
    a = a ^ b
    return a, b

# Example usage
if __name__ == "__main__":
    # Count set bits
    n = 42  # Binary: 101010
    print(f"Number of set bits in {n}: {count_set_bits(n)}")
    
    # Check if power of 2
    print(f"Is {n} a power of 2? {is_power_of_two(n)}")
    print(f"Is 64 a power of 2? {is_power_of_two(64)}")
    
    # Get, set, clear, toggle bits
    print(f"Bit at position 3 in {n}: {get_bit(n, 3)}")
    print(f"Setting bit at position 2 in {n}: {set_bit(n, 2)}")
    print(f"Clearing bit at position 1 in {n}: {clear_bit(n, 1)}")
    print(f"Toggling bit at position 5 in {n}: {toggle_bit(n, 5)}")
    
    # Find single number
    nums = [4, 1, 2, 1, 2]
    print(f"Single number in {nums}: {find_single_number(nums)}")
    
    # Swap without temp
    a, b = 10, 20
    print(f"Before swap: a = {a}, b = {b}")
    a, b = swap_without_temp(a, b)
    print(f"After swap: a = {a}, b = {b}")`,
    codeExplanation:
      "This Python implementation demonstrates various bit manipulation techniques. The `count_set_bits` function counts the number of 1s in a binary number by checking each bit. The `is_power_of_two` function uses the property that powers of 2 have only one bit set. The `get_bit`, `set_bit`, `clear_bit`, and `toggle_bit` functions manipulate individual bits at specific positions. The `find_single_number` function uses XOR to find a unique element in an array where all other elements appear twice (XOR of a number with itself is 0). The `swap_without_temp` function swaps two numbers without using a temporary variable by using XOR operations. These bit manipulation techniques are efficient and can be used to optimize various algorithms.",
    totalSteps: 10,
    stepDescriptions: [
      "Start with number 42 (binary: 101010)",
      "Count set bits: 3 bits are set to 1",
      "Check if 42 is a power of 2: 42 & 41 = 101010 & 101001 = 101000 ≠ 0, so it's not a power of 2",
      "Check if 64 is a power of 2: 64 & 63 = 1000000 & 111111 = 0, so it is a power of 2",
      "Get bit at position 3: (42 >> 3) & 1 = 5 & 1 = 1",
      "Set bit at position 2: 42 | (1 << 2) = 101010 | 000100 = 101110 = 46",
      "Clear bit at position 1: 42 & ~(1 << 1) = 101010 & ~000010 = 101010 & 111101 = 101000 = 40",
      "Toggle bit at position 5: 42 ^ (1 << 5) = 101010 ^ 100000 = 001010 = 10",
      "Find single number in [4, 1, 2, 1, 2]: 4 ^ 1 ^ 2 ^ 1 ^ 2 = 4",
      "Swap a=10, b=20 without temp: a=10^20=30, b=30^20=10, a=30^10=20, result: a=20, b=10",
    ],
    tags: ["bit manipulation", "binary", "optimization", "bitwise operations", "algorithms"],
  },
  {
    id: "greedy-algorithm",
    name: "Greedy Algorithm",
    category: "Algorithm Paradigm",
    problemStatement:
      "Given a set of activities with start and finish times, select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.",
    description:
      "A greedy algorithm is an algorithmic paradigm that follows the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum. In many problems, a greedy strategy does not usually produce an optimal solution, but for some problems, such as the fractional knapsack problem, it does.",
    timeComplexity: "Varies depending on the specific problem",
    spaceComplexity: "Varies depending on the specific problem",
    useCases: [
      "Minimum spanning tree algorithms (Kruskal's, Prim's)",
      "Huffman coding for data compression",
      "Activity selection problems",
      "Coin change problems with certain denominations",
    ],
    keyInsights: [
      "Greedy algorithms make locally optimal choices at each step",
      "They are usually easier to implement and more efficient than dynamic programming",
      "They don't always yield globally optimal solutions",
      "The key is to prove that a greedy choice at each step leads to a global optimum",
    ],
    pythonCode: `def activity_selection(start, finish):
    """
    Activity Selection Problem: Select the maximum number of activities that don't overlap
    
    Args:
        start: List of start times
        finish: List of finish times
    
    Returns:
        List of selected activities (indices)
    """
    # Create a list of activities with their start and finish times
    activities = [(start[i], finish[i], i) for i in range(len(start))]
    
    # Sort activities by finish time
    activities.sort(key=lambda x: x[1])
    
    # Select the first activity
    selected = [activities[0][2]]
    last_finish_time = activities[0][1]
    
    # Consider the rest of the activities
    for i in range(1, len(activities)):
        # If this activity starts after the finish time of the last selected activity
        if activities[i][0] >= last_finish_time:
            # Select this activity
            selected.append(activities[i][2])
            last_finish_time = activities[i][1]
    
    return selected

def fractional_knapsack(values, weights, capacity):
    """
    Fractional Knapsack Problem: Fill a knapsack with fractions of items to maximize value
    
    Args:
        values: List of values of items
        weights: List of weights of items
        capacity: Maximum weight capacity of knapsack
    
    Returns:
        Maximum value and selected items with fractions
    """
    # Create a list of items with their value-to-weight ratios
    items = [(values[i] / weights[i], values[i], weights[i], i) for i in range(len(values))]
    
    # Sort items by value-to-weight ratio in descending order
    items.sort(reverse=True)
    
    total_value = 0
    selected_items = []
    
    for ratio, value, weight, index in items:
        if capacity >= weight:
            # Take the whole item
            total_value += value
            capacity -= weight
            selected_items.append((index, 1.0))  # 1.0 means 100% of the item
        else:
            # Take a fraction of the item
            fraction = capacity / weight
            total_value += value * fraction
            selected_items.append((index, fraction))
            break  # Knapsack is full
    
    return total_value, selected_items

def coin_change_greedy(coins, amount):
    """
    Coin Change Problem (Greedy approach): Find minimum number of coins to make a given amount
    Note: This greedy approach works only for certain coin systems (like US coins)
    
    Args:
        coins: List of coin denominations
        amount: Target amount
    
    Returns:
        List of coins used
    """
    # Sort coins in descending order
    coins.sort(reverse=True)
    
    result = []
    remaining = amount
    
    for coin in coins:
        # Use as many of the current coin as possible
        while remaining >= coin:
            result.append(coin)
            remaining -= coin
    
    # Check if we were able to make the amount
    if remaining == 0:
        return result
    else:
        return None  # Not possible with the given coins

# Example usage
if __name__ == "__main__":
    # Activity Selection Problem
    start_times = [1, 3, 0, 5, 8, 5]
    finish_times = [2, 4, 6, 7, 9, 9]
    
    selected_activities = activity_selection(start_times, finish_times)
    print("Selected activities:", selected_activities)
    
    # Fractional Knapsack Problem
    item_values = [60, 100, 120]
    item_weights = [10, 20, 30]
    knapsack_capacity = 50
    
    max_value, selected_items = fractional_knapsack(item_values, item_weights, knapsack_capacity)
    print(f"Maximum value: {max_value}")
    print("Selected items (index, fraction):", selected_items)
    
    # Coin Change Problem (Greedy approach)
    coin_denominations = [25, 10, 5, 1]  # US coins: quarter, dime, nickel, penny
    target_amount = 63
    
    coins_used = coin_change_greedy(coin_denominations, target_amount)
    print(f"Coins used to make {target_amount} cents:", coins_used)`,
    codeExplanation:
      "This Python implementation demonstrates three classic greedy algorithms. The `activity_selection` function solves the problem of selecting the maximum number of non-overlapping activities by sorting activities by finish time and greedily selecting activities that start after the previous activity finishes. The `fractional_knapsack` function solves the problem of maximizing value in a knapsack by sorting items by their value-to-weight ratio and greedily selecting items until the knapsack is full. The `coin_change_greedy` function finds the minimum number of coins needed to make a given amount by greedily selecting the largest denomination coins first. Note that the greedy approach for coin change works only for certain coin systems (like US coins) where each denomination is a multiple of the smaller ones. These examples illustrate how greedy algorithms make locally optimal choices at each step to find a solution.",
    totalSteps: 12,
    stepDescriptions: [
      "Activity Selection: Sort activities by finish time",
      "Activity Selection: Select first activity (index 0) with finish time 2",
      "Activity Selection: Select activity at index 1 with finish time 4",
      "Activity Selection: Select activity at index 3 with finish time 7",
      "Activity Selection: Select activity at index 4 with finish time 9",
      "Fractional Knapsack: Calculate value-to-weight ratios: [6, 5, 4]",
      "Fractional Knapsack: Sort items by ratio: [(6, 60, 10, 0), (5, 100, 20, 1), (4, 120, 30, 2)]",
      "Fractional Knapsack: Take all of item 0 (10kg, value 60)",
      "Fractional Knapsack: Take all of item 1 (20kg, value 100)",
      "Fractional Knapsack: Take 2/3 of item 2 (20kg out of 30kg, value 80)",
      "Fractional Knapsack: Total value: 240",
      "Coin Change: Greedily select coins [25, 25, 10, 1, 1, 1] to make 63 cents",
    ],
    tags: ["greedy", "optimization", "algorithm paradigm", "activity selection", "knapsack"],
  },
]
