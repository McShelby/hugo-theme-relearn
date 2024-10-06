+++
description = "Options for specific deployment needs"
options = ["disableExplicitIndexURLs"]
title = "Deployment Scenarios"
weight = 3
+++

## Server Deployment

If you have no further requirements to your server deployment, you can skip the following page and choose of the broad range of available [options in a standard Hugo installation](https://gohugo.io/content-management/urls/).

If you have special requirements, the theme is capable of different scenarios, requiring the following mandatory settings in your `hugo.toml`. All settings not mentioned can be set to your liking.

### Public Web Server from Root

{{< multiconfig file=hugo >}}
baseURL = "https://example.com/"
{{< /multiconfig >}}

### Public Web Server from Subdirectory

{{< multiconfig file=hugo >}}
baseURL = "https://example.com/mysite/"
relativeURLs = false
{{< /multiconfig >}}

### Private Web Server (LAN)

The same settings as with any of the public web server usage scenarios or

{{< multiconfig file=hugo >}}
baseURL = "/"
relativeURLs = true
{{< /multiconfig >}}

### File System

{{< multiconfig file=hugo >}}
baseURL = "/"
relativeURLs = true
{{< /multiconfig >}}

> [!WARNING]
> Using a `baseURL` with a subdirectory and `relativeURLs=true` are mutually exclusive due to the fact, that [Hugo does not apply the `baseURL` correctly](https://github.com/gohugoio/hugo/issues/12130).
>
> If you need both, you have to generate your site twice but with different settings into separate directories.

{{% notice note %}}
Sublemental pages (like `sitemap.xml`, `rss.xml`) and generated social media links inside of your pages will always be generated with absolute URLs and will not work if you set `relativeURLs=true`.
{{% /notice %}}

## URL Management

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} If you are using `uglyURLs=false` (Hugo's default), the theme will append an additional `index.html` to all page links to make your site be servable from the file system. If you don't care about the file system and only serve your page via a web server you can generate the links without this by setting `disableExplicitIndexURLs=true`.

{{< multiconfig file=hugo >}}
[params]
  disableExplicitIndexURLs = true
{{< /multiconfig >}}
