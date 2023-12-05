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

Hopper is the deployment software we use at Deliveroo. It deploys our services and Lambdas to AWS.

The team responsible for Hopper recently released a v2 Configuration. The service in question was not using this new
configuration.

After upgrading to v2, we saw our deployments go from between 6-11 minutes to less than 5 minutes consistently.

Lesson here?! It always pays to stay up to date.
