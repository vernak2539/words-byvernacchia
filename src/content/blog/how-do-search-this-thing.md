---
title: "How do I search this thing?"
description: "Where is everything..."
pubDate: "2022-02-22"
---

I want to add some search features to this static site. Not a huge thing, but would be a nice to have.

This gives me the opportunity to investigate all the different ways to go about adding search to a statically
generate site.

## My Options

What are my options?? Let's have a look.

### [Algolia](https://www.algolia.com/)

You've probably seen this technology on so many documentation sites, I know I have. It looks pretty decent for
this site, as their free tier provides:

> 10,000 search + 10,000 recommend requests/mo and 10,000 records/mo

Let's be honest, I'm not going to hit that amount of search (this isn't a big blog). Let's have a look at how it's
integrated on sites.

Seems like I have to sign up to get an API key and such. Maybe I'll try using "React InstanceSearch Hooks" tutorial to
get started.

### [Typesense](https://typesense.org/)

At first, it seems free and pretty decent. Then you see that you have to either set up your own backend or use their
cloud, both of which costs money.

It does seem to be a decent product though, but it's not easy to set up ([tutorial](https://aviyel.com/post/1006/adding-typesense-search-to-an-astro-static-generated-website))
 / I'm lazy. Likely going to forgo this one.

### Load from Astro + Local Search

Seems like you can use Astro to load all posts on the "server" and then pass it to a client component.

It would look something like this (obviously not Astro format, but you get the gist):

```js
import Search from '../components/Search.tsx'

const posts = await Astro.glob('../blog/*.md');
const searchablePosts = posts.filter((post) => !post.frontmatter.draft); // or whatever filters

return <Search client:load searchList={searchablePosts} />
```

Then inside that, do some filtering/search. I've been quite partial to [Fuse.js](https://fusejs.io/) (even if my team 
didn't like it ha) and have used that many times.

Definitely a viable option.

### Others

Seems like a lot of the others require you to generate some form of base, serve that, then search through it. Seems
super custom. So likely not going to go with that.

## My Choice

I think I'm going to be lazy and try to use Algolia because it's "easy." Hopefully those aren't famous last words.

### Me trying to implement it

So, I went down this path of Algolia, let's see how it went.

I looked for some SDK / package to integrate into my site, something along the lines of "set it and forget it."

Unfortunately, I was mistaken and there is no silver bullet like I thought. It turns out you  have to prep data, upload 
it to their site (like I describe in the [Others](#others) section 😬), and then implement search.

After a bit of digging I ended up using [this blog](https://route360.dev/post/astro-algolia/) as a source of truth. It worked
really well, so I would suggest that you have a look!

Looking back, I probably could've used the [Load from Astro + Local Search](#load-from-astro--local-search) strategy as
well.

But, now there is search on the site. Maybe I'll have a go at refining it over time.