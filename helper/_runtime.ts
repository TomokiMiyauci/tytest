import type {
  CompilerHost,
  CompilerOptions,
  ModuleResolutionHost,
  ResolvedModule,
} from "../deps.ts";
import { ts } from "../deps.ts";

type FileExists = ModuleResolutionHost["fileExists"];

function fileExists(
  ...[filePath]: Parameters<FileExists>
): ReturnType<FileExists> {
  try {
    const { isFile } = Deno.lstatSync(filePath);
    return isFile;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return false;
    }
    throw e;
  }
}

type DirectoryExists = Exclude<
  ModuleResolutionHost["directoryExists"],
  undefined
>;
function directoryExists(
  ...[filePath]: Parameters<DirectoryExists>
): ReturnType<DirectoryExists> {
  try {
    const { isDirectory } = Deno.lstatSync(filePath);
    return isDirectory;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return false;
    }
    throw e;
  }
}

type ReadFile = ModuleResolutionHost["readFile"];

function readFile(...[filePath]: Parameters<ReadFile>): ReturnType<ReadFile> {
  return Deno.readTextFileSync(filePath);
}

function getCurrentDirectory(): ReturnType<
  CompilerHost["getCurrentDirectory"]
> {
  return Deno.cwd();
}

type WriteFile = CompilerHost["writeFile"];
function writeFile(
  ...[filePath, data]: Parameters<WriteFile>
): ReturnType<WriteFile> {
  return Deno.writeTextFileSync(filePath, data);
}

function getNewLine(): ReturnType<CompilerHost["getNewLine"]> {
  return "\n";
}

function useCaseSensitiveFileNames(): ReturnType<
  CompilerHost["useCaseSensitiveFileNames"]
> {
  return true;
}

type GetCanonicalFileName = CompilerHost["getCanonicalFileName"];
function getCanonicalFileName(
  ...[filePath]: Parameters<GetCanonicalFileName>
): ReturnType<GetCanonicalFileName> {
  return filePath;
}

function removeTsExtension(moduleName: string) {
  if (moduleName.slice(-3).toLowerCase() === ".ts") {
    return moduleName.slice(0, -3);
  }
  return moduleName;
}

type Realpath = Exclude<ModuleResolutionHost["realpath"], undefined>;
function realpath(...[pathName]: Parameters<Realpath>): ReturnType<Realpath> {
  return Deno.realPathSync(pathName);
}

type ResolveModuleNames = Exclude<
  CompilerHost["resolveModuleNames"],
  undefined
>;

function makeResolveModuleNames(
  compilerOptions: CompilerOptions,
): typeof resolveModuleNames {
  function resolveModuleNames(
    ...[moduleNames, containingFile]: Parameters<ResolveModuleNames>
  ): ReturnType<ResolveModuleNames> {
    const resolvedModules: ResolvedModule[] = [];

    for (const moduleName of moduleNames.map(removeTsExtension)) {
      const result = ts.resolveModuleName(
        moduleName,
        containingFile,
        compilerOptions,
        {
          readFile,
          useCaseSensitiveFileNames,
          getCurrentDirectory,
          directoryExists,
          fileExists,
          realpath,
        },
      );
      console.log({
        moduleName,
        containingFile,
        compilerOptions,
        result,
      });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      }
    }

    return resolvedModules;
  }
  return resolveModuleNames;
}

export {
  directoryExists,
  fileExists,
  getCanonicalFileName,
  getCurrentDirectory,
  getNewLine,
  makeResolveModuleNames,
  readFile,
  useCaseSensitiveFileNames,
  writeFile,
};
