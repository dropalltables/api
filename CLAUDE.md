Default to using Bun instead of Node.js.

- `Bun.serve()` for the HTTP server. Don't use `express`.
- `Bun.file` over `node:fs` readFile/writeFile.
- Bun automatically loads `.env`, don't use dotenv.

## Routes

Routes are auto-discovered from `routes/`. Each subdirectory is a git submodule and must export a default handler:

```ts
import type { BunRequest } from "bun";

export default function handler(req: BunRequest): Response {
  return new Response("...");
}
```

To add a route, add a submodule to `routes/<name>` and it will be mounted at `/<name>` automatically.
