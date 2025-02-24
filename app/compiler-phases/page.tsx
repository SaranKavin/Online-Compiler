"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Image component from Next.js
import { Button } from "@/components/ui/button";

const phases = [
  "Lexical Analysis",
  "Syntax Analysis",
  "Semantic Analysis",
  "Intermediate Code Generation",
  "Code Optimization",
  "Target Code Generation",
];

export default function CompilerPhases() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [phaseOutputs, setPhaseOutputs] = useState<Record<string, string>>({});

  useEffect(() => {
    const storedCode = localStorage.getItem("userCode");
    const storedLanguage = localStorage.getItem("userLanguage");
    if (storedCode) setCode(storedCode);
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  const handlePhaseClick = async (phase: string) => {
    if (phaseOutputs[phase]) {
      setPhaseOutputs((prev) => {
        const newOutputs = { ...prev };
        delete newOutputs[phase];
        return newOutputs;
      });
      return;
    }

    try {
      const response = await fetch("/api/compiler-phase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phase, code, language }),
      });
      const data = await response.json();
      setPhaseOutputs((prev) => ({ ...prev, [phase]: data.output }));
    } catch (error) {
      setPhaseOutputs((prev) => ({ ...prev, [phase]: "An error occurred." }));
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">Phases Of Compiler</h1>

      {/* Display Compiler Image */}
      <div className="flex justify-center mb-6">
        <Image 
          src="/compier-image.jpg" 
          alt="Compiler Phases" 
          width={800} 
          height={300} 
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* User Code Display */}
      <div className="bg-blue-200 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-blue-900 text-left mb-2">User Code ({language}):</h2>
        <pre className="whitespace-pre-wrap bg-white p-4 rounded-md shadow-sm border border-blue-300">{code}</pre>
      </div>

      {/* Compiler Phases Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
        {phases.map((phase) => (
          <div key={phase} className="flex flex-col items-center space-y-2">
            <Button
              className={`w-full md:w-80 text-lg font-medium py-2 ${
                phaseOutputs[phase] ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              } text-white transition-all duration-200`}
              onClick={() => handlePhaseClick(phase)}
            >
              {phaseOutputs[phase] ? `Close ${phase}` : phase}
            </Button>
            {phaseOutputs[phase] && (
              <div className="mt-2 bg-white p-4 rounded-md shadow-md border border-blue-300 w-full md:w-80">
                <h3 className="text-lg font-semibold text-blue-900 text-left">Output:</h3>
                <pre className="bg-gray-50 p-3 rounded-md mt-2 text-sm whitespace-pre-wrap">{phaseOutputs[phase]}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
