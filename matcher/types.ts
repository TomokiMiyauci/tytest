import type { Type, TypeChecker } from "../deps.ts";

type Matcher = (
  checker: TypeChecker,
  actual: Type,
  expected: Type,
) => MatchResult;

type MatchResult = {
  pass: boolean;
  expected: unknown;
};

export type { Matcher, MatchResult };
