---
title: "Optimising CI/CD Processes - Identifying Common Steps"
description: "What?!?! We can reuse stuff??"
tags:
    [
        "continuous integration",
        "continuous deployment",
        "circleci",
        "deliveroo",
        "optimisation",
    ]
pubDate: "2023-12-03"
---

ℹ️ **_This is a multipart series exploring CI/CD optimisations_** ℹ️

1. [Intro!](./optimising-ci-cd-processes.md)
2. Identifying Common Steps
3. [Caching + Docker (and layer caching)](./optimising-ci-cd-caching.md)
4. [Test Parallelization](./optimising-ci-cd-test-parallelization.md)
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

## Identifying common steps

Ask yourself, _"are there any steps that are common across multiple jobs?"_ or _"is does my build pipeline have multiple
jobs that have similar steps?"_.

If you answered, _"Yes,"_ you can have a go at extracting them into a single job, which can then be used by other jobs.

Let's look at a concrete example.

We have two jobs, **test** and **build**. Both of these jobs require the same dependencies to be installed, thus they
both have an "Install Dependencies" step.

```mermaid
flowchart LR
    id1([Install Dependencies]) --> id2(["Run Tests"])
```

```mermaid
flowchart LR
    id1([Install Dependencies]) --> id2(["Build App"])
```

The "Install Dependencies" step is common to both. It's a prime candidate to be extracted to its own job!

In the newly extracted job, we can install the dependencies and save them as an artifact, allowing for other jobs in the
Build Pipeline to use them! I'll talk more about this in the [caching post](./optimising-ci-cd-caching.md).

Once we've extracted the job our Build Pipeline would look something like this:

```mermaid
flowchart LR
    id1([Install Dependencies]) --> id2(["Run Tests"]) & id3(["Build App"])
```

This helps in many ways.

First, we will cut down on wasted time, and likely money, by not doing the exact same thing twice in two different
places.

Second, it introduces consistency. While we should be installing the exact same dependencies everywhere (based on our
lockfile), sometimes this may not be the case.

By installing dependencies in one place and reusing them, we can ensure the dependencies are used for building, testing,
linting, and running our application.

Be sure to have a look at the other posts (links at the top) in this series about optimising CI/CD processes!
