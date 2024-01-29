import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/constants";
import rehypeSlug from "rehype-slug";
import astroRehypeRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";
import remarkMermaid from "remark-mermaidjs";

const rehypePlugins = [rehypeSlug, astroRehypeRelativeMarkdownLinks];
const remarkPlugins = [remarkMermaid];

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
        remarkPlugins,
    },
    integrations: [
        icon(),
        sitemap(),
        robotsTxt(),
        react(),
        mdx({
            rehypePlugins,
            remarkPlugins,
        }),
    ],
});
