---
title: "Snapshot Testing Sucks"
description: "Stop, just stop..."
pubDate: "2024-04-01"
tags:
    [
        "frontend",
        "javascript",
        "typescript",
        "react",
        "enzyme",
        "react testing library",
    ]
---

I remember a time when jQuery was _the framework_ and WordPress was almighty.

Eventually, [Backbone.js](https://backbonejs.org/) and [Angular](https://angularjs.org/) became the big players on the block. [Knockout.js](https://knockoutjs.com/) had just made it onto the scene. React was still only being used internally at Facebook. RequireJS was a cause of many headaches.

If you wrote tests, you used [Mocha](https://mochajs.org/). [Karma](https://karma-runner.github.io/latest/index.html) came along and made it _"easy"_ to run tests in an actual browser.

Have I shown my age enough yet??

But, React hit the scene and [Enzyme](https://enzymejs.github.io/enzyme/) emerged as the default testing framework. It allowed you to test components pretty easily. Tbh, I'm not sure what else I would've used to
test React components back then. It was great, but it definitely was a [footgun](https://en.wiktionary.org/wiki/footgun) if left unchecked.

I've recently removed Enzyme from multiple, highly used codebases at my work (replacing it with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)). I've seen it all, it's mostly bad.

I'll write more about the other bad things in another post, but this post will focus on the bane of my existance, [Snapshot Testing](https://jestjs.io/docs/snapshot-testing), which, IMO, Enzyme proliferated with its `enzyme-to-json` serialiser.

## What is Snapshot Testing?

After talking to iOS/Android engineers, I realise Snapshot Testing has multiple meanings. So, let's define Snapshot Testing.

When I say "Snapshot Testing," I'm referring to the practice of rendering a component, saving its output (i.e. the HTML/Enzyme structure), and comparing it to a previous version of that rendered output (i.e. "snapshot"). If the snapshots are different, the test fails.

I'm **NOT** talking about visual regression testing, which is what I've heard iOS/Android engineers define as their "Snapshot Testing."

## Why Snapshot Testing sucks

### The implicit nature of the tests

Snapshot Testing is implicit. If you're not the original author, it's extremely difficult to know what they were thinking when writing the test. Like, what were they actually testing? What's important? What does "render correctly" (the title of a lot of tests) mean?

IMO, extremely explicit test are soooo much better. You should be testing that the correct content is rendered and the interactions are what you'd expect.

When you're explicit, it lets others who come across your code in the future know what's important. Essentially, it's a form of documentation.

I know snapshot do have the "content" when rendered, but it's really lazy... Again, it's about what content is important.

### Is the visual output actually the same after your change?

Snapshot Testing only tests the output of the component's HTML structure. It doesn't test the visual output.

I can change the CSS, which will change the visual output. Yet, the test will still pass because the structure is the same.

Is that a good test? I don't think so.

### Nobody looks at the changes...

In my experience, nobody actually looks at the snapshot diffs before they update their tests. There's either too many changes or we "know" our new changes are "what it should be."

It's like the snapshot/test was written for the first, and only the first, iteration of the component.

This is the typical process I've observed:

1. Make the changes to the component
2. Assume whatever output is correct
3. Update the snapshot

This is just lazy. Something could be missed if you do this.

But, I understand why it happens. I've been guilty of this I hate to admit. It's done because most are not the original author of the code. They lack context. So, they make changes, test them somehow, and then update the snapshot.

This begs the question, "why even have the snapshot test in the first place?"

### Updating common components... sucks

Let's take a moment to imagine something.

First, you have nine teams (30+ people) working on a single codebase. They each own their individual areas of the codebase. The way CODEOWNERS has been set up requires approvals by each team when their files are changed.

Second, common components (think something like a design system) are used across the codebase.

When a common component is updated all the snapshots across the codebase need to be updated. Now you need to get sign-off from the all teams. In my experience, it takes a long time and can result in a lot of merge conflicts if not done quickly.

## /endrant

Snapshot Testing was cool at the start, especially when working on small projects. But, as the project grows, it becomes a burden and, IMO, encourages bad practices.

So, I beg you, please don't use Snapshot Testing and remove it from your codebase if you can. You'll be better off (insert plug for [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)).

But, hey, what do I know? I'm just some random guy on the interwebs...
