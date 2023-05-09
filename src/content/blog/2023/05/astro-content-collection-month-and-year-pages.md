---
title: "Astro Content Collection Month and Year Pages"
description: "Shall we create pages to list posts by year and month?!? Yes, of course!"
pubDate: "2023-05-08"
tags: ["astro", "content collections", "frontend", "static site", "ssg"]
socialImage: "post-by-year.jpg"
---

<small style="display:block; text-align: center;">🚨 **_I assume we're building a static site in this post_** 🚨</small>

I thought I'd finally gotten familiar with [Astro](https://astro.build/) (see my [other posts](/tags/astro)), but I was wrong.

It all started with me having trouble finding the post I wanted to update solely based on file name/slug. I thought more
structure could help with this, so I made a change.

I switched from "the wild west" to organising my posts by year and month. As of now, my Content Collection's directory
structure looks like this:

```
src/content/
└── blog
    └── 2023
        ├── 01
        │   └── a-new-blog-why.md
        ├── 02
        │   ├── 1-astro-thus-far.md
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

I really liked the new version as it bring more structure, but I quickly noticed something wasn't quite right.

## The Problem

When I navigated to https://words.byvernacchia.com/blog/2023 or https://words.byvernacchia.com/blog/2023/02, instead of seeing a
page that has all the posts for the year, or for the month of the year, I got a big ole "404 Not Found." Lovely.

I thought the "magic" of Astro would automatically create these pages for me. I was sorely mistaken 😔

After scouring their docs and posting [a question on the Astro Discord](https://discord.com/channels/830184174198718474/1097931916025544845/1097931916025544845),
I realised there wasn't much help out there. So, I got down to it.

## The Solution

Creating pages that display "Posts by Year" and "Posts by Month of the Year" both rely on the same underlying Astro APIs,
[Dynamic Routes](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes) and
[`getStaticPaths()`](https://docs.astro.build/en/reference/api-reference/#getstaticpaths).

Let's see how we can use these together to solve our problem.

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

// Helper function that returns an array of directory
// names one level down from the given directory
const getDirsInDir = (dir: string) => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
};

export async function getStaticPaths() {
    // Define the absolute path to the base directory of the Content Collection
    const collectionDir = path.resolve(process.cwd(), "./src/content/blog/");

    // Create an array containing all top-level directories in the Content Collection (i.e. years)
    const yearsInDir = getDirsInDir(collectionDir);

    // Return an array of objects that Astro expects for it to build static paths
    // See https://docs.astro.build/en/reference/api-reference/#params
    return yearsInDir.map((yearDir) => {
        return {
            params: { year: yearDir },
        };
    });
}
---
```

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

const posts = await getCollection("blog", ({ data }) => {
    // Dynamic route value (from the "[year]" directory)
    const { year } = Astro.params;

    // Filter posts based on "pubDate" value and "year" param
    return data.pubDate.getFullYear().toString() === year;
});
---
```

In this example, the filtering of posts by year uses the post's frontmatter data (i.e. `pubDate`), but it will likely
be different for you.

### Posts by Month of the Year

Displaying Posts by Month of the Year is basically the same, but with some extra steps.

Let's start by creating a page at `src/pages/blog/[year]/[month]/index.astro`. This time, instead of just `[year]` we've
added `[month]`. We'll use both of these "dynamic routes" later.

Just like before, we not add our `getStaticPaths()` function to the page we just created.

```astro
---
import path from "path";
import fs from "fs";

// Helper function that returns an array of directory
// names one level down from the given directory
const getDirsInDir = (dir: string) => {
    return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((item) => item.isDirectory())
        .map((item) => item.name);
};

export async function getStaticPaths() {
    // Define the absolute path to the base directory of the Content Collection
    const collectionDir = path.resolve(process.cwd(), "./src/content/blog/");

    // Create an array containing all top-level directories in the Content Collection (i.e. years)
    const yearsInDir = getDirsInDir(collectionDir);

    // Iterate via `flatMap` (to combine return values) through each "year" directory
    const paths = yearsInDir.flatMap((yearDiretory) => {
        // Create the absolute path to the directory
        const yearDir = path.resolve(
            process.cwd(),
            "./src/content/blog/",
            yearDiretory
        );

        // Create an array containing all the top-level directories in the directory (i.e. months)
        const monthsInYearDir = getDirsInDir(yearDir);

        // Create and return objects that Astro expects for it to build static paths using year and month
        // See https://docs.astro.build/en/reference/api-reference/#params
        const fullPaths = monthsInYearDir.map((monthDirectory) => {
            return {
                params: { year: yearDiretory, month: monthDirectory },
            };
        });

        return fullPaths;
    });

    // Return the array of objects
    return paths;
}
---
```

This looks quite familiar to the `getStaticPaths()` function we created to list our posts for each year, doesn't it?

After doing this, when running `astro build` the output will show something like this:

```
▶ src/pages/blog/[year]/[month]/index.astro
  ├─ /blog/2023/01/index.html (+3ms)
  ├─ /blog/2023/02/index.html (+6ms)
  ├─ /blog/2023/03/index.html (+9ms)
  ├─ /blog/2023/04/index.html (+12ms)
  └─ /blog/2023/05/index.html (+15ms)
```

If I were to add some posts in January 2024, Astro would then generate a `/blog/2024/01/index.html` page.

Lastly, we have to display the posts for said year and month on the page.

```astro
---
import { getCollection } from "astro:content";

// ... prior getStaticPaths() definition

const posts = await getCollection("blog", ({ data }) => {
    // Dynamic route value (from the "[year]" and "[month]" directories)
    const { year, month } = Astro.params;

    // Check if post matches current year of page
    const isYear = data.pubDate.getFullYear().toString() === year;

    // Check if post matches current month of page
    // 🤔 Remember, `Date.prototype.getMonth()` is zero-based (where zero indicates the first month of the year).
    const isMonth = data.pubDate.getMonth() === parseInt(month, 10) - 1;

    // Return boolean indicating if post is of year and month
    return isMonth && isYear;
});
---
```

## And There We Have It!

My blog (or your blog) now creates pages that will display a lists of posts by year and/or month of the year! To confirm,
you can check out https://words.byvernacchia.com/blog/2023 or https://words.byvernacchia.com/blog/2023/02 (now they work).

Maybe I do have the hang of Astro!

You can use my blog as an example for the full integration. Or, post a comment below, and we can have a discusion!

-   [Posts by year](https://github.com/vernak2539/words-byvernacchia/blob/main/src/pages/blog/%5Byear%5D/index.astro)
-   [Posts by month of the year](https://github.com/vernak2539/words-byvernacchia/blob/main/src/pages/blog/%5Byear%5D/%5Bmonth%5D/index.astro)

**Note:** If you're developing with Windows, you'll have to join your paths differently in some of the functions above (i.e. with `path.sep`).
