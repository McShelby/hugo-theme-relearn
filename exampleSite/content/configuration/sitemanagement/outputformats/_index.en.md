+++
categories = ["howto"]
description = "What other formats can a page be displayed in"
title = "Available Output Formats"
weight = 5
+++

## Print Support

Enable print support to print entire chapters or the whole site. Add the `print` output format to your home, section, and page in `hugo.toml`:

{{< multiconfig file=hugo >}}
[outputs]
  home = ['html', 'rss', 'print']
  section = ['html', 'rss', 'print']
  page = ['html', 'rss', 'print']
{{< /multiconfig >}}

This adds a printer icon in the topbar. Clicking it switches to print preview, showing the page and its [visible subpages](configuration/content/hidden) in a printer-friendly format. Use your browser's print function to print or save as PDF.

The URL won't be [configured ugly](https://gohugo.io/templates/output-formats/#configure-output-formats) for [Hugo's URL handling](https://gohugo.io/content-management/urls/#ugly-urls), even with `uglyURLs=true` in `hugo.toml`. This is because each mime type can only have one suffix.

If you don't like the URLs, you can reconfigure `outputFormats.print` in your `hugo.toml` to something other than the default of:

{{< multiconfig file=hugo >}}
[outputFormats]
  [outputFormats.print]
    name= 'print'
    baseName = 'index.print'
    isHTML = true
    mediaType = 'text/html'
    permalinkable = false
    noUgly = true
{{< /multiconfig >}}
