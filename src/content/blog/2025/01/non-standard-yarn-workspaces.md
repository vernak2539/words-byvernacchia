---
title: "Non-standard Yarn Workspaces"
description: "My learnings using Yarn Workspaces with a non-standard setup..."
pubDate: "2025-01-15"
tags: ["yarn", "yarn workspaces", "package managers", "frontend"]
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

This repository includes many different languages like TypeScript, Go, Kotlin, and Swift. It also includes packages
that integrate into Figma (yes, we've thought about our designers too).

Additionally, code is colocated by functionality rather than by platform. This means Go struct generation is in one
place, renderers in another, and so on. I really have no problem with this, and I agree with the decision (for the most part 😉).

## Trying to Contribute

So I decided to dive in and get involved. How hard could it be to update the TypeScript version? Turns out... _difficult/fun_ 😅

As a good steward, I not only wanted to update the TS version of the thing I was working on, but also the version
used by other packages. I quickly found out the repository had five different places where TS was used and usages of **both**
npm and yarn for package management (2 yarn vs 3 npm). And so the fun began.

I ended standardising on Yarn across all the packages, utilising Yarn Workspaces to manage the dependencies. This was a
good move, but I hesitated at first and ran into challenges in the process.

In the end it all worked out, and we're in a much better place! 🎉

Let's discuss!

## The Good (about Yarn Workspaces)

### Dependency Management

Yarn Workspaces makes dependency management across packages easy, allowing for top-level dependencies and package
specific dependencies... enough said.

### Flexibility

When you go to the [Yarn Workspaces](https://yarnpkg.com/features/workspaces) docs, they give an example with a directory structure such as:

```json
{
  "workspaces": ["packages/*"]
}
```

I've been on this page a lot of times prior to this implementation and always thought to myself, "hmmm, I guess everything
needs to be in a 'packages' folder." Other repositories at work also use this Yarn Workspaces convention/structure.

Since we have a non-standard setup it took me a moment to remove my previous assumptions and realise that workspaces/packages
don't have to live in a singular folder.

In the end, with code being colocated by functionality rather than platform, our configuration looked like this:

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

### Useful command/functionality

Yarn Workspaces comes with super useful commands. I liked the ones that helped me initiate commands without having to
traverse into an individual workspace/package. These included:

1. `yarn workspaces focus <package>` ([docs](https://yarnpkg.com/cli/workspaces/focus))
   - This allows you to install dependencies for a specific package, as if others didn't exist, while still taking into account top-level dependencies 🙌
   - **Learning**: This was super helpful when only needing to execute certain tasks for certain packages during CI/CD processes
2. `yarn workspaces foreach <commandName>` ([docs](https://yarnpkg.com/cli/workspaces/foreach))
   - This allows you to run a command in each workspace (usually in parallel)
   - There's a lot of options/flags to add to this, which help with running tasks in the right order when packages depend on each other
   - **Learning**: This is super helpful when you want to simply and easily execute tasks across all or some packages (duhh)
   - **Note**: `yarn workspace <workspaceName> <commandName> ...` ([docs](https://yarnpkg.com/cli/workspace)) is the singular version of this command for an individual workspace!
3. `yarn workspaces list` ([docs](https://yarnpkg.com/cli/workspaces/list))
   - Naming is hard, and when using commands in #1 and #2 it's easy to forget the names of your packages, especially if they don't adhere to the directory name (sometimes there's nothing you can do 🤷)

Now that I look at what I've written, I seem to have listed all the workspaces commands haha.

## The Bad

We took some learnings from the implementation, which I think are worth sharing.

### `yarn.lock` files in packages

The packages that already have a `yarn.lock` file present caused issues. It took me a while to figure out what was
going on, as sometimes it would work, then after a revert/clean, it wouldn't.

Yarn Workspaces seems to use a singular, top-level `yarn.lock` file to manage dependencies ([github.com/yarnpkg/yarn#5428](https://github.com/yarnpkg/yarn/issues/5428)),
so having a lockfile in the workspace/package caused it to go haywire.

**Learning**: Remove `yarn.lock` files from individual package directories.

### Using top-level dependencies

Our initial use case was to use the same version of TypeScript across all packages. Additionally, we wanted to use the
`tsc` cli tool provided by TypeScript.

After migrating to Yarn Workspaces and moving TypeScript to be a top-level dependency, we ran the current build command (`tsc`). And....
it didn't work.

After some racking my brain and checking what I did elsewhere years ago, I finally found it. To run a script/binary using
a top-level dependency, one has to use the `-T` flag. See the small differences in the command below:

```diff
- "build": "tsc",
+ "build": "run -T tsc",
```

Subtle, but different.

**Learning**: If hoisting a dependency to the top-level, if it's needed inside a package, use the `run -T` command and flag.

### Incremental Delivery (partial usage of hoisted dependencies)

We wanted to adopt top-level dependencies incrementally, starting with TypeScript and then move to things like ESLint and Jest.

In theory, this is good practice (in the wider world as well). In practice, it caused us more headaches than it was worth.

These headaches were specifically related to ESLint and how ESLint's plugin system works. Long story short, because of
how plugins are loaded by ESLint, without hoisting the all ESLint configuration and dependencies at once, we ran into
problems/errors.

In the end we migrated ESLint to be a top-level dependency and had all packages use it and the same configuration.

**Learning**: Sometimes incremental delivery isn't possible (try not to waste too much time if the situation doesn't warrant it).

## The Ugly

There was nothing ugly... I just wanted to use the title 😅
