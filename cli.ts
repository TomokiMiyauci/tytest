import {
  basename,
  createDefaultMapFromCDN,
  cyan,
  expandGlobSync,
  lzstring,
  red,
  toFileUrl,
  ts,
  yellow,
} from "./deps.ts";
import { makeCompilerOption, makeHostOption } from "./helper/_option.ts";
import { inspect, tally } from "./matcher/mod.ts";
import { libDeno } from "./dts/lib.deno.ts";

const filePaths = [...expandGlobSync("**/*_test.ts")].filter(({ isFile }) =>
  isFile
).map(({ path }) => path);

const compilerOptions = makeCompilerOption();
const fsMap = await createDefaultMapFromCDN(
  compilerOptions,
  ts.version,
  true,
  ts as any,
  lzstring,
);

fsMap.set("/lib.deno.d.ts", libDeno);

try {
  const program = ts.createProgram({
    rootNames: [...filePaths],
    options: compilerOptions,
    host: makeHostOption(fsMap, compilerOptions),
  });

  const inspection = inspect(program);
  const results = Object.entries(tally(inspection));

  if (0 < results.length) {
    results.forEach(([filePath, matchResults]) => {
      console.error(basename(filePath));
      console.group();
      matchResults.forEach(({ message, line, column, fileName }) => {
        console.error(
          message,
        );

        console.error(
          "at",
          `${cyan(toFileUrl(fileName).href)}:${yellow(String(line))}:${
            yellow(String(column))
          }`,
        );
      });
      console.groupEnd();
    });

    const errors = results.reduce(
      (acc, [_, cur]) => cur.reduce((acc2) => acc2 + 1, acc),
      0,
    );

    console.error("\n" + red(`${errors} error${errors > 0 ? "s" : ""}`));
    Deno.exit(1);
  }
} catch (e) {
  console.log(e);
}
