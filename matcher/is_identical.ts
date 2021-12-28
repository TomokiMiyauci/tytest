import type { Type, TypeChecker } from "../deps.ts";
import type { MatchResult } from "./types.ts";

function isIdentical(
  checker: TypeChecker,
  actual: Type,
  expected: Type,
): MatchResult {
  return {
    pass: checker.isTypeAssignableTo(actual, expected),
    expected: `Parameter type \`${
      checker.typeToString(actual)
    }\` is declared too wide for argument type \`${
      checker.typeToString(expected)
    }\`.`,
  };
}

export { isIdentical };
