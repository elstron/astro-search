import { cp, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";

await rm("dist", { recursive: true, force: true });

const tsc = spawnSync("pnpm", ["exec", "tsc", "-p", "tsconfig.json"], {
  stdio: "inherit",
});

if (tsc.status !== 0) {
  process.exit(tsc.status ?? 1);
}

await cp("src/component", "dist/component", { recursive: true });
