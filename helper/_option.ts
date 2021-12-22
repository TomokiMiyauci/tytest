import type { CompilerHost, CompilerOptions } from "../deps.ts";
import { ts } from "../deps.ts";

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
function makeHostOption(): CompilerHost {
  return {
    useCaseSensitiveFileNames: () => true,
    getDefaultLibFileName: () => "dts/lib.deno.d.ts",
    getCurrentDirectory: () => {
      try {
        return Deno.cwd();
      } catch (e) {
        console.log(e);
        return "";
      }
    },
    readFile: (path) => {
      try {
        return Deno.readTextFileSync(path);
      } catch (e) {
        console.log(e);
      }
    },
    getCanonicalFileName: (fileName) => fileName,
    getSourceFile: (fileName, lang) => {
      const sourceText = Deno.readTextFileSync(fileName);
      return ts.createSourceFile(fileName, sourceText, lang);
    },
    directoryExists: (filePath) => {
      try {
        const { isDirectory } = Deno.lstatSync(filePath);
        return isDirectory;
      } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
          return false;
        }
        throw e;
      }
    },
    fileExists: (filePath) => {
      try {
        const { isFile } = Deno.lstatSync(filePath);
        return isFile;
      } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
          return false;
        }
        throw e;
      }
    },
    writeFile: (fileName, data) => Deno.writeTextFileSync(fileName, data),
    getNewLine: () => "\n",
  };
}

export { makeCompilerOption, makeHostOption };
