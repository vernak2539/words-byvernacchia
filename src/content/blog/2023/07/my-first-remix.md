---
title: "My First Remix"
description: "Let's get busy using Remix..."
pubDate: "2023-07-XX" # FILL ME IN
tags: ["javascript", "frontend", "frameworks", "react", "remix"]
socialImage: ""
---

Notes

-   starting out was a bit weird
-   api specific routes (GET = loader, POST = action)
-   weird that there's no middleware for things like auth
-   passing data from server to client is interesting (window.ENV vs loader data)
-   session helpers are nice
-   difficult debugging (stack trace was difficult. took a while to find note at top of error `Check your code at _index.tsx:45.`)
-   portal usage is not possible on the server (react-aria-components Table). how do you make it possible? tried https://github.com/remix-run/remix/discussions/1023, but didn't work (caused difficult debugging)
