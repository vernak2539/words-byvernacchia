import type { CollectionEntry } from "astro:content";

export const sortByPubdateMostRecentFirst = (
    a: CollectionEntry<"blog">,
    b: CollectionEntry<"blog">
) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
