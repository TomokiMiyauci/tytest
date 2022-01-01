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
    target: ts.ScriptTarget.ESNext,
    lib: ["dom", "esnext"],
    skipLibCheck: false,
    noEmit: true,
  };
}

/** make `createProgram` host option */
function makeHostOption(
  libMap: Map<string, string>,
  compilerOptions: CompilerOptions,
): CompilerHost {
  return {
    readFile,
    useCaseSensitiveFileNames,
    getDefaultLibFileName: () => "/lib.deno.d.ts",
    getCurrentDirectory,
    getCanonicalFileName,
    getSourceFile: (fileName, lang) => {
      const dtsPath = `/lib.${fileName.slice(1)}`;
      if (libMap.has(dtsPath)) {
        return ts.createSourceFile(dtsPath, libMap.get(dtsPath)!, lang);
      }
      if (libMap.has(fileName)) {
        return ts.createSourceFile(fileName, libMap.get(fileName)!, lang);
      }
      try {
        const sourceText = Deno.readTextFileSync(fileName);
        return ts.createSourceFile(fileName, sourceText, lang);
      } catch {
        return;
      }
    },
    directoryExists,
    fileExists,
    writeFile,
    getNewLine,
    resolveModuleNames: makeResolveModuleNames(compilerOptions),
  };
}

export { makeCompilerOption, makeHostOption };
