"use client"

import { useMemo } from "react"

interface BitManipulationProps {
  step: number
}

export default function BitManipulation({ step }: BitManipulationProps) {
  // Sample number for bit manipulation
  const number = useMemo(() => 42, []) // Binary: 101010

  // Bit manipulation operations
  const operations = useMemo(
    () => [
      {
        name: "Original Number",
        value: number,
        binary: number.toString(2).padStart(8, "0"),
        description: `The decimal number ${number} in binary is ${number.toString(2).padStart(8, "0")}`,
        explanation: "This is our starting number that we'll perform various bit operations on.",
      },
      {
        name: "Count Set Bits",
        value: number.toString(2).split("1").length - 1,
        binary: number.toString(2).padStart(8, "0"),
        description: `Count the number of 1's in ${number.toString(2).padStart(8, "0")}: ${number.toString(2).split("1").length - 1} bits`,
        explanation:
          "Counting set bits means counting how many 1's are in the binary representation. This is useful for many bit manipulation problems.",
        highlightBits: Array.from(number.toString(2).padStart(8, "0")).map((bit, i) => bit === "1"),
      },
      {
        name: "Is Power of Two",
        value: (number & (number - 1)) === 0 ? "Yes" : "No",
        binary: number.toString(2).padStart(8, "0"),
        description: `Check if ${number} is a power of 2: ${(number & (number - 1)) === 0 ? "Yes" : "No"}`,
        explanation:
          "A power of 2 has exactly one bit set to 1. We can check this by using the trick: n & (n-1) == 0 for powers of 2.",
        operation: `${number} & (${number}-1) = ${number.toString(2).padStart(8, "0")} & ${(number - 1).toString(2).padStart(8, "0")} = ${(number & (number - 1)).toString(2).padStart(8, "0")}`,
        highlightBits: Array.from(number.toString(2).padStart(8, "0")).map((_, i) => true),
      },
      {
        name: "Get Bit (Position 3)",
        value: (number >> 3) & 1,
        binary: number.toString(2).padStart(8, "0"),
        description: `Get the bit at position 3: ${(number >> 3) & 1}`,
        explanation:
          "To get a specific bit, we shift right to bring that bit to the least significant position, then AND with 1.",
        operation: `(${number} >> 3) & 1 = ${(number >> 3).toString(2).padStart(8, "0")} & 1 = ${((number >> 3) & 1).toString(2)}`,
        highlightBits: Array.from(number.toString(2).padStart(8, "0")).map(
          (_, i) => i === number.toString(2).padStart(8, "0").length - 4,
        ),
      },
      {
        name: "Set Bit (Position 2)",
        value: number | (1 << 2),
        binary: (number | (1 << 2)).toString(2).padStart(8, "0"),
        description: `Set the bit at position 2 to 1: ${number | (1 << 2)}`,
        explanation: "To set a bit to 1, we use the OR operation with a number that has only that bit set to 1.",
        operation: `${number} | (1 << 2) = ${number.toString(2).padStart(8, "0")} | ${"100".padStart(8, "0")} = ${(number | (1 << 2)).toString(2).padStart(8, "0")}`,
        highlightBits: Array.from((number | (1 << 2)).toString(2).padStart(8, "0")).map(
          (_, i) => i === (number | (1 << 2)).toString(2).padStart(8, "0").length - 3,
        ),
        originalBinary: number.toString(2).padStart(8, "0"),
      },
      {
        name: "Clear Bit (Position 1)",
        value: number & ~(1 << 1),
        binary: (number & ~(1 << 1)).toString(2).padStart(8, "0"),
        description: `Clear the bit at position 1 (set to 0): ${number & ~(1 << 1)}`,
        explanation:
          "To clear a bit (set it to 0), we use the AND operation with a number that has all bits set to 1 except the bit we want to clear.",
        operation: `${number} & ~(1 << 1) = ${number.toString(2).padStart(8, "0")} & ~${"10".padStart(8, "0")} = ${(number & ~(1 << 1)).toString(2).padStart(8, "0")}`,
        highlightBits: Array.from((number & ~(1 << 1)).toString(2).padStart(8, "0")).map(
          (_, i) => i === (number & ~(1 << 1)).toString(2).padStart(8, "0").length - 2,
        ),
        originalBinary: number.toString(2).padStart(8, "0"),
      },
      {
        name: "Toggle Bit (Position 5)",
        value: number ^ (1 << 5),
        binary: (number ^ (1 << 5)).toString(2).padStart(8, "0"),
        description: `Toggle the bit at position 5: ${number ^ (1 << 5)}`,
        explanation:
          "To toggle a bit (flip 0 to 1 or 1 to 0), we use the XOR operation with a number that has only that bit set to 1.",
        operation: `${number} ^ (1 << 5) = ${number.toString(2).padStart(8, "0")} ^ ${"100000".padStart(8, "0")} = ${(number ^ (1 << 5)).toString(2).padStart(8, "0")}`,
        highlightBits: Array.from((number ^ (1 << 5)).toString(2).padStart(8, "0")).map(
          (_, i) => i === (number ^ (1 << 5)).toString(2).padStart(8, "0").length - 6,
        ),
        originalBinary: number.toString(2).padStart(8, "0"),
      },
      {
        name: "Find Single Number",
        value: 4,
        binary: (4).toString(2).padStart(8, "0"),
        description: "Find the single number in [4, 1, 2, 1, 2] using XOR",
        explanation:
          "When we XOR a number with itself, we get 0. If we XOR all numbers in an array where all numbers appear twice except one, we'll be left with that single number.",
        operation: "4 ^ 1 ^ 2 ^ 1 ^ 2 = 4",
        steps: ["4 ^ 1 = 101", "101 ^ 2 = 111", "111 ^ 1 = 110", "110 ^ 2 = 100 (4)"],
      },
      {
        name: "Swap Without Temp",
        value: "a=20, b=10",
        binary: "",
        description: "Swap a=10, b=20 without using a temporary variable",
        explanation:
          "We can use XOR to swap two variables without using a temporary variable. This is a classic bit manipulation trick.",
        operation: "Using XOR: a = a ^ b, b = a ^ b, a = a ^ b",
        steps: ["a = 10 ^ 20 = 30", "b = 30 ^ 20 = 10", "a = 30 ^ 10 = 20", "Result: a=20, b=10"],
      },
    ],
    [number],
  )

  // Current operation based on step
  const currentOperation = useMemo(() => {
    return operations[Math.min(step, operations.length - 1)]
  }, [operations, step])

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Bit Manipulation</h2>

      {/* Problem Statement */}
      <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg w-full max-w-3xl mb-6">
        <h3 className="text-lg font-bold mb-2">Problem:</h3>
        <p className="mb-2">
          Bit manipulation involves operating on individual bits of a number. This visualization demonstrates common bit
          manipulation operations on the number 42 (binary: 00101010).
        </p>
        <p>
          We'll explore operations like counting set bits, checking if a number is a power of 2,
          getting/setting/clearing/toggling individual bits, finding a unique number in an array, and swapping numbers
          without a temporary variable.
        </p>
      </div>

      <p className="text-xl mb-6">{currentOperation.name}</p>

      {/* Binary Visualization */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Binary Representation</h3>
        <div className="flex justify-center">
          {currentOperation.binary.split("").map((bit, index) => {
            // Determine bit appearance
            const bgColor = bit === "1" ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
            const textColor = bit === "1" ? "text-white" : "text-gray-800 dark:text-gray-200"
            let scale = "transform scale-100"
            let border = "border-2 border-transparent"

            // Highlight specific bits based on operation
            if (currentOperation.highlightBits && currentOperation.highlightBits[index]) {
              scale = "transform scale-110"
              border = "border-2 border-yellow-500"
            }

            return (
              <div key={index} className={`flex flex-col items-center transition-all duration-300 mx-1 ${scale}`}>
                <div
                  className={`w-10 h-10 ${bgColor} ${textColor} ${border} rounded-lg flex items-center justify-center text-xl font-bold shadow-md`}
                >
                  {bit}
                </div>
                <div className="mt-1 text-xs font-medium">{7 - index}</div>
              </div>
            )
          })}
        </div>

        {/* Show original binary for comparison if available */}
        {currentOperation.originalBinary && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Original:</p>
            <div className="flex justify-center">
              {currentOperation.originalBinary.split("").map((bit, index) => (
                <div key={index} className="flex flex-col items-center mx-1">
                  <div
                    className={`w-8 h-8 ${bit === "1" ? "bg-blue-300" : "bg-gray-100"} 
                    ${bit === "1" ? "text-white" : "text-gray-800"} 
                    rounded-lg flex items-center justify-center text-sm font-medium opacity-70`}
                  >
                    {bit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Operation Details */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-2xl mb-4">
        <h3 className="text-xl font-bold mb-2">Operation Details</h3>
        <p className="text-lg mb-2">{currentOperation.description}</p>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded mb-3">
          <p className="font-medium">{currentOperation.explanation}</p>
        </div>

        {currentOperation.operation && (
          <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded font-mono text-sm mb-2">
            {currentOperation.operation}
          </div>
        )}

        {currentOperation.steps && (
          <div className="mt-3">
            <p className="font-medium mb-1">Steps:</p>
            <ol className="list-decimal pl-6">
              {currentOperation.steps.map((step, index) => (
                <li key={index} className="mb-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Bit Operations Explanation */}
      <div className="mt-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-2">Common Bit Operations</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">AND (&)</p>
            <p className="text-sm">1 & 1 = 1, otherwise 0</p>
          </div>
          <div>
            <p className="font-medium">OR (|)</p>
            <p className="text-sm">0 | 0 = 0, otherwise 1</p>
          </div>
          <div>
            <p className="font-medium">XOR (^)</p>
            <p className="text-sm">Same bits = 0, different bits = 1</p>
          </div>
          <div>
            <p className="font-medium">NOT (~)</p>
            <p className="text-sm">Inverts all bits</p>
          </div>
          <div>
            <p className="font-medium">Left Shift (&lt;&lt;)</p>
            <p className="text-sm">Shifts bits left, fills with 0s</p>
          </div>
          <div>
            <p className="font-medium">Right Shift (&gt;&gt;)</p>
            <p className="text-sm">Shifts bits right, fills based on sign</p>
          </div>
        </div>
      </div>
    </div>
  )
}
