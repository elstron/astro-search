# astro-search

`astro-search` is an Astro integration that generates a static search index at build time and exposes a ready-to-use search component for static sites.

## Features

- Provides a `<Search />` component for Astro.
- Works with `output: "static"`.

## Installation

```bash
pnpm add astro-search
```

## Usage

### 1. Add the integration

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import astroSearch from "astro-search";

export default defineConfig({
  output: "static",
  integrations: [
    astroSearch({
      exclude: {
        directories: ["/news"],
        pages: ["about", "home"],
      },
    }),
  ],
});
```

### 2. Use the search component

```astro
---
import Search from "astro-search/component";
---

<Search />
```

## Configuration

```ts
astroSearch({
  exclude?: {
    directories?: string[];
    pages?: string[];
  };
})
```

- `directories`: directories to exclude from the index.
- `pages`: specific pages to exclude from the index.

## Component variants

The component includes multiple visual variants. Select one with the `variant` prop:

```astro
<Search variant="variant1" />
<Search variant="variant2" />
<Search variant="variant3" />
<Search variant="variant4" />
```

If you do not pass a variant, `variant3` is used by default.

## Notes

- Each result uses `title`, `description`, `url`, and `image` when available.
