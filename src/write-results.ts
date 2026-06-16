import { writeFile } from "node:fs/promises";
import * as path from "node:path";
import type { PageItem } from "./types.js";

export async function savePages(
  pages: PageItem[],
  outDir: { pathname: string },
) {
  await writeFile(
    path.join(outDir.pathname, "search.json"),
    JSON.stringify(pages, null, 2),
    "utf8",
  );
}
