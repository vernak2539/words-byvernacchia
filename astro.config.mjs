import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/constants';
import rehypeSlug from "rehype-slug";
import astroRehypeRelativeMarkdownLinks from "astro-rehype-relative-markdown-links";

const rehypePlugins = [rehypeSlug, astroRehypeRelativeMarkdownLinks]

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    rehypePlugins
  },
  integrations: [sitemap(), robotsTxt(), react(), mdx({
    rehypePlugins
  })]
});