# Taxonomy / Term Pages

## Taxonomy Parameter

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The list of taxonomies is displayed using the [`pages` shortcode](shortcodes/pages). By default the output is grouped by the first letter of each term and shown in columns but you can set any parameter of the `pages` shortcode in the `pages` front matter. As soon as you set one, the grouping and the columns are gone, unless you ask for them with `groupby` and `columns`.

{{< multiconfig fm=true >}}
[params]
  [params.pages]
	display = "cards"
{{< /multiconfig >}}

For example in this docs the [_Categories_ taxonomy](categories) does not show a grouped list like in the default (compare to the [_Tags_ taxonomy](tags)) but some neat cards.

## Term Parameter

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The list of pages of a term is displayed using the [`pages` shortcode](shortcodes/pages). The same defaults and rules as for the taxonomy apply. Use a cascade configuration on your taxonomy page to inherit parameter down to every term page.

{{< multiconfig fm=true >}}
[[cascade]]
  [cascade.params]
	[cascade.params.pages]
	  breadcrumb = false
	  columns = 3
	  description = true
	  groupby = "linktitle | left 1 | upper"
{{< /multiconfig >}}

For example in this docs the [term pages](categories/explanation) of the _Categories_ taxonomy do not show their breadcrumbs like in the default but the description of the page. As the front matter sets parameters, it asks for the grouping and the columns of the default again.

> [!note]
> Before the `pages` shortcode existed, these parameters were set in the `children` front matter. It is still honored as long as the deprecated [`children` shortcode](shortcodes/children#migration) exists.
