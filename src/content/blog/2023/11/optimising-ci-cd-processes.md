---
title: "Optimising CI/CD Processes"
description: "Optimising  CI/CD processes you say?? So, what?!"
tags:
    [
        "continuous integration",
        "continuous deployment",
        "circleci",
        "deliveroo",
        "optimisation"
    ]
pubDate: "2023-11-29" 
---

1. intro (deliveroo specific, but will translate)
2. optimisations
   3. common, shared steps
   4. caching (workspaces)
      5. node modules
      6. next build
   7. docker + docker layer caching
   8. parallelisation (jest + cirlce utils to split)
   9. Hopper (deliveroo) 
3. conclusion (local testing, removing faff, etc.)

_I'll be talking about some Deliveroo-specific things in this post. When I do, I'll be sure to provide as much context as possible._

I recently moved to a new team at Deliveroo. To get up to speed faster, I started contributing as much as possible to 
one of primary codebases used in the area. Getting down and dirty is the best form of learning, right?

Right off the bat, I noticed that there were extremely long feedback loops when implementing changes. In order to release
a change to production, we have to do the following:

1. Develop and test change locally
2. Run the CI/CD process (most of it) against the feature branch _(~17 minutes)_
3. Deployed to the staging environment
   * CI/CD _(~23 minutes)_
   * Deployment _(~6 minutes)_
4. Test in staging
5. Deployed to the production environment
   * CI/CD _(~23 minutes)_
   * Deployment _(~6 minutes)_
6. Test in production

I've put the durations of each step (p95) above. If we exclude initial development and testing, if everything went 
perfectly (does it ever?!), it would take a minimum of ~75 minutes.

DAMNNNNN, that's a long time, huh?!?!

But, does the time it takes to get things to production really matter? Well, yes, but is it the right thing we should
be measuring (outside of incidents)?

I would say no. IMO (which is opinionated), we should be measuring the time it takes a team to deliver value to customers.
Or, to put it in a more simple way, how long does it take to get a change to production, from the moment work begins to
the moment customer start using it?

For those of you following along, you may know where I'm going next.

Mean [Lead Time for Changes](https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance), 
a [DORA](https://dora.dev/) metric, is a great metric to track, and the one I'm going to focus on in this post. Disagree
with me in the comments (or don't, up to you).

At Deliveroo, our deployment system, Hopper, tracks this automagically for us, which is amazing.

Before I started the work I describe in this post, we had quite a large Daily Median Lead Time to Change (can't really
say the actual number...). After these optimisations were implemented, we saw a 50% reduction.

Now, I'm not saying that all of that reduction is attributed to these optimisations, but I know they helped, both from
my personal experiences and my team's.

Let's get into it!

## Optimisations

### Identifying Common Steps

### Caching

5. node modules
6. next build

### Docker (and layer caching)

### Test Parallelization

#### Jest

#### Cypress

### Hopper Configuration Upgrade

Hopper is the deployment software we use at Deliveroo. It deploys our services and Lambdas to AWS.

The team responsible for Hopper recently released a v2 Configuration. The service in question was not using this new
configuration. 

After upgrading to v2, we saw our deployments go from between 6-11 minutes to less than 5 minutes consistently.

Lesson here?! It always pays to stay up to date.

## Wrapping It Up



