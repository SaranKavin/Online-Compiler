import { NextResponse } from "next/server"
import {
  lexicalAnalysis,
  syntaxAnalysis,
  semanticAnalysis,
  generateIntermediateCode,
  optimizeCode,
  generateTargetCode,
} from "@/lib/compiler"

export async function POST(request: Request) {
  const { phase, code, language } = await request.json()

  let output = ""
  let tokens: string[] = []
  let ast: any = {}
  let intermediateCode = ""
  let optimizedCode = ""

  try {
    switch (phase) {
      case "Lexical Analysis":
        tokens = lexicalAnalysis(code, language)
        output = "Tokens: " + JSON.stringify(tokens, null, 2)
        break
      case "Syntax Analysis":
        tokens = lexicalAnalysis(code, language)
        ast = syntaxAnalysis(tokens, language)
        output = "Abstract Syntax Tree: " + JSON.stringify(ast, null, 2)
        break
      case "Semantic Analysis":
        tokens = lexicalAnalysis(code, language)
        ast = syntaxAnalysis(tokens, language)
        output = semanticAnalysis(ast, language)
        break
      case "Intermediate Code Generation":
        tokens = lexicalAnalysis(code, language)
        ast = syntaxAnalysis(tokens, language)
        output = generateIntermediateCode(ast, language)
        break
      case "Code Optimization":
        tokens = lexicalAnalysis(code, language)
        ast = syntaxAnalysis(tokens, language)
        intermediateCode = generateIntermediateCode(ast, language)
        output = optimizeCode(intermediateCode, language)
        break
      case "Target Code Generation":
        tokens = lexicalAnalysis(code, language)
        ast = syntaxAnalysis(tokens, language)
        intermediateCode = generateIntermediateCode(ast, language)
        optimizedCode = optimizeCode(intermediateCode, language)
        output = generateTargetCode(optimizedCode, language)
        break
      default:
        output = "Unknown phase"
    }
  } catch (error) {
    output = "An error occurred: " + (error instanceof Error ? error.message : String(error))
  }

  return NextResponse.json({ output })
}

