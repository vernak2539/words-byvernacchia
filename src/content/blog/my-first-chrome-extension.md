---
title: "My First Chrome Extension"
description: 'Let''s talk about creating "Google Docs Default Zoom"...'
pubDate: "2022-02-03"
---

As much as I don't want to admit it, I'm getting old.

My job requires me to review a lot of Google Docs (😔), and, unfortunately, I am having trouble reading things when they are set to the zoom level of "100%."

I quickly ruled out changing the resolution settings on my monitors because I really like the space the higher resolutions afford.

So, now that I accepted the fact that my eyes can't do "100%" anymore, how do I change the default zoom level in Google Docs.

After looking through all their setting and doing an extensive internet search, it turns out there is no native setting!!!

Well, I embarked on making my own. As a start, I asked myself, "how do you zoom in Google Docs?" There's two ways (hit me up if there's more...):

1. Use the "Zoom" feature in the Google Doc via the menu
2. Use the browser's zoom function

I don't like using the second option due to personal preference, which meant I was going with #1. Let's get to it!

Enter Chrome Extesions. I needed to execute a script to do something on the page to change the zoom.

But, bad news seemed to keep following me. Not only is there no way to set a default zoom level in Google Docs itself, there's no way to programatically interact with the page. No variable on the `window` object etc.

This meant that I now have to simulate click and interactions on the page (see [here](https://github.com/vernak2539/chrome-extension-google-doc-default-zoom/blob/main/ui-helpers.ts#L6-L25)). Fun, right?!?!

Even more fun is that the Google Docs use dynamic element IDs, so I had to figure out away around that (see [here](https://github.com/vernak2539/chrome-extension-google-doc-default-zoom/blob/main/contents/index.ts#L32-L35)).

Okay, that's all a bit painful, but relatively easy. Now the difficult part, how does one create a Chrome Extension these days? I took to Twitter (is it still alive??) to find out...

<blockquote class="twitter-tweet"><p lang="qam" dir="ltr"><a href="https://twitter.com/plasmohq?ref_src=twsrc%5Etfw">@plasmohq</a></p>&mdash; Mitch Friedman (@mitchfriedman5) <a href="https://twitter.com/mitchfriedman5/status/1617959819595644930?ref_src=twsrc%5Etfw">January 24, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

And a buddy who I used to work with came through in clutch. Enter [Plasmo](https://www.plasmo.com/).

Tbh, I had no experience with Chrome extensions, but this framework make it super easy to get up to speed and actually ship something.

My extension makes use of their plug-ins / modules / APIs for messaging and storage, saving me so much time to focus on what I wanted to do.

They had a good guide on how to automate the publishing of it to the Chrome Web Store (had to pay 😬💸), which I've since set up also. Makes it super simple for me to publish things when I release a new version via tagging.

Plasmo is great. If you want to do Chrome Extensions (or just browser extensions) I would seriously check it out.

Long story short, my extension is [now published on the Chrome Web Store (Google Docs Zoom Default)][webstore] and the source is available on [Github][github].

There are some bugs I'd like to fix and features I'd like to add. See below!

## Next steps

-   Allow for usage in Sheets, Slides, and other GSuite products that have zoom features ([issue](https://github.com/vernak2539/chrome-extension-google-doc-default-zoom/issues/3))
-   ✅ Get it to work for larger documents ([issue](https://github.com/vernak2539/chrome-extension-google-doc-default-zoom/issues/1))
-   Add an active state to the pop up ([issue](https://github.com/vernak2539/chrome-extension-google-doc-default-zoom/issues/2))
-   Make it prettier 💅

[webstore]: https://chrome.google.com/webstore/detail/google-docs-zoom-default/nflkcdlimipkgbacnfnhfecjgmojhklo
[github]: https://github.com/vernak2539/chrome-extension-google-doc-default-zoom
