import { expandGlobSync, ts } from "./deps.ts";
import { makeCompilerOption, makeHostOption } from "./helper/_option.ts";
import { inspect, tally } from "./matcher/mod.ts";

const filePaths = [...expandGlobSync("**/*_test.ts")].filter(({ isFile }) =>
  isFile
).map(({ path }) => path);

const program = ts.createProgram({
  rootNames: filePaths,
  options: makeCompilerOption(),
  host: makeHostOption(),
});

const inspection = inspect(program);
const results = Object.entries(tally(inspection));

if (0 < results.length) {
  results.forEach(([filePath, matchResults]) => {
    console.error(filePath);
    matchResults.forEach(({ message, line, column }) =>
      console.error("x", `${line}:${column}`, message)
    );
  });
  Deno.exit(1);
}
