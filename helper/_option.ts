import type { CompilerHost, CompilerOptions } from "../deps.ts";
import { createSystem, createVirtualCompilerHost, ts } from "../deps.ts";

/** make `createProgram` option */
function makeCompilerOption(): CompilerOptions {
  return {
    esModuleInterop: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ESNext,
    lib: ["dom", "esnext"],
    skipLibCheck: false,
    noEmit: true,
  };
}

/** make `createProgram` host option */
function makeHostOption(
  fs: Map<string, string>,
  compilerOptions: CompilerOptions,
): CompilerHost {
  const system = createSystem(fs);
  const { compilerHost } = createVirtualCompilerHost(
    system,
    compilerOptions,
    ts as any,
  );

  compilerHost.getSourceFile = (fileName, lang) => {
    const sourceText = fs.get(fileName);
    if (sourceText) {
      return ts.createSourceFile(fileName, sourceText, lang);
    }
  };

  return compilerHost;

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
