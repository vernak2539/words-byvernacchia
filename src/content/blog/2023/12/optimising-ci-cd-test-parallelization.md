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
pubDate: "2023-12-07"
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

CircleCI allows for multiple build agents by adding a [`parallelism: XXX` configuration option][circle-parallel]
to your job. You can then update your testing step to be something along the lines of:

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

We use [Cypress](https://www.cypress.io/) for our end-to-end tests. It's a great tool, but it can be slow to run tests
(even using the latest version of Cypress on Node.js v20).

Thus, I went searching for ways to run Cypress tests in parallel, just like our Jest unit tests.

The first thing I found is their paid product, [Cypress Cloud](https://www.cypress.io/cloud). It offers exactly what I
want, parallelization (and optimisation of said parallelization).

But, I'm not in a position to onboard a new third party for my company, so I had to look elsewhere.

After a bunch of digging, I found a simple way to do it!

First, we have to [enable `parallelism: XXX` in our CircleCI job][circle-parallel] (like our Jest unit tests).

Next, we have to find a way to divide our tests into groups. CircleCI makes this super simple using their command line
tool (it took me a while to find this actually).

```shell
TESTS=$(circleci tests glob "cypress/e2e/**/*.cy.ts" | circleci tests split | paste -sd ',')

# npm e2e="cypress run"
npm run e2e -- --spec "$TESTS"
```

Let's break it down.

First, we run:

```shell
circleci tests glob "cypress/e2e/**/*.cy.ts"
```

This generates a full list of our tests based on the glob, like below:

```
cypress/e2e/analytics/Home.cy.ts
cypress/e2e/analytics/ViewMetrics.cy.ts
cypress/e2e/deliveryAreas/FleetSwitching.cy.ts
cypress/e2e/deliveryAreas/ViewAreasAndFees.cy.ts
cypress/e2e/liveOrders/FleetSwitching.cy.ts
cypress/e2e/liveOrders/OrderNotification.cy.ts
cypress/e2e/marketer/CancelOffer.cy.ts
cypress/e2e/marketer/CreateOfferBasket.cy.ts
cypress/e2e/marketer/CreateOfferFlashDeal.cy.ts
cypress/e2e/marketer/CreateOfferItem.cy.ts
cypress/e2e/marketer/CreateOneOffCampaign.cy.ts
cypress/e2e/marketer/CreateOverlappingOffer.cy.ts
cypress/e2e/marketer/CreateWeeklyCampaign.cy.ts
cypress/e2e/marketer/Home.cy.ts
cypress/e2e/marketer/ViewOffer.cy.ts
cypress/e2e/reportingPlatform/CreateReport.cy.ts
cypress/e2e/reportingPlatform/CreateScheduledReport.cy.ts
cypress/e2e/sales/Refunds.cy.ts
```

Then, we pipe that response into the `circleci tests split` command, which will split the tests into groups based on the
number of build agents we've defined.

```
cypress/e2e/analytics/Home.cy.ts
cypress/e2e/deliveryAreas/ViewAreasAndFees.cy.ts
cypress/e2e/marketer/CancelOffer.cy.ts
cypress/e2e/marketer/CreateOfferItem.cy.ts
cypress/e2e/marketer/CreateWeeklyCampaign.cy.ts
cypress/e2e/reportingPlatform/CreateReport.cy.ts
```

Finally, the response is piped to the `paste -sd ','` command, which will join the tests together with a comma.

```
cypress/e2e/analytics/Home.cy.ts,cypress/e2e/deliveryAreas/ViewAreasAndFees.cy.ts,cypress/e2e/marketer/CancelOffer.cy.ts,cypress/e2e/marketer/CreateOfferItem.cy.ts,cypress/e2e/marketer/CreateWeeklyCampaign.cy.ts,cypress/e2e/reportingPlatform/CreateReport.cy.ts
```

This is then used by our Cypress command to run only a subset of tests.

#### A cheeky optimization

CircleCI has a bit of a cheeky optimisation that can be used here, which will help us shave off some time by optimising
how the tests are split. We'd need to update our command like below:

```diff
- circleci tests glob "cypress/e2e/**/*.cy.ts" | circleci tests split | paste -sd ','
+ circleci tests glob "cypress/e2e/**/*.cy.ts" | circleci tests split --split-by=timings | paste -sd ','
```

Here, I use the [`--split-by`](https://circleci.com/docs/parallelism-faster-jobs/#the-tests-run-command) argument
with a value of `timings`.

**Note:** You need to have the [JUnit reporter](https://docs.cypress.io/guides/tooling/reporters) enabled for this to
work, as that is what provides the necessary timing information to CircleCI.

This is actually really cool! Since CircleCI consumes your testing framework's JUnit report, it knows how long it takes
to run individual tests.

This means that when it splits them into groups for parallellization, it can do so in a way
that optimizes for the fastest execution time.

For example, we have two build agents and four tests to run across them.

```
Test 1: 30 sec
Test 2: 35 sec
Test 3: 1 min
Test 4: 55 sec
```

**Without** the `--split-by=timings` argument, the tests could be split in any fashion. This means we could end up with one
build agent taking `1m55s` to complete, while the other takes `55s`.

**With** the `--split-by=timings` argument, the tests will be split into groups that take the same approximate time. In
this case, we'd usually get tests split so both build agents would run tests for `1m30s`.

I absolutely love this, and I definitely wouldn't have thought about this myself!

## Local Testing

All things related to testing, linting, building images, and any other steps in your Build Pipeline should be first class
citizen in your local development environment.

To put it more bluntly, doing all these things in your local environment is essential. CI/CD should not be used as
substitute for local testing, which I've seen many times before.

Be sure to have a look at the other posts (links at the top) in this series about optimising CI/CD processes!

[jest]: https://jestjs.io/
[circle-parallel]: https://circleci.com/docs/parallelism-faster-jobs/
