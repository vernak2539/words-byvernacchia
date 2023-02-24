---
title: "How do I search this thing?"
description: "Where is everything?!?c"
pubDate: "2022-02-23"
socialImage: "detective.png"
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
import Search from "../components/Search.tsx";

const posts = await Astro.glob("../blog/*.md");
const searchablePosts = posts.filter((post) => !post.frontmatter.draft); // or whatever filters

return <Search client:load searchList={searchablePosts} />;
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

My god, this was a nightmare 😬.

I thought it would be so easy since everyone seems to use Algolia. Just add a JS snippet and you're done. It does everything
else for you. Boy was I wrong.

#### Populating Search Indexes

It turns out you very much do have to prep data yourself. This involves parsing and uploading it to their site. It's almost
as if I described this in the [Others](#others) section before I choose my fate. Man, being lazy doens't pay off sometimes.

So, I built a node script to do it. You can see it [here](https://github.com/vernak2539/words-byvernacchia/blob/main/bin/build-search.js).
I was lazy here and stole a lot from [this blog post](https://route360.dev/post/astro-algolia/#create-algoliajs).

This runs on my Github workflow when I build and publish my blog, so it should have up-to-date information when new
content is released.

#### Implementing the Search

This was sooooooo difficult to figure out. I started at their website and the first thing you're confronted with is whether
to use InstantSearch, React InstanceSearch, React InstanceSearch Hooks, etc.

Damnnnnnn, that's a lot of choices.

So, I went for React InstanceSearch Hooks. I followed the instructions, trying to figure how to display results and how to
style it (had to install a separate NPM package for this then import it). I ran into problems 🤦‍

Some of these problems were due to Astro and how I'd not added `client:load` to my React component. Even after doing that,
there were still problems.

How do I style it? How do I move it to different parts of my sight? How do I get it show up as a modal?

That last part was the problem. I couldn't figure out how to do that just by using React InstantSearch Hooks. Turns out
there's something called [Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/)
that does exactly what I want.

So, I abandoned everything I'd tried and started fresh. The Autocomplete docs had examples (only JS, not TS 😓) and some
codesandbox examples. This was really helpful.

I ended up being able to implement that in a couple of hours. I only ate up about 200 of my 10K queries haha.

## The Final Outcome

Now I have search on my site that updates when I publish new content (or even change content). I very much over-engineered
it, driven by my want to be lazy. Maybe I should rethink that in the future 🤔?!?!

Like I mentioned before, I used [this blog](https://route360.dev/post/astro-algolia) a lot at the start, but then moved
to Autocomplete.

If you want to check out my code, here it is:

-   [Node.js Script to Build + Publish Search Indexes](https://github.com/vernak2539/words-byvernacchia/blob/main/bin/build-search.js)
-   [Search Components (UI)](https://github.com/vernak2539/words-byvernacchia/tree/main/src/components/Search)
