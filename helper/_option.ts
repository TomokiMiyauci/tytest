import type { CompilerHost, CompilerOptions } from "../deps.ts";
import { ts } from "../deps.ts";
import {
  directoryExists,
  fileExists,
  getCanonicalFileName,
  getCurrentDirectory,
  getNewLine,
  makeResolveModuleNames,
  readFile,
  useCaseSensitiveFileNames,
  writeFile,
} from "./_runtime.ts";

/** make `createProgram` option */
function makeCompilerOption(): CompilerOptions {
  return {
    esModuleInterop: true,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2021,
    skipLibCheck: false,
    noEmit: true,
  };
}

/** make `createProgram` host option */
function makeHostOption(
  libMap: Map<string, string>,
  compilerOptions: CompilerOptions,
): CompilerHost {
  console.log(libMap, compilerOptions);
  return {
    readFile,
    useCaseSensitiveFileNames,
    getDefaultLibFileName: () => "/lib.d.ts",
    getCurrentDirectory,
    getCanonicalFileName,
    getSourceFile: (fileName, lang) => {
      if (libMap.has(fileName)) {
        return ts.createSourceFile(fileName, libMap.get(fileName)!, lang);
      }
      const sourceText = Deno.readTextFileSync(fileName);
      return ts.createSourceFile(fileName, sourceText, lang);
    },
    directoryExists,
    fileExists,
    writeFile,
    getNewLine,
    resolveModuleNames: makeResolveModuleNames(compilerOptions),
  };
}

export { makeCompilerOption, makeHostOption };
