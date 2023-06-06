---
title: "Google Workspace Zoom Default - Extended"
description: 'A "new" extension with custom zoom levels...'
tags:
    [
        "chrome extension",
        "plasmo",
        "google docs",
        "google sheets",
        "google workspace",
        "react",
    ]
pubDate: "2023-06-08"
---

Following on from my blog post where I explore [_"Simulating" JS Events_](../04/simulating-js-events.mdx), I finally did
the work to implement custom zoom levels in Chrome Extension, [_Google Workspace Zoom Default_][webstore].

But, I actually didn't do it in my existing extension. Why, you might ask?

Well, in order to use the [`chrome.debugger` API](https://developer.chrome.com/docs/extensions/reference/debugger/), I
have to request elevated permissions. If I were to do this in my existing extension, all users would have to explicitly
accept the new permissions I've requested.

This gives the users the following options:

1. Open the extension and re-enable it, accepting new permissions
2. Open the extension and actively choose _not_ to re-enable it due to new permissions
3. Not notice the extension has stopped working and it stays disabled

In my opinion, #2 and #3 are the most likely situation. Obviously, these are the worst possible outcomes for the people using
my extension, and I want to enable as many people as possible to use the functionality I provide.

Based on this, I introduce the [_Google Workspace Zoom Default - Extended_][webstore-extended] extension. This extension
includes all the functionality of the regular extension **but also allows for custom zoom values.**

I've updated my Youtube video to demostrate the new functionality (you'll have to scroll to the end).

<div class="youtubeWrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/WYmmMaQXE7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Past Context

I've written about my building of this/these Chrome Extensions previously! Feel free to have a look to get some context
if you want!

1. [My First Chrome Extension](../02/my-first-chrome-extension.md)
2. [Introducing Google Workspace Zoom Default](../03/introducing-google-workspace-zoom-default.md)

You can see all the code on [Github][github] for the sake of transparency.

[webstore]: https://chrome.google.com/webstore/detail/google-docs-zoom-default/nflkcdlimipkgbacnfnhfecjgmojhklo
[webstore-extended]: https://chrome.google.com/webstore/detail/google-workspace-zoom-def/mdgikencgfhineaememjagpkiclbdkka
[github]: https://github.com/vernak2539/chrome-extension-google-doc-default-zoom
