+++
description = "Using and extending page designs"
title = "Page Designs"
weight = 5
+++

The Relearn theme offers several page designs: `home`, `chapter`, and `default`. These are available as [archetypes](content/layouts) for site authors.

To use a design, set [Hugo's reserved `type` option](https://gohugo.io/content-management/front-matter/#type) in your page's front matter.

This leverages Hugo's [content view feature](https://gohugo.io/templates/types/#content-view). Don't use the `type` option in your modifications for other functionality!

All designs use the theme's framework from `themes/hugo-theme-learn/layouts/_default/baseof.html`, containing of the same topbar and sidebar but can change how content appears in the center of the page.

### Creating Your Own Page Designs

To make a custom page design:

1. Choose a name (for example, `mydesign`)
2. Create a file at `layouts/mydesign/views/article.html`
3. Add this content

    ````html {title="layouts/mydesign/views/article.html"}
    <article class="mydesign">
      <header class="headline">
    {{ partial "content-header.html" . }}
      </header>
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
