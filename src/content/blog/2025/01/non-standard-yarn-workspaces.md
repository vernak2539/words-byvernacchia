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

This repository includes languages like TypeScript, Go, Kotlin, and Swift. It also includes packages that integrate into Figma (
yes, we've thought about our designers too). This means we have a lot of different types of code in one repository.

Additionally, code is colocated by functionality rather than by platform. This means Go struct generation is in one
place, renderers in another, and so on. I really have no problem with this, and I agree with the decision (for the most part 😉).

So I decided to dive in and get involved. How hard could it be to update the TypeScript version. Turns out... it was so
much fun 😅

As a good steward, I not only wanted to update the TS version of the thing I was working on, but also the version
used by other packages. I quickly found out the repository had five different places TS was used, with usages of npm and yarn
for package management in different packages (2 yarn vs 3 npm). Ugggghhh. And so the fun began.

I ended standardising on Yarn across all the packages, utilising Yarn Workspaces to manage the dependencies. This was a
good move, but I hesitated and ran into challenges in the process. Let's discuss!

In the end it all worked out, and we're in a much better place! 🎉

## My Learnings

### Flexibility

doesn't have to conform

### The Transition

yarn.lock file in package messes everything up
run -T...
partial hoisting...

### Cool Things

focus on workspace
docker fun...
