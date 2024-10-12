+++
description = "What options are available for links and images"
options = ["disableDefaultRelref", "externalLinkTarget", "image.errorlevel", "link.errorlevel"]
title = "Linking"
weight = 4
+++

## Opening Links

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} By default, external links open in a new tab. To change this, use the `externalLinkTarget` setting with a proper [link target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target).

For example, this will open links in the same tab

{{< multiconfig file=hugo >}}
[params]
  externalLinkTarget = '_self'
{{< /multiconfig >}}

## Enabling Link and Image Link Warnings

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} You can use `link.errorlevel` and `image.errorlevel` to control what should happen if a local link can not be resolved to a resource.

If not set or empty, any unresolved link is written as given into the resulting output. If set to `warning` the same happens and an additional warning is printed in the built console. If set to `error` an error message is printed and the build is aborted.

Please note that this can not resolve files inside of your `static` directory. The file must be a resource of the page or the site.

Link warnings are also available for the [include](shortcodes/include#enabling-link-warnings) and [openapi](shortcodes/openapi#enabling-link-warnings) shortcodes.

{{< multiconfig file=hugo >}}
[params]
  link.errorlevel = 'warning'
  image.errorlevel = 'warning'
{{< /multiconfig >}}

## Patching the `relref` Shortcode

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} While the usage of `relref` is obsolete and discouraged by Hugo for a while, existing installations may still use it.

In configurations using a **baseURL** with a **subdirectory** and having **relativeURLs=false** (the default), Hugo’s standard `relref` implementation is failing.

To work around this, you can activate a patched version of the shortcode by setting `disableDefaultRelref=true`.

{{< multiconfig file=hugo >}}
[params]
  disableDefaultRelref = true
{{< /multiconfig >}}
