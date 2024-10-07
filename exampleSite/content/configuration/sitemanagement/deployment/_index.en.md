+++
description = "Options for specific deployment needs"
options = ["disableExplicitIndexURLs"]
title = "Deployment Scenarios"
weight = 3
+++

## Server Deployment

If your server deployment has no special requirements, you can skip this section and use the [standard Hugo options](https://gohugo.io/content-management/urls/).

For special requirements, the theme is capable of different scenarios, requiring the following mandatory settings in your `hugo.toml`. All settings not mentioned in the examples below can be set to your liking.

### Public Web Server from Root

{{< multiconfig file=hugo >}}
baseURL = "https://example.com/"
{{< /multiconfig >}}

### Public Web Server from Subdirectory

{{< multiconfig file=hugo >}}
baseURL = "https://example.com/mysite/"
relativeURLs = false
{{< /multiconfig >}}

> [!WARNING]
> Don't use a `baseURL` with a subdirectory and `relativeURLs=true` together. [Hugo doesn't apply the `baseURL` correctly](https://github.com/gohugoio/hugo/issues/12130) in this case. If you need both, generate your site twice with different settings into separate directories.

### Private Web Server (LAN)

The same settings as with any of the public web server scenarios or

{{< multiconfig file=hugo >}}
baseURL = "/"
relativeURLs = true
{{< /multiconfig >}}

### File System

Exclusively use

{{< multiconfig file=hugo >}}
baseURL = "/"
relativeURLs = true
{{< /multiconfig >}}

> [!note]
> Pages like `sitemap.xml` and `rss.xml`, and social media links will always use absolute URLs. They won't work with `relativeURLs=true`.

## URL Management

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} By default, the theme adds `index.html` to page links when `uglyURLs=false` (Hugo's default).

If you're only using a web server scenario and dislike this, you can reset to Hugo's default behavior by settings `disableExplicitIndexURLs=true`.

For the file system scenario, you are not allowed to change this value.

{{< multiconfig file=hugo >}}
[params]
  disableExplicitIndexURLs = true
{{< /multiconfig >}}
