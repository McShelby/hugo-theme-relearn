+++
categories = ["taxonomy", "content"]
description = "How to display custom taxonomies on your pages"
tags = "tutorial"
title = "Custom Taxonomies"
weight = 5
+++

This page shows you how customize your templates to display custom taxonomies on your pages.

See the official documentation on [how to configure custom taxnomies](https://gohugo.io/content-management/taxonomies/#configure-taxonomies) and [how to use them in your page's front matter](https://gohugo.io/content-management/taxonomies/#assign-terms-to-content).

## Standard Behavior

The Relearn theme displays Hugo's [default taxonomies](https://gohugo.io/content-management/taxonomies/#default-taxonomies) _tag_ and _category_ out of the box.

The _tags_ are displayed at the top of the page in alphabetical order.

The _categories_ are displayed at the bottom of the page in alphabetical order.

Each item is a link to a taxonomy page displaying all the articles with the given term.

## Configuration

To add custom taxnomies, you have to configure them in your `hugo.toml` and also have to add the default taxonomies if you want to use them.

{{< multiconfig file=hugo >}}
[taxonomies]
  category = 'categories'
  mycustomtag = 'mycustomtags'
  tag = 'tags'
{{< /multiconfig >}}

## Customization

You can display the terms of your custom taxonomy somewhere in your page (often in the `layouts/partials/content-footer.html`) by calling a partial that does the job for you

````go
{{ partial "term-list.html" (dict
  "page" .
  "taxonomy" "mycustomtags"
  "icon" "layer-group"
) }}
````

### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **page**              | _&lt;empty&gt;_ | Mandatory reference to the page. |
| **taxonomy**          | _&lt;empty&gt;_ | The plural name of the taxonomy to display as used in your frontmatter. |
| **class**             | _&lt;empty&gt;_ | Additional CSS classes set on the outermost generated HTML element.<br><br>If set to `tags` you will get the visuals for displaying the _tags_ taxonomy, otherwise it will be a simple list of links as for the _categories_ taxonomy. |
| **style**             | `primary`       | The style scheme used if **class** is `tags`.<br><br>- by severity: `caution`, `important`, `info`, `note`, `tip`, `warning`<br>- by brand color: `primary`, `secondary`, `accent`<br>- by color: `blue`, `cyan`, `green`, `grey`, `magenta`, `orange`, `red`<br>- by special color: `default`, `transparent`, `code` |
| **color**             | see notes       | The [CSS color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) to be used if **class** is `tags`. If not set, the chosen color depends on the **style**. Any given value will overwrite the default.<br><br>- for severity styles: a nice matching color for the severity<br>- for all other styles: the corresponding color |
| **icon**              | _&lt;empty&gt;_ | An optional [Font Awesome icon name](shortcodes/icon#finding-an-icon) set to the left of the list. |
