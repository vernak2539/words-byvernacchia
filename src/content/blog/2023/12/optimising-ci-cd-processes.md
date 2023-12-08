---
title: "Optimising CI/CD Processes - The Beginning"
description: "Optimising  CI/CD processes you say?? So, what?!"
tags:
    [
        "continuous integration",
        "continuous deployment",
        "circleci",
        "deliveroo",
        "optimisation",
    ]
pubDate: "2023-12-08"
---

ℹ️ **_This is a multipart series exploring CI/CD optimisations_** ℹ️

1. Intro!
2. [Identifying Common Steps](./optimising-ci-cd-identifying-common-steps.md)
3. [Caching + Docker (and layer caching)](./optimising-ci-cd-caching.md)
4. [Test Parallelization](./optimising-ci-cd-test-parallelization.md)
5. [Hopper Configuration Upgrade (Deliveroo-specific)](./optimising-ci-cd-hopper-upgrades.md)

_I'll be talking about some Deliveroo-specific things in this series. When I do, I'll be sure to provide as much context as possible._

I recently moved to a new team at Deliveroo. I started contributing as much as possible to one of primary codebases used
in the area to get up to speed more quickly. Getting down and dirty is the best form of learning, right?

From the beginning, I noticed there were extremely long feedback loops when implementing changes. In order to release
a change to production, we have to:

1. Develop and test change locally
2. Run a subset of the CI/CD process (no deployments) against the feature branch **_(~17 minutes)_**
3. Deployed to the staging environment
    - CI/CD **_(~23 minutes)_**
    - Deployment **_(~6 minutes)_**
4. Test in staging
5. Deployed to the production environment
    - CI/CD **_(~23 minutes)_**
    - Deployment **_(~6 minutes)_**
6. Test in production

I've put the durations of each step (p95) above. Excluding development and manual testing, if everything went perfectly
(does it ever?!), the whole process would take a **minimum of ~75 minutes**.

DAMNNNNN, that's a long time, huh?!?!

But, this begs the question, is the CI/CD time the right thing to be measuring?

I would say no. IMO (which is opinionated), we should be measuring the time it takes a team to deliver value to customers.
To put it more simply, how long does it take to get a change to production, from the moment work begins to
the moment customer start using it?

For those of you following along, you may know where I'm going next.

[Lead Time for Changes](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance),
a [DORA](https://dora.dev/) metric, is a great metric to track, and the one I'm going to focus on in this post. Disagree
with me in the comments (or don't, up to you).

Lead Time for Changes encompasses much more than just CI/CD (again IMO). For example, how long it takes for a commit to
get into production also depends on our interactions with Product Manager/Owners, Designers, other engineers (via
reviews), etc.

At Deliveroo our deployment system, Hopper, tracks this automagically for us, which is amazing.

Before I started the work I describe in this post, we had quite a high Lead Time to Change (can't really say the actual
number...).

After these optimisations were implemented, we saw around a 50% reduction. More can be done to reduce this number outside
the CI/CD process.

Please note, I'm not saying that all the reduction is attributed to these optimisations, but after gathering qualitative
feedback from myself (so unbiased) and the teams I work with, I can say they were definitely helpful!

## Let's get on the same page!

A few things before we get started.

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

## Go learn!

1. [Identifying Common Steps](./optimising-ci-cd-identifying-common-steps.md)
2. [Caching + Docker (and layer caching)](./optimising-ci-cd-caching.md)
3. [Test Parallelization](./optimising-ci-cd-test-parallelization.md)
4. [Hopper Configuration Upgrade (Deliveroo-specific)](./optimising-ci-cd-hopper-upgrades.md)
