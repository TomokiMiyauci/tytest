export { default as ts } from "https://esm.sh/@tsd/typescript@4.5.4?target=deno";
export type {
  CallExpression,
  CompilerHost,
  CompilerOptions,
  Diagnostic,
  Expression,
  Identifier,
  JSDocTagInfo,
  ModuleResolutionHost,
  Node,
  Program,
  ResolvedModule,
  System,
  Type,
  TypeChecker,
} from "https://esm.sh/@tsd/typescript@4.5.4?target=deno";
export {
  basename,
  join,
  parse,
  resolve,
} from "https://deno.land/std@0.118.0/path/mod.ts";
export { expandGlobSync } from "https://deno.land/std@0.118.0/fs/mod.ts";
export { toFileUrl } from "https://deno.land/std@0.119.0/path/mod.ts";
export { cyan, red, yellow } from "https://deno.land/std@0.119.0/fmt/colors.ts";
export {
  createDefaultMapFromCDN,
  createSystem,
  createVirtualCompilerHost,
} from "https://esm.sh/@typescript/vfs";
export { default as lzstring } from "https://esm.sh/lz-string";
