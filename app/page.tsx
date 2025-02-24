"use client";

import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { oneDark } from "@codemirror/theme-one-dark"; // Optional: Dark theme

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCode = localStorage.getItem("userCode");
    const storedLanguage = localStorage.getItem("userLanguage");
    if (storedCode) setCode(storedCode);
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  const handleCompile = async () => {
    try {
      localStorage.setItem("userCode", code);
      localStorage.setItem("userLanguage", language);

      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, input }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput("An error occurred during compilation.");
    }
  };

  // Function to return the correct language extension
  const getLanguageExtension = () => {
    switch (language) {
      case "python":
        return python();
      case "javascript":
        return javascript();
      case "java":
        return java();
      case "c":
      case "cpp":
        return cpp();
      case "php":
        return php();
      default:
        return javascript(); // Default to JavaScript if unknown
    }
  };

  return (
    <div className="space-y-4 p-6 max-w-3xl mx-auto bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-900">Code Compiler</h1>

      <div className="bg-blue-200 p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Write your code here:</h2>
        <CodeMirror
          value={code}
          height="250px"
          theme={oneDark}
          extensions={[getLanguageExtension()]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300 rounded-md"
        />
      </div>

      <Textarea
        placeholder="Enter input values (newline-separated)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 bg-blue-100 p-2 rounded-md"
      />

      <div className="flex space-x-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] bg-blue-300">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="c">C</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="php">PHP</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCompile}>
          Compile
        </Button>

        <Button className="bg-gray-600 hover:bg-gray-700 text-white" onClick={() => setShowPopup(true)}>
          About Developers
        </Button>
      </div>

      <div className="mt-4 bg-blue-100 p-4 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold text-blue-900">Output:</h2>
        <pre className="bg-white p-4 rounded-md mt-2 whitespace-pre-wrap">{output}</pre>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-xl font-bold text-blue-900">This Site Was Developed By</h2>
            <p className="mt-2 text-gray-700">
              1. Saran<br />2. Tharanika<br />3. Amurtha<br />4. Yuvaraj<br />
            </p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowPopup(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
