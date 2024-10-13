+++
categories = ["howto"]
description = "Behavior of the navigation menu"
frontmatter = ["alwaysopen", "collapsibleMenu", "linkTitle", "menuPost", "menuPre", "ordersectionsby"]
options = ["alwaysopen", "collapsibleMenu", "ordersectionsby"]
title = "Navigation Menu"
weight = 2
+++

The navigation menu is automatically created from [your content files](authoring/structure).

All configurations options apply to all pages but can be changed in each page's front matter.

## Expand State of Nested Sections

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} You can change how the theme submenus appear with `alwaysopen`.

If `alwaysopen=false` for any given entry, its children will not be shown in the menu as long as it is not necessary for the sake of navigation.

The theme generates the expand state based on the following rules:

- all parent entries of the active page including their [visible](authoring/meta#hidden) siblings are shown regardless of any settings
- immediate child entries of the active page are shown regardless of any settings
- if not overridden, all other first level entries behave like they would have been given `alwaysopen=false`
- if not overridden, all other entries of levels besides the first behave like they would have been given `alwaysopen=true`
- all [visible](authoring/meta#hidden) entries show their immediate child entries if `alwaysopen=true`; this proceeds recursively
- all remaining entries are not shown

{{< multiconfig >}}
alwaysopen = false
{{< /multiconfig >}}

## Expander for Nested Sections

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Set `collapsibleMenu=true` to add an expander for submenus. This shows submenus as collapsible trees with a clickable expander.

{{< multiconfig >}}
collapsibleMenu = true
{{< /multiconfig >}}

> [!WARNING]
> Using this option may slow down your build process, especially with many pages.
>
> We've seen builds taking 2 minutes with 1000+ pages, and over 30 minutes with 5000+ pages.
>
> This happens because each new page affects all other pages, leading to exponentially longer build times.

## Ordering Sibling Menu Entries

### By Weight

Hugo provides a [simple way](https://gohugo.io/getting-started/glossary/#weight) to handle order for your pages by setting the `weight` front matter to a number.

{{< multiconfig fm=true >}}
title = 'My page'
weight = 5
{{< /multiconfig >}}

### By Other

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} {{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} Using the `weight` for sorting can get cumbersome if you, for example, just want to sort alphabetically. Each time you add a new page in the set of pages, you may have to renumber some or all of them to make space for the new page.

{{< multiconfig >}}
ordersectionsby = 'linktitle'
{{< /multiconfig >}}

## Custom Title for Menu Entries

By default, the Relearn theme will use a page's `title` front matter for the menu entry.

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} But a page's title has to be descriptive on its own while the menu is a hierarchy. Use `linkTitle` to shorten the text of the menu entry.

For example for a page named `install/linux.md`

{{< multiconfig fm=true >}}
title = 'Install on Linux'
linkTitle = 'Linux'
{{< /multiconfig >}}

## Add Icon to a Menu Entry

{{% badge style="green" icon="fa-fw fab fa-markdown" title=" " %}}Front Matter{{% /badge %}} In the page front matter, add a `menuPre` to insert any HTML code before the menu label. You can also set `menuPost` to insert HTML code after the menu label.

The example below uses the GitHub icon.

{{< multiconfig fm=true >}}
title = 'GitHub Repo'
menuPre = '<i class="fab fa-github"></i> '
{{< /multiconfig >}}

![Title with icon](item-with-icon.png?width=18.75rem)

## Disable Section Pages

You may want to structure your pages in a hierarchical way but don't want to generate pages for those sections? The theme got you covered.

To stay with the [initial example](authoring/structure): Suppose you want `first-chapter/first-page` appear in the sidebar but don't want to generate a page for it. So the entry in the sidebar should not be clickable but should show an expander.

For this, open `content/first-chapter/first-page/_index.md` and add the following front matter

{{< multiconfig fm=true >}}
collapsibleMenu = true
[_build]
  render = 'never'
{{< /multiconfig >}}
