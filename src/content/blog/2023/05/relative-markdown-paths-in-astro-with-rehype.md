---
title: "Relative Markdown Paths in Astro via Rehype"
description: "Want to use relative paths in md/mdx files to link to other md/mdx files? Now you can!"
pubDate: "2023-05-11"
tags: ["astro", "markdown", "mdx", "rehype"]
socialImage: "relative-markdown-paths.png"
---

I stared using Astro and my mind was blown. It did everything I needed and even things I didn't know I needed. It eased
me into the static site/SSG game.

After a couple blog posts I noticed something weird. When I clicked on a link, it gave me a 404. What gives??

I investigated a bit more and realised that Astro doesn't/won't modify the MD/MDX content of a Content Collection. This
meant when I had a Markdown link this:

```markdown
[relative link](./other-markdown.md)
```

It would be rendered exactly the same, like this:

```html
<a href="./other-markdown.md">relative link</a>
```

After doing exactly the same thing I do to link relative Markdown pages on Github, I couldn't believe it wasn't working
in the same way (silly me).

Turns out I wasn't the only one. There's multiple issues ([#5682](https://github.com/withastro/astro/issues/5682)],
[#5680](https://github.com/withastro/astro/issues/5680)]) and an RFC
([#424](https://github.com/withastro/roadmap/discussions/424)]) that relate to this functionality "missing."

If I'm honest, it didn't seem like the Astro team would be focusing on fixing this problem anytime soon, so I decided to
try my hand at it.

## Enter Rehype (and Remark)

[Reyhpe][rehype] and [Remark][remark] are part of the [@unifiedjs collective](https://unifiedjs.com/) and are used to
transform Markdown.

Reyhpe is a:

> HTML processor powered by plugins part of the @unifiedjs collective

Remark is a:

> popular tool that transforms markdown with plugins. These plugins can inspect and change your markup.
> You can use remark on the server, the client, CLIs, deno, etc.

**Note:** As I write this, I realise the plugin I created could a Remark plugin as well. I'll explore that in the _[Rehype
vs Remark](#rehype-vs-remark)_ section below.

Looks

## Rehype vs Remark

did I do the right thing???

[github]: https://github.com/vernak2539/astro-rehype-relative-markdown-links
[npm]: https://www.npmjs.com/package/astro-rehype-relative-markdown-links
[old npm]: https://www.npmjs.com/package/rehype-astro-relative-markdown-links
