---
title: "View-only Default Zoom"
description: "Let's talk about view-only permissions in Google Workspace..."
tags:
    [
        "chrome extension",
        "plasmo",
        "google docs",
        "google sheets",
        "google workspace",
        "react",
    ]
pubDate: "2023-08-08"
---

One of the long-standing pieces of functionality I've wanted to implement in the "Google Workspace Zoom Default" extension
([web store][webstore], [web store Extended][webstore-extended]) is the ability to use it in view-only documents.

Finally, I've submitted a new version to the web store (`0.6.0`), which should be rolling out quite soon (pending an approval)!

## The Problems

Docs is the only Workspace application where the default implementation doesn't work when the viewer has view-only permissions.
This is because there is no select element shown to enable changing the zoom value.

Instead, a user has to:

1. Click into the "View" tab in the menu bar
2. Click/hover over the zoom option
3. Click the desired zoom value

It's all good clicking the "View" tab in the menu bar as it has an ID on the HTML element. But, this is where it starts
to get a bit more wonky.

After clicking the tab, a dropdown appears. There is no indication of what dropdown applies to what tab, like there is
elsewhere (it's essentially what allowed me to create the main functionality). 

The same situation that happens when you hover or click the zoom option. It shows another dropdown with no indication
to what it relates.

To address this lacking linkage, I have to locate the dropdowns in the least optimal way: by identifying text in an ARIA 
attribute. There are so many problems with this approach, I don't even know where to begin. But, here we are, playing 
with the hand we were dealt by the Google team.

## It's Experimental

Given the problems outlined above, I didn't feel confident enough to release this as a default feature. Instead, I've put
it behind an experimental flag. This means that it's disabled by default, and users have to enable it in the options page.

This approach gives me a bit more freedom to experiment with the implementation in the future while allowing users to 
disable it if it doesn't work for them.

## Extras

I also did some extra work, which was nice, to revamp how I use Sentry. I ended up separating Sentry usage into two projects,
one for each extension. This will help me troubleshoot errors much better!

## Past Context

I've written about building these Chrome Extensions previously! Feel free to have a look to get some context if you want!

1. [My First Chrome Extension](../02/my-first-chrome-extension.md)
2. [Introducing Google Workspace Zoom Default](../03/introducing-google-workspace-zoom-default.md)
3. [Google Workspace Zoom Default - Extended](../06/google-workspace-zoom-default-extended.md)

As always, you can see all the code on [Github][github] for the sake of transparency.

[webstore]: https://chrome.google.com/webstore/detail/google-docs-zoom-default/nflkcdlimipkgbacnfnhfecjgmojhklo
[webstore-extended]: https://chrome.google.com/webstore/detail/google-workspace-zoom-def/mdgikencgfhineaememjagpkiclbdkka
[github]: https://github.com/vernak2539/chrome-extension-google-doc-default-zoom
