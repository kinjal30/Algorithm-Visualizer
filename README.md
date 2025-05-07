# Algorithm-Visualizer

## 📊 Interactive Data Structures and Algorithms Visualization Tool

Algorithm Visualizer is an interactive web application designed to help users understand complex data structures and algorithms through step-by-step visual animations. This educational tool makes learning algorithms intuitive and engaging by providing clear visualizations of how algorithms work under the hood.

## ✨ Features

- **Interactive Visualizations**: Step through algorithms at your own pace with play, pause, and step controls
- **Speed Control**: Adjust animation speed to focus on complex operations
- **Multiple Algorithms**: Visualize various algorithms across different categories:

- **Sorting**: Insertion Sort, Counting Sort, Dutch National Flag
- **Searching**: Binary Search
- **Graph Algorithms**: Depth-First Search, Breadth-First Search, Topological Sort
- **Tree Structures**: Binary Search Tree
- **Heap Operations**: Min Heap, Max Heap
- **Dynamic Programming**: Kadane's Algorithm
- **Bit Manipulation**: Various bit operations
- **Greedy Algorithms**: Activity Selection



- **Comprehensive Information**: Each algorithm includes:

- Problem statement
- Step-by-step visualization
- Detailed explanation
- Python implementation
- Time and space complexity analysis
- Real-world use cases


## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive and modern UI design
- **shadcn/ui**: Component library for consistent UI elements
- **React Error Boundary**: For graceful error handling
- **Lucide React**: For beautiful icons


## 🚀 Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
```


2. Install dependencies:

```shellscript
npm install
```


3. Run the development server:

```shellscript
npm run dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## 📖 How to Use

1. **Select an Algorithm**: Choose from the algorithm library in the sidebar
2. **Visualization Controls**:

1. Play/Pause: Start or pause the animation
2. Step Forward/Backward: Move through the algorithm one step at a time
3. Reset: Return to the initial state
4. Speed Control: Adjust the animation speed



3. **Tabs**:

1. **Visualization**: Watch the algorithm in action with step descriptions
2. **Explanation**: Read detailed information about the algorithm
3. **Python Code**: View the complete implementation with explanations


## 📁 Project Structure

```plaintext
algorithm-visualizer/
├── app/                    # Next.js app directory
│   ├── page.tsx            # Main page component
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── algorithm-visualizer.tsx          # Main visualizer component
│   ├── algorithm-visualizer-client.tsx   # Client-side wrapper
│   ├── algorithm-visualizer-wrapper.tsx  # Wrapper with algorithm selection
│   ├── visualization-canvas-2d.tsx       # 2D visualization container
│   ├── visualizations/                   # Individual algorithm visualizations
│   │   ├── binary-search.tsx
│   │   ├── binary-search-tree.tsx
│   │   ├── graph-dfs.tsx
│   │   └── ...
│   └── ui/                 # UI components from shadcn
├── lib/                    # Utility functions and data
│   └── algorithms.ts       # Algorithm definitions and metadata
├── public/                 # Static assets
└── ...
```

## 🔮 Future Improvements

- Add more algorithms and data structures
- Implement user input for custom test cases
- Add dark mode toggle
- Create algorithm comparison view
- Add complexity analysis charts
- Support for multiple programming languages
- Add user accounts to track progress


## 📸 Screenshots




*Binary Search visualization showing the search process*

![image](https://github.com/user-attachments/assets/70307669-0b1a-4ce1-b4a7-919b89a27b86)

*Dutch national Flag showing the sort process*

![image](https://github.com/user-attachments/assets/685b30e1-9947-4d03-8b45-86c88dc34853)


*Topological Sort showing course prerequisites as a directed acyclic graph*

![image](https://github.com/user-attachments/assets/ad43a66b-0e70-4be5-b054-13105ee3bcc7)



*Activity Selection problem visualization using the Greedy approach*

![image](https://github.com/user-attachments/assets/5cb9b2d8-ed62-4340-80fd-0096c116c64b)


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspiration from [VisuAlgo](https://visualgo.net/)
- [Next.js](https://nextjs.org/) documentation
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
