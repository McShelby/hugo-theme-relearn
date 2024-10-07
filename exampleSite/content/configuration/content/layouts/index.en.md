+++
description = "Using and extending layouts"
title = "Custom Layouts"
weight = 3
+++

The Relearn theme offers several layouts: `home`, `chapter`, and `default`. These are available as [archetypes](content/layouts) for site authors.

To use a layout, set the `type` option in your page's front matter.

These layouts use the theme's framework from `themes/hugo-theme-learn/layouts/_default/baseof.html`, containing the topbar and sidebar but change how content appears in the center of the page.

### Creating Your Own Layout

To make a custom layout:

1. Choose a name (for example, `mylayout`)
2. Create a file at `layouts/mylayout/views/article.html`
3. Add this content

    ````html {title="layouts/mylayout/views/article.html"}
    <article class="mylayout">
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

In this file, you can customize the layout as needed. Typically, you'll want to:

- Set a `class` at the `article` element for custom CSS styles
- Use `{{ partial "article-content.html" . }}` to show your page content
