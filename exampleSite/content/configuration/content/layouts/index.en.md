+++
description = "How to use and extend layouts"
title = "Custom Layouts"
weight = 4
+++

The Relearn theme provides a few layouts for you to use. Namely these are `home`, `chapter` and `default`. All are accessible as so called [archetypes](content/layouts) for an author of your site.

You can manually use them by defining the `type` option accordingly in your page's front matter.

These layouts will use the general framework of the theme as defined in `themes/hugo-theme-learn/layouts/_default/baseof.html` but be modify the appearance of the content inside of the page.

### Defining Layouts

To provide your own custom layout, you need to choose a name, say `mylayout`. Create a file `layouts/mylayout/views/article.html` with the following content

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

In this file, you can do what ever you want. Usually, you want to at least set some `class` identifier to add custom CSS styles for your layout and call the partial `article-content.html` to render the content of your page.
