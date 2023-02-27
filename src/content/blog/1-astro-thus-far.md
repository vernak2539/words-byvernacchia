---
title: "Astro thus far..."
description: "Hmmm, what do I think of Astro thus far??"
pubDate: "2022-02-27"
tags: ["reflection", "astro", "frontend"]
socialImage: "astro-logo.png"
---

One of the purposes of this blog (see [why](/blog/a-new-blog-why)) was to explore new technology in the frontend space. I
wanted to blog about my learnings / progress (even if it was just me rereading things for that stats 📈).

So I looked at [Astro](https://astro.build/), something I'd wanted to use for a while and went all in.

## How it started

Starting it up was pretty simple. I used the yarn command from their website to scaffold the project, which I think used
the started template?!? Definitely copied a lot of it from somewhere haha

I tried to edit the site a bit to tweak it to my needs and it was suprisingly easy. It took me a while to get used to the
`.astro` files, which were all I used for a while (getting a feel for the framework). Only when I [added search](/blog/how-do-search-this-thing)
did I use something else.

The DX was very good. Maybe it's just me being jaded from the early versions of Next.js (yes, I'm looking at you, the upgrade
from 7 to 8 or something along those lines), but it was really good. It felt like everything was set up,
so when I ran the dev comamnd, IT 👏 JUST 👏 Worked 👏.

I had it publishing to Github pages (where this is hosted) after pushing to the main branch in no time. Either the
scaffolding took care of this or their docs were really good and made this set up super easy.

I then went searching for ways to make it blog (i.e. publish static content). Since I started building this site a few
days after v2.0.0 was released I had access to [Content Collections](https://docs.astro.build/en/guides/content-collections/).
Boy are these nice. Super simple way to access colletion/MD/MDX data (I have yet to look at MDX, but it's on the list).

In the end, I had a blog up and running in only a couple days (in my spare time between actual work haha). I very much
"borrowed" some of the things from Astro's examples repostory. Only after it was all deployed did I really look at the
docs (typical dev haha).

Then I started writing content (not the best content, but content). I was amazed at the speed I was able to do it as it
was just adding a Markdown file with some content (unpolished content 😉) and pushing the changes to Github.

## How it's going

After writing a few blog posts, I wanted to add a few things, namely to help my non-existent SEO and/or discoverability.
Not like I wanted to get to the top of Google, but wanted to see how it easy it would be to integrate things like a
sitemap, `robots.txt`, RSS feed, and social open graph (FB + Twitter stuff, but really, who uses FB still 🤷)...

Turns out, for most of these things there are already prebuilt integrations that someone much smarter than me has taken
the time to open source.

-   Sitemap via [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
-   RSS Feed via [@astrojs/rss](https://docs.astro.build/en/guides/rss/) (not sure why it's not on the [integrations](https://astro.build/integrations/) page)
-   Open Graph via [Custom Head Component](https://github.com/vernak2539/words-byvernacchia/blob/main/src/components/BaseHead.astro)
    -   Probably copied this from somewhere (thank you!)
    -   Easily added my own ability to designate images used for OG data via frontmatter (pretty nice, super easy)
-   Analytics via [Custom Tracking Component](https://github.com/vernak2539/words-byvernacchia/blob/main/src/components/Tracking.astro)
    -   Via [Simple Analytics](https://simpleanalytics.com) (because I care about you not being the product)

I also added things like [comments](/blog/adding-comments-to-this-thing), and I used [astro-icon](https://github.com/natemoo-re/astro-icon#readme)
to add some "flare" to the blog entry metadata section (you're welcome).

I thought I was done, but I really wanted to add tags to the site as well (have not added them OG stuff yet). I followed
[the tutorial](https://docs.astro.build/en/tutorial/5-astro-api/1/) on their site, and with a few changes (using Content
Collections), we were finished.

Overall, I've been super surprised at how easy it was to add all of this stuff. I actually wanted to do it instead of
slog my way through things. I've used WordPress, Drupal, Jekyll, Gatsby (early days), Ghost, and Next.js (likely missed
some) but really like this more. I'm not sure how to explain it...

### Small nitpick

I didn't realise the links that I put in my Markdown files to other Markdown files via `[]()` were not being translated
to generated paths. Turns out that is not supported yet, which I found out on a couple of issues

* [Issue](https://github.com/withastro/astro/issues/5680)
* [RFC](https://github.com/withastro/roadmap/discussions/424)

Hopefully there will be a fix issued soon, but in the meantime I'll likely just put the paths there instead of using
Markdown links (not looking to get into rehype or remark at the moment of writing this).

## Future Ideas

I have an idea I want to explore in the future around displaying remote file content. Think something like embedding a
gist on a site.

I want to be able to do this both from Markdown and an Astro component with the options of inlining it into the page on
build or displaying it dynamically on page load. I know there's some React/Vue/whatever framework you want to use component
out there that does this, but it's time to learn!
