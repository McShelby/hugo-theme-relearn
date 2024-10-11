+++
description = "Per page behavior of the navigation menu"
title = "Navigation Menu"
weight = 4
+++

## Custom Title for Menu Entries

By default, the Relearn theme will use a page's `title` front matter for the menu entry.

But a page's title has to be descriptive on its own while the menu is a hierarchy. Use `linkTitle` to shorten the text of the menu entry.

For example (for a page named `content/install/linux.md`):

{{< multiconfig fm=true >}}
title = "Install on Linux"
linkTitle = "Linux"
{{< /multiconfig >}}

## Add Icon to a Menu Entry

In the page front matter, add a `menuPre` to insert any HTML code before the menu label. You can also set `menuPost` to insert HTML code after the menu label.

The example below uses the GitHub icon.

{{< multiconfig fm=true >}}
title = "GitHub Repo"
menuPre = "<i class='fab fa-github'></i> "
{{< /multiconfig >}}

![Title with icon](frontmatter-icon.png?width=18.75rem)

## Ordering Sibling Menu Entries

### By Weight

Hugo provides a [simple way](https://gohugo.io/getting-started/glossary/#weight) to handle order for your pages by setting the `weight` front matter to a number.

{{< multiconfig fm=true >}}
title = "My page"
weight = 5
{{< /multiconfig >}}

### Other

Using the `weight` for sorting can get cumbersome if you, for example, just want to sort alphabetically. Each time you add a new page in the set of pages, you may have to renumber some or all of them to make space for the new page.

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Use `ordersectionsby` to choose how navigation menus are sorted. The default is `weight`. You can sort by `weight`, `title`, `linktitle`, `modifieddate`, `expirydate`, `publishdate`, `date`, `length`, or `default` (Hugo's standard order).

{{< multiconfig fm=true >}}
ordersectionsby = 'linktitle'
{{< /multiconfig >}}

## Expand State of Nested Sections

You can change how the theme submenus appear with `alwaysopen` on a per page basis. If `alwaysopen=false` for any given entry, its children will not be shown in the menu as long as it is not necessary for the sake of navigation.

The theme generates the menu based on the following rules:

- all parent entries of the active page including their visible siblings are shown regardless of any settings
- immediate child entries of the active page are shown regardless of any settings
- if not overridden, all other first level entries behave like they would have been given `alwaysopen=false`
- if not overridden, all other entries of levels besides the first behave like they would have been given `alwaysopen=true`
- all visible entries show their immediate child entries if `alwaysopen=true`; this proceeds recursively
- all remaining entries are not shown

You can see this feature in action on the example page for [children shortcode](shortcodes/children) and its child pages.

## Disable Section Pages

You may want to structure your pages in a hierarchical way but don't want to generate pages for those sections? The theme got you covered.

To stay with the [initial example](content/structure): Suppose you want `introduction/first-content` appear in the sidebar but don't want to generate a page for it. So the entry in the sidebar should not be clickable but should show an expander.

For this, open `content/introduction/first-content/_index.md` and add the following front matter

{{< multiconfig fm=true >}}
collapsibleMenu = true
[_build]
  render = "never"
{{< /multiconfig >}}
