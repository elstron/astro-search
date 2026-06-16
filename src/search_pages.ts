import { readdir, readFile } from "node:fs/promises";
import * as path from 'node:path';
import type { ExcludeConfig, PageItem } from "./types.js";

export const searchPages = async (
  outDir: { pathname: string },
  exclude: ExcludeConfig = { directories: [], pages: [] },
) => {
  const pages: PageItem[] = [];

  if (exclude.pages.includes("home")) {
    exclude.pages = exclude.pages.filter((p) => p !== "home");
    exclude.pages.push("dist");
  }

  await searchDirectory(outDir.pathname, exclude, pages, outDir.pathname);
  return pages;
};

async function searchDirectory(
  dirPath: string,
  exclude: ExcludeConfig,
  pages: PageItem[],
  basePath: string,
) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(entry.parentPath, entry.name);

    let isDirExcluded =
      entry.isDirectory() &&
      exclude.directories.some((d) => fullPath.endsWith(d));
    let isPageExcluded =
      entry.isFile() &&
      exclude.pages.some((p) => fullPath.endsWith(`${p}/index.html`));

    if (isDirExcluded || isPageExcluded) continue;

    if (entry.isDirectory()) {
      await searchDirectory(fullPath, exclude, pages, basePath);
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      const { title, description, image } = await readFileContent(fullPath);

      pages.push({
        title,
        description,
        url: `/${entry.parentPath.replace(basePath, "")}`,
        image,
      });
    }
  }
}

export const readFileContent = async (filePath: string) => {
  let content = await readFile(filePath, "utf8");
  return extractMetaData(content);
};

export const extractMetaData = (html: string) => {
  const metaTag = html.match(
    /<meta\b[^>]*\bname=["']description["'][^>]*>/i,
  )?.[0];

  const ogImageMetaTag = html.match(
    /<meta\b[^>]*\bproperty=["']og:image["'][^>]*>/i,
  )?.[0];

  const description = metaTag?.match(/\bcontent=["'](.*?)["']/i)?.[1];
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  const image = ogImageMetaTag?.match(/\bcontent=["'](.*?)["']/i)?.[1];

  return {
    description: description || "",
    title: title || "",
    image: image || "",
  };
};
