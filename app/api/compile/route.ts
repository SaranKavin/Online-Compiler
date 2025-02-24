import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(req: Request) {
  try {
    const { code, language, input } = await req.json();

    if (language !== "python") {
      return NextResponse.json({ output: `Error: Unsupported language ${language}` });
    }

    return new Promise((resolve) => {
      const pythonProcess = spawn("python", ["-c", code], {
        stdio: ["pipe", "pipe", "pipe"],
      });

      let output = "";
      let error = "";

      // Send multiple input lines properly
      if (input) {
        pythonProcess.stdin.write(input.replace(/\r/g, "") + "\n");
        pythonProcess.stdin.end();
      }

      pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      pythonProcess.on("close", () => {
        resolve(
          NextResponse.json({
            output: error ? `Error: ${error}` : output.trim(),
          })
        );
      });
    });
  } catch (err) {
    return NextResponse.json({ output: "Error: Could not process the request" });
  }
}
