+++
categories = ['howto', 'reference']
description = 'List the child pages of a page'
frontmatter = ['ordersectionsby']
options = ['ordersectionsby']
title = 'Children'

[params]
  alwaysopen = false
+++

The `children` shortcode lists child pages in various layouts.

{{% children sort="title" %}}

## Usage

Also, the [taxonomy and term pages](authoring/taxterm) internally are using this shortcode and also can be given parameters.

{{< tabs groupid="shortcode-parameter">}}
{{% tab title="shortcode" %}}

````go
{{%/* children sort="title" */%}}
````

{{% /tab %}}
{{% tab title="partial" %}}

````go
{{ partial "shortcodes/children.html" (dict
  "page" .
  "sort" "title"
) | .RenderString }}
````

{{% /tab %}}
{{< /tabs >}}

### Parameters

| Name               | Default           | Notes       |
|--------------------|-------------------|-------------|
| **type**           | `tree`            | The layout used for the listing.<br><br>- `tree`: a nested, unordered list<br>- `list`: a non-nested list with titles resembling a heading style depending on the depth<br>- `flat`: a non-nested list with titles in standard text style<br>- `group`: much like tree, but grouped by title, [see example for details](#group-type)<br>- `card`: a card for each top-level children |
| **breadcrumb**     | `false`           | When `true` shows the breadcrumb under each page in the list. |
| **cardtemplate**   | `default`         | If `type=card`, the template to be used to display a card. [See below for details](#remarks-for-the-card-type). |
| **description**    | `false`           | When `true` shows a short text under each page in the list. When no description or summary exists for the page, the first 70 words of the content is taken - [read more info about summaries on gohugo.io](https://gohugo.io/content/summaries/). |
| **image**          | `true`            | For `type=card` decides whether to put an image on the card. [See below for details](#remarks-for-the-card-type). |
| **depth**          | `1`               | For `type=tree\|list\|flat` the depth of descendants to display. For example, if the value is `2`, the shortcode will display two levels of child pages.  To get all descendants, set this value to a high  number eg. `999`. |
| **headingdepth**   | `2`               | For `type=group\|list` the starting depth of the heading. |
| **showhidden**     | `false`           | When `true`, child pages hidden from the menu will be displayed as well. |
| **sort**           | `auto`            | For `type=tree\|list\|flat\|card` the sort criteria of the displayed list. `type=group` is always sorted by `title`.<br><br>- `auto` defaults to `ordersectionsby` of the page's {{% badge style="frontmatter" %}}Front Matter{{% /badge %}}<br>&nbsp;&nbsp;&nbsp;&nbsp;or to `ordersectionsby` of the configuration {{% badge style="option" %}}Option{{% /badge %}}<br>&nbsp;&nbsp;&nbsp;&nbsp;or to `default`<br>- `weight`<br>- `title`<br>- `modifieddate`<br>- `expirydate`<br>- `publishdate`<br>- `date`<br>- `length`<br>- `default` adhering to Hugo's default sort criteria. |

### Configuration

To use this shortcode you need to enable block attributes in your `hugo.toml`.

{{< multiconfig file=hugo >}}
[markup.goldmark.parser.attribute]
  block = true
{{< /multiconfig >}}

## Remarks for the Card Type

The `card` type uses the [`cards` shortcode](/shortcodes/cards) to display the top-level children of a page. [See below for an example](#card-type-with-description).

Each children is displayed in its own card, using the `default` cardtemplate. With it the card will display

- if `image=true` a featured image at the start [selected by Hugo](https://gohugo.io/templates/embedded/#configuration-open-graph)
- the title of the child page as card title
- if `description=true` the summary

If you have advanced requirements, you can [write your own cardtemplate](#own-card-templates).

### Own Card Templates

The `children` shortcode displays each children using the [`card` shortcode](/shortcodes/card) for display. If you have advanced requirements to display the children, you can place a card layout partial into `layouts/partials/card`.

For example, if you want to see debug output displaying the parameter the partial receives, you could set `cardtemplate=debug` which will cause the partial `layouts/partials/debug.html` to be called. The `debug` card template is shipped with the theme.

A card template will be called with the following parameter by the `children` shortcode:

- `page`: the page, the `children` shortcode was contained in
- `content`: the summary
- `href`: ready to use link to the children page
- `image`: ready to use link to the featured image
- `title`: title of the children page
- `params.page`: the children page
- `params.depth`: the shortcodes `depth` parameter value
- `params.description`: the shortcodes `description` parameter value
- `params.showhidden`: the shortcodes `showhidden` parameter value
- `params.sort`: the shortcodes `sort` parameter value

## Examples

### All Default

````go
{{%/* children */%}}
````

{{% children %}}

### With Description

````go
{{%/* children description="true" */%}}
````

{{%children description="true" %}}

### Infinite Depth and Hidden Pages

````go
{{%/* children depth="999" showhidden="true" */%}}
````

{{% children depth="999" showhidden="true" %}}

### List Type with Depth and Description

````go
{{%/* children type="list" headingdepth="4" depth="3" description="true" */%}}
````

{{% children type="list" headingdepth="4" depth="3" description="true" %}}

### Flat Type with Depth

````go
{{%/* children type="flat" depth="3" */%}}
````

{{% children type="flat" depth="3" %}}

### Group Type

````go
{{%/* children type="group" headingdepth="4" description="true" */%}}
````

{{% children type="group" headingdepth="4" description="true" %}}

### Card Type with Description

Because none of the children pages of this example define their own feature images, the theme (and Hugo) falls back to the media image of your site.

> [!note]
> Note if you want to use the card layout and have `goldmark.renderer.unsafe=false` (which is the default if you don't set it), you have to use `{{</* children */>}}` instead of `{{%/* children */%}}` as with the other examples.

````go
{{</* children type="card" description="true" */>}}
````

{{< children type="card" description="true" >}}
