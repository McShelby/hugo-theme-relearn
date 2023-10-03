+++
categories = ["taxonomy", "content"]
tags = "tutorial"
title = "Taxonomy"
weight = 7
+++

The Relearn theme supports Hugo's default taxonomies _tag_ and _category_ out of the box.

## Configuration

Just add tags and/or categories to any page. They can be given as a single string or an array of strings.

```toml
+++
categories = ["taxonomy", "content"]
tags = "tutorial"
title = "Taxonomy"
+++
```

## Behavior

The tags are displayed at the top of the page in alphabetical order.

The categories are displayed at the bottom of the page in alphabetical order in the default implementation of the theme but can be customized by providing your own `content-footer.html` partial.

Each item is a link to a taxonomy page displaying all the articles with the given term.

## List all the tags

In the `config.toml`  file you can add a shortcut to display all the tags and categories

```toml
[[menu.shortcuts]]
name = "<i class='fas fa-tags'></i> Tags"
url = "/tags"

[[menu.shortcuts]]
name = "<i class='fas fa-list'></i> Categories"
url = "/categories"
```

## Customization

If you define [custom taxonomies](https://gohugo.io/content-management/taxonomies/#configure-taxonomies) and want to display a list of them somewhere on your page (often in the `layouts/partials/content-footer.html`) you can call a partial that does the job for you:

````markdown
{{- partial "term-list.html" (dict
  "page" .
  "taxonomy" "categories"
  "icon" "list"
) }}
````

### Parameter

| Name                  | Default         | Notes       |
|-----------------------|-----------------|-------------|
| **page**              | _&lt;empty&gt;_ | Mandatory reference to the page. |
| **taxonomy**          | _&lt;empty&gt;_ | The plural name of the taxonomy to display as used in your frontmatter. |
| **class**             | _&lt;empty&gt;_ | Additional CSS classes set on the outermost generated HTML element. |
| **icon**              | _&lt;empty&gt;_ | An optional [Font Awesome icon name]({{%relref "shortcodes/icon#finding-an-icon" %}}) set to the left of the list. |
