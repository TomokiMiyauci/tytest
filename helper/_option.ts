import type { CompilerHost, CompilerOptions } from "../deps.ts";
import { existsSync, ts } from "../deps.ts";

/** make `createProgram` option */
function makeCompilerOption(): CompilerOptions {
  return {
    strict: true,
    module: ts.ModuleKind.ESNext,
    esModuleInterop: true,
    skipLibCheck: false,
    noEmit: true,
  };
}

/** make `createProgram` host option */
function makeHostOption(fileName: string): CompilerHost {
  return {
    useCaseSensitiveFileNames: () => true,
    getDefaultLibFileName: () => fileName,
    getCurrentDirectory: Deno.cwd,
    readFile: Deno.readTextFileSync,
    getCanonicalFileName: (fileName) => fileName,
    getSourceFile: (fileName, lang) => {
      const sourceText = Deno.readTextFileSync(fileName);
      return ts.createSourceFile(fileName, sourceText, lang);
    },
    fileExists: existsSync,
    writeFile: (fileName, data) => Deno.writeTextFileSync(fileName, data),
    getNewLine: () => "\n",
  };
}

export { makeCompilerOption, makeHostOption };
