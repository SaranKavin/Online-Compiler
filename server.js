import express from "express";
import { exec } from "child_process";
import fs from "fs";

const app = express();
app.use(express.json());

app.post("/compile", (req, res) => {
  const { code, language, input } = req.body;

  let filename, command;    
  const inputFile = "input.txt";

  // Save input to a file
  fs.writeFileSync(inputFile, input);

  // Define file extensions and execution commands
  if (language === "python") {
    filename = "program.py";
    fs.writeFileSync(filename, code);
    command = `python ${filename} < ${inputFile}`;
  } else if (language === "java") {
    filename = "Program.java";
    fs.writeFileSync(filename, code);
    command = `javac ${filename} && java Program < ${inputFile}`;
  } else if (language === "c") {
    filename = "program.c";
    fs.writeFileSync(filename, code);
    command = `gcc ${filename} -o program && ./program < ${inputFile}`;
  } else if (language === "cpp") {
    filename = "program.cpp";
    fs.writeFileSync(filename, code);
    command = `g++ ${filename} -o program && ./program < ${inputFile}`;
  } else {
    return res.json({ output: "Error: Unsupported language" });
  }

  // Execute the code
  exec(command, (error, stdout, stderr) => {
    if (error) return res.json({ output: `Error: ${stderr || error.message}` });
    res.json({ output: stdout });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
