+++
categories = ['howto']
description = 'How to adjust taxonomy and term pages'
frontmatter = ['pages']
title = 'Taxonomy / Term Pages'
weight = 6
+++

## Taxonomy Parameter

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The list of taxonomies is displayed using the [`pages` shortcode](shortcodes/pages). By default the output is grouped by the first letter of each term but you can overwrite any parameter of the `pages` shortcode in the `pages` front matter.

{{< multiconfig fm=true >}}
[params]
  [params.pages]
	display = "cards"
	groupby = " "
{{< /multiconfig >}}

For example in this docs the [_Categories_ taxonomy](categories) does not show a grouped list like in the default (compare to the [_Tags_ taxonomy](tags)) but some neat cards.

## Term Parameter

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The list of pages of a term is displayed using the [`pages` shortcode](shortcodes/pages). You can overwrite any parameter of the `pages` shortcode in the `pages` front matter. Use a cascade configuration on your taxonomy page to inherit parameter down to every term page.

{{< multiconfig fm=true >}}
[[cascade]]
  [cascade.params]
	[cascade.params.pages]
	  breadcrumb = false
	  description = true
{{< /multiconfig >}}

For example in this docs the [term pages](categories/explanation) of the _Categories_ taxonomy do not show their breadcrumbs like in the default but the description of the page.

> [!note]
> Before the `pages` shortcode existed, these parameters were set in the `children` front matter. It is still honored as long as the deprecated [`children` shortcode](shortcodes/children#migration) exists.
