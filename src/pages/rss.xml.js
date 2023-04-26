import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../constants";

export async function get() {
    const blogEntries = await getCollection("blog");

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: SITE_URL,
        items: blogEntries.map((post) => ({
            title: post.data.title,
            link: `/blog/${post.slug}/`,
            description: post.data.description,
            content: sanitizeHtml(parser.render(post.body)),
            pubDate: post.data.pubDate,
            updatedDate: post.data.updatedDate,
            customData:
                "<author>alvernacchia@gmail.com (Alex Vernacchia)</author>",
            // Compute RSS link from post `slug`
            // This example assumes all posts are rendered as `/blog/[slug]` routes
        })),
        customData: `<language>en-us</language>`,
    });
}
