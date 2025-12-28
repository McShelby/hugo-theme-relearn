+++
categories = ['howto']
description = 'How to adjust taxonomy and term pages'
frontmatter = ['children']
title = 'Taxonomy / Term Pages'
weight = 6
+++

## Taxonomy Parameter

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The list of taxonomies is displayed using the [`children` shortcode](shortcodes/children). By default the output is of `type=group` but you can overwrite the `children` parameter in your front matter.

{{< multiconfig fm=true >}}
[params]
  [params.children]
	type = "card"
{{< /multiconfig >}}

For example in this docs the [_Categories_ taxonomy](categories) does not show a grouped list like in the default (compare to the [_Tags_ taxonomy](tags)) but some neat cards.

## Term Parameter

{{% badge style="frontmatter" %}}Front Matter{{% /badge %}} The list of terms is displayed using the [`children` shortcode](shortcodes/children). You can overwrite the `children` parameter in your front matter. Use a cascade configuration on your taxonomy page to inherit parameter down to every term page.

{{< multiconfig fm=true >}}
[[cascade]]
  [cascade.params]
	[cascade.params.children]
	  breadcrumb = false
	  description = true
{{< /multiconfig >}}

For example in this docs the [term pages](categories/explanation) of the _Categories_ taxonomy do not show their breadcrumbs like in the default but the description of the page.
