---
title: "Astro Content Collection Month and Year Pages"
description: "Shall we create pages to list posts by year and month?!? Yes, of course!"
pubDate: "2023-05-07"
tags: ["astro", "content collections"]
socialImage: ""
---

🚨 **For this post, I am assuming we're building a static site** 🚨

I've finally gotten familiar with Astro. So I thought.

I wanted my posts to be a bit more organised, so I switched from no organisation / "the wild west" to organising my posts
by year and month. As of now, my Content Collection's directory structure looks like below.

```
src/content/
└── blog
    └── 2023
        ├── 02
        │   ├── 1-astro-thus-far.md
        │   ├── a-new-blog-why.md
        │   ├── adding-comments-to-this-thing.md
        │   ├── how-do-search-this-thing.md
        │   └── my-first-chrome-extension.md
        ├── 03
        │   ├── 1-react-aria-exploration.md
        │   └── introducing-google-workspace-zoom-default.md
        ├── 04
        │   └── simulating-js-events.mdx
        └── 05
            └── astro-content-collection-month-and-year-pages.md
```

I really liked the new version, but I quickly noticed something wasn't quite right.

## The Problem

When I navigated to https://words.byvernacchia.com/2023 or https://words.byvernacchia.com/2023/02 I would get a big ole
"404 Not Found." Lovely.

I thought the "magic" of Astro would automatically create these pages for me. I was sorely mistaken 😔

After scouring their docs and posting [a question on the Astro Discord](https://discord.com/channels/830184174198718474/1097931916025544845/1097931916025544845),
I realised there wasn't much help out there. So, I got down to it.

## The Solution

Creating pages that display "Posts by Year" and "Posts by Month of the Year" both rely on the same underlying Astro APIs,
[Dynamic Routes](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes) and
[`getStaticPaths()`](https://docs.astro.build/en/reference/api-reference/#getstaticpaths).

Let's see how we can use these together to fix our problem.

### Posts by Year

While we can use this strategy for any Content Collection, I will be using "`blog`" as per my example above.

Let's start by creating a page at `src/pages/blog/[year]/index.astro`. This is our "Dynamic Route" that will generate
pages for every year. We can then use these pages to display the posts for that year. You can see `[year]` directory,
which we'll use later.

Next, we add our `getStaticPaths()` function to the page we just created.

```astro
---
import path from "path";
import fs from "fs";

const getDirsInDir = (dir: string) => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
};

export async function getStaticPaths() {
    const dir = path.resolve(process.cwd(), "./src/content/blog/");
    const dirsInDir = getDirsInDir(dir);

    return dirsInDir.map((yearDir) => {
        return {
            params: { year: yearDir },
        };
    });
}
---
```

What's going on here? Glad you asked. We:

1. Define the absolute path to the base directory of the Content Collection
2. Create an array containing all top-level directories in the Content Collection
3. Return an array of objects that Astro expects for it to build static paths ([docs](https://docs.astro.build/en/reference/api-reference/#params))

After doing this, when running `astro build` the output will show something like this:

```
▶ src/pages/blog/[year]/index.astro
  └─ /blog/2023/index.html (+7ms)
```

If I were to add a `2024` folder, I would generate a `/blog/2024/index.html` page.

One more thing to do. Let's display the posts for that year on the page. To do this, we can use Astro's
[`getCollection`](https://docs.astro.build/en/reference/api-reference/#getcollection) (outside of `getStaticPaths()`).

```astro
---
import { getCollection } from "astro:content";

// ... prior getStaticPaths() definition

const { year } = Astro.params; // dynamic route (from the "[year]" directory)

const allPosts = await getCollection("blog");
const posts = allPosts.filter((post) => {
    return post.data.pubDate.getFullYear().toString() === year;
});
---
```

This code will:

1. Get all posts in the Content Collection
2. Filter the posts based on the year

In this example, the filtering of posts by year is done by the post's frontmatter data (i.e. `pubDate`). This could be
different for your data.

We can get the "year" (dynamic page param) from the `Astro` global variable like below.

```js
const { year } = Astro.params;
```

### Posts by Month of the Year

Displaying Posts by Month of the Year is basically the same, but with some extra steps.

Maybe I do have the hang of Astro!
