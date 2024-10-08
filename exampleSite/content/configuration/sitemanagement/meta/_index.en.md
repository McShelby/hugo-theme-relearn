+++
description = "What site-wide meta nformation can be set"
title = "Meta Information"
weight = 3
+++

## Site Author Information

The theme uses author details in various parts of your site, like RSS feeds and meta tags.

{{< multiconfig file=hugo >}}
[params]
  [params.author]
    name = 'Santa Claus'
    email = 'santa@example.com'
{{< /multiconfig >}}

## Site Description

The theme shows a site description in various places, such as RSS feeds and meta tags. For this, it uses the `description` field from your home page's front matter.

## Social Media Images

When your page is shared on social media, you can set a site-wide image to display with the link

{{< multiconfig file=hugo >}}
images = [ "images/hero.png" ]
{{< /multiconfig >}}

## More Social Media Options

The theme adheres to Hugo's official documentation for [Open Graph](https://gohugo.io/templates/embedded/#configure-open-graph) and [Twitter Cards](https://gohugo.io/templates/embedded/#configure-x-twitter-cards) configuration.
