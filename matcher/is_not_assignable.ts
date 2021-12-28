import type { MatchResult } from "./types.ts";
import type { Type, TypeChecker } from "../deps.ts";

function isNotAssignable(
  checker: TypeChecker,
  actual: Type,
  expected: Type,
): MatchResult {
  return {
    pass: !checker.isTypeAssignableTo(actual, expected),
    expected: `Argument of type \`${
      checker.typeToString(actual)
    }\` is assignable to parameter of type \`${
      checker.typeToString(expected)
    }\`.`,
  };
}

export { isNotAssignable };
