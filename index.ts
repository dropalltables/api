import type { BunRequest } from "bun";
import { readdirSync } from "node:fs";

const routes: Record<string, (req: BunRequest) => Response | Promise<Response>> = {
  "/": () => new Response(Bun.file("public/index.html")),
};

const dirs = readdirSync("./routes", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const name of dirs) {
  const mod = await import(`./routes/${name}/index`);
  routes[`/${name}`] = mod.default;
  console.log(`Mounted /${name}`);
}

Bun.serve({
  port: Number(process.env.PORT) || 3000,
  routes,
  fetch(req) {
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Listening on port ${Number(process.env.PORT) || 3000}`);
