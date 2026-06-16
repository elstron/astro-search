# astro-search

`astro-search` es una integración para Astro que genera un índice de búsqueda estático durante el build y expone un componente listo para usar en sitios estáticos.

## Características

- Proporciona un componente `<Search />` para Astro.
- Funciona con `output: "static"`.

## Instalación

```bash
pnpm add astro-search
```

## Uso

### 1. Agrega la integración

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

### 2. Usa el componente de búsqueda

```astro
---
import Search from "astro-search/component";
---

<Search />
```

## Configuración

```ts
astroSearch({
  exclude?: {
    directories?: string[];
    pages?: string[];
  };
})
```

- `directories`: directorios que se excluirán del índice.
- `pages`: páginas concretas que se excluirán del índice.

## Variantes del componente

El componente incluye varias variantes visuales. Puedes elegir una con la prop `variant`:

```astro
<Search variant="variant1" />
<Search variant="variant2" />
<Search variant="variant3" />
<Search variant="variant4" />
```

Si no indicas ninguna, se usa `variant3` por defecto.

## Notas

- El índice se genera a partir del HTML construido.
- Cada resultado usa `title`, `description`, `url` e `image` cuando están disponibles.
