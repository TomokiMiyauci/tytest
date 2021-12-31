import type { CompilerHost, CompilerOptions, System } from "../deps.ts";
import { createVirtualCompilerHost, ts } from "../deps.ts";

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
function makeHostOption(
  system: System,
  compilerOptions: CompilerOptions,
): CompilerHost {
  const host = createVirtualCompilerHost(system, compilerOptions, ts as any);
  return host.compilerHost;

  // return {
  //   readFile: (fileName) => {
  //     console.log(fileName);

  //     return Deno.readTextFileSync(fileName);
  //   },
  //   useCaseSensitiveFileNames: () => true,
  //   getDefaultLibFileName: () => "/dom.d.ts",
  //   getCurrentDirectory: Deno.cwd,
  //   getCanonicalFileName: (fileName) => fileName,
  //   getSourceFile: (fileName, lang) => {
  //     const sourceText = Deno.readTextFileSync(fileName);
  //     return ts.createSourceFile(fileName, sourceText, lang);
  //   },
  //   directoryExists: (filePath) => {
  //     try {
  //       const { isDirectory } = Deno.lstatSync(filePath);
  //       return isDirectory;
  //     } catch (e) {
  //       if (e instanceof Deno.errors.NotFound) {
  //         return false;
  //       }
  //       throw e;
  //     }
  //   },
  //   fileExists: (filePath) => {
  //     try {
  //       const { isFile } = Deno.lstatSync(filePath);
  //       return isFile;
  //     } catch (e) {
  //       if (e instanceof Deno.errors.NotFound) {
  //         return false;
  //       }
  //       throw e;
  //     }
  //   },
  //   writeFile: (fileName, data) => Deno.writeTextFileSync(fileName, data),
  //   getNewLine: () => "\n",
  // };
}

export { makeCompilerOption, makeHostOption };
