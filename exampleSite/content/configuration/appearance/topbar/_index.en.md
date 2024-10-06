+++
description = "Configure the site's topbar"
options = ["breadcrumbSeparator", "disableBreadcrumb", "disableNextPrev", "disableRootBreadcrumb", "disableToc", "editURL"]
title = "Topbar"
weight = 3
+++

This page is about how to configure supported options for the topbar. If you want to add further buttons or functionality, [see this section](configuration/modifications/topbar).

## Table of Contents

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `disableToc=true` to hide the TOC button on all pages. If the button is hidden, also the keyboard shortcut is disabled. This can be overridden in a page's front matter.

## Breadcrumbs

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `disableBreadcrumb=true` to hide the breadcrumb in the topbar.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Further, you can override the breadcrumb separator by using `breadcrumbSeparator="/"`. This separator will also be used in the breadcrumbs of the search results and taxonomy pages.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} `disableRootBreadcrumb=true` to remove the root breadcrumb which often feels redundant. This will also apply to the breadcrumbs of the search results and taxonomy pages.

## Edit Button

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} If `editURL` is set to a URL, an edit button will be shown in the topbar. If the button is hidden, also the keyboard shortcut is disabled.

The value can contain the macro `${FilePath}` which will be replaced by the file path of your displayed page. If no `${FilePath}` is given in the value, the value is treated as if the `${FilePath}` was appended at the end of the value. This can be overridden in the pages frontmatter.

Eg. this site is using `editURL="https://github.com/McShelby/hugo-theme-relearn/edit/main/exampleSite/content/${FilePath}"`

## Print Support

You can activate print support to add the capability to print whole chapters or even the complete site. Just add the `print` output format to your home, section and page in your `hugo.toml` similar to the below:

{{< multiconfig file=hugo >}}
[outputs]
  home = ["html", "rss", "print"]
  section = ["html", "rss", "print"]
  page = ["html", "rss", "print"]
{{< /multiconfig >}}

This will add a little printer icon in the top bar. It will switch the page to print preview when clicked. You can then send this page to the printer by using your browser's usual print functionality.

{{% notice note %}}
The resulting URL will not be [configured ugly](https://gohugo.io/templates/output-formats/#configure-output-formats) in terms of [Hugo's URL handling](https://gohugo.io/content-management/urls/#ugly-urls) even if you've set `uglyURLs=true` in your `hugo.toml`. This is due to the fact that for one mime type only one suffix can be configured.

Nevertheless, if you're unhappy with the resulting URLs you can manually redefine `outputFormats.print` in your own `hugo.toml` to your liking.
{{% /notice %}}

## Arrow Navigation

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} You can hide the previous/next buttons by setting `disableNextPrev=true`. If the buttons are hidden, also the keyboard shortcuts are disabled.
