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

## Test parallelization

Running tests is one of the things that usually takes a fair amount of time (at least in JS/TS projects).

The amount of time it takes to run tests depends on:

1. How many tests you have
2. What executes them
3. Where and how they are executed

This means it's important to write the right tests (maybe try TDD) and use a performant test framework.

Sometimes we unfortunately can't adhere to all of these. Or, we did, once upon a time, and we're now stuck.

For example, we are _"stuck"_ with [Jest][jest] and will not be updating to something like [vitest](https://vitest.dev/) (which is fast,
but won't solve all your problems).

This means we have to try other things to solve our slow running of tests. One of those being the execution of tests
in parallel.

### Jest

[Jest][jest] is used quite a lot across the industry, and it's rare that you find anything else in established companies
(maybe Mocha if you're lucky 😉).

Jest, by default, runs tests in parallel when using single run mode:

> In single run mode, this defaults to the number of the cores available on your machine minus one for the main thread.

When watching for changes, it's slightly different:

> ...this defaults to half of the available cores on your machine to ensure Jest is unobtrusive and does not grind your
> machine to a halt.

It's even recommend to use a max worker threads value of 50% in environments where CPU cores vary (i.e. CI/CD platforms):

> For environments with variable CPUs available, you can use percentage based configuration: --maxWorkers=50%

Cool, that's out the of way... But, this can only get you so far.

Jest also provides you the ability to shard your tests across different build agents using the [`--shard` flag](https://jestjs.io/docs/cli#--shard).

CircleCI allows for multiple build agents by adding a `parallelism: XXX` configuration option to your job. You can
then update your testing step to be something along the lines of:

```sh
# npm test="jest"
npm run test -- --shard=$(expr $CIRCLE_NODE_INDEX + 1)/$CIRCLE_NODE_TOTAL
```

This will divide the tests into groups and execute them across the agents.

To make the extremely clear, let's use the following example.

I've set up my CircleCI job with a `parallelism: 3`. I have a test suite with 900 tests. CircleCI will then run
300 tests across each build agent in parallel.

You can see how this could cut execution time down!

### Cypress

TODOOOOOOO

Be sure to have a look at the other posts (links at the top) in this series about optimising CI/CD processes!

## Local Testing

[jest]: https://jestjs.io/
