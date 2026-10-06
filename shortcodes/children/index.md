# Children

> [!warning]
> This shortcode is deprecated in favor of the new [`pages` shortcode](shortcodes/pages). See [migration instructions](#migration) below.
>
> The examples on this page were removed.

The `children` shortcode lists child pages in various layouts.

## Migration

Each use of the `children` shortcode issues a warning during the build, naming the `pages` call that produces the same listing. The parameters translate as follows.

| `children`                                  | `pages`                                           |
|---------------------------------------------|---------------------------------------------------|
| `type=tree`                                 | `display="tree"`                                  |
| `type=list`                                 | `display="headings"`                              |
| `type=flat`                                 | `display="list"`                                  |
| `type=card`                                 | `display="cards"`                                 |
| `type=group`                                | `display="tree"` together with `groupby="linktitle \| left 1 \| upper"`; add `columns="3"` for the former multi-column layout |
| `sort`                                      | `orderby`, with `linktitle` for `title`, as `title` of the `pages` shortcode is the page's title and not the one shown in the menu |
| `showhidden`                                | `hidden`                                          |
| `depth`                                     | `levels`                                          |
| `headingdepth`                              | `headinglevel`                                    |
| `description`, `breadcrumb`, `image`, `cardtemplate` | unchanged                           |
| front matter `params.children`              | front matter `params.pages`                       |

The listing written by the `pages` shortcode carries the CSS classes `pages pages-<display>` instead of `children children-type-<type>`. If you styled the listing in your own CSS, adapt your selectors.

## Usage

{{% multishortcode name="children" execute="false" %}}
- sort: "title"
{{% /multishortcode %}}

### Parameters

| Name               | Default           | Notes       |
|--------------------|-------------------|-------------|
| **type**           | `tree`            | The layout used for the listing.<br><br>- `tree`: a nested, unordered list<br>- `list`: a non-nested list with titles resembling a heading style depending on the depth<br>- `flat`: a non-nested list with titles in standard text style<br>- `group`: much like tree, but grouped by the first letter of the title<br>- `card`: a card for each top-level children |
| **breadcrumb**     | `false`           | When `true` shows the breadcrumb under each page in the list. |
| **cardtemplate**   | `default`         | If `type=card`, the template to be used to display a card, see the [`pages` shortcode](shortcodes/pages#own-card-templates). |
| **description**    | `false`           | When `true` shows a short text under each page in the list. When no description or summary exists for the page, the first 70 words of the content is taken - [read more info about summaries on gohugo.io](https://gohugo.io/content/summaries/). |
| **image**          | `true`            | For `type=card` decides whether to put an image on the card. |
| **depth**          | `1`               | For `type=tree\|list\|flat` the depth of descendants to display. For example, if the value is `2`, the shortcode will display two levels of child pages. To get all descendants, set this value to a high number eg. `999`. |
| **headingdepth**   | `2`               | For `type=group\|list` the starting depth of the heading. |
| **showhidden**     | `false`           | When `true`, child pages hidden from the menu will be displayed as well. |
| **sort**           | `auto`            | The sort criteria of the displayed list, for `type=group` within each group.<br><br>- `auto` defaults to `ordersectionsby` of the page's {{% badge style="frontmatter" %}}Front Matter{{% /badge %}}<br>&nbsp;&nbsp;&nbsp;&nbsp;or to `ordersectionsby` of the configuration {{% badge style="option" %}}Option{{% /badge %}}<br>&nbsp;&nbsp;&nbsp;&nbsp;or to `default`<br>- `weight`<br>- `title`<br>- `lastmod`<br>- `expirydate`<br>- `publishdate`<br>- `date`<br>- `length`<br>- `default` adhering to Hugo's default sort criteria. |
