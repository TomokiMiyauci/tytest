import { ts } from "../deps.ts";
import type { Diagnostic as TSDiagnostic, Program } from "../deps.ts";
import type { RequiredByKeys } from "../_types.ts";

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
  ].filter(({ file }) => !!file) as RequiredByKeys<TSDiagnostic, "file">[];

  return diagnostics.map(format);
}

export { inspect };
