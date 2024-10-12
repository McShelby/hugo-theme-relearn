+++
categories = ["explanation", "howto"]
description = "Extending page designs"
title = "Page Designs"
weight = 5
+++

A page is displayed by exactly one page design. The Relearn theme offers the page designs `home`, `chapter`, and `default`.

A page design usually consists of

- [an archetype file](https://gohugo.io/content-management/archetypes/): a template for creating new Markdown files with this design
- [content view files](https://gohugo.io/templates/types/#content-view): represented by [Hugo's reserved `type` front matter](https://gohugo.io/content-management/front-matter/#type) and backed by matching partials
- CSS styles

If no `type` is set in your front matter, the page is treated as if `type='default'` was set.

> [!warning]
> Don't use the `type` option in your modifications for other functionality!

All shipped designs use the theme's framework from `themes/hugo-theme-learn/layouts/_default/baseof.html`, containing of the same topbar and sidebar but can change how content appears in the center of the page.

## Using a Page Design

Regardless of shipped or custom page design, you are [using them](authoring/frontmatter/designs) in the same way.

## Creating a Page Designs

To make a custom page design:

1. Choose a name (for example, `mydesign`)
2. Create a content view file at `layouts/mydesign/views/article.html`

    ````html {title="layouts/mydesign/views/article.html"}
    <article class="mydesign">
      <header class="headline">
    {{ partial "content-header.html" . }}
      </header>
    <div class="article-subheading">AWESOME</div>
    {{ partial "heading-pre.html" . }}{{ partial "heading.html" . }}{{ partial "heading-post.html" . }}
    {{ partial "article-content.html" . }}
      <footer class="footline">
    {{ partial "content-footer.html" . }}
      </footer>
    </article>
    ````

    In this file, you can customize the page design as needed. Typically, you'll want to:

    - Set a `class` at the `article` element for custom CSS styles
    - Use `{{ partial "article-content.html" . }}` to show your page content

3. Create an archetype file at `archetypes/mydesign.md` (optional)

    ````html {title="archetypes/mydesign.md"}
    +++
    title = "{{ replace .Name "-" " " | title }}"
    type = "mydesign"
    +++

    This is my new design.
    ````

4. Add CSS in file `layouts/partials/custom-header.html` (optional)

    ````html {title="layouts/partials/custom-header.html"}
    <style>
    .mydesign .article-subheading {
      font-size: 72rem;
    }
    .mydesign a {
      background-color: pink;
    }
    </style>
    ````

### Partials

The above example uses `layouts/mydesign/views/article.html` but you have some others

- `layouts/mydesign/baseof.html`: Completely redefine the whole HTML structure, none of the other listed partials will be used
- `layouts/mydesign/views/menu.html`: Defines the sidebar menu layout
- `layouts/mydesign/views/body.html`: Determines what to contain in the content area (for example a single page, a list of pages, a tree of sub pages)
- `layouts/mydesign/views/article.html`: Controls how one page's content and title are displayed
