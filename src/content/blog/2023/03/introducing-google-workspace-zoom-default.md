---
title: "Introducing Google Workspace Zoom Default"
description: "I've added new functionality and changed the name..."
tags: ['chrome extension', 'plasmo', 'google docs', 'google sheets', 'google workspace', 'react']
pubDate: "2022-03-30"
---

I previously [talked about](/blog/my-first-chrome-extension) my experience building my first Chrome Extension, 
_Google Docs Zoom Default_.

Since then, I've been hard at work enabling the functionality for more Google Workspace Applications. Thus, I'm
introducing _[Google Workspace Zoom Default][webstore]_ (hopefully the Web Store listing updates prior to me publishing 
this).

This is a pretty big release as it enables the same "default zoom" functionality in Google Sheets. This means that this
Chrome Extension supports "default zoom" functionality in:

- Google Docs
- Google Sheets

Have a look at the functionality below!

<div class="youtubeWrapper">
    <iframe src="https://www.youtube.com/embed/ZbcpamEBEPU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## The Future

It took a bit of time to implement this functionality, but I can promise you it was well worth it. I took the time to:

- Set the base for other applications, such as Google Slides
- Set a strategy for docs where users have "view only" permissions
- Updated the extension's popup UI

Once again, [Plasmo](https://www.plasmo.com/) made it super easy to do these things.

You can see all the code on [Github][github] for the sake of transparency.

[webstore]: https://chrome.google.com/webstore/detail/google-docs-zoom-default/nflkcdlimipkgbacnfnhfecjgmojhklo
[github]: https://github.com/vernak2539/chrome-extension-google-doc-default-zoom
