+++
description = "Learn about the hidden pages feature"
frontmatter = ["hidden"]
options = ["disableSearchHiddenPages", "disableSeoHiddenPages", "disableTagHiddenPages"]
title = "Hidden Pages"
weight = 5
+++

This theme allows you to create hidden pages.

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Hidden pages are created but not shown in the navigation. To make a page hidden, set `hidden=true` in its front matter. This is useful for pages you only want to access via a direct link.

When you visit a hidden page's URL, it will appear in the navigation menu.

Hidden pages can also have hidden subpages.

By default, hidden pages are only hidden from human visitors. Search engines can still find them by crawling your site. You can prevent this with these options:

## Hide from Search

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} To remove hidden pages from search results, use `disableSearchHiddenPages=true`.

{{< multiconfig file=hugo >}}
[params]
  disableSearchHiddenPages = true
{{< /multiconfig >}}

## Hide from Search Engines

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} To hide pages from search engines by removing them from the sitemap, RSS feed and [make them `nofollow`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives), use `disableSeoHiddenPages=true`.

{{< multiconfig file=hugo >}}
[params]
  disableSeoHiddenPages = true
{{< /multiconfig >}}

## Hide from Taxonomies

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} To prevent hidden pages from appearing on taxonomy and term pages, use `disableTagHiddenPages=true`. If this makes a term's count zero, an empty term page will still be created but not linked.

{{< multiconfig file=hugo >}}
[params]
  disableTagHiddenPages = true
{{< /multiconfig >}}
