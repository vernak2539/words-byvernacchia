---
title: "Optimising CI/CD Processes - Caching (all of it)"
description: "Hmmm, one of the hardest things in software engineering (other than naming things)"
tags:
    [
        "continuous integration",
        "continuous deployment",
        "circleci",
        "deliveroo",
        "optimisation",
        "caching",
        "docker",
    ]
pubDate: "2023-12-07"
---

ℹ️ **_This is a multipart series exploring CI/CD optimisations_** ℹ️

1. [Intro!](./optimising-ci-cd-processes.md)
2. [Identifying Common Steps](./optimising-ci-cd-identifying-common-steps.md)
3. Caching + Docker (and layer caching)
4. [Test Parallelization](./optimising-ci-cd-test-parallelization.md)
5. [Hopper Configuration Upgrade (Deliveroo-specific)](./optimising-ci-cd-hopper-upgrades.md)

## Let's get on the same page!

A few things before we get started (I know you may have already read this. If so, skip this section).

First, I'm going to talk very specifically here about JS/TS projects, but these ideas can be applied to all CI/CD
processes.

Second, I'm going to use [CircleCI](https://circleci.com/) as the CI/CD platform when talking through examples. These
concepts can likely apply to other CI/CD platforms.

Lastly, some definitions so we’re all on the same page:

- **Step**: A step is a single unit of work in a CI/CD process
    - For example, installing dependencies, setting up environment variables, initiating commands, etc.
- **Job**: A collection of steps
    - For example, running tests, linting code, building a Docker image, etc.
- **Build Pipeline**: A collection of _jobs_ that represents all work

## Caching

Our build pipeline is identical between code changes (unless explicitly changed).

This means we can, and should, try our best to reuse outputs from previous builds to speed up the next build.

You know where I'm going! I'm saying we should cache outputs of our build pipeline for later!

Some common examples in the frontend world include node modules and Next.js' build output (likely loads more).

CircleCI provides an easy way to configure cacahing for your build pipeline ([docs](https://circleci.com/docs/caching/#basic-example-of-dependency-caching)). The gist is:

```yaml
- restore_cache:
      name: Restore Next cache
      keys:
          # To force update the next cache, simply bump the value of the NEXTJS_CACHE_VERSION in CircleCI and re-run your build
          - nextjs-cache-v1.0-{{ .Environment.NEXTJS_CACHE_VERSION }}-{{ checksum "package-lock.json" }}-{{ checksum ".nvmrc" }}
- save_cache:
      name: Save Next cache
      # To force update the next cache, simply bump the value of the NEXTJS_CACHE_VERSION in CircleCI and re-run your build
      key: nextjs-cache-v1.0-{{ .Environment.NEXTJS_CACHE_VERSION }}-{{ checksum "package-lock.json" }}-{{ checksum ".nvmrc" }}
      paths:
          - ./.next/cache
```

IMO the most important part in the configuration above is the value for the `key` option. CircleCI uses this to determine if it can
reuse a previously generated cache or not.

You can see from the configuration above that I'm using dynamic values:

1. `{{ checksum "package-lock.json" }}` - Don't use the cache if dependencies have changed
2. `{{ checksum ".nvmrc" }}` - Don't use the cache if the version of Node.js has changed
3. `{{ .Environment.NEXTJS_CACHE_VERSION }}` - Don't use the cache if the CircleCI environment variable has been updated
    - This is really helpful if you want to cache bust without releasing code.

TL;DR - If the `key` is the same between build pipelines, then the cache will be loaded and reused, speeding up builds.

We use the [`circleci/node` orb](https://circleci.com/developer/orbs/orb/circleci/node) to cache our `node_modules` directory. The configuration looks like:

```yaml
install_deps: &install_deps
    steps:
        - checkout
        - node/install-packages:
              cache-version: node-modules-cache-v1.0-{{ .Environment.NODE_MODULES_CACHE_VERSION }}-{{ checksum "package-lock.json" }}-{{ checksum ".nvmrc" }}
              cache-path: ~/project/node_modules
              override-ci-command: "[ ! -d node_modules ] && npm ci --no-fund --no-audit || echo 'Using cached node_modules directory'"
              include-branch-in-cache-key: false
        - persist_to_workspace:
              root: .
              paths:
                  - node_modules
```

This reduced the installation time of node modules from ~4-5 minute to ~2 minutes consistently.

When the cache needs to be regenerated (i.e. new dependencies are installed, Node.js version updated, etc.), the build
pipeline will take more time. But, after the first time this is done, we go back to ~2 minutes.

Jobs that depend on this cache can then attach the workspace, not needing to install dependencies themselves!

## Docker (and layer caching)

CircleCI provides a paid feature called [Docker Layer Caching](https://circleci.com/docs/docker-layer-caching/).

Essentially, if you're using their [remote Docker environment](https://circleci.com/docs/building-docker-images/) to
build your Docker images, you can have benefits local layer caching in a remote environment.

I'm going to quickly break it down here.

When building a Docker image locally for the first time, all necessary steps are executed (i.e. fresh "build").

When you build the image a second time, Docker is smart enough to understand what has and hasn't changed between builds.

It will only execute the necessary "fresh" steps, using the cached outputs from previous builds when it can.

This is what you get in CircleCI.

For this reason, it's important to understand how Docker layer caching works at a fundamental level. Let's use the two configurations
below as examples.

**Config 1**

```dockerfile
FROM node:20.9.0-alpine
ENV NODE_ENV=production

# Copy the built app
COPY . .

# Only install production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Start app
CMD npm start
```

**Config 2**

```dockerfile
FROM node:20.9.0-alpine
ENV NODE_ENV=production

# Only install production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy the built app
COPY . .

# Start app
CMD npm start
```

**Config 1** uses a base Node.js image and:

1. Copies the application code
2. Installs the necessary dependencies
3. Creates the start command

**Config 2** uses a base Node.js image and:

1. Copies the `package.json` (and lockfile)
2. Installs the necessary dependencies
3. Copies the application code
4. Creates the start command

You're probably looking at these and asking, how do the slight differences in these configurations affect the outcome??
Or, you're a smart cookie and already know!

Thought about it?!?

Assuming you build a Docker image whenever application code changes, **Config 1** will never use layer caching when
installing dependencies, but **Config 2** will (if you've not added any new dependencies)!

Why?!?!

**Config 1** copies the application code before dependencies are installed. Because of this, the only way the layer
executing "`npm ci`" would be cached is if nothing in the application code changed. Since a Docker image is built when
application code changes, this will never happen.

**Config 2** installs dependencies prior to copying the application code, allowing Docker to use its cool caching!
If new dependencies are installed no caching will be used, rather Docker will run the command and output a cached layer
for the next build.

Pretty cool right?!!?

Be sure to have a look at the other posts (links at the top) in this series about optimising CI/CD processes!
