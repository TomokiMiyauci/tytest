import { ts } from "../deps.ts";
import type { Diagnostic as TSDiagnostic, Program } from "../deps.ts";
import type { RequiredByKeys } from "../_types.ts";

const ImportPathWithExtension = 2691;
const IgnoreDiagnosticCodes = new Set([ImportPathWithExtension]);

type MatchResult = {
  fileName: string;
  message: string;
  type: "error";
  line: number;
  column: number;
};

function format(
  { file, messageText, start }: RequiredByKeys<TSDiagnostic, "file">,
): MatchResult {
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

function inspect(program: Program): MatchResult[] {
  const diagnostics = [
    ...program
      .getSemanticDiagnostics(),
    ...program.getSyntacticDiagnostics(),
  ].filter(({ file }) => !!file).filter(({ code }) =>
    !IgnoreDiagnosticCodes.has(code)
  ) as RequiredByKeys<TSDiagnostic, "file">[];

  return diagnostics.map(format);
}

function tally(
  matchResults: readonly MatchResult[],
): Record<string, MatchResult[]> {
  return matchResults.reduce((acc, cur) => {
    const fileName = cur.fileName;
    if (fileName in acc) {
      acc[fileName] = [...acc[fileName], cur];
      return acc;
    }
    acc[fileName] = [cur];
    return acc;
  }, {} as Record<string, MatchResult[]>);
}

export { inspect, tally };
