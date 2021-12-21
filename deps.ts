// export { default as ts } from "https:/esm.sh/@tsd/typescript";
export { default as ts } from "https://esm.sh/@tsd/typescript@4.5.4?target=deno";
export type {
  CallExpression,
  CompilerHost,
  CompilerOptions,
  Diagnostic,
  Expression,
  Identifier,
  JSDocTagInfo,
  Node,
  Program,
  TypeChecker,
} from "https://esm.sh/@tsd/typescript@4.5.4?target=deno";
export {
  basename,
  join,
  parse,
  resolve,
} from "https://deno.land/std@0.118.0/path/mod.ts";
export {
  existsSync,
  expandGlobSync,
} from "https://deno.land/std@0.118.0/fs/mod.ts";
