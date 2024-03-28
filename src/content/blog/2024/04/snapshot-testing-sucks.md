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
test React components back then.

It was great, but it definitely was a [footgun](https://en.wiktionary.org/wiki/footgun) if left unchecked.

Recently, I worked to remove Enzyme from multiple, highly used codebases at my work (replacing it with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)). I've seen it all, it's mostly bad.

I'll write a bit more about all the other bad things in another post, but this post will focus on the bane of my existance, [Snapshot Testing](https://jestjs.io/docs/snapshot-testing), which, IMO, Enzyme proliferated.

## What is Snapshot Testing?

After talking to iOS/Android engineers, I've come to realise that Snapshot Testing has multiple meanings. So, let's define Snapshot Testing.

When I say "Snapshot Testing", I'm referring to the practice of taking a snapshot of a component and comparing it to a previous snapshot. If the snapshots are different, the test fails.

I'm **not** talking about testing image snapshots (i.e. visual regression testing), which is what I've heard iOS/Android engineers refer to as Snapshot Testing.

## Why Snapshot Testing sucks

### The implicit nature of the tests

Snapshot Testing is implicit. If you're not the original author, it's extremely difficult to know what they were thinking needed validation when writing the test.

IMO, it's better to be extremely explicit in your tests. If you're testing a component, you should be testing what is output on the screen. What the component does when you interact with it.

This lets others in the future know what the component is supposed to do, what's important. It's a form of documentation.

### Is the visual output actually the same after your change?

Snapshot Testing only tests the output of the component's HTML structure. It doesn't test the visual output.

I can change the CSS, which will change the visual output. Yet, the test will still pass because the structure is the same.

Is that a good test? I don't think so.

### Nobody looks at the changes...

Maybe it's just the places I've worked at, but nobody actually looks at the changes in the snapshots. It's like the snapshot/test was written for the first, and only the first, iteration of the component.

This is the typical process:

1. Make the changes to the component
2. Assume whatever output is correct
3. Update the snapshot

This is just lazy. Something could be missed if you do this.

But, I understand why it happens. They do it because they are not the original author of the code. They lack context. So, they make changes, test them visually, and then update the snapshot.

This begs the question, "why even have the snapshot test in the first place?"

### Updates to common components

Let's take a moment to imagine something.

You have nine teams (30+ people) working on a single codebase. They each own their individual areas of the codebase, requiring approvals when their files are changed. There are common components that are used across the codebase.

When a common component is updated, all the snapshots across the codebase need to be updated. Now you need to get sign-off from all nine of these teams. In my experience, it takes a long time and can result in a lot of merge conflicts if not done quickly.
