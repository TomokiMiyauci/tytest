import { ts } from "../deps.ts";
import type {
  CallExpression,
  Diagnostic as TSDiagnostic,
  Node,
  Program,
} from "../deps.ts";
import { isIdentical } from "./is_identical.ts";
import { isNotIdentical } from "./is_not_identical.ts";
import { isNotAssignable } from "./is_not_assignable.ts";
import type { Matcher } from "./types.ts";
import type { RequiredByKeys } from "../_types.ts";

const ImportPathWithExtension = 2691;
const IgnoreDiagnosticCodes = new Set([
  ImportPathWithExtension,
]);

const assertionMap = {
  expectType: isIdentical,
  expectNotType: isNotIdentical,
  expectNotAssignable: isNotAssignable,
};

type Result = {
  fileName: string;
  message: string;
  type: "error";
  line: number;
  column: number;
};

function format(
  { file, messageText, start }: RequiredByKeys<TSDiagnostic, "file">,
): Result {
  const position = file.getLineAndCharacterOfPosition(
    start!,
  );
  return {
    fileName: file.fileName,
    message: ts.flattenDiagnosticMessageText(messageText, "\n"),
    type: "error",
    line: position.line + 1,
    column: position.character,
  };
}

function inspect(program: Program): Result[] {
  const diagnostics = [
    ...program
      .getSemanticDiagnostics(),
    ...program.getSyntacticDiagnostics(),
  ].filter(({ file }) => !!file).filter(({ code }) =>
    !IgnoreDiagnosticCodes.has(code)
  ).filter(({ messageText }) => {
    // for lib.es2021.d.ts <reference lib="es2021.intl" />
    return messageText !== "File '/lib.es2021.intl.d.ts' not found.";
  }) as RequiredByKeys<TSDiagnostic, "file">[];
  const typeChecker = program.getTypeChecker();

  const assertions = extractAssertions(program);

  const customResults = assertions.map(({ node, matcher }) => {
    if (!node.typeArguments) return;
    const actual = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    const expected = typeChecker.getTypeAtLocation(node.arguments[0]);
    const matchResult = matcher(typeChecker, actual, expected);
    if (matchResult.pass) return;

    const sourceFile = node.getSourceFile();
    const position = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(),
    );

    return {
      fileName: sourceFile.fileName,
      message: matchResult.expected,
      type: "error",
      line: position.line + 1,
      column: position.character,
    } as Result;
  }).filter(Boolean) as (Result)[];

  return [...diagnostics.map(format), ...customResults];
}

function tally(
  matchResults: readonly Result[],
): Record<string, Result[]> {
  return matchResults.reduce((acc, cur) => {
    const fileName = cur.fileName;
    if (fileName in acc) {
      acc[fileName] = [...acc[fileName], cur];
      return acc;
    }
    acc[fileName] = [cur];
    return acc;
  }, {} as Record<string, Result[]>);
}

function extractAssertions(
  program: Program,
): { name: string; node: CallExpression; matcher: Matcher }[] {
  const assertions: { name: string; node: CallExpression; matcher: Matcher }[] =
    [];

  function walkNodes(node: Node) {
    if (ts.isCallExpression(node)) {
      const identifier = node.expression.getText() as keyof typeof assertionMap;

      if (Object.keys(assertionMap).includes(identifier)) {
        assertions.push({
          name: identifier,
          node,
          matcher: assertionMap[identifier],
        });
      }
    }

    ts.forEachChild(node, walkNodes);
  }

  for (const sourceFile of program.getSourceFiles()) {
    walkNodes(sourceFile);
  }

  return assertions;
}

export { inspect, tally };
