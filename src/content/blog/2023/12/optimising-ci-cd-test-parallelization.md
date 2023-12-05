---
title: "Optimising CI/CD Processes - Test Parallelization"
description: "Let's look at how running things in parallel can help"
tags:
    [
        "continuous integration",
        "continuous deployment",
        "circleci",
        "deliveroo",
        "optimisation",
        "testing",
        "javascript",
        "typescript",
    ]
pubDate: "2023-12-03"
---

ℹ️ **_This is a multipart series exploring CI/CD optimisations_** ℹ️

1. [Intro!](./optimising-ci-cd-processes.md)
2. [Identifying Common Steps](./optimising-ci-cd-identifying-common-steps.md)
3. [Caching + Docker (and layer caching)](./optimising-ci-cd-caching.md)
4. Test Parallelization
5. [Hopper Configuration Upgrade (Deliveroo-specific)](./optimising-ci-cd-hopper-upgrades.md)

## Let's get on the same page!

A few things before we get started (I know you may have already read this. If so, skip this section).

First, I'm going to talk very specifically here about JS/TS projects, but these ideas can be applied to all CI/CD
processes.

Second, I'm going to use [CircleCI](https://circleci.com/) as the CI/CD platform when talking through examples. These
concepts can likely apply to other CI/CD platforms.

Lastly, let's define some terms, so we're all on the same page:

-   **Step**: A step is a single unit of work in a CI/CD process
    -   For example, installing dependencies, setting up environment variables, initiating commands, etc.
-   **Job**: A collection of steps
    -   For example, running tests, linting code, building a Docker image, etc.
-   **Build Pipeline**: A collection of _jobs_ that represents all work

## Test Parallelization

Running tests is one of the things that takes a fair amount of time. It really depends on how many tests you have, where
and how they are executed, and what they are executed by.

So, when you can't update to things like [vitest](https://vitest.dev/) (which is fast, but won't solve all your problems)
we can try to execute tests in parallel.

### Jest

[Jest](https://jestjs.io/) is used quite a lot, and it's rare that you find anything else in established companies (maybe
Mocha if you're lucky 😉).

Jest, by default (correct me if I'm wrong), runs tests in parallel in single run mode:

> In single run mode, this defaults to the number of the cores available on your machine minus one for the main thread.

When watching for changes, it's slightly different:

> ...this defaults to half of the available cores on your machine to ensure Jest is unobtrusive and does not grind your
> machine to a halt.

And they even recommend to use a value of 50% when setting the max worker threads in environments where CPU cores vary
(i.e. CI/CD platforms)

> For environments with variable CPUs available, you can use percentage based configuration: --maxWorkers=50%

Cool, that's out the of way... But, this can only get you so far.

Jest also provides you the ability to shard your tests across different build agents using the [`--shard` flag](https://jestjs.io/docs/cli#--shard).

CircleCI allows for easy integration, only having to add a `parallelism: XXX` configuration option to your job. You can
then update your testing step to be something along the lines of:

```sh
# npm test="jest"
npm run test -- --shard=$(expr $CIRCLE_NODE_INDEX + 1)/$CIRCLE_NODE_TOTAL
```

This will divide the tests into the amount of sections you've defined in the `parallelism:` option and execute them
across the agents.

To make the extremely clear, let's use the following example. I've set up my CircleCI job with a `parallelism: 3`. I have
a test suite with 900 tests. CircleCI will then run 300 tests across each build agent in parallel.

You can see how this could cut execution time down!

### Cypress

TODOOOOOOO

Be sure to have a look at the other posts (links at the top) in this series about optimising CI/CD processes!
