+++
alwaysopen = false
description = "List the child pages of a page"
title = "Children"
+++

Use the children shortcode to list the child pages of a page and the further descendants (children's children). By default, the shortcode displays links to the child pages.

## Usage

| Parameter | Default | Description |
|:--|:--|:--|
| page | _current_ | Specify the page name (section name) to display children for |
| containerstyle | "ul" | Choose the style used to group all children. It could be any HTML tag name |
| style | "li" | Choose the style used to display each descendant. It could be any HTML tag name |
| showhidden | "false" | When true, child pages hidden from the menu will be displayed |
| description  | "false" | Allows you to include a short text under each page in the list. When no description exists for the page, children shortcode takes the first 70 words of your content. [Read more info about summaries on gohugo.io](https://gohugo.io/content/summaries/) |
| depth | 1 | Enter a number to specify the depth of descendants to display. For example, if the value is 2, the shortcode will display 2 levels of child pages.  **Tips:** set 999 to get all descendants |
| sort | [ordersectionsby]({{% relref "basics/configuration#global-site-parameters" %}}) | Sort children by **weight**, to sort on menu order - **title**, to sort alphabetically on menu label. If not set it is sorted by the `ordersectionsby` setting of the site and the pages frontmatter |

## Demo

````go
{{%/* children  */%}}
````

{{% children %}}

````go
{{%/* children description="true" */%}}
````

{{%children description="true" %}}

````go
{{%/* children depth="999" showhidden="true" */%}}
````

{{% children depth="999" showhidden="true" %}}

````go
{{%/* children containerstyle="div" style="h2" depth="3" description="true" */%}}
````

{{% children containerstyle="div" style="h2" depth="3" description="true" %}}

````go
{{%/* children containerstyle="div" style="div" depth="999" */%}}
````

{{% children containerstyle="div" style="div" depth="999" %}}
