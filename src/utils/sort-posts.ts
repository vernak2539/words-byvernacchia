import type { CollectionEntry } from "astro:content";

export const sortByPubdate = (
    a: CollectionEntry<"blog">,
    b: CollectionEntry<"blog">
) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
