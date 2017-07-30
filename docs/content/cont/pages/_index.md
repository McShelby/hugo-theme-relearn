---
date: 2016-04-09T16:50:16+02:00
title: Pages
weight: 5
---

In **Hugo**, pages are the core of your site. Once it is configure, pages are definitely the added value to your documentation site.

## Folders

Organize your site like [any other Hugo project](https://gohugo.io/content/organization/). Typically, you will have a *content* folder with all your pages.

    .
    └── content
        ├── brace
        |   ├── yourselves.md   <- http://example.com/brace/yourselves/
        |   ├── winter
        |   |   └── index.md    <- http://example.com/brace/winter/
        |   └── index.md        <- http://example.com/brace/
        ├── is
        |   ├── coming.md       <- http://example.com/is/comming/
        |   └── index.md        <- http://example.com/is/
        └── ned-stark.md        <- http://example.com/ned-stark/

{{% notice warning %}}
At that time, **Hugo-theme-learn** supports **only one level** inside a chapter. So you **can't** have http://example.com/chapter1/chapter1.1/page
{{% /notice %}}

## Types

**Hugo-theme-learn** defines two types of pages. *Default* and *Chapter*.

A *Chapter* is a page that contains another page. Commonly, it contains a simple title and a catch line to define content that can be found under it.
You can define any HTML as prefix for the menu. In the example below, it's just a number but that could be an [icon](https://fortawesome.github.io/Font-Awesome/).

![Chapter page](images/pages-chapter.png?width=50%)

    ---
    title: Basics
    chapter: true
    weight: 0
    icon: "<b>1. </b>"
    ---

    ### Chapter 1

    # Basics

    Discover what this Hugo theme is all about and the core-concepts behind it.


A *Default* page is any other content page.

![Default page](images/pages-default.png?width=50%)

    ---
    title: What is this Hugo theme ?
    weight: 5
    ---

    **Hugo-theme-learn** is a theme for [Hugo](https://gohugo.io/), a fast and modern static website engine written in Go. Where Hugo is often used for blogs, this theme is fully designed for **technical documentation**.

    This theme is a partial porting of the [Learn theme](http://learn.getgrav.org/) of [Grav](https://getgrav.org/), a modern flat-file CMS written in PHP.

    This current documentation has been statically generated with Hugo with a simple command : `hugo -t hugo-theme-learn`

    ![Grav Overview](images/grav-overview.png?width=60%)

To tell **Hugo-theme-learn** to consider a page as a chapter, just the name of your file as `_index.md`.

**Hugo-theme-learn** provides [archetypes]({{< relref "cont/archetypes.md" >}}) to help you create this kind of pages.

## Front Matter

Each Hugo page has to define a [Front Matter](https://gohugo.io/content/front-matter/) in *yaml*, *toml* or *json*.

**Hugo-theme-learn** uses the following parameters on top of the existing ones :

```toml
+++
# Set to true, it automatically generates a table of contents, available in the top of the screen.
toc = "false"
# Override path to previous page. This theme automatically generates previous arrows 
prev = ""
# Override path to next page. This theme automatically generates next arrows 
next = ""
# Set HTML in this parameter. The chapter title in the menu will be prefixed by this. Useful for icons.
icon: ""
+++
```

## Ordering

Hugo provides a [flexible way](https://gohugo.io/content/ordering/) to handle order for your pages.

The simplest way is to use `weight` parameter in the front matter of your page.


{{% notice tip %}}
Be aware that weight are applied separately for each kind of page (Chapter and Default). It means that if you mix chapter pages and default pages at the same level, the order won't be displayed as expected. 

{{% /notice %}}

The workaround is to override page type by adding `chapter: false` in the front matter of your Chapter page (identified as `_index.md` file).

For example, with 5 chapters page and 1 default page at the same level, rename the default page as `_index.md` and add `chapter: false` in the front-matter. It will then be considered as chapter for weight order computing, but content will be displayed as a default page.
