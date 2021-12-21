// Copyright 2021-Present the Tytest authors. All rights reserved. MIT license.
import { expandGlob } from "https://deno.land/std@0.115.1/fs/mod.ts";

/** get file first line */
function getFirstLine(content: string) {
  return (/(^.*)/.exec(content))?.[1] || "";
}

const copyright =
  "// Copyright 2021-Present the Tytest authors. All rights reserved. MIT license.";

for await (
  const { path, isFile } of expandGlob("**/*.ts", {
    exclude: ["node_modules", "docs"],
  })
) {
  if (isFile) {
    const content = await Deno.readTextFile(path);

    const firstLine = getFirstLine(content);
    if (firstLine !== copyright) {
      const newContent = `${copyright}
${content}`;
      await Deno.writeTextFile(path, newContent);
      console.info("Add copyright:", path);
    }
  }
}
