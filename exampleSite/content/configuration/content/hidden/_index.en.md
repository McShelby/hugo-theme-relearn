+++
description = "Learn about the hiddes pages feature"
frontmatter = ["hidden"]
options = ["disableSearchHiddenPages", "disableSeoHiddenPages", "disableTagHiddenPages"]
title = "Hidden Pages"
weight = 5
+++

The theme provides the concept of hidden pages.

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} While Hugo has the `draft` option to not create a page at all, a hidden page is created but not shown in the navigation. Just set `hidden=true` in your pages front matter. This can be useful if you want to have a page that is only accessible via a link.

If you access a hidden page via its URL, it will be revealed in the navigation menu.

Hidden pages can even contain hidden subpages.

By default, a hidden page is only hidden from a human user of your site. Crawlers may still see the URLs advertised in the sitemap, etc. You can avoid this by the following options

## Hide from Search

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} To hide hidden pages from search results of the search popup and dedicated search page, set `disableSearchHiddenPages=true`.

## Hide from Crawlers

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} To hide hidden pages from crawlers by removing links from the sitemap and rss feed, set `disableSeoHiddenPages=true`.

## Hide from Taxonomies

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} To hide hidden pages from showing up on the taxonomy and term pages, set `disableTagHiddenPages=true`. If this reduces term counters to zero, an empty but unlinked term page will be created anyhow.
