+++
categories = ["howto"]
description = "What options are available for links and images"
options = ["disableDefaultRelref", "disableExplicitIndexURLs"]
title = "Linking"
weight = 4
+++

Further [settings are available](authoring/frontmatter/linking) to be used in your configuration or front matter.

## URL Management

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} By default, the theme adds `index.html` to page links when `uglyURLs=false` (Hugo's default).

If you're only using a web server scenario and dislike this, you can reset to Hugo's default behavior by settings `disableExplicitIndexURLs=true`.

For the file system scenario, you are not allowed to change this value.

{{< multiconfig file=hugo >}}
[params]
  disableExplicitIndexURLs = true
{{< /multiconfig >}}

## Patching the `relref` Shortcode

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} While the usage of `relref` is obsolete and discouraged by Hugo for a while, existing installations may still use it.

In configurations using a **baseURL** with a **subdirectory** and having **relativeURLs=false** (the default), Hugo’s standard `relref` implementation is failing.

To work around this, you can activate a patched version of the shortcode by setting `disableDefaultRelref=true`.

{{< multiconfig file=hugo >}}
[params]
  disableDefaultRelref = true
{{< /multiconfig >}}
