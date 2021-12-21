import { expandGlobSync, ts } from "./deps.ts";
import { makeCompilerOption, makeHostOption } from "./helper/_option.ts";
import { inspect } from "./matcher/mod.ts";

const filePaths = [...expandGlobSync("**/*_test.ts")].filter(({ isFile }) =>
  isFile
).map(({ path }) => path);

const results = filePaths.map((filePath) => {
  const program = ts.createProgram({
    rootNames: filePaths,
    options: makeCompilerOption(),
    host: makeHostOption(filePath),
  });
  return inspect(program);
}).filter((_) => 0 < _.length);

if (0 < results.length) {
  results.forEach((_) => {
    _.forEach(({ message }) => {
      console.error(message);
    });
  });

  Deno.exit(1);
}
