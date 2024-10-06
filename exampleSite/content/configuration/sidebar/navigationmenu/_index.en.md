+++
description = "Default behavior of the navigation menu"
options = ["alwaysopen", "collapsibleMenu", "ordersectionsby"]
title = "Navigation Menu"
weight = 4
+++

The navigation menu is automatically generated from [your content files](content/organization).

You can define certain settings globally in your `hugo.toml`. These are inherited to all pages as their default values but can be overwritten in their front matter.

## Expand State of Nested Sections

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Use `alwaysopen` to set the initial expand state of submenus. This controls whether submenus will be expanded (`true`), or collapsed (`false`) in the menu. If not set, the first menu level is set to false, all others levels are set to true.

This can be overridden individually for each page in its front matter.

If the _displayed_ page has submenus, they will always been displayed expanded regardless of this option.

## Expander for Nested Sections

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `collapsibleMenu=true` to show an expander for submenus. If set to `true`, submenus in the sidebar will be displayed as collapsible trees and a clickable expander is set in front of those entries.

> [!WARNING]
> Setting this option to `true` may cause your build to significantly slow down and degrade built performance, depending on your machine and the amount of pages.
>
> We've observed this with 1000+ pages with a built time of around 2min. With 5000+ pages it was unbearable slow taking the built half an hour to complete.
>
> This is because for each page being added, every other pages needs to be visited once. This results in quadratic built time. In an already slow environment, adding just one single new page may result in unbearable built times afterwards.
>

## Default Sort By

{{% badge style="cyan" icon="gears" title=" " %}}Option{{% /badge %}} Set `ordersectionsby` to set the sorting criterium of navigation menus. Defaults to `weight`. Menus can be ordered by `weight`, `title`, `linktitle`, `modifieddate`, `expirydate`, `publishdate`, `date`, `length` or `default` (adhering to Hugo's default sort order).

This can be overridden individually for each page in its front matter.
