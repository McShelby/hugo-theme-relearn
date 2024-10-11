+++
description = "Default behavior of the navigation menu"
options = ["alwaysopen", "collapsibleMenu", "ordersectionsby"]
title = "Navigation Menu"
weight = 4
+++

The navigation menu is automatically created from [your content files](content/structure).

All configurations options apply to all pages but can be changed in each page's front matter.

## Expand State of Nested Sections

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Use `alwaysopen` to control how submenus appear. Set it to `true` to expand submenus, or `false` to collapse them. If not set, the first menu level is collapsed, and all others are expanded.

{{< multiconfig file=hugo >}}
[params]
  alwaysopen = true
{{< /multiconfig >}}

See the [user guide](content/navigationmenu#expand-state-of-nested-sections) how this setting will be applied.

## Expander for Nested Sections

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `collapsibleMenu=true` to add an expander for submenus. This shows submenus as collapsible trees with a clickable expander.

{{< multiconfig file=hugo >}}
[params]
  collapsibleMenu = true
{{< /multiconfig >}}

> [!WARNING]
> Using this option may slow down your build process, especially with many pages.
>
> We've seen builds taking 2 minutes with 1000+ pages, and over 30 minutes with 5000+ pages.
>
> This happens because each new page affects all other pages, leading to exponentially longer build times.

## Default Sort By

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Use `ordersectionsby` to choose how navigation menus are sorted. The default is `weight`. You can sort by `weight`, `title`, `linktitle`, `modifieddate`, `expirydate`, `publishdate`, `date`, `length`, or `default` (Hugo's standard order).

{{< multiconfig file=hugo >}}
[params]
  ordersectionsby = 'weight'
{{< /multiconfig >}}
