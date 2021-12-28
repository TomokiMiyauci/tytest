import type { Type, TypeChecker } from "../deps.ts";
import type { MatchResult } from "./types.ts";

function isIdentical(
  checker: TypeChecker,
  actual: Type,
  expected: Type,
): MatchResult {
  if (!checker.isTypeAssignableTo(actual, expected)) {
    return {
      pass: false,
      expected: `Parameter type \`${
        checker.typeToString(actual)
      }\` is declared too wide for argument type \`${
        checker.typeToString(expected)
      }\`.`,
    };
  }
  return {
    pass: checker.isTypeIdenticalTo(actual, expected),
    expected: `Parameter type \`${
      checker.typeToString(actual)
    }\` is not identical to argument type \`${
      checker.typeToString(expected)
    }\`.`,
  };
}

export { isIdentical };
