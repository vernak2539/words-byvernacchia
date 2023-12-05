---
title: "Optimising CI/CD Processes - Hopper Configuration Upgrade"
description: "Staying current is always a good idea!"
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

**_This is a multipart series exploring CI/CD optimisations_**

1. [Intro!](./optimising-ci-cd-processes.md)
2. [Identifying Common Steps](./optimising-ci-cd-identifying-common-steps.md)
3. [Caching + Docker (and layer caching)](./optimising-ci-cd-caching.md)
4. [Test Parallelization](./optimising-ci-cd-test-parallelization.md)
5. Hopper Configuration Upgrade (Deliveroo-specific)

## Hopper Configuration Upgrade

Hopper is the deployment software we use at Deliveroo. It deploys our services and Lambdas to AWS. It's really cool, tbh.
(but, I'm slightly biased).

The team responsible for Hopper recently released a v2 Configuration. There's a lot of things that come with it, but mostly
it's streamlining processes and providing additional configuration.

The service I was contributing to was, unfortunately, not using this new configuration.

After upgrading to v2 (which the team made super simple), we saw our deployments go from between 6-11 minutes to less
than 5 minutes consistently.

Lesson here?! It always pays to stay up to date.

Be sure to have a look at the other posts (links at the top) in this series about optimising CI/CD processes!
