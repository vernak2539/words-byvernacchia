---
title: "Non-standard Yarn Workspaces"
description: "My learnings using Yarn Workspaces with a non-standard setup..."
pubDate: "2025-01-15"
tags: ["yarn", "package managers", "frontend"]
---

[Deliveroo](https://deliveroo.co.uk) ships customer functionality across Web, Android, and iOS. While this may sound simple
to the uninitiated, it's actually quite difficult. We aim for/to:

1. Feature parity across all platforms
2. Delivery of features across platforms should be low effort (i.e. low effort to deliver to all platforms, not the feature itself)
3. Delivery at pace
4. Resolve incidents quickly

To help achieve these goals, one of the many things we're doing is investing heavily in a server-driven UI approach.

This allows us to:

1. Control what users see via the API (or don't see via feature flags)
2. Deliver features to all platforms at the same time
3. Minimise the "time to live" on Apps (e.g. app releases take a long time, and you can have problems with reviews)

This post won't focus on the approach we're taking, but rather the single repository in which we house all our code.

## The Repository (more context)

This repository includes languages like TypeScript, Go, Kotlin, and Swift. It also includes packages that integrate into Figma
(yes, we've thought about our designers too). This means we have a lot of different types of code in one repository.

Additionally, code is colocated by functionality rather than by platform. This means Go struct generation is in one
place, renderers in another, and so on. I really have no problem with this, and I agree with the decision (for the most part 😉).

So I decided to dive in and get involved. How hard could it be to update the TypeScript version? Turns out... it was so
much fun 😅

As a good steward, I not only wanted to update the TS version of the thing I was working on, but also the version
used by other packages. I quickly found out the repository had five different places TS was used, with usages of npm and yarn
for package management in different packages (2 yarn vs 3 npm). Ugggghhh. And so the fun began.

I ended standardising on Yarn across all the packages, utilising Yarn Workspaces to manage the dependencies. This was a
good move, but I hesitated and ran into challenges in the process. Let's discuss!

In the end it all worked out, and we're in a much better place! 🎉

## My Learnings

### Flexibility

When you go to the [Yarn Workspaces](https://yarnpkg.com/features/workspaces) docs, they give an example with a directory structure such as:

```json
{
  "workspaces": ["packages/*"]
}
```

I've been on this page a lot of times prior to this implementation and always thought to myself, "hmmm, I guess everything
needs to be in a 'packages' folder." Additionally, our other repositories at work that use Yarn Workspaces conform to
this structure.

Since we have a non-standard setup it took me a moment to remove my previous assumptions and realise that workspaces
didn't have to live in a singular folder. With code being colocated by functionality rather than platform, we ended up
with a structure like:

```json
{
  "workspaces": [
    "docs",
    "lang/typescript/figma-plugin",
    "lang/typescript/codegen",
    "renderers/web"
  ]
}
```

Remember to exercise your mind and think different. I swear someone said that somewhere 🤔

### Learnings (the bad)

We took some learnings from the implementation, which I think are worth sharing.

#### yarn.lock files in packages

The packages that already have a `yarn.lock` file in them caused some issues. It took me a while to figure out what was
going on, as sometimes it would work, then after a revert/clean, it wouldn't.

I finally tracked it down to a `yarn.lock` file being present in the package directory. Yarn Workspaces seems to use a singular
top-level `yarn.lock` file to manage dependencies ([github.com/yarnpkg/yarn#5428](https://github.com/yarnpkg/yarn/issues/5428)),
so having another lockfile in the directory caused it to go haywire.

**Learning**: Remove `yarn.lock` files from individual package directories.

#### Running top-level dependencies

Our initial use case was to use the same version of TypeScript across all packages. Additionally, we wanted to use the
`tsc` cli tool provided by TypeScript.

After migrating to Yarn Workspaces and moving TypeScript to the top-level, we ran the current build command (`tsc`). And....
it didn't work.

After some racking my brain and checking what I did elsewhere years ago, I finally found it. To run a script/binary using
a top-level dependency, one has to use the `-T` flag. See the small differences in the command below:

```diff
- "build": "tsc",
+ "build": "run -T tsc",
```

Subtle, but different.

**Learning**: If hoisting a dependency to the top-level, if it's needed inside a package, use the `run -T` command and flag.

#### Partial hoisting

We wanted to implement Yarn Workspaces incrementally, specifically the hoisting of dependencies to the top-leve. We
planned to start with TypeScript, then move to things like ESLint and Jest.

In theory, this was good. In practice, this caused us more headaches than it was worth. These headaches were specifically
related to ESLint and how ESLint's plugin system works.

Long story short, because of how plugins are loaded by ESLint, without hoisting the all ESLint configuration and dependencies,
we ran into problems/errors.

To fix this, we ended up migrating ESLint to a top-level dependency and migrating all packages to use the same config and ESLint version.

**Learning**: Sometimes incremental delivery isn't possible (try not to waste too much time if the situation doesn't warrant it).

### Learnings (cool things)

focus on workspace
docker fun...
