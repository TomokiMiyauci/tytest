# tytest

Deno-first types testing tools

## What?

`tytest` lets you write tests for your type definitions by creating files with
the `*_test.ts` extension.

This project was strongly influenced by
[tsd](https://github.com/SamVerschueren/tsd), and our current goal is to port
tsd to Deno.

## Usage

Type assertions are strict. This means that if you expect the type to be `""`
but the argument is of type `string`, the tests will fail.

```ts
import { expectType } from "https://deno.land/x/tytest@$VERSION/mod.ts";

expectType<string>("");
```

then,

`deno run --unstable --allow-read --allow-write --allow-net https://deno.land/x/tytest@$VERSION/cli.ts`

## Known Issues

The custom module resolver is not implemented, so it does not work correctly for
remote modules. This is a priority issue.

For example, the following module will be processed as `any`.

```ts
import { join } from "https://deno.land/std@0.119.0/path/mod.ts";
import { expectType } from "https://deno.land/x/tytest@$VERSION/mod.ts";

expectType<string>(join(""));
```

## License

Copyright © 2021-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
