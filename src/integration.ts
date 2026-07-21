import { pageList, searchPages } from "./search_pages.js";
import { savePages } from "./write-results.js";
import type { AstroIntegration } from "astro";
import type { UserConfig } from "./types.js";
import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";
export function astroSearch(userConfig: UserConfig = {}): AstroIntegration {
  let outDir: { pathname: string };

  return {
    name: "astro-search",
    hooks: {
      "astro:config:setup": async ({
        injectScript,
        config,
        logger,
        command,
      }) => {
        logger.info(`Gerating search index`);

        let pages =
          command === "dev" && (await pageList(config.outDir.pathname));
        if (command === "dev" && !pages)
          logger.warn(
            `Run “npm run build” first so you can preview the page search in DEV mode`,
          );

        injectScript(
          "head-inline",
          `const stronAstroOutput = "${config.output}"; const astroSearchPages = ${pages || "[]"};`,
        );
      },
      "astro:config:done": async ({ config: cfg, logger }) => {
        outDir = cfg.outDir;
      },
      "astro:build:generated": async ({ logger, dir }) => {
        const { exclude } = userConfig;
        const pages = searchPages(outDir, {
          directories: exclude?.directories ?? [],
          pages: exclude?.pages ?? [],
        });

        await savePages(await pages, dir);
        logger.info(
          `Search index generated with ${await pages.then((p) => p.length)} pages.`,
        );
        logger.info(`Save the search index to", "${dir.pathname}search.json"`);
      },
    },
  };
}
