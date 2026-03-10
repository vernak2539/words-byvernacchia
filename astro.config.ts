import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/constants";
import rehypeSlug from "rehype-slug";
import astroRehypeRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import rehypeMermaid from "rehype-mermaid";

const rehypePlugins = [
    rehypeSlug,
    astroRehypeRelativeMarkdownLinks,
    [rehypeMermaid, { strategy: "img-svg", dark: true, colorScheme: "forest" }],
];

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    markdown: {
        rehypePlugins,
        syntaxHighlight: {
            type: "shiki",
            excludeLangs: ["mermaid"],
        },
    },
    integrations: [
        icon(),
        sitemap(),
        robotsTxt(),
        react(),
        mdx({
            rehypePlugins,
        }),
    ],
});
