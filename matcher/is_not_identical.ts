import type { MatchResult } from "./types.ts";
import type { Type, TypeChecker } from "../deps.ts";

function isNotIdentical(
  checker: TypeChecker,
  actual: Type,
  expected: Type,
): MatchResult {
  return {
    pass: !checker.isTypeIdenticalTo(actual, expected),
    expected: `Parameter type \`${
      checker.typeToString(actual)
    }\` is identical to argument type \`${checker.typeToString(expected)}\`.`,
  };
}

export { isNotIdentical };
